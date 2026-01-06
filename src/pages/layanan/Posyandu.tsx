import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Posyandu = () => {
  const posyanduData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Posyandu adalah pusat pelayanan kesehatan dasar yang dikelola oleh masyarakat untuk meningkatkan derajat kesehatan ibu dan anak, serta keluarga berencana.",
        data: [
          {
            label: "Jumlah Posyandu",
            value: "10 Unit"
          },
          {
            label: "Jumlah Kader",
            value: "50 Orang"
          },
          {
            label: "Jumlah Sasaran",
            value: "500 Jiwa"
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
            nama: "Kesehatan Ibu",
            layanan: [
              "Pemeriksaan Kehamilan",
              "Pemeriksaan Nifas",
              "Konsultasi Gizi",
              "Pendampingan Persalinan"
            ]
          },
          {
            nama: "Kesehatan Anak",
            layanan: [
              "Pemeriksaan Bayi",
              "Pemeriksaan Balita",
              "Imunisasi",
              "Penimbangan"
            ]
          },
          {
            nama: "Keluarga Berencana",
            layanan: [
              "Konsultasi KB",
              "Pemberian Alat KB",
              "Pendampingan KB",
              "Pemantauan KB"
            ]
          },
          {
            nama: "Promotif Preventif",
            layanan: [
              "Penyuluhan Kesehatan",
              "Pencegahan Stunting",
              "Peningkatan Gizi",
              "Kesehatan Lingkungan"
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
            kunjungan: 1200,
            layanan: 1500,
            anggaran: "Rp 50.000.000",
            manfaat: "Peningkatan Kesehatan Ibu dan Anak"
          },
          {
            tahun: "2021",
            kunjungan: 1500,
            layanan: 1800,
            anggaran: "Rp 75.000.000",
            manfaat: "Penurunan Angka Kematian Ibu"
          },
          {
            tahun: "2022",
            kunjungan: 1800,
            layanan: 2000,
            anggaran: "Rp 100.000.000",
            manfaat: "Peningkatan Kualitas Layanan"
          },
          {
            tahun: "2023",
            kunjungan: 2000,
            layanan: 2500,
            anggaran: "Rp 125.000.000",
            manfaat: "Peningkatan Akses Kesehatan"
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
            nama: "Ketua Posyandu",
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan Posyandu"
          },
          {
            nama: "Kader Kesehatan",
            tugas: "Melaksanakan pelayanan kesehatan dasar"
          },
          {
            nama: "Bidan Desa",
            tugas: "Melaksanakan pelayanan kesehatan ibu dan anak"
          },
          {
            nama: "Petugas Gizi",
            tugas: "Melaksanakan pelayanan gizi"
          },
          {
            nama: "Petugas KB",
            tugas: "Melaksanakan pelayanan KB"
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
          { title: "Posyandu" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posyandu</h2>
          <p className="text-muted-foreground">
            Pos Pelayanan Terpadu
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
                  <CardTitle>{posyanduData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Posyandu
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {posyanduData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {posyanduData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{posyanduData.layanan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Layanan kesehatan yang tersedia
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {posyanduData.layanan.content.kategori.map((kategori, index) => (
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
                  <CardTitle>{posyanduData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja Posyandu per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {posyanduData.kinerja.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Kunjungan: {tahun.kunjungan}</span>
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
                  <CardTitle>{posyanduData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan Posyandu
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {posyanduData.pengelolaan.content.struktur.map((item, index) => (
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

export default Posyandu; 