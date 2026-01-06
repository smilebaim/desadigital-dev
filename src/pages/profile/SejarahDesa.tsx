import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, FileText, Calendar, Users } from "lucide-react";

const SejarahDesa = () => {
  const sejarahData = {
    asal: {
      title: "Asal Usul Desa",
      icon: History,
      content: {
        deskripsi: "Sejarah dan asal usul terbentuknya Desa Remau Bako Tuo",
        periode: "Tahun 1900",
        asal: [
          {
            judul: "Pendirian Desa",
            deskripsi: "Desa Remau Bako Tuo didirikan pada tahun 1900 oleh sekelompok masyarakat yang bermigrasi dari daerah sekitarnya",
            detail: [
              "Pendirian oleh tokoh masyarakat",
              "Pembentukan struktur pemerintahan",
              "Penetapan batas wilayah",
              "Pembentukan adat istiadat"
            ]
          },
          {
            judul: "Nama Desa",
            deskripsi: "Asal usul penamaan Desa Remau Bako Tuo",
            detail: [
              "Remau: nama sungai yang mengalir di desa",
              "Bako: nama pohon yang banyak tumbuh",
              "Tuo: berarti tua/awal",
              "Gabungan ketiga kata tersebut menjadi nama desa"
            ]
          }
        ]
      }
    },
    perkembangan: {
      title: "Perkembangan Desa",
      icon: Calendar,
      content: {
        deskripsi: "Perkembangan Desa Remau Bako Tuo dari masa ke masa",
        periode: "1900 - Sekarang",
        perkembangan: [
          {
            periode: "1900-1945",
            judul: "Masa Kolonial",
            deskripsi: "Periode awal pembentukan desa hingga kemerdekaan",
            peristiwa: [
              "Pembentukan struktur pemerintahan desa",
              "Pengembangan pertanian",
              "Pembentukan adat istiadat",
              "Perjuangan kemerdekaan"
            ]
          },
          {
            periode: "1945-2000",
            judul: "Masa Kemerdekaan",
            deskripsi: "Periode perkembangan desa pasca kemerdekaan",
            peristiwa: [
              "Pembangunan infrastruktur dasar",
              "Pengembangan pendidikan",
              "Peningkatan perekonomian",
              "Modernisasi desa"
            ]
          },
          {
            periode: "2000-Sekarang",
            judul: "Masa Modern",
            deskripsi: "Periode perkembangan desa di era modern",
            peristiwa: [
              "Pembangunan infrastruktur modern",
              "Pengembangan teknologi",
              "Peningkatan kesejahteraan",
              "Pengembangan wisata"
            ]
          }
        ]
      }
    },
    tokoh: {
      title: "Tokoh Penting",
      icon: Users,
      content: {
        deskripsi: "Tokoh-tokoh penting dalam sejarah Desa Remau Bako Tuo",
        periode: "1900 - Sekarang",
        tokoh: [
          {
            nama: "Tokoh Pendiri",
            periode: "1900",
            peran: "Pendiri Desa",
            kontribusi: [
              "Memimpin pembentukan desa",
              "Menetapkan batas wilayah",
              "Membentuk struktur pemerintahan",
              "Mengembangkan adat istiadat"
            ]
          },
          {
            nama: "Tokoh Pembangunan",
            periode: "1945-2000",
            peran: "Pembangun Desa",
            kontribusi: [
              "Memimpin pembangunan infrastruktur",
              "Mengembangkan pendidikan",
              "Meningkatkan perekonomian",
              "Memodernisasi desa"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Sejarah",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Buku Sejarah Desa",
            tahun: "2020",
            status: "Dokumen Resmi"
          },
          {
            judul: "Arsip Sejarah Desa",
            tahun: "1900-2020",
            status: "Dokumen Arsip"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sejarah Desa</h2>
          <p className="text-muted-foreground">
            Sejarah dan perkembangan Desa Remau Bako Tuo dari masa ke masa
          </p>
        </div>

        <Tabs defaultValue="asal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="asal">Asal Usul</TabsTrigger>
            <TabsTrigger value="perkembangan">Perkembangan</TabsTrigger>
            <TabsTrigger value="tokoh">Tokoh Penting</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="asal" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <History className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{sejarahData.asal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sejarah dan asal usul Desa Remau Bako Tuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {sejarahData.asal.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {sejarahData.asal.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {sejarahData.asal.content.asal.map((item, index) => (
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
                            <History className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="perkembangan" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{sejarahData.perkembangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perkembangan Desa Remau Bako Tuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {sejarahData.perkembangan.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {sejarahData.perkembangan.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {sejarahData.perkembangan.content.perkembangan.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.periode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.peristiwa.map((peristiwa, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{peristiwa}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokoh" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{sejarahData.tokoh.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tokoh-tokoh penting dalam sejarah desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {sejarahData.tokoh.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {sejarahData.tokoh.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {sejarahData.tokoh.content.tokoh.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.nama}</h4>
                        <p className="text-sm text-muted-foreground">
                          Periode: {item.periode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Peran: {item.peran}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.kontribusi.map((kontribusi, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{kontribusi}</span>
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
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{sejarahData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen sejarah Desa Remau Bako Tuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sejarahData.dokumen.content.dokumen.map((item, index) => (
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

export default SejarahDesa; 