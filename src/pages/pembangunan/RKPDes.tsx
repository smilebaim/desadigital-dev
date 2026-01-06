import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const RKPDes = () => {
  const rkpdesData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "RKPDes (Rencana Kerja Pemerintah Desa) adalah dokumen perencanaan tahunan yang berisi program dan kegiatan yang akan dilaksanakan oleh Pemerintah Desa dalam satu tahun anggaran. RKPDes disusun berdasarkan RPJMDes dan mempertimbangkan ketersediaan sumber daya.",
        data: [
          {
            label: "Tahun Anggaran",
            value: "2024"
          },
          {
            label: "Periode",
            value: "Januari - Desember 2024"
          },
          {
            label: "Status",
            value: "Disahkan"
          },
          {
            label: "Nomor Peraturan",
            value: "001/PERDES/2024"
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
            nama: "Pembangunan",
            program: [
              "Pembangunan Jalan Desa",
              "Pembangunan Drainase",
              "Pembangunan MCK Umum",
              "Pembangunan Taman Desa"
            ]
          },
          {
            nama: "Pemberdayaan",
            program: [
              "Pelatihan UMKM",
              "Pendampingan Kelompok Tani",
              "Pengembangan BUMDes",
              "Pemberdayaan Perempuan"
            ]
          },
          {
            nama: "Pelayanan",
            program: [
              "Peningkatan Pelayanan Administrasi",
              "Pengembangan Sistem Informasi Desa",
              "Peningkatan Kualitas SDM Aparatur",
              "Pengembangan Layanan Publik"
            ]
          },
          {
            nama: "Sosial Budaya",
            program: [
              "Pengembangan Pendidikan",
              "Peningkatan Kesehatan",
              "Pelestarian Budaya",
              "Pengembangan Olahraga"
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
            tahun: "2024",
            total: "Rp 1.000.000.000",
            belanja: "Rp 800.000.000",
            pembiayaan: "Rp 200.000.000",
            sumber: [
              "Dana Desa",
              "APBD",
              "APBN",
              "Swadaya Masyarakat"
            ]
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
            deskripsi: "Penyusunan RKPDes berdasarkan RPJMDes dan aspirasi masyarakat"
          },
          {
            nama: "Pembahasan",
            deskripsi: "Musyawarah Desa untuk membahas dan menyepakati RKPDes"
          },
          {
            nama: "Penetapan",
            deskripsi: "Penetapan RKPDes melalui Peraturan Desa"
          },
          {
            nama: "Pelaksanaan",
            deskripsi: "Implementasi program dan kegiatan sesuai RKPDes"
          },
          {
            nama: "Pengawasan",
            deskripsi: "Monitoring dan evaluasi pelaksanaan RKPDes"
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
          { title: "RKPDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RKPDes</h2>
          <p className="text-muted-foreground">
            Rencana Kerja Pemerintah Desa
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
                  <CardTitle>{rkpdesData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar RKPDes
                  </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {rkpdesData.umum.content.deskripsi}
                  </p>
                        </div>
                        <div className="space-y-2">
                  {rkpdesData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{rkpdesData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program-program RKPDes
                  </p>
                  </div>
                </CardHeader>
              <CardContent className="space-y-6">
                {rkpdesData.program.content.kategori.map((kategori, index) => (
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
                  <CardTitle>{rkpdesData.anggaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Anggaran RKPDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {rkpdesData.anggaran.content.tahun.map((tahun, index) => (
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
                        <div className="mt-4">
                          <h5 className="text-sm font-medium mb-2">Sumber Dana</h5>
                          <ul className="space-y-1">
                            {tahun.sumber.map((sumber, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                {sumber}
                        </li>
                      ))}
                    </ul>
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
                  <CardTitle>{rkpdesData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahapan pengelolaan RKPDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {rkpdesData.pengelolaan.content.tahapan.map((tahap, index) => (
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

export default RKPDes; 