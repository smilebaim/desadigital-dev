import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PustakaDesa = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Pustaka Desa</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="koleksi">Koleksi</TabsTrigger>
          <TabsTrigger value="kategori">Kategori</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Pustaka Desa</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi umum tentang pustaka desa di Desa Remau Bakotuo.</p>
              {/* Add more content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="koleksi">
          <Card>
            <CardHeader>
              <CardTitle>Koleksi Pustaka</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Daftar koleksi buku dan dokumen yang tersedia di pustaka desa.</p>
              {/* Add collection list here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="kategori">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Pustaka</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Kategori dan pengelompokan koleksi pustaka desa.</p>
              {/* Add categories here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PustakaDesa; 