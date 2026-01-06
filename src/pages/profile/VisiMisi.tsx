import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, ListChecks, ArrowRight, FileText } from "lucide-react";

const VisiMisi = () => {
  const visiMisiData = {
    visi: {
      title: "Visi Desa",
      icon: Target,
      content: {
        deskripsi: "Visi Desa Remau Bako Tuo untuk periode 2021-2027",
        periode: "2021-2027",
        visi: [
          {
            judul: "Visi Utama",
            deskripsi: "Terwujudnya Desa Remau Bako Tuo yang Mandiri, Maju, dan Sejahtera",
            poin: [
              "Desa yang mandiri dalam pengelolaan sumber daya",
              "Masyarakat yang maju dalam pendidikan dan teknologi",
              "Kesejahteraan yang merata bagi seluruh warga",
              "Lingkungan yang lestari dan berkelanjutan"
            ]
          }
        ]
      }
    },
    misi: {
      title: "Misi Desa",
      icon: ListChecks,
      content: {
        deskripsi: "Misi Desa Remau Bako Tuo untuk mencapai visi 2021-2027",
        periode: "2021-2027",
        misi: [
          {
            judul: "Penguatan Ekonomi",
            deskripsi: "Mengembangkan perekonomian desa yang berkelanjutan",
            program: [
              "Pengembangan UMKM dan koperasi",
              "Pemberdayaan ekonomi masyarakat",
              "Pengembangan sektor pertanian",
              "Pengembangan wisata desa"
            ]
          },
          {
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Membangun infrastruktur desa yang modern dan berkelanjutan",
            program: [
              "Pembangunan jalan desa",
              "Peningkatan fasilitas umum",
              "Pengembangan teknologi informasi",
              "Peningkatan sanitasi"
            ]
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Meningkatkan kualitas hidup masyarakat",
            program: [
              "Peningkatan pendidikan",
              "Pengembangan kesehatan",
              "Pemberdayaan perempuan",
              "Penguatan kelembagaan"
            ]
          }
        ]
      }
    },
    strategi: {
      title: "Strategi",
      icon: ArrowRight,
      content: {
        deskripsi: "Strategi pencapaian visi dan misi desa",
        periode: "2021-2027",
        strategi: [
          {
            judul: "Strategi Ekonomi",
            deskripsi: "Strategi pengembangan ekonomi desa",
            program: [
              "Pengembangan BUMDes",
              "Pemberdayaan UMKM",
              "Pengembangan sektor unggulan",
              "Peningkatan investasi"
            ]
          },
          {
            judul: "Strategi Pembangunan",
            deskripsi: "Strategi pembangunan infrastruktur",
            program: [
              "Perencanaan partisipatif",
              "Pemanfaatan teknologi",
              "Pengelolaan sumber daya",
              "Pemeliharaan berkelanjutan"
            ]
          },
          {
            judul: "Strategi Pemberdayaan",
            deskripsi: "Strategi pemberdayaan masyarakat",
            program: [
              "Peningkatan kapasitas",
              "Penguatan kelembagaan",
              "Pemberdayaan kelompok",
              "Pengembangan inovasi"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Visi Misi",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Dokumen Visi Misi 2021-2027",
            tahun: "2021",
            status: "Dokumen Resmi"
          },
          {
            judul: "Lampiran Visi Misi 2021-2027",
            tahun: "2021",
            status: "Dokumen Resmi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visi dan Misi Desa</h2>
          <p className="text-muted-foreground">
            Visi dan Misi Desa Remau Bako Tuo periode 2021-2027
          </p>
        </div>

        <Tabs defaultValue="visi" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visi">Visi</TabsTrigger>
            <TabsTrigger value="misi">Misi</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="visi" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{visiMisiData.visi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Visi Desa periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {visiMisiData.visi.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {visiMisiData.visi.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {visiMisiData.visi.content.visi.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.poin.map((poin, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{poin}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="misi" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <ListChecks className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{visiMisiData.misi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Misi Desa periode 2021-2027
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {visiMisiData.misi.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {visiMisiData.misi.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {visiMisiData.misi.content.misi.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ListChecks className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="strategi" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <ArrowRight className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{visiMisiData.strategi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategi pencapaian visi dan misi
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {visiMisiData.strategi.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {visiMisiData.strategi.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {visiMisiData.strategi.content.strategi.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.judul}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.deskripsi}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="dokumen" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{visiMisiData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen visi dan misi Desa Remau Bako Tuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {visiMisiData.dokumen.content.dokumen.map((item, index) => (
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

export default VisiMisi; 