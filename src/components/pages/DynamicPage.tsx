'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDoc } from "@/firebase/firestore/use-doc";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import PublicLayout from "@/layouts/PublicLayout";
import { notFound } from "next/navigation";

interface PageData {
  title: string;
  content: string;
  category: string;
}

interface DynamicPageProps {
  pageSlug: string;
  category: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageSlug, category }) => {
  const { data: pageData, loading, error } = useDoc<PageData>(`pages/${category}_${pageSlug}`);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading && !isClient) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 mb-20">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <Card>
            <CardHeader>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!loading && (error || !pageData)) {
     notFound();
     return null;
  }
  
  const breadcrumbItems = [
    { title: pageData?.category || category, path: `/${pageData?.category || category}` },
    { title: pageData?.title || "Halaman" }
  ];

  return (
      <div className="container mx-auto px-4 py-8 mt-16 mb-20">
        <Breadcrumb items={breadcrumbItems} />
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">{pageData?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {pageData?.content ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            ) : (
              <p>Konten tidak tersedia.</p>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default DynamicPage;
