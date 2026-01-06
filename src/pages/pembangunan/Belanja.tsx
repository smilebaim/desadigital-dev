import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, List, TrendingUp } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Belanja = () => {
  const belanjaData = {
    umum: {
      title: "Informasi Umum Belanja",
      icon: Wallet,
      content: {
        tahun: "2024",
        total: "Rp 2.500.000.000",
        deskripsi: "Anggaran belanja Desa Remau Bakotuo tahun 2024 dialokasikan untuk mendukung berbagai program pembangunan desa, termasuk pembangunan infrastruktur, pemberdayaan masyarakat, dan pengembangan ekonomi desa."
      }
    },
    kategori: {
      title: "Kategori Belanja",
      icon: List,
      content: {
        kategori: [
          {
            judul: "Belanja Pegawai",
            jumlah: "Rp 500.000.000",
            persentase: "20%",
            deskripsi: "Alokasi untuk gaji dan tunjangan aparat desa"
          },
          {
            judul: "Belanja Barang dan Jasa",
            jumlah: "Rp 750.000.000",
            persentase: "30%",
            deskripsi: "Pengadaan barang dan jasa untuk operasional desa"
          },
          {
            judul: "Belanja Modal",
            jumlah: "Rp 1.000.000.000",
            persentase: "40%",
            deskripsi: "Pembangunan infrastruktur dan pengadaan aset desa"
          },
          {
            judul: "Belanja Tak Terduga",
            jumlah: "Rp 250.000.000",
            persentase: "10%",
            deskripsi: "Dana cadangan untuk keperluan mendesak"
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Belanja",
      icon: TrendingUp,
      content: {
        triwulan: [
          {
            periode: "Triwulan I",
            target: "Rp 625.000.000",
            realisasi: "Rp 600.000.000",
            persentase: "96%",
            deskripsi: "Realisasi belanja triwulan pertama tahun 2024"
          },
          {
            periode: "Triwulan II",
            target: "Rp 625.000.000",
            realisasi: "Rp 650.000.000",
            persentase: "104%",
            deskripsi: "Realisasi belanja triwulan kedua tahun 2024"
          },
          {
            periode: "Triwulan III",
            target: "Rp 625.000.000",
            realisasi: "Rp 580.000.000",
            persentase: "93%",
            deskripsi: "Realisasi belanja triwulan ketiga tahun 2024"
          },
          {
            periode: "Triwulan IV",
            target: "Rp 625.000.000",
            realisasi: "Rp 620.000.000",
            persentase: "99%",
            deskripsi: "Realisasi belanja triwulan keempat tahun 2024"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "Belanja" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Belanja Desa</h2>
          <p className="text-muted-foreground">
            Informasi anggaran dan realisasi belanja Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Overview</TabsTrigger>
            <TabsTrigger value="kategori">Kategori</TabsTrigger>
            <TabsTrigger value="realisasi">Realisasi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Informasi Umum Belanja</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahun Anggaran: {belanjaData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Anggaran</span>
                    <span className="text-sm font-semibold">{belanjaData.umum.content.total}</span>
                  </div>
                  <p className="text-sm">{belanjaData.umum.content.deskripsi}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kategori">
            <div className="space-y-4">
              {belanjaData.kategori.content.kategori.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <List className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.judul}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.persentase} dari total anggaran
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Jumlah</span>
                        <span className="text-sm font-semibold">{item.jumlah}</span>
                      </div>
                      <p className="text-sm">{item.deskripsi}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="realisasi">
            <div className="space-y-4">
              {belanjaData.realisasi.content.triwulan.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.periode}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Realisasi: {item.persentase}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Target</span>
                        <span className="text-sm">{item.target}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Realisasi</span>
                        <span className="text-sm font-semibold">{item.realisasi}</span>
                      </div>
                      <p className="text-sm">{item.deskripsi}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Belanja; 