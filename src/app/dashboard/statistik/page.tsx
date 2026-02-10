
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Building2, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useState, useEffect } from "react";

const StatistikPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daftar Statistik</h2>
        <p className="text-muted-foreground">
          Data statistik Desa Remau Bakotuo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Penduduk</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">
              +2% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah KK</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
            <p className="text-xs text-muted-foreground">
              +5 KK dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Luas Wilayah</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 Ha</div>
            <p className="text-xs text-muted-foreground">
              Terdiri dari 3 Dusun
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggaran Desa</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 3.5M</div>
            <p className="text-xs text-muted-foreground">
              Tahun Anggaran 2024
            </p>
          </CardContent>
        </Card>
      </div>

      {isClient && (
        <Tabs defaultValue="penduduk" className="space-y-4">
          <TabsList>
            <TabsTrigger value="penduduk">Penduduk</TabsTrigger>
            <TabsTrigger value="ekonomi">Ekonomi</TabsTrigger>
            <TabsTrigger value="sosial">Sosial</TabsTrigger>
            <TabsTrigger value="pemerintahan">Pemerintahan</TabsTrigger>
          </TabsList>

          <TabsContent value="penduduk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Penduduk</CardTitle>
                <CardDescription>
                  Data demografi dan kependudukan Desa Remau Bakotuo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Grafik akan ditampilkan di sini</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ekonomi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Ekonomi</CardTitle>
                <CardDescription>
                  Data perekonomian Desa Remau Bakotuo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Grafik akan ditampilkan di sini</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sosial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Sosial</CardTitle>
                <CardDescription>
                  Data sosial dan kesejahteraan masyarakat Desa Remau Bakotuo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Grafik akan ditampilkan di sini</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pemerintahan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Pemerintahan</CardTitle>
                <CardDescription>
                  Data pemerintahan dan kelembagaan Desa Remau Bakotuo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Grafik akan ditampilkan di sini</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default StatistikPage;
