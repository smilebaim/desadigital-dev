import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KalenderPangan = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">Kalender Pangan</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
          <TabsTrigger value="informasi">Informasi</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview Kalender Pangan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi umum tentang kalender pangan di Desa Remau Bakotuo.</p>
              {/* Add more content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jadwal">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Pangan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Jadwal musim tanam dan panen berbagai jenis pangan.</p>
              {/* Add calendar or schedule content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="informasi">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Informasi tambahan terkait kalender pangan.</p>
              {/* Add additional information here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KalenderPangan; 