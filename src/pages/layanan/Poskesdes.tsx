import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Poskesdes = () => {
  const poskesdesData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Poskesdes (Pos Kesehatan Desa) adalah unit pelayanan kesehatan dasar yang berada di desa dan dikelola oleh pemerintah desa dengan melibatkan peran aktif masyarakat. Poskesdes berfungsi sebagai pusat pelayanan kesehatan dasar dan promotif preventif di tingkat desa.",
        data: [
          {
            label: "Nama Fasilitas",
            value: "Poskesdes Remaubakotuo"
          },
          {
            label: "Tahun Berdiri",
            value: "2015"
          },
          {
            label: "Jumlah Petugas",
            value: "5 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    layanan: {
      title: "Layanan",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Kesehatan Ibu dan Anak",
            layanan: [
              "Pemeriksaan Kehamilan",
              "Pemeriksaan Nifas",
              "Pemeriksaan Bayi",
              "Pemeriksaan Balita"
            ]
          },
          {
            nama: "Kesehatan Umum",
            layanan: [
              "Pemeriksaan Umum",
              "Pemeriksaan Gigi",
              "Pemeriksaan Mata",
              "Pemeriksaan Telinga"
            ]
          },
          {
            nama: "Kesehatan Lingkungan",
            layanan: [
              "Pemeriksaan Air",
              "Pemeriksaan Sanitasi",
              "Pemeriksaan Vektor",
              "Pemeriksaan Lingkungan"
            ]
          },
          {
            nama: "Promotif Preventif",
            layanan: [
              "Penyuluhan Kesehatan",
              "Pencegahan Penyakit",
              "Peningkatan Gizi",
              "Kesehatan Lingkungan"
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
            kunjungan: 1200,
            layanan: 1500,
            anggaran: "Rp 50.000.000",
            manfaat: "Peningkatan Kesehatan Masyarakat"
          },
          {
            tahun: "2021",
            kunjungan: 1500,
            layanan: 1800,
            anggaran: "Rp 75.000.000",
            manfaat: "Penurunan Angka Kesakitan"
          },
          {
            tahun: "2022",
            kunjungan: 1800,
            layanan: 2000,
            anggaran: "Rp 100.000.000",
            manfaat: "Peningkatan Kualitas Layanan"
          },
          {
            tahun: "2023",
            kunjungan: 2000,
            layanan: 2500,
            anggaran: "Rp 125.000.000",
            manfaat: "Peningkatan Akses Kesehatan"
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
            nama: "Kepala Poskesdes",
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan Poskesdes"
          },
          {
            nama: "Bidan Desa",
            tugas: "Melaksanakan pelayanan kesehatan ibu dan anak"
          },
          {
            nama: "Perawat",
            tugas: "Melaksanakan pelayanan kesehatan umum"
          },
          {
            nama: "Petugas Kesehatan",
            tugas: "Melaksanakan pelayanan kesehatan lingkungan"
          },
          {
            nama: "Petugas Promkes",
            tugas: "Melaksanakan kegiatan promosi kesehatan"
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
          { title: "Poskesdes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Poskesdes</h2>
          <p className="text-muted-foreground">
            Pos Kesehatan Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{poskesdesData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Poskesdes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {poskesdesData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {poskesdesData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layanan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{poskesdesData.layanan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Layanan kesehatan yang tersedia
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {poskesdesData.layanan.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.layanan.map((layanan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{layanan}</span>
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
                  <CardTitle>{poskesdesData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja Poskesdes per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {poskesdesData.kinerja.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Kunjungan:</span>
                            <span>{tahun.kunjungan}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Layanan:</span>
                            <span>{tahun.layanan}</span>
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
                  <CardTitle>{poskesdesData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan Poskesdes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {poskesdesData.pengelolaan.content.struktur.map((item, index) => (
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

export default Poskesdes; 