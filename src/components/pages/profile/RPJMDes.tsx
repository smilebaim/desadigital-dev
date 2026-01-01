import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, DollarSign, ListChecks } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const RPJMDes = () => {
  const rpjmdesData = {
    program: {
      title: "Program RPJMDes",
      icon: ListChecks,
      content: {
        deskripsi: "Program-program dalam Rencana Pembangunan Jangka Menengah Desa (RPJMDes) periode 2021-2027",
        periode: "2021-2027",
        program: [
          {
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Program pembangunan infrastruktur desa",
            kegiatan: [
              "Pembangunan jalan desa 10 km",
              "Peningkatan drainase 5 km",
              "Pembangunan MCK umum 20 unit",
              "Peningkatan fasilitas air bersih",
              "Pembangunan fasilitas umum"
            ]
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Program pemberdayaan masyarakat desa",
            kegiatan: [
              "Pengembangan UMKM",
              "Pemberdayaan kelompok tani",
              "Pengembangan wisata desa",
              "Peningkatan kapasitas aparatur",
              "Pengembangan ekonomi kreatif"
            ]
          },
          {
            judul: "Penguatan Kelembagaan",
            deskripsi: "Program penguatan kelembagaan desa",
            kegiatan: [
              "Pengembangan BUMDes",
              "Pemberdayaan LPMD",
              "Penguatan PKK",
              "Pengembangan karang taruna",
              "Penguatan lembaga adat"
            ]
          }
        ]
      }
    },
    anggaran: {
      title: "Anggaran RPJMDes",
      icon: DollarSign,
      content: {
        deskripsi: "Rincian anggaran RPJMDes periode 2021-2027",
        periode: "2021-2027",
        sumber: [
          {
            judul: "Dana Desa",
            jumlah: "Rp 6.000.000.000",
            program: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi",
              "Penguatan kelembagaan"
            ]
          },
          {
            judul: "APBD",
            jumlah: "Rp 3.000.000.000",
            program: [
              "Peningkatan fasilitas umum",
              "Pengembangan pendidikan",
              "Peningkatan kesehatan",
              "Pengembangan ekonomi"
            ]
          },
          {
            judul: "Swadaya Masyarakat",
            jumlah: "Rp 600.000.000",
            program: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi",
              "Penguatan kelembagaan"
            ]
          }
        ]
      }
    },
    jadwal: {
      title: "Jadwal Pelaksanaan",
      icon: Calendar,
      content: {
        deskripsi: "Jadwal pelaksanaan program RPJMDes periode 2021-2027",
        periode: "2021-2027",
        tahap: [
          {
            judul: "Tahap Persiapan",
            periode: "2021",
            kegiatan: [
              "Penyusunan rencana detail",
              "Persiapan administrasi",
              "Pembentukan tim",
              "Koordinasi dengan stakeholder"
            ]
          },
          {
            judul: "Tahap Pelaksanaan",
            periode: "2022-2026",
            kegiatan: [
              "Pembangunan infrastruktur",
              "Pemberdayaan masyarakat",
              "Pengembangan ekonomi",
              "Penguatan kelembagaan"
            ]
          },
          {
            judul: "Tahap Evaluasi",
            periode: "2027",
            kegiatan: [
              "Monitoring program",
              "Evaluasi hasil",
              "Penyusunan laporan",
              "Perencanaan periode berikutnya"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen RPJMDes",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "RPJMDes 2021-2027",
            tahun: "2021",
            status: "Dokumen Resmi"
          },
          {
            judul: "Lampiran RPJMDes 2021-2027",
            tahun: "2021",
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
          { title: "RPJMDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rencana Pembangunan Jangka Menengah Desa (RPJMDes)</h2>
          <p className="text-muted-foreground">
            Rencana Pembangunan Jangka Menengah Desa Remau Bako Tuo periode 2021-2027
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
                  <CardTitle>{rpjmdesData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program RPJMDes periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rpjmdesData.program.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rpjmdesData.program.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rpjmdesData.program.content.program.map((item, index) => (
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
                  <CardTitle>{rpjmdesData.anggaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Anggaran RPJMDes periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rpjmdesData.anggaran.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rpjmdesData.anggaran.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rpjmdesData.anggaran.content.sumber.map((item, index) => (
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
                  <CardTitle>{rpjmdesData.jadwal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Jadwal pelaksanaan RPJMDes periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {rpjmdesData.jadwal.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {rpjmdesData.jadwal.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {rpjmdesData.jadwal.content.tahap.map((item, index) => (
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
                  <CardTitle>{rpjmdesData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen RPJMDes periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {rpjmdesData.dokumen.content.dokumen.map((item, index) => (
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

export default RPJMDes; 
