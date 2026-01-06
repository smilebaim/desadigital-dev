import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const MPG = () => {
  const mpgData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Program Makanan Pendamping Gizi (MPG) adalah program pemberian makanan tambahan untuk meningkatkan status gizi balita dan ibu hamil yang mengalami kekurangan gizi.",
        data: [
          {
            label: "Jumlah Penerima",
            value: "100 Orang"
          },
          {
            label: "Jumlah Kader",
            value: "20 Orang"
          },
          {
            label: "Jumlah Posyandu",
            value: "10 Unit"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    layanan: {
      title: "Layanan",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pemberian MPG",
            layanan: [
              "Pemberian Bubur Kacang Hijau",
              "Pemberian Telur",
              "Pemberian Susu",
              "Pemberian Buah"
            ]
          },
          {
            nama: "Pendampingan",
            layanan: [
              "Konsultasi Gizi",
              "Pemantauan Tumbuh Kembang",
              "Pendampingan Pemberian MPG",
              "Evaluasi Status Gizi"
            ]
          },
          {
            nama: "Edukasi",
            layanan: [
              "Penyuluhan Gizi",
              "Demo Masak MPG",
              "Pendampingan Orang Tua",
              "Konsultasi Menu"
            ]
          },
          {
            nama: "Monitoring",
            layanan: [
              "Pemantauan Berat Badan",
              "Pemantauan Tinggi Badan",
              "Pemantauan Lingkar Kepala",
              "Evaluasi Perkembangan"
            ]
          }
        ]
      }
    },
    kinerja: {
      title: "Kinerja",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2020",
            penerima: 80,
            layanan: 1200,
            anggaran: "Rp 50.000.000",
            manfaat: "Peningkatan Status Gizi"
          },
          {
            tahun: "2021",
            penerima: 90,
            layanan: 1500,
            anggaran: "Rp 75.000.000",
            manfaat: "Penurunan Stunting"
          },
          {
            tahun: "2022",
            penerima: 95,
            layanan: 1800,
            anggaran: "Rp 100.000.000",
            manfaat: "Peningkatan Kualitas MPG"
          },
          {
            tahun: "2023",
            penerima: 100,
            layanan: 2000,
            anggaran: "Rp 125.000.000",
            manfaat: "Peningkatan Akses MPG"
          }
        ]
      }
    },
    pengelolaan: {
      title: "Pengelolaan",
      icon: Briefcase,
      content: {
        struktur: [
          {
            nama: "Koordinator MPG",
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan MPG"
          },
          {
            nama: "Kader Gizi",
            tugas: "Melaksanakan pemberian MPG"
          },
          {
            nama: "Petugas Gizi",
            tugas: "Melaksanakan pemantauan gizi"
          },
          {
            nama: "Petugas Pendamping",
            tugas: "Melaksanakan pendampingan"
          },
          {
            nama: "Petugas Monitoring",
            tugas: "Melaksanakan pemantauan"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "MPG" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Makanan Pendamping Gizi</h2>
          <p className="text-muted-foreground">
            Program Pemberian Makanan Tambahan
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
        <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
        </TabsList>

          <TabsContent value="umum">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{mpgData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Program MPG
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {mpgData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {mpgData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="layanan">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{mpgData.layanan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Layanan yang tersedia
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-6">
                {mpgData.layanan.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.layanan.map((layanan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{layanan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
              </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="kinerja">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{mpgData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja Program MPG per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mpgData.kinerja.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Penerima: {tahun.penerima}</span>
                            <span className="text-muted-foreground">Layanan: {tahun.layanan}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Anggaran: {tahun.anggaran}</span>
                            <span className="text-muted-foreground">Manfaat: {tahun.manfaat}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{mpgData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan Program MPG
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                {mpgData.pengelolaan.content.struktur.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{item.nama}</h4>
                        <p className="text-sm text-muted-foreground">{item.tugas}</p>
              </div>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default MPG; 