import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KalenderKegiatan = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Kalender Kegiatan</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
          <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Kalender Kegiatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi umum tentang kalender kegiatan di Desa Remau Bakotuo.</p>
              {/* Add more content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jadwal">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Kegiatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Jadwal kegiatan rutin dan khusus di Desa Remau Bakotuo.</p>
              {/* Add calendar or schedule content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="kegiatan">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Kegiatan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Daftar lengkap kegiatan yang akan dilaksanakan.</p>
              {/* Add activities list here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KalenderKegiatan; 