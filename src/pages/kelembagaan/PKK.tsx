import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PKK = () => {
  const pkkData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "PKK (Pemberdayaan Kesejahteraan Keluarga) adalah organisasi kemasyarakatan yang memberdayakan wanita untuk turut berpartisipasi dalam pembangunan desa. PKK berperan dalam meningkatkan kesejahteraan keluarga melalui berbagai program pemberdayaan.",
        data: [
          {
            label: "Nama Organisasi",
            value: "PKK Desa Remaubakotuo"
          },
          {
            label: "Berdiri",
            value: "2020"
          },
          {
            label: "Jumlah Anggota",
            value: "50 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    program: {
      title: "Program",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pendidikan",
            program: [
              "PAUD",
              "Bimbingan Belajar",
              "Pendidikan Non Formal",
              "Literasi Keluarga"
            ]
          },
          {
            nama: "Kesehatan",
            program: [
              "Posyandu",
              "Kesehatan Ibu dan Anak",
              "Gizi Keluarga",
              "Kesehatan Lingkungan"
            ]
          },
          {
            nama: "Ekonomi",
            program: [
              "Koperasi Wanita",
              "Usaha Kelompok",
              "Pelatihan Kewirausahaan",
              "Pemasaran Produk"
            ]
          },
          {
            nama: "Sosial Budaya",
            program: [
              "Gotong Royong",
              "Kegiatan Keagamaan",
              "Seni Budaya",
              "Olahraga"
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
            kegiatan: "20 Kegiatan",
            peserta: "500 Orang",
            anggaran: "Rp 50.000.000",
            manfaat: "100 Keluarga"
          },
          {
            tahun: "2021",
            kegiatan: "25 Kegiatan",
            peserta: "600 Orang",
            anggaran: "Rp 75.000.000",
            manfaat: "120 Keluarga"
          },
          {
            tahun: "2022",
            kegiatan: "30 Kegiatan",
            peserta: "700 Orang",
            anggaran: "Rp 100.000.000",
            manfaat: "150 Keluarga"
          },
          {
            tahun: "2023",
            kegiatan: "35 Kegiatan",
            peserta: "800 Orang",
            anggaran: "Rp 125.000.000",
            manfaat: "180 Keluarga"
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
            nama: "Ketua",
            tugas: "Memimpin dan mengkoordinasikan kegiatan PKK"
          },
          {
            nama: "Wakil Ketua",
            tugas: "Membantu ketua dalam melaksanakan tugas"
          },
          {
            nama: "Sekretaris",
            tugas: "Mengelola administrasi dan dokumentasi"
          },
          {
            nama: "Bendahara",
            tugas: "Mengelola keuangan dan aset"
          },
          {
            nama: "Anggota",
            tugas: "Melaksanakan program dan kegiatan"
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
          { title: "PKK" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">PKK</h2>
          <p className="text-muted-foreground">
            Informasi Pemberdayaan Kesejahteraan Keluarga
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{pkkData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar PKK
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {pkkData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {pkkData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{pkkData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program-program PKK
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {pkkData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="kinerja" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{pkkData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja PKK
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {pkkData.kinerja.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Kegiatan</span>
                          <span className="text-sm text-muted-foreground">{tahun.kegiatan}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Peserta</span>
                          <span className="text-sm text-muted-foreground">{tahun.peserta}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Anggaran</span>
                          <span className="text-sm text-muted-foreground">{tahun.anggaran}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Manfaat</span>
                          <span className="text-sm text-muted-foreground">{tahun.manfaat}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{pkkData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan PKK
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pkkData.pengelolaan.content.struktur.map((jabatan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{jabatan.nama}</h4>
                        <p className="text-sm text-muted-foreground">{jabatan.tugas}</p>
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

export default PKK; 