import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Agenda = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi umum tentang agenda kegiatan di Desa Remau Bakotuo.</p>
              {/* Add more content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jadwal">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Jadwal agenda kegiatan yang akan datang.</p>
              {/* Add calendar or schedule content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="detail">
          <Card>
            <CardHeader>
              <CardTitle>Detail Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detail lengkap tentang agenda kegiatan.</p>
              {/* Add detailed information here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agenda; 