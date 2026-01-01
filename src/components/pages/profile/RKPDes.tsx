import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, DollarSign, ListChecks } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const RKPDes = () => {
  const rkpdesData = {
    program: {
      title: "Program RKPDes",
      icon: ListChecks,
      content: {
        deskripsi: "Program-program dalam Rencana Kerja Pemerintah Desa (RKPDes) tahun 2024",
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
            ]
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Program pemberdayaan masyarakat desa",
            kegiatan: [
              "Pelatihan UMKM",
              "Pemberdayaan kelompok tani",
              "Pengembangan wisata desa",
              "Peningkatan kapasitas aparatur"
            ]
          },
          {
            judul: "Penguatan Kelembagaan",
            deskripsi: "Program penguatan kelembagaan desa",
            kegiatan: [
              "Pengembangan BUMDes",
              "Pemberdayaan LPMD",
              "Penguatan PKK",
              "Pengembangan karang taruna"
            ]
          }
        ]
      }
    },
    anggaran: {
      title: "Anggaran RKPDes",
      icon: DollarSign,
      content: {
        deskripsi: "Rincian anggaran RKPDes tahun 2024",
        periode: "2024",
        sumber: [
          {
            judul: "Dana Desa",
            jumlah: "Rp 2.000.000.000",
            program: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi"
            ]
          },
          {
            judul: "APBD",
            jumlah: "Rp 1.000.000.000",
            program: [
              "Peningkatan fasilitas umum",
              "Pengembangan pendidikan",
              "Peningkatan kesehatan"
            ]
          },
          {
            judul: "Swadaya Masyarakat",
            jumlah: "Rp 200.000.000",
            program: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi"
            ]
          }
        ]
      }
    },
    jadwal: {
      title: "Jadwal Pelaksanaan",
      icon: Calendar,
      content: {
        deskripsi: "Jadwal pelaksanaan program RKPDes tahun 2024",
        periode: "2024",
        tahap: [
          {
            judul: "Tahap Persiapan",
            periode: "Januari - Maret 2024",
            kegiatan: [
              "Penyusunan rencana detail",
              "Persiapan administrasi",
              "Pembentukan tim",
              "Koordinasi dengan stakeholder"
            ]
          },
          {
            judul: "Tahap Pelaksanaan",
            periode: "April - September 2024",
            kegiatan: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi",
              "Penguatan kelembagaan"
            ]
          },
          {
            judul: "Tahap Evaluasi",
            periode: "Oktober - Desember 2024",
            kegiatan: [
              "Monitoring program",
              "Evaluasi hasil",
              "Penyusunan laporan",
              "Perencanaan tahun berikutnya"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen RKPDes",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "RKPDes 2024",
            tahun: "2024",
            status: "Dokumen Resmi"
          },
          {
            judul: "Lampiran RKPDes 2024",
            tahun: "2024",
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
          { title: "RKPDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rencana Kerja Pemerintah Desa (RKPDes)</h2>
          <p className="text-muted-foreground">
            Rencana Kerja Pemerintah Desa Remau Bako Tuo tahun 2024
          </p>
        </div>

        <Tabs defaultValue="program" className="space-y-4">
          <TabsList>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="anggaran">Anggaran</TabsTrigger>
            <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ListChecks className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rkpdesData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program RKPDes tahun 2024
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rkpdesData.program.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rkpdesData.program.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rkpdesData.program.content.program.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
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

          <TabsContent value="anggaran" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rkpdesData.anggaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Anggaran RKPDes tahun 2024
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rkpdesData.anggaran.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rkpdesData.anggaran.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rkpdesData.anggaran.content.sumber.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-lg font-medium text-primary">
                          {item.jumlah}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{program}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jadwal" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rkpdesData.jadwal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Jadwal pelaksanaan RKPDes tahun 2024
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rkpdesData.jadwal.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rkpdesData.jadwal.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rkpdesData.jadwal.content.tahap.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.periode}
                        </p>
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

          <TabsContent value="dokumen" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rkpdesData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen RKPDes tahun 2024
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {rkpdesData.dokumen.content.dokumen.map((item, index) => (
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

export default RKPDes; 
