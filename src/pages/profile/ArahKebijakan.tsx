import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Target, ArrowRight, FileText } from "lucide-react";

const ArahKebijakan = () => {
  const arahKebijakanData = {
    arah: {
      title: "Arah Kebijakan",
      icon: Compass,
      content: {
        deskripsi: "Arah kebijakan pembangunan Desa Remau Bakotuo untuk mencapai visi dan misi yang telah ditetapkan",
        periode: "2021-2027",
        poin: [
          "Penguatan kelembagaan desa dan masyarakat",
          "Pengembangan ekonomi berbasis potensi lokal",
          "Pembangunan infrastruktur yang berkelanjutan",
          "Peningkatan kualitas sumber daya manusia",
          "Pengembangan wisata desa yang berkelanjutan"
        ]
      }
    },
    prioritas: {
      title: "Prioritas Pembangunan",
      icon: Target,
      content: {
        prioritas: [
          {
            judul: "Penguatan Ekonomi",
            deskripsi: "Mengembangkan ekonomi desa berbasis potensi lokal",
            program: [
              "Pengembangan UMKM",
              "Pemberdayaan nelayan dan petani",
              "Pengembangan wisata desa",
              "Peningkatan akses permodalan"
            ]
          },
          {
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Membangun infrastruktur yang berkelanjutan",
            program: [
              "Pembangunan jalan desa",
              "Pengembangan fasilitas umum",
              "Peningkatan akses air bersih",
              "Pengembangan listrik desa"
            ]
          },
          {
            judul: "Pemberdayaan Masyarakat",
            deskripsi: "Meningkatkan kualitas sumber daya manusia",
            program: [
              "Peningkatan pendidikan",
              "Pelatihan keterampilan",
              "Penguatan kelembagaan",
              "Peningkatan kesehatan"
            ]
          }
        ]
      }
    },
    strategi: {
      title: "Strategi Implementasi",
      icon: ArrowRight,
      content: {
        strategi: [
          {
            judul: "Penguatan Kelembagaan",
            deskripsi: "Memperkuat kelembagaan desa dan masyarakat",
            indikator: [
              "Terbentuknya BUMDes yang kuat",
              "Penguatan LPMD",
              "Pemberdayaan PKK",
              "Penguatan kelompok masyarakat"
            ]
          },
          {
            judul: "Pengembangan Ekonomi",
            deskripsi: "Mengembangkan ekonomi desa berbasis potensi",
            indikator: [
              "Peningkatan UMKM",
              "Pengembangan wisata",
              "Peningkatan pertanian",
              "Pengembangan perikanan"
            ]
          },
          {
            judul: "Pembangunan Berkelanjutan",
            deskripsi: "Membangun desa secara berkelanjutan",
            indikator: [
              "Infrastruktur yang baik",
              "Lingkungan yang bersih",
              "Sumber daya yang terjaga",
              "Masyarakat yang sehat"
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Kebijakan",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "RPJMDes 2021-2027",
            tahun: "2021",
            status: "Dokumen Resmi"
          },
          {
            judul: "RKPDes 2024",
            tahun: "2024",
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
          <h2 className="text-3xl font-bold tracking-tight">Arah Kebijakan Desa</h2>
          <p className="text-muted-foreground">
            Arah kebijakan dan prioritas pembangunan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="arah" className="space-y-4">
          <TabsList>
            <TabsTrigger value="arah">Arah Kebijakan</TabsTrigger>
            <TabsTrigger value="prioritas">Prioritas</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="arah" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Compass className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{arahKebijakanData.arah.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Arah kebijakan pembangunan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {arahKebijakanData.arah.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {arahKebijakanData.arah.content.periode}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Poin-poin Arah Kebijakan</h4>
                  <ul className="space-y-2">
                    {arahKebijakanData.arah.content.poin.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Compass className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prioritas" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{arahKebijakanData.prioritas.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Prioritas pembangunan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {arahKebijakanData.prioritas.content.prioritas.map((item, index) => (
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
                          <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{program}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategi" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <ArrowRight className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{arahKebijakanData.strategi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Strategi implementasi kebijakan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {arahKebijakanData.strategi.content.strategi.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{item.judul}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.deskripsi}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {item.indikator.map((indikator, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{indikator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dokumen" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{arahKebijakanData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen kebijakan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {arahKebijakanData.dokumen.content.dokumen.map((item, index) => (
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

export default ArahKebijakan; 