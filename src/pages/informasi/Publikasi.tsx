import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Publikasi = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Publikasi</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="berita">Berita</TabsTrigger>
          <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Publikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi umum tentang publikasi dan berita di Desa Remau Bakotuo.</p>
              {/* Add more content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="berita">
          <Card>
            <CardHeader>
              <CardTitle>Berita Desa</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Berita terbaru dan artikel tentang kegiatan di Desa Remau Bakotuo.</p>
              {/* Add news list here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pengumuman">
          <Card>
            <CardHeader>
              <CardTitle>Pengumuman</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Pengumuman resmi dan informasi penting dari pemerintah desa.</p>
              {/* Add announcements here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Publikasi; 