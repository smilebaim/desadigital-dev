import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const LKMD = () => {
  const lkmdData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "LKMD (Lembaga Ketahanan Masyarakat Desa) adalah lembaga yang dibentuk oleh masyarakat desa dan ditetapkan dengan Peraturan Desa, yang bertugas membantu Kepala Desa dalam melaksanakan pembangunan, pemberdayaan masyarakat, dan peningkatan ketahanan masyarakat desa.",
        data: [
          {
            label: "Nama Lembaga",
            value: "LKMD Remaubakotuo"
          },
          {
            label: "Berdiri",
            value: "2020"
          },
          {
            label: "Jumlah Anggota",
            value: "25 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    fungsi: {
      title: "Fungsi",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pembangunan",
            fungsi: [
              "Perencanaan Pembangunan",
              "Pelaksanaan Pembangunan",
              "Pengawasan Pembangunan",
              "Evaluasi Pembangunan"
            ]
          },
          {
            nama: "Pemberdayaan",
            fungsi: [
              "Pemberdayaan Ekonomi",
              "Pemberdayaan Sosial",
              "Pemberdayaan Budaya",
              "Pemberdayaan Politik"
            ]
          },
          {
            nama: "Ketahanan",
            fungsi: [
              "Ketahanan Ekonomi",
              "Ketahanan Sosial",
              "Ketahanan Budaya",
              "Ketahanan Politik"
            ]
          },
          {
            nama: "Koordinasi",
            fungsi: [
              "Koordinasi Antar Lembaga",
              "Koordinasi Program",
              "Koordinasi Kegiatan",
              "Koordinasi Sumber Daya"
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
            program: "10 Program",
            realisasi: "8 Program",
            anggaran: "Rp 100.000.000",
            manfaat: "500 Orang"
          },
          {
            tahun: "2021",
            program: "12 Program",
            realisasi: "10 Program",
            anggaran: "Rp 150.000.000",
            manfaat: "600 Orang"
          },
          {
            tahun: "2022",
            program: "15 Program",
            realisasi: "13 Program",
            anggaran: "Rp 200.000.000",
            manfaat: "700 Orang"
          },
          {
            tahun: "2023",
            program: "18 Program",
            realisasi: "16 Program",
            anggaran: "Rp 250.000.000",
            manfaat: "800 Orang"
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
            tugas: "Memimpin dan mengkoordinasikan kegiatan LKMD"
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
          { title: "LKMD" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">LKMD</h2>
          <p className="text-muted-foreground">
            Informasi Lembaga Ketahanan Masyarakat Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="fungsi">Fungsi</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lkmdData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar LKMD
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {lkmdData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {lkmdData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fungsi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{lkmdData.fungsi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fungsi-fungsi LKMD
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {lkmdData.fungsi.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.fungsi.map((fungsi, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{fungsi}</span>
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
                  <CardTitle>{lkmdData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja LKMD
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {lkmdData.kinerja.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Program</span>
                          <span className="text-sm text-muted-foreground">{tahun.program}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Realisasi</span>
                          <span className="text-sm text-muted-foreground">{tahun.realisasi}</span>
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
                  <CardTitle>{lkmdData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan LKMD
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {lkmdData.pengelolaan.content.struktur.map((jabatan, index) => (
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

export default LKMD; 