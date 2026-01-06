import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Progress } from "@/components/ui/progress";

const IDM = () => {
  const idmData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Indeks Desa Membangun (IDM) adalah indeks komposit yang dibentuk berdasarkan tiga indeks, yaitu Indeks Ketahanan Sosial (IKS), Indeks Ketahanan Ekonomi (IKE), dan Indeks Ketahanan Ekologi/Lingkungan (IKL). IDM digunakan untuk mengukur tingkat kemandirian dan kesejahteraan desa.",
        data: [
          {
            label: "Nilai IDM",
            value: "0.7234"
          },
          {
            label: "Status",
            value: "Maju"
          },
          {
            label: "Tahun",
            value: "2024"
          },
          {
            label: "Kategori",
            value: "Desa Maju"
          }
        ]
      }
    },
    komponen: {
      title: "Komponen IDM",
      icon: Users,
      content: {
        indeks: [
          {
            nama: "Indeks Ketahanan Sosial (IKS)",
            nilai: 0.7568,
            persentase: "75.68%",
            indikator: [
              {
                nama: "Kesehatan",
                nilai: 0.8234,
                status: "Baik"
              },
              {
                nama: "Pendidikan",
                nilai: 0.7845,
                status: "Baik"
              },
              {
                nama: "Kemiskinan",
                nilai: 0.7123,
                status: "Cukup"
              },
              {
                nama: "Kesetaraan Gender",
                nilai: 0.7234,
                status: "Cukup"
              }
            ]
          },
          {
            nama: "Indeks Ketahanan Ekonomi (IKE)",
            nilai: 0.7123,
            persentase: "71.23%",
            indikator: [
              {
                nama: "Pendapatan",
                nilai: 0.7567,
                status: "Baik"
              },
              {
                nama: "Lapangan Kerja",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Infrastruktur",
                nilai: 0.6789,
                status: "Cukup"
              },
              {
                nama: "UMKM",
                nilai: 0.6901,
                status: "Cukup"
              }
            ]
          },
          {
            nama: "Indeks Ketahanan Lingkungan (IKL)",
            nilai: 0.7012,
            persentase: "70.12%",
            indikator: [
              {
                nama: "Kualitas Air",
                nilai: 0.7567,
                status: "Baik"
              },
              {
                nama: "Sanitasi",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Pengelolaan Sampah",
                nilai: 0.6789,
                status: "Cukup"
              },
              {
                nama: "Ruang Terbuka",
                nilai: 0.6456,
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
            status: "Mandiri"
          },
          {
            tahun: "2021",
            nilai: 0.6456,
            status: "Mandiri"
          },
          {
            tahun: "2022",
            nilai: 0.6789,
            status: "Maju"
          },
          {
            tahun: "2023",
            nilai: 0.7012,
            status: "Maju"
          },
          {
            tahun: "2024",
            nilai: 0.7234,
            status: "Maju"
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
            nama: "Peningkatan Kesehatan",
            target: "Meningkatkan IKS",
            kegiatan: [
              "Pengembangan Posyandu",
              "Peningkatan Akses Kesehatan",
              "Pemberdayaan Kader Kesehatan"
            ]
          },
          {
            nama: "Penguatan Ekonomi",
            target: "Meningkatkan IKE",
            kegiatan: [
              "Pengembangan UMKM",
              "Peningkatan Infrastruktur",
              "Pengembangan BUMDes"
            ]
          },
          {
            nama: "Pelestarian Lingkungan",
            target: "Meningkatkan IKL",
            kegiatan: [
              "Pengelolaan Sampah",
              "Penataan Sanitasi",
              "Pengembangan Ruang Terbuka"
            ]
          }
        ]
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "IDM" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Desa Membangun</h2>
          <p className="text-muted-foreground">
            Indeks Komposit Pembangunan Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="komponen">Komponen IDM</TabsTrigger>
            <TabsTrigger value="perkembangan">Perkembangan</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Indeks Desa Membangun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {idmData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {idmData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="komponen" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.komponen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Komponen dan Indikator IDM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {idmData.komponen.content.indeks.map((indeks, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{indeks.nama}</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Nilai: {indeks.nilai}</span>
                          <span>{indeks.persentase}</span>
                        </div>
                        <Progress value={indeks.nilai * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {indeks.indikator.map((item, idx) => (
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

          <TabsContent value="perkembangan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.perkembangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan IDM per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {idmData.perkembangan.content.tahun.map((tahun, index) => (
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

          <TabsContent value="strategi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.strategi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategi peningkatan IDM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {idmData.strategi.content.program.map((program, index) => (
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

export default IDM; 