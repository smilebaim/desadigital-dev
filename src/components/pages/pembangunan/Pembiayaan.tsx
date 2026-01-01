import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, List, TrendingUp } from "lucide-react";

const Pembiayaan = () => {
  const pembiayaanData = {
    umum: {
      title: "Informasi Umum Pembiayaan",
      icon: Wallet,
      content: {
        tahun: "2024",
        total: "Rp 500.000.000",
        deskripsi: "Pembiayaan Desa Remau Bakotuo tahun 2024 terdiri dari penerimaan dan pengeluaran pembiayaan yang digunakan untuk mendukung program pembangunan desa dan menutup defisit anggaran."
      }
    },
    kategori: {
      title: "Kategori Pembiayaan",
      icon: List,
      content: {
        kategori: [
          {
            judul: "Penerimaan Pembiayaan",
            jumlah: "Rp 300.000.000",
            persentase: "60%",
            deskripsi: "Sumber dana pembiayaan dari sisa lebih perhitungan anggaran tahun sebelumnya"
          },
          {
            judul: "Pengeluaran Pembiayaan",
            jumlah: "Rp 200.000.000",
            persentase: "40%",
            deskripsi: "Penggunaan dana pembiayaan untuk menutup defisit anggaran"
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Pembiayaan",
      icon: TrendingUp,
      content: {
        triwulan: [
          {
            periode: "Triwulan I",
            target: "Rp 125.000.000",
            realisasi: "Rp 120.000.000",
            persentase: "96%",
            deskripsi: "Realisasi pembiayaan triwulan pertama tahun 2024"
          },
          {
            periode: "Triwulan II",
            target: "Rp 125.000.000",
            realisasi: "Rp 130.000.000",
            persentase: "104%",
            deskripsi: "Realisasi pembiayaan triwulan kedua tahun 2024"
          },
          {
            periode: "Triwulan III",
            target: "Rp 125.000.000",
            realisasi: "Rp 115.000.000",
            persentase: "92%",
            deskripsi: "Realisasi pembiayaan triwulan ketiga tahun 2024"
          },
          {
            periode: "Triwulan IV",
            target: "Rp 125.000.000",
            realisasi: "Rp 125.000.000",
            persentase: "100%",
            deskripsi: "Realisasi pembiayaan triwulan keempat tahun 2024"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pembiayaan Desa</h2>
          <p className="text-muted-foreground">
            Informasi anggaran dan realisasi pembiayaan Desa Remau Bakotuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Informasi Umum Pembiayaan</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tahun Anggaran: {pembiayaanData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Anggaran</span>
                <span className="text-sm font-semibold">{pembiayaanData.umum.content.total}</span>
              </div>
              <p className="text-sm">{pembiayaanData.umum.content.deskripsi}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <List className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pembiayaanData.kategori.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.kategori.content.kategori.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                    <CardTitle>{item.judul}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {item.persentase} dari total anggaran
                    </p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pembiayaanData.realisasi.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.realisasi.content.triwulan.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                    <CardTitle>{item.periode}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Realisasi: {item.persentase}
                    </p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pembiayaan;