import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Progress } from "@/components/ui/progress";

const KetahananLingkungan = () => {
  const lingkunganData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Ketahanan Lingkungan Desa adalah kemampuan desa dalam menjaga dan mengelola sumber daya alam dan lingkungan secara berkelanjutan untuk mendukung kehidupan masyarakat dan pembangunan desa.",
        data: [
          {
            label: "Status Ketahanan",
            value: "Baik"
          },
          {
            label: "Nilai Indeks",
            value: "0.7234"
          },
          {
            label: "Tahun",
            value: "2024"
          },
          {
            label: "Kategori",
            value: "Desa Mandiri"
          }
        ]
      }
    },
    sektor: {
      title: "Sektor Lingkungan",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pengelolaan Air",
            nilai: 0.8234,
            persentase: "82.34%",
            indikator: [
              {
                nama: "Kualitas Air",
                nilai: 0.8567,
                status: "Sangat Baik"
              },
              {
                nama: "Akses Air Bersih",
                nilai: 0.8234,
                status: "Baik"
              },
              {
                nama: "Pengelolaan Limbah",
                nilai: 0.7890,
                status: "Baik"
              },
              {
                nama: "Sanitasi",
                nilai: 0.8123,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Pengelolaan Sampah",
            nilai: 0.7567,
            persentase: "75.67%",
            indikator: [
              {
                nama: "Pengumpulan Sampah",
                nilai: 0.7789,
                status: "Baik"
              },
              {
                nama: "Pengolahan Sampah",
                nilai: 0.7456,
                status: "Baik"
              },
              {
                nama: "Daur Ulang",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Kesadaran Masyarakat",
                nilai: 0.7789,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Keanekaragaman Hayati",
            nilai: 0.7123,
            persentase: "71.23%",
            indikator: [
              {
                nama: "Hutan",
                nilai: 0.7567,
                status: "Baik"
              },
              {
                nama: "Satwa Liar",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Tumbuhan",
                nilai: 0.6789,
                status: "Cukup"
              },
              {
                nama: "Konservasi",
                nilai: 0.6901,
                status: "Cukup"
              }
            ]
          }
        ]
      }
    },
    perkembangan: {
      title: "Perkembangan",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: 0.6123,
            status: "Cukup"
          },
          {
            tahun: "2021",
            nilai: 0.6456,
            status: "Cukup"
          },
          {
            tahun: "2022",
            nilai: 0.6789,
            status: "Baik"
          },
          {
            tahun: "2023",
            nilai: 0.7123,
            status: "Baik"
          },
          {
            tahun: "2024",
            nilai: 0.7234,
            status: "Baik"
          }
        ]
      }
    },
    strategi: {
      title: "Strategi",
      icon: Briefcase,
      content: {
        program: [
          {
            nama: "Pengelolaan Air Berkelanjutan",
            target: "Meningkatkan Kualitas Air",
            kegiatan: [
              "Pembangunan IPAL",
              "Pengembangan Sumur Resapan",
              "Peningkatan Kualitas Air",
              "Penguatan Kelembagaan"
            ]
          },
          {
            nama: "Pengelolaan Sampah",
            target: "Meningkatkan Pengelolaan Sampah",
            kegiatan: [
              "Pembangunan TPS",
              "Pengembangan Bank Sampah",
              "Peningkatan Kesadaran",
              "Pengembangan Teknologi"
            ]
          },
          {
            nama: "Konservasi Lingkungan",
            target: "Meningkatkan Keanekaragaman Hayati",
            kegiatan: [
              "Penanaman Pohon",
              "Pembuatan Biopori",
              "Pengembangan Hutan Desa",
              "Pemberdayaan Masyarakat"
            ]
          }
        ]
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sangat baik":
        return "text-green-600";
      case "baik":
        return "text-green-500";
      case "cukup":
        return "text-yellow-500";
      case "kurang":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "Ketahanan Lingkungan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Lingkungan</h2>
          <p className="text-muted-foreground">
            Indeks Ketahanan Lingkungan Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
        <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="sektor">Sektor Lingkungan</TabsTrigger>
            <TabsTrigger value="perkembangan">Perkembangan</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
        </TabsList>

          <TabsContent value="umum">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lingkunganData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Ketahanan Lingkungan Desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {lingkunganData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {lingkunganData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="sektor">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lingkunganData.sektor.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sektor dan Indikator Lingkungan Desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-6">
                {lingkunganData.sektor.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Nilai: {kategori.nilai}</span>
                          <span>{kategori.persentase}</span>
                        </div>
                        <Progress value={kategori.nilai * 100} className="h-2" />
                      </div>
                    </div>
              <div className="space-y-4">
                      {kategori.indikator.map((item, idx) => (
                        <Card key={idx}>
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium">{item.nama}</h5>
                                <span className={`text-sm ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>
                              <div className="mt-2 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Nilai: {item.nilai}</span>
                                </div>
                                <Progress value={item.nilai * 100} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="perkembangan">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lingkunganData.perkembangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan Ketahanan Lingkungan per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {lingkunganData.perkembangan.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                          <span className="text-sm text-muted-foreground">{tahun.status}</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Nilai: {tahun.nilai}</span>
                          </div>
                          <Progress value={tahun.nilai * 100} className="h-2" />
                        </div>
              </div>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="strategi">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lingkunganData.strategi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategi penguatan lingkungan desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                {lingkunganData.strategi.content.program.map((program, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
              <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold">{program.nama}</h4>
                          <p className="text-sm text-muted-foreground">Target: {program.target}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Kegiatan:</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {program.kegiatan.map((kegiatan, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                {kegiatan}
                              </li>
                            ))}
                          </ul>
                        </div>
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

export default KetahananLingkungan; 