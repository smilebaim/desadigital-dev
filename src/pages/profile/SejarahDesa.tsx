'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { getSejarahDesa, type SejarahDesaData } from '@/lib/sejarah-desa-actions';
import { Skeleton } from '@/components/ui/skeleton';

const SejarahDesa = () => {
  const [sejarahData, setSejarahData] = useState<SejarahDesaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSejarah = async () => {
      setLoading(true);
      const data = await getSejarahDesa();
      setSejarahData(data);
      setLoading(false);
    };
    fetchSejarah();
  }, []);

  const renderSkeleton = () => (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-4 mt-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <br/>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
        </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Sejarah Desa" }]} />
      
      {loading ? (
        <div className="mt-4">
            <Skeleton className="h-10 w-1/2 mb-6" />
            <Card>
                <CardContent className="p-6">{renderSkeleton()}</CardContent>
            </Card>
        </div>
      ) : sejarahData ? (
        <>
          <h1 className="text-3xl font-bold mb-6 mt-4">{sejarahData.judul}</h1>
          <Card>
            <CardHeader>
              <CardTitle>{sejarahData.judul}</CardTitle>
              <CardDescription>Didirikan sekitar tahun {sejarahData.tahun}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              {sejarahData.deskripsi.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </>
      ) : (
        <p className="text-muted-foreground mt-6">Gagal memuat data sejarah desa.</p>
      )}
    </div>
  );
};

export default SejarahDesa;
