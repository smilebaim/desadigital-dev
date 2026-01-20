'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { getVisiMisi, type VisiMisiData } from '@/lib/visi-misi-actions';
import { Skeleton } from '@/components/ui/skeleton';

const VisiMisi = () => {
  const [visiMisiData, setVisiMisiData] = useState<VisiMisiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      setLoading(true);
      const data = await getVisiMisi();
      setVisiMisiData(data);
      setLoading(false);
    };
    fetchVisiMisi();
  }, []);

  const renderSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Visi & Misi" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Visi dan Misi Desa</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Visi</CardTitle>
            <CardDescription>Arah dan tujuan jangka panjang desa.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-lg italic text-muted-foreground">
                "{visiMisiData?.visi}"
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Misi</CardTitle>
            <CardDescription>Langkah-langkah strategis untuk mencapai visi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              visiMisiData?.misi.map((item, index) => (
                <p key={index}>{index + 1}. {item}</p>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisiMisi;
