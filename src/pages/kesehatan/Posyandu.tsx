import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Posyandu = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Posyandu</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Posyandu</CardTitle>
              <CardDescription>
                Informasi umum tentang Posyandu Desa Remau Bako Tuo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Posyandu (Pos Pelayanan Terpadu) adalah kegiatan kesehatan dasar yang diselenggarakan dari, oleh, dan untuk masyarakat yang dibantu oleh petugas kesehatan.
                </p>
                {/* Tambahkan konten overview lainnya di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kegiatan">
          <Card>
            <CardHeader>
              <CardTitle>Kegiatan Posyandu</CardTitle>
              <CardDescription>
                Kegiatan-kegiatan yang dilaksanakan di Posyandu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tambahkan daftar kegiatan di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jadwal">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Posyandu</CardTitle>
              <CardDescription>
                Jadwal kegiatan Posyandu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tambahkan jadwal kegiatan di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Posyandu; 