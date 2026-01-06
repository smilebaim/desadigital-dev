import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const RPJMDes = () => {
  const rpjmdesData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "RPJMDes (Rencana Pembangunan Jangka Menengah Desa) adalah dokumen perencanaan pembangunan desa untuk jangka waktu 6 (enam) tahun yang memuat arah kebijakan keuangan desa, kebijakan umum, program Satuan Kerja Perangkat Desa (SKPD), lintas SKPD, dan program kewilayahan disertai dengan rencana kerja dalam kerangka regulasi dan kerangka pendanaan yang bersifat indikatif.",
        data: [
          {
            label: "Periode",
            value: "2021 - 2026"
          },
          {
            label: "Status",
            value: "Disahkan"
          },
          {
            label: "Nomor Peraturan",
            value: "001/PERDES/2021"
          },
          {
            label: "Tanggal Penetapan",
            value: "1 Januari 2021"
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
            nama: "Pembangunan Infrastruktur",
            program: [
              "Pembangunan dan Peningkatan Jalan Desa",
              "Pembangunan dan Peningkatan Drainase",
              "Pembangunan dan Peningkatan MCK Umum",
              "Pembangunan dan Peningkatan Taman Desa",
              "Pembangunan dan Peningkatan Jembatan Desa"
            ]
          },
          {
            nama: "Pemberdayaan Ekonomi",
            program: [
              "Pengembangan UMKM",
              "Pengembangan BUMDes",
              "Pengembangan Koperasi",
              "Pengembangan Wisata Desa",
              "Pengembangan Pertanian"
            ]
          },
          {
            nama: "Peningkatan Pelayanan",
            program: [
              "Peningkatan Pelayanan Administrasi",
              "Pengembangan Sistem Informasi Desa",
              "Peningkatan Kualitas SDM Aparatur",
              "Pengembangan Layanan Publik",
              "Peningkatan Kualitas Pendidikan"
            ]
          },
          {
            nama: "Pengembangan Sosial Budaya",
            program: [
              "Peningkatan Kesehatan Masyarakat",
              "Pengembangan Pendidikan",
              "Pelestarian Budaya",
              "Pengembangan Olahraga",
              "Pemberdayaan Perempuan"
            ]
          }
        ]
      }
    },
    anggaran: {
      title: "Anggaran",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2021",
            total: "Rp 800.000.000",
            belanja: "Rp 600.000.000",
            pembiayaan: "Rp 200.000.000"
          },
          {
            tahun: "2022",
            total: "Rp 850.000.000",
            belanja: "Rp 650.000.000",
            pembiayaan: "Rp 200.000.000"
          },
          {
            tahun: "2023",
            total: "Rp 900.000.000",
            belanja: "Rp 700.000.000",
            pembiayaan: "Rp 200.000.000"
          },
          {
            tahun: "2024",
            total: "Rp 950.000.000",
            belanja: "Rp 750.000.000",
            pembiayaan: "Rp 200.000.000"
          },
          {
            tahun: "2025",
            total: "Rp 1.000.000.000",
            belanja: "Rp 800.000.000",
            pembiayaan: "Rp 200.000.000"
          },
          {
            tahun: "2026",
            total: "Rp 1.050.000.000",
            belanja: "Rp 850.000.000",
            pembiayaan: "Rp 200.000.000"
          }
        ]
      }
    },
    pengelolaan: {
      title: "Pengelolaan",
      icon: Briefcase,
      content: {
        tahapan: [
          {
            nama: "Perencanaan",
            deskripsi: "Penyusunan RPJMDes berdasarkan visi, misi, dan program kepala desa terpilih"
          },
          {
            nama: "Pembahasan",
            deskripsi: "Musyawarah Desa untuk membahas dan menyepakati RPJMDes"
          },
          {
            nama: "Penetapan",
            deskripsi: "Penetapan RPJMDes melalui Peraturan Desa"
          },
          {
            nama: "Pelaksanaan",
            deskripsi: "Implementasi program dan kegiatan sesuai RPJMDes melalui RKPDes tahunan"
          },
          {
            nama: "Pengawasan",
            deskripsi: "Monitoring dan evaluasi pelaksanaan RPJMDes secara berkala"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "RPJMDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RPJMDes</h2>
          <p className="text-muted-foreground">
            Rencana Pembangunan Jangka Menengah Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="anggaran">Anggaran</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar RPJMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {rpjmdesData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {rpjmdesData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{rpjmdesData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program-program RPJMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {rpjmdesData.program.content.kategori.map((kategori, index) => (
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

          <TabsContent value="anggaran" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.anggaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Anggaran RPJMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {rpjmdesData.anggaran.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Anggaran</span>
                          <span className="text-sm text-muted-foreground">{tahun.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Belanja</span>
                          <span className="text-sm text-muted-foreground">{tahun.belanja}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Pembiayaan</span>
                          <span className="text-sm text-muted-foreground">{tahun.pembiayaan}</span>
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
                  <CardTitle>{rpjmdesData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahapan pengelolaan RPJMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {rpjmdesData.pengelolaan.content.tahapan.map((tahap, index) => (
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

export default RPJMDes; 