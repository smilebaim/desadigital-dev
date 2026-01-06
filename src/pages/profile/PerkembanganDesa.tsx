import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Home, FileText } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const PerkembanganDesa = () => {
  const perkembanganData = {
    demografi: {
      title: "Perkembangan Demografi",
      icon: Users,
      content: {
        deskripsi: "Perkembangan jumlah penduduk dan komposisi demografi Desa Remau Bako Tuo",
        periode: "2020-2024",
        data: [
          {
            judul: "Jumlah Penduduk",
            deskripsi: "Perkembangan jumlah penduduk desa",
            detail: [
              "2020: 2.500 jiwa",
              "2021: 2.600 jiwa",
              "2022: 2.700 jiwa",
              "2023: 2.800 jiwa",
              "2024: 2.900 jiwa"
            ]
          },
          {
            judul: "Komposisi Penduduk",
            deskripsi: "Komposisi penduduk berdasarkan usia dan jenis kelamin",
            detail: [
              "Usia 0-14 tahun: 25%",
              "Usia 15-64 tahun: 65%",
              "Usia 65+ tahun: 10%",
              "Laki-laki: 48%",
              "Perempuan: 52%"
            ]
          }
        ]
      }
    },
    infrastruktur: {
      title: "Perkembangan Infrastruktur",
      icon: Home,
      content: {
        deskripsi: "Perkembangan infrastruktur desa dari tahun ke tahun",
        periode: "2020-2024",
        data: [
          {
            judul: "Infrastruktur Dasar",
            deskripsi: "Perkembangan infrastruktur dasar desa",
            detail: [
              "Pembangunan jalan desa 5 km",
              "Peningkatan drainase 3 km",
              "Pembangunan MCK umum 10 unit",
              "Peningkatan fasilitas air bersih"
            ]
          },
          {
            judul: "Infrastruktur Sosial",
            deskripsi: "Perkembangan infrastruktur sosial desa",
            detail: [
              "Pembangunan posyandu",
              "Peningkatan fasilitas pendidikan",
              "Pembangunan lapangan olahraga",
              "Peningkatan fasilitas ibadah"
            ]
          }
        ]
      }
    },
    ekonomi: {
      title: "Perkembangan Ekonomi",
      icon: TrendingUp,
      content: {
        deskripsi: "Perkembangan ekonomi dan kesejahteraan masyarakat desa",
        periode: "2020-2024",
        data: [
          {
            judul: "Pertumbuhan Ekonomi",
            deskripsi: "Perkembangan ekonomi desa",
            detail: [
              "Peningkatan UMKM 20%",
              "Pengembangan sektor pertanian",
              "Peningkatan sektor jasa",
              "Pengembangan wisata desa"
            ]
          },
          {
            judul: "Kesejahteraan",
            deskripsi: "Perkembangan kesejahteraan masyarakat",
            detail: [
              "Penurunan angka kemiskinan",
              "Peningkatan pendapatan per kapita",
              "Peningkatan akses pendidikan",
              "Peningkatan akses kesehatan"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Perkembangan",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Laporan Perkembangan Desa 2024",
            tahun: "2024",
            status: "Dokumen Resmi"
          },
          {
            judul: "Data Statistik Desa 2020-2024",
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
          { title: "Perkembangan Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perkembangan Desa</h2>
          <p className="text-muted-foreground">
            Perkembangan Desa Remau Bako Tuo dari tahun ke tahun
          </p>
        </div>

        <Tabs defaultValue="demografi" className="space-y-4">
          <TabsList>
            <TabsTrigger value="demografi">Demografi</TabsTrigger>
            <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
            <TabsTrigger value="ekonomi">Ekonomi</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="demografi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perkembanganData.demografi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan demografi desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {perkembanganData.demografi.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {perkembanganData.demografi.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {perkembanganData.demografi.content.data.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.detail.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastruktur" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Home className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perkembanganData.infrastruktur.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan infrastruktur desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {perkembanganData.infrastruktur.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {perkembanganData.infrastruktur.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {perkembanganData.infrastruktur.content.data.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.detail.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Home className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ekonomi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{perkembanganData.ekonomi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan ekonomi desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {perkembanganData.ekonomi.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {perkembanganData.ekonomi.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {perkembanganData.ekonomi.content.data.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.detail.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <TrendingUp className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
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
                  <CardTitle>{perkembanganData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen perkembangan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {perkembanganData.dokumen.content.dokumen.map((item, index) => (
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

export default PerkembanganDesa; 