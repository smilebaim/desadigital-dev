import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Building2, Users, Leaf, DollarSign, Target } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const KetahananDesa = () => {
  const ketahananData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        nilai: "0.75",
        status: "Mandiri",
        deskripsi: "Indeks Ketahanan Desa adalah ukuran kemampuan desa dalam menghadapi berbagai tantangan dan ancaman, baik dari dalam maupun luar desa, untuk mencapai kesejahteraan masyarakat yang berkelanjutan."
      }
    },
    ekonomi: {
      title: "Ketahanan Ekonomi",
      icon: DollarSign,
      content: {
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
        ],
        program: [
          "Pengembangan UMKM",
          "Pemberdayaan ekonomi masyarakat",
          "Pengembangan sektor pertanian",
          "Pengembangan sektor pariwisata"
        ]
      }
    },
    sosial: {
      title: "Ketahanan Sosial",
      icon: Users,
      content: {
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
        ],
        program: [
          "Peningkatan kualitas pendidikan",
          "Peningkatan layanan kesehatan",
          "Penguatan kelembagaan sosial",
          "Pelestarian budaya lokal"
        ]
      }
    },
    lingkungan: {
      title: "Ketahanan Lingkungan",
      icon: Leaf,
      content: {
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
        ],
        program: [
          "Peningkatan akses sanitasi",
          "Peningkatan kualitas air bersih",
          "Pengembangan sistem pengelolaan sampah",
          "Pengembangan ruang terbuka hijau"
        ]
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
            status: "Mandiri"
          },
          {
            tahun: "2023",
            nilai: "0.75",
            status: "Mandiri"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Program", path: "/program" },
          { title: "Ketahanan Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Desa</h2>
          <p className="text-muted-foreground">
            Indeks Ketahanan Desa tahun {ketahananData.umum.content.tahun}
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="ekonomi">Ekonomi</TabsTrigger>
            <TabsTrigger value="sosial">Sosial</TabsTrigger>
            <TabsTrigger value="lingkungan">Lingkungan</TabsTrigger>
            <TabsTrigger value="pencapaian">Pencapaian</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ketahananData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Ketahanan Desa tahun {ketahananData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Detail Ketahanan Desa</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun</span>
                        <span className="font-medium">{ketahananData.umum.content.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nilai</span>
                        <span className="font-medium">{ketahananData.umum.content.nilai}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium">{ketahananData.umum.content.status}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deskripsi</h4>
                    <p className="text-sm text-muted-foreground">
                      {ketahananData.umum.content.deskripsi}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ekonomi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ketahananData.ekonomi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nilai: {ketahananData.ekonomi.content.nilai}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Indikator</h4>
                  <div className="space-y-4">
                    {ketahananData.ekonomi.content.indikator.map((indikator, index) => (
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
                  <h4 className="font-semibold">Program</h4>
                  <ul className="space-y-2">
                    {ketahananData.ekonomi.content.program.map((program, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sosial" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ketahananData.sosial.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nilai: {ketahananData.sosial.content.nilai}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Indikator</h4>
                  <div className="space-y-4">
                    {ketahananData.sosial.content.indikator.map((indikator, index) => (
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
                  <h4 className="font-semibold">Program</h4>
                  <ul className="space-y-2">
                    {ketahananData.sosial.content.program.map((program, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lingkungan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ketahananData.lingkungan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nilai: {ketahananData.lingkungan.content.nilai}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Indikator</h4>
                  <div className="space-y-4">
                    {ketahananData.lingkungan.content.indikator.map((indikator, index) => (
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
                  <h4 className="font-semibold">Program</h4>
                  <ul className="space-y-2">
                    {ketahananData.lingkungan.content.program.map((program, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pencapaian" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ketahananData.pencapaian.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Pencapaian Ketahanan Desa dari tahun ke tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {ketahananData.pencapaian.content.tahun.map((tahun, index) => (
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
        </Tabs>
      </div>
    </div>
  );
};

export default KetahananDesa; 