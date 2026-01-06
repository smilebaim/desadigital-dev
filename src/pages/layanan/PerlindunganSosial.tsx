import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Heart, Users, Shield } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PerlindunganSosial = () => {
  const perlindunganData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Layanan perlindungan sosial desa meliputi program dan kegiatan yang bertujuan untuk melindungi dan meningkatkan kesejahteraan masyarakat desa, terutama kelompok rentan dan kurang mampu."
      }
    },
    program: {
      title: "Program Perlindungan",
      icon: Heart,
      content: {
        kategori: [
          {
            nama: "Bantuan Langsung Tunai",
            program: [
              "BLT Desa",
              "Bantuan Tunai Bersyarat",
              "Bantuan Sosial Tunai"
            ]
          },
          {
            nama: "Bantuan Non Tunai",
            program: [
              "Bantuan Pangan",
              "Bantuan Kesehatan",
              "Bantuan Pendidikan"
            ]
          },
          {
            nama: "Program Pemberdayaan",
            program: [
              "Pelatihan Keterampilan",
              "Pemberdayaan Ekonomi",
              "Pendampingan Sosial"
            ]
          }
        ]
      }
    },
    sasaran: {
      title: "Sasaran Program",
      icon: Users,
      content: {
        kelompok: [
          {
            nama: "Keluarga Miskin",
            deskripsi: "Keluarga yang masuk dalam kategori miskin berdasarkan kriteria yang ditetapkan"
          },
          {
            nama: "Lansia",
            deskripsi: "Warga berusia 60 tahun ke atas yang membutuhkan bantuan"
          },
          {
            nama: "Penyandang Disabilitas",
            deskripsi: "Warga dengan keterbatasan fisik, mental, intelektual, atau sensorik"
          },
          {
            nama: "Anak Yatim Piatu",
            deskripsi: "Anak yang kehilangan kedua orang tuanya"
          }
        ]
      }
    },
    mekanisme: {
      title: "Mekanisme Bantuan",
      icon: Shield,
      content: {
        tahap: [
          {
            nama: "Pendataan",
            deskripsi: "Pendataan dan verifikasi calon penerima bantuan"
          },
          {
            nama: "Verifikasi",
            deskripsi: "Pemeriksaan kelayakan calon penerima bantuan"
          },
          {
            nama: "Penetapan",
            deskripsi: "Penetapan penerima bantuan oleh tim verifikasi"
          },
          {
            nama: "Penyaluran",
            deskripsi: "Penyaluran bantuan kepada penerima yang ditetapkan"
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
          { title: "Perlindungan Sosial" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perlindungan Sosial</h2>
          <p className="text-muted-foreground">
            Informasi program perlindungan sosial desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="sasaran">Sasaran</TabsTrigger>
            <TabsTrigger value="mekanisme">Mekanisme</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perlindunganData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar program perlindungan sosial
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {perlindunganData.umum.content.deskripsi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Heart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perlindunganData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program perlindungan sosial yang tersedia
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {perlindunganData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Heart className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{program}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sasaran" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perlindunganData.sasaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kelompok sasaran program perlindungan sosial
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {perlindunganData.sasaran.content.kelompok.map((kelompok, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{kelompok.nama}</h4>
                        <p className="text-sm text-muted-foreground">{kelompok.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mekanisme" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perlindunganData.mekanisme.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Mekanisme pemberian bantuan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {perlindunganData.mekanisme.content.tahap.map((tahap, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{tahap.nama}</h4>
                        <p className="text-sm text-muted-foreground">{tahap.deskripsi}</p>
                      </div>
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

export default PerlindunganSosial; 