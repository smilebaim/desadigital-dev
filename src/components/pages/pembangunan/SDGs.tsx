import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SDGs = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <h1 className="text-3xl font-bold mb-6">SDGs Desa</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="indikator">Indikator</TabsTrigger>
          <TabsTrigger value="program">Program</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview SDGs Desa</CardTitle>
              <CardDescription>
                Informasi umum tentang Sustainable Development Goals (SDGs) di tingkat desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  SDGs Desa merupakan upaya terpadu untuk mewujudkan desa tanpa kemiskinan dan kelaparan, desa ekonomi tumbuh merata, desa peduli kesehatan, desa peduli lingkungan, desa peduli pendidikan, desa ramah perempuan, desa berjejaring, dan desa tanggap budaya.
                </p>
                {/* Tambahkan konten overview lainnya di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indikator">
          <Card>
            <CardHeader>
              <CardTitle>Indikator SDGs Desa</CardTitle>
              <CardDescription>
                Indikator-indikator yang digunakan untuk mengukur pencapaian SDGs Desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tambahkan indikator-indikator di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="program">
          <Card>
            <CardHeader>
              <CardTitle>Program SDGs Desa</CardTitle>
              <CardDescription>
                Program-program yang dilaksanakan untuk mencapai SDGs Desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tambahkan program-program di sini */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDGs; 
