import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Progress } from "@/components/ui/progress";

const KetahananSosial = () => {
  const sosialData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Ketahanan Sosial Desa adalah kemampuan desa dalam menjaga dan memperkuat hubungan sosial, keamanan, dan kesejahteraan masyarakat untuk menciptakan kehidupan yang harmonis dan berkelanjutan.",
        data: [
          {
            label: "Status Ketahanan",
            value: "Baik"
          },
          {
            label: "Nilai Indeks",
            value: "0.7890"
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
      title: "Sektor Sosial",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Kesehatan",
            nilai: 0.8234,
            persentase: "82.34%",
            indikator: [
              {
                nama: "Fasilitas Kesehatan",
                nilai: 0.8567,
                status: "Sangat Baik"
              },
              {
                nama: "Akses Kesehatan",
                nilai: 0.8234,
                status: "Baik"
              },
              {
                nama: "Kesehatan Ibu dan Anak",
                nilai: 0.7890,
                status: "Baik"
              },
              {
                nama: "Gizi Masyarakat",
                nilai: 0.8123,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Pendidikan",
            nilai: 0.7567,
            persentase: "75.67%",
            indikator: [
              {
                nama: "Akses Pendidikan",
                nilai: 0.7789,
                status: "Baik"
              },
              {
                nama: "Kualitas Pendidikan",
                nilai: 0.7456,
                status: "Baik"
              },
              {
                nama: "Angka Putus Sekolah",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Literasi",
                nilai: 0.7789,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Kesejahteraan",
            nilai: 0.7123,
            persentase: "71.23%",
            indikator: [
              {
                nama: "Kemiskinan",
                nilai: 0.7567,
                status: "Baik"
              },
              {
                nama: "Pengangguran",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Kesetaraan Gender",
                nilai: 0.6789,
                status: "Cukup"
              },
              {
                nama: "Kesejahteraan Lansia",
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
            nilai: 0.7890,
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
            nama: "Penguatan Kesehatan",
            target: "Meningkatkan Derajat Kesehatan",
            kegiatan: [
              "Pembangunan Puskesmas",
              "Pemberdayaan Posyandu",
              "Peningkatan Gizi",
              "Penguatan KIA"
            ]
          },
          {
            nama: "Pengembangan Pendidikan",
            target: "Meningkatkan Kualitas Pendidikan",
            kegiatan: [
              "Pembangunan Sekolah",
              "Peningkatan Kualitas Guru",
              "Pemberian Beasiswa",
              "Pengembangan Perpustakaan"
            ]
          },
          {
            nama: "Pemberdayaan Masyarakat",
            target: "Meningkatkan Kesejahteraan",
            kegiatan: [
              "Pelatihan Keterampilan",
              "Pemberdayaan Ekonomi",
              "Pengembangan UMKM",
              "Pemberdayaan Perempuan"
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
          { title: "Ketahanan Sosial" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Sosial</h2>
          <p className="text-muted-foreground">
            Indeks Ketahanan Sosial Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
        <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="sektor">Sektor Sosial</TabsTrigger>
            <TabsTrigger value="perkembangan">Perkembangan</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
        </TabsList>

          <TabsContent value="umum">
          <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{sosialData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Ketahanan Sosial Desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {sosialData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {sosialData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{sosialData.sektor.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sektor dan Indikator Sosial Desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-6">
                {sosialData.sektor.content.kategori.map((kategori, index) => (
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
                  <CardTitle>{sosialData.perkembangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan Ketahanan Sosial per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sosialData.perkembangan.content.tahun.map((tahun, index) => (
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
                  <CardTitle>{sosialData.strategi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategi penguatan sosial desa
                  </p>
                </div>
            </CardHeader>
              <CardContent className="space-y-4">
                {sosialData.strategi.content.program.map((program, index) => (
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

export default KetahananSosial; 