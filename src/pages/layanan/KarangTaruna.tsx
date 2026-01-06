import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const KarangTaruna = () => {
  const karangTarunaData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Karang Taruna adalah organisasi kepemudaan di tingkat desa yang berfungsi sebagai wadah pengembangan generasi muda nonpartisan, yang tumbuh atas dasar kesadaran dan rasa tanggung jawab sosial dari, oleh, dan untuk masyarakat khususnya generasi muda di wilayah desa/kelurahan atau komunitas adat sederajat.",
        data: [
          {
            label: "Nama Organisasi",
            value: "Karang Taruna Remaubakotuo"
          },
          {
            label: "Tahun Berdiri",
            value: "2010"
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
              "Bimbingan Belajar",
              "Pelatihan Komputer",
              "Kursus Bahasa Inggris",
              "Literasi Digital"
            ]
          },
          {
            nama: "Kesehatan",
            program: [
              "Posyandu Remaja",
              "Kampanye Anti Narkoba",
              "Donor Darah",
              "Kesehatan Reproduksi"
            ]
          },
          {
            nama: "Ekonomi",
            program: [
              "Pelatihan Kewirausahaan",
              "Pengembangan UMKM",
              "Koperasi Pemuda",
              "Pemasaran Digital"
            ]
          },
          {
            nama: "Sosial Budaya",
            program: [
              "Seni Budaya",
              "Olahraga",
              "Kegiatan Keagamaan",
              "Gotong Royong"
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
            kegiatan: 12,
            peserta: 150,
            anggaran: "Rp 50.000.000",
            manfaat: "Peningkatan Kapasitas Pemuda"
          },
          {
            tahun: "2021",
            kegiatan: 15,
            peserta: 180,
            anggaran: "Rp 75.000.000",
            manfaat: "Pengembangan UMKM Pemuda"
          },
          {
            tahun: "2022",
            kegiatan: 18,
            peserta: 200,
            anggaran: "Rp 100.000.000",
            manfaat: "Pemberdayaan Ekonomi Pemuda"
          },
          {
            tahun: "2023",
            kegiatan: 20,
            peserta: 250,
            anggaran: "Rp 125.000.000",
            manfaat: "Peningkatan Kesejahteraan Pemuda"
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
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan Karang Taruna"
          },
          {
            nama: "Wakil Ketua",
            tugas: "Membantu ketua dalam melaksanakan tugas dan fungsi organisasi"
          },
          {
            nama: "Sekretaris",
            tugas: "Mengelola administrasi dan dokumentasi organisasi"
          },
          {
            nama: "Bendahara",
            tugas: "Mengelola keuangan dan aset organisasi"
          },
          {
            nama: "Seksi-seksi",
            tugas: "Melaksanakan program sesuai bidang masing-masing"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "Karang Taruna" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Karang Taruna</h2>
          <p className="text-muted-foreground">
            Organisasi Kepemudaan Desa
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
                  <CardTitle>{karangTarunaData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Karang Taruna
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {karangTarunaData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {karangTarunaData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{karangTarunaData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program dan kegiatan Karang Taruna
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {karangTarunaData.program.content.kategori.map((kategori, index) => (
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
                  <CardTitle>{karangTarunaData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja Karang Taruna per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {karangTarunaData.kinerja.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Kegiatan:</span>
                            <span>{tahun.kegiatan}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Peserta:</span>
                            <span>{tahun.peserta}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Anggaran:</span>
                            <span>{tahun.anggaran}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Manfaat:</span>
                            <span>{tahun.manfaat}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{karangTarunaData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan Karang Taruna
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {karangTarunaData.pengelolaan.content.struktur.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{item.nama}</h4>
                        <p className="text-sm text-muted-foreground">{item.tugas}</p>
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

export default KarangTaruna; 