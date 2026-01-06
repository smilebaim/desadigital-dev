import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingUp, Users, Building2, School, Factory } from "lucide-react";

const Perkembangan = () => {
  const perkembanganData = {
    umum: {
      title: "Perkembangan Umum",
      icon: TrendingUp,
      content: {
        tahun: "2024",
        deskripsi: "Desa Remau Bakotuo telah mengalami perkembangan signifikan dalam berbagai aspek kehidupan masyarakat. Dari segi infrastruktur, ekonomi, pendidikan, dan sosial budaya, desa ini terus menunjukkan kemajuan yang positif."
      }
    },
    demografi: {
      title: "Perkembangan Demografi",
      icon: Users,
      content: {
        data: [
          {
            tahun: "2020",
            jumlah_penduduk: "2.500",
            pertumbuhan: "2.5%",
            deskripsi: "Pertumbuhan penduduk yang stabil dengan peningkatan kualitas hidup"
          },
          {
            tahun: "2021",
            jumlah_penduduk: "2.563",
            pertumbuhan: "2.5%",
            deskripsi: "Peningkatan jumlah penduduk dengan program KB yang efektif"
          },
          {
            tahun: "2022",
            jumlah_penduduk: "2.627",
            pertumbuhan: "2.5%",
            deskripsi: "Pertumbuhan penduduk terkendali dengan program keluarga berencana"
          },
          {
            tahun: "2023",
            jumlah_penduduk: "2.693",
            pertumbuhan: "2.5%",
            deskripsi: "Stabilitas pertumbuhan penduduk dengan peningkatan kesejahteraan"
          }
        ]
      }
    },
    infrastruktur: {
      title: "Perkembangan Infrastruktur",
      icon: Building2,
      content: {
        data: [
          {
            tahun: "2020",
            judul: "Pembangunan Jalan Desa",
            deskripsi: "Pengerasan jalan desa sepanjang 5 km"
          },
          {
            tahun: "2021",
            judul: "Pembangunan Drainase",
            deskripsi: "Pembangunan sistem drainase untuk mengatasi banjir"
          },
          {
            tahun: "2022",
            judul: "Pembangunan Balai Desa",
            deskripsi: "Pembangunan balai desa modern dengan fasilitas lengkap"
          },
          {
            tahun: "2023",
            judul: "Pembangunan Taman",
            deskripsi: "Pembangunan taman desa sebagai ruang publik"
          }
        ]
      }
    },
    pendidikan: {
      title: "Perkembangan Pendidikan",
      icon: School,
      content: {
        data: [
          {
            tahun: "2020",
            judul: "Peningkatan Kualitas SD",
            deskripsi: "Renovasi gedung SD dan penambahan fasilitas belajar"
          },
          {
            tahun: "2021",
            judul: "Pendirian PAUD",
            deskripsi: "Pendirian PAUD untuk pendidikan anak usia dini"
          },
          {
            tahun: "2022",
            judul: "Program Keaksaraan",
            deskripsi: "Program pemberantasan buta aksara untuk warga"
          },
          {
            tahun: "2023",
            judul: "Digitalisasi Sekolah",
            deskripsi: "Implementasi pembelajaran digital di sekolah"
          }
        ]
      }
    },
    ekonomi: {
      title: "Perkembangan Ekonomi",
      icon: Factory,
      content: {
        data: [
          {
            tahun: "2020",
            judul: "Pengembangan UMKM",
            deskripsi: "Pelatihan dan pendampingan UMKM desa"
          },
          {
            tahun: "2021",
            judul: "Pendirian BUMDes",
            deskripsi: "Pendirian Badan Usaha Milik Desa"
          },
          {
            tahun: "2022",
            judul: "Pasar Desa",
            deskripsi: "Pembangunan pasar desa modern"
          },
          {
            tahun: "2023",
            judul: "E-Commerce Desa",
            deskripsi: "Pengembangan platform e-commerce desa"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perkembangan Desa</h2>
          <p className="text-muted-foreground">
            Perkembangan dan kemajuan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Umum</TabsTrigger>
            <TabsTrigger value="demografi">Demografi</TabsTrigger>
            <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
            <TabsTrigger value="pendidikan">Pendidikan</TabsTrigger>
            <TabsTrigger value="ekonomi">Ekonomi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>Perkembangan Umum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {perkembanganData.umum.content.deskripsi}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tahun</span>
                    <span className="text-sm">{perkembanganData.umum.content.tahun}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demografi" className="space-y-4">
            {perkembanganData.demografi.content.data.map((item, index) => (
              <Card key={index} className="border-none bg-transparent shadow-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                  <div>
                    <CardTitle>Tahun {item.tahun}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Jumlah Penduduk</span>
                      <span className="text-sm font-semibold">{item.jumlah_penduduk}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pertumbuhan</span>
                      <span className="text-sm font-semibold">{item.pertumbuhan}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="infrastruktur" className="space-y-4">
            {perkembanganData.infrastruktur.content.data.map((item, index) => (
              <Card key={index} className="border-none bg-transparent shadow-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Building2 className="h-8 w-8 text-emerald-600" />
                  <div>
                    <CardTitle>Tahun {item.tahun}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.judul}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {item.deskripsi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pendidikan" className="space-y-4">
            {perkembanganData.pendidikan.content.data.map((item, index) => (
              <Card key={index} className="border-none bg-transparent shadow-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  <School className="h-8 w-8 text-emerald-600" />
                  <div>
                    <CardTitle>Tahun {item.tahun}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.judul}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {item.deskripsi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ekonomi" className="space-y-4">
            {perkembanganData.ekonomi.content.data.map((item, index) => (
              <Card key={index} className="border-none bg-transparent shadow-none">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Factory className="h-8 w-8 text-emerald-600" />
                  <div>
                    <CardTitle>Tahun {item.tahun}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.judul}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {item.deskripsi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Perkembangan; 