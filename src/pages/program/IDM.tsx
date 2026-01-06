import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BarChart, Users, Leaf, DollarSign, Target } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const IDM = () => {
  const idmData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        nilai: "0.75",
        status: "Maju",
        deskripsi: "Indeks Desa Membangun (IDM) adalah indeks komposit yang dibentuk berdasarkan tiga indeks, yaitu Indeks Ketahanan Sosial, Indeks Ketahanan Ekonomi, dan Indeks Ketahanan Ekologi/lingkungan."
      }
    },
    aspek: {
      title: "Aspek IDM",
      icon: BarChart,
      content: {
        ekonomi: {
          nama: "Indeks Ketahanan Ekonomi",
          nilai: "0.80",
          indikator: [
            {
              nama: "Pertumbuhan Ekonomi",
              nilai: "0.85",
              deskripsi: "Laju pertumbuhan ekonomi desa"
            },
            {
              nama: "Kemiskinan",
              nilai: "0.75",
              deskripsi: "Tingkat kemiskinan desa"
            },
            {
              nama: "Pengangguran",
              nilai: "0.80",
              deskripsi: "Tingkat pengangguran desa"
            },
            {
              nama: "Pendapatan per Kapita",
              nilai: "0.80",
              deskripsi: "Pendapatan per kapita masyarakat"
            }
          ]
        },
        sosial: {
          nama: "Indeks Ketahanan Sosial",
          nilai: "0.75",
          indikator: [
            {
              nama: "Pendidikan",
              nilai: "0.80",
              deskripsi: "Tingkat pendidikan masyarakat"
            },
            {
              nama: "Kesehatan",
              nilai: "0.75",
              deskripsi: "Derajat kesehatan masyarakat"
            },
            {
              nama: "Kesejahteraan",
              nilai: "0.70",
              deskripsi: "Tingkat kesejahteraan masyarakat"
            },
            {
              nama: "Kebudayaan",
              nilai: "0.75",
              deskripsi: "Pelestarian budaya lokal"
            }
          ]
        },
        lingkungan: {
          nama: "Indeks Ketahanan Lingkungan",
          nilai: "0.70",
          indikator: [
            {
              nama: "Sanitasi",
              nilai: "0.75",
              deskripsi: "Akses sanitasi layak"
            },
            {
              nama: "Air Bersih",
              nilai: "0.70",
              deskripsi: "Akses air bersih"
            },
            {
              nama: "Pengelolaan Sampah",
              nilai: "0.65",
              deskripsi: "Sistem pengelolaan sampah"
            },
            {
              nama: "RTH",
              nilai: "0.70",
              deskripsi: "Ruang terbuka hijau"
            }
          ]
        }
      }
    },
    pencapaian: {
      title: "Pencapaian",
      icon: Target,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: "0.65",
            status: "Mandiri"
          },
          {
            tahun: "2021",
            nilai: "0.68",
            status: "Mandiri"
          },
          {
            tahun: "2022",
            nilai: "0.72",
            status: "Maju"
          },
          {
            tahun: "2023",
            nilai: "0.75",
            status: "Maju"
          }
        ]
      }
    },
    rekomendasi: {
      title: "Rekomendasi",
      icon: FileText,
      content: {
        ekonomi: [
          "Meningkatkan program pemberdayaan ekonomi",
          "Mengembangkan UMKM desa",
          "Meningkatkan akses permodalan"
        ],
        sosial: [
          "Meningkatkan kualitas pendidikan",
          "Meningkatkan layanan kesehatan",
          "Menguatkan kelembagaan sosial"
        ],
        lingkungan: [
          "Meningkatkan akses sanitasi",
          "Meningkatkan kualitas air bersih",
          "Mengembangkan sistem pengelolaan sampah"
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Program", path: "/program" },
          { title: "IDM" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indeks Desa Membangun</h2>
          <p className="text-muted-foreground">
            Indeks Desa Membangun tahun {idmData.umum.content.tahun}
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="aspek">Aspek IDM</TabsTrigger>
            <TabsTrigger value="pencapaian">Pencapaian</TabsTrigger>
            <TabsTrigger value="rekomendasi">Rekomendasi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar IDM tahun {idmData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Detail IDM</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun</span>
                        <span className="font-medium">{idmData.umum.content.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nilai</span>
                        <span className="font-medium">{idmData.umum.content.nilai}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium">{idmData.umum.content.status}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deskripsi</h4>
                    <p className="text-sm text-muted-foreground">
                      {idmData.umum.content.deskripsi}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aspek" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BarChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.aspek.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Aspek dan indikator IDM tahun {idmData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{idmData.aspek.content.ekonomi.nama}</h4>
                    <p className="text-sm text-muted-foreground">
                      Nilai: {idmData.aspek.content.ekonomi.nilai}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {idmData.aspek.content.ekonomi.indikator.map((indikator, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{indikator.nama}</h5>
                            <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                          </div>
                          <span className="font-medium">{indikator.nilai}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{idmData.aspek.content.sosial.nama}</h4>
                    <p className="text-sm text-muted-foreground">
                      Nilai: {idmData.aspek.content.sosial.nilai}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {idmData.aspek.content.sosial.indikator.map((indikator, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{indikator.nama}</h5>
                            <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                          </div>
                          <span className="font-medium">{indikator.nilai}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{idmData.aspek.content.lingkungan.nama}</h4>
                    <p className="text-sm text-muted-foreground">
                      Nilai: {idmData.aspek.content.lingkungan.nilai}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {idmData.aspek.content.lingkungan.indikator.map((indikator, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{indikator.nama}</h5>
                            <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                          </div>
                          <span className="font-medium">{indikator.nilai}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pencapaian" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.pencapaian.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Pencapaian IDM dari tahun ke tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {idmData.pencapaian.content.tahun.map((tahun, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Tahun {tahun.tahun}</h4>
                        <p className="text-sm text-muted-foreground">Status: {tahun.status}</p>
                      </div>
                      <span className="font-medium">{tahun.nilai}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rekomendasi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{idmData.rekomendasi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Rekomendasi peningkatan IDM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Rekomendasi Ekonomi</h4>
                  </div>
                  <ul className="space-y-2">
                    {idmData.rekomendasi.content.ekonomi.map((rekomendasi, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{rekomendasi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Rekomendasi Sosial</h4>
                  </div>
                  <ul className="space-y-2">
                    {idmData.rekomendasi.content.sosial.map((rekomendasi, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{rekomendasi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Rekomendasi Lingkungan</h4>
                  </div>
                  <ul className="space-y-2">
                    {idmData.rekomendasi.content.lingkungan.map((rekomendasi, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{rekomendasi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IDM; 