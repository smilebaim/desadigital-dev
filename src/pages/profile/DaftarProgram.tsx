import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, DollarSign, ListChecks } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const DaftarProgram = () => {
  const programData = {
    berjalan: {
      title: "Program Berjalan",
      icon: ListChecks,
      content: {
        deskripsi: "Program-program yang sedang berjalan di Desa Remau Bako Tuo",
        periode: "2024",
        program: [
          {
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Program pembangunan infrastruktur desa",
            kegiatan: [
              "Pembangunan jalan desa 2 km",
              "Peningkatan drainase 1 km",
              "Pembangunan MCK umum 5 unit",
              "Peningkatan fasilitas air bersih"
            ],
            progress: "70%",
            anggaran: "Rp 1.400.000.000"
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Program pemberdayaan masyarakat desa",
            kegiatan: [
              "Pelatihan UMKM",
              "Pemberdayaan kelompok tani",
              "Pengembangan wisata desa",
              "Peningkatan kapasitas aparatur"
            ],
            progress: "50%",
            anggaran: "Rp 500.000.000"
          }
        ]
      }
    },
    rencana: {
      title: "Program Rencana",
      icon: Calendar,
      content: {
        deskripsi: "Program-program yang direncanakan di Desa Remau Bako Tuo",
        periode: "2024-2025",
        program: [
          {
            judul: "Pengembangan Ekonomi",
            deskripsi: "Program pengembangan ekonomi desa",
            kegiatan: [
              "Pengembangan BUMDes",
              "Pemberdayaan UMKM",
              "Pengembangan sektor unggulan",
              "Peningkatan investasi"
            ],
            periode: "2024",
            anggaran: "Rp 1.000.000.000"
          },
          {
            judul: "Penguatan Kelembagaan",
            deskripsi: "Program penguatan kelembagaan desa",
            kegiatan: [
              "Pengembangan BUMDes",
              "Pemberdayaan LPMD",
              "Penguatan PKK",
              "Pengembangan karang taruna"
            ],
            periode: "2025",
            anggaran: "Rp 800.000.000"
          }
        ]
      }
    },
    selesai: {
      title: "Program Selesai",
      icon: FileText,
      content: {
        deskripsi: "Program-program yang telah selesai di Desa Remau Bako Tuo",
        periode: "2021-2023",
        program: [
          {
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Program pembangunan infrastruktur desa",
            kegiatan: [
              "Pembangunan jalan desa 5 km",
              "Peningkatan drainase 3 km",
              "Pembangunan MCK umum 10 unit",
              "Peningkatan fasilitas air bersih"
            ],
            tahun: "2023",
            anggaran: "Rp 2.000.000.000"
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Program pemberdayaan masyarakat desa",
            kegiatan: [
              "Pelatihan UMKM",
              "Pemberdayaan kelompok tani",
              "Pengembangan wisata desa",
              "Peningkatan kapasitas aparatur"
            ],
            tahun: "2022",
            anggaran: "Rp 1.500.000.000"
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Program",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Dokumen Program 2024",
            tahun: "2024",
            status: "Dokumen Resmi"
          },
          {
            judul: "Laporan Program 2023",
            tahun: "2023",
            status: "Dokumen Resmi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Profil Desa", path: "/profile" },
          { title: "Daftar Program" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daftar Program Desa</h2>
          <p className="text-muted-foreground">
            Daftar program pembangunan Desa Remau Bako Tuo
          </p>
        </div>

        <Tabs defaultValue="berjalan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="berjalan">Program Berjalan</TabsTrigger>
            <TabsTrigger value="rencana">Program Rencana</TabsTrigger>
            <TabsTrigger value="selesai">Program Selesai</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="berjalan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ListChecks className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.berjalan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program yang sedang berjalan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {programData.berjalan.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {programData.berjalan.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {programData.berjalan.content.program.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-primary">{item.progress}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Anggaran</span>
                            <span className="font-medium">{item.anggaran}</span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.kegiatan.map((kegiatan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ListChecks className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{kegiatan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rencana" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.rencana.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program yang direncanakan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {programData.rencana.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {programData.rencana.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {programData.rencana.content.program.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Periode</span>
                            <span className="font-medium">{item.periode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Anggaran</span>
                            <span className="font-medium">{item.anggaran}</span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.kegiatan.map((kegiatan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{kegiatan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selesai" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.selesai.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program yang telah selesai
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {programData.selesai.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {programData.selesai.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {programData.selesai.content.program.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tahun</span>
                            <span className="font-medium">{item.tahun}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Anggaran</span>
                            <span className="font-medium">{item.anggaran}</span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {item.kegiatan.map((kegiatan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{kegiatan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dokumen" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen program desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.dokumen.content.dokumen.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold">{item.judul}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun</span>
                        <span className="font-medium">{item.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium">{item.status}</span>
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

export default DaftarProgram; 