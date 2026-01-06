import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, History, MapPin, Users } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Sejarah = () => {
  const sejarahData = {
    umum: {
      title: "Sejarah Desa",
      icon: History,
      content: {
        tahun: "1980",
        deskripsi: "Desa Remau Bakotuo didirikan pada tahun 1980 melalui pemekaran dari Desa Induk. Nama Remau Bakotuo diambil dari bahasa daerah yang memiliki makna 'Tanah yang Subur'."
      }
    },
    periode: {
      title: "Periode Kepemimpinan",
      icon: Users,
      content: {
        periode: [
          {
            tahun: "1980-1985",
            nama: "Kepala Desa Pertama",
            deskripsi: "Masa awal pembentukan desa dan penataan administrasi pemerintahan"
          },
          {
            tahun: "1985-1990",
            nama: "Kepala Desa Kedua",
            deskripsi: "Periode pembangunan infrastruktur dasar desa"
          },
          {
            tahun: "1990-1995",
            nama: "Kepala Desa Ketiga",
            deskripsi: "Pengembangan sektor pertanian dan pendidikan"
          },
          {
            tahun: "1995-Sekarang",
            nama: "Kepala Desa Keempat",
            deskripsi: "Modernisasi dan digitalisasi pemerintahan desa"
          }
        ]
      }
    },
    perkembangan: {
      title: "Perkembangan Desa",
      icon: MapPin,
      content: {
        perkembangan: [
          {
            tahun: "1980",
            judul: "Pembentukan Desa",
            deskripsi: "Pemekaran dari Desa Induk dan pembentukan struktur pemerintahan"
          },
          {
            tahun: "1985",
            judul: "Pembangunan Infrastruktur",
            deskripsi: "Pembangunan jalan desa dan fasilitas umum"
          },
          {
            tahun: "1990",
            judul: "Pengembangan Pertanian",
            deskripsi: "Modernisasi pertanian dan pengembangan irigasi"
          },
          {
            tahun: "1995",
            judul: "Pembangunan Pendidikan",
            deskripsi: "Pendirian sekolah dasar dan pusat kegiatan belajar"
          },
          {
            tahun: "2000",
            judul: "Pengembangan Ekonomi",
            deskripsi: "Pendirian BUMDes dan pengembangan UMKM"
          },
          {
            tahun: "2020",
            judul: "Digitalisasi Desa",
            deskripsi: "Implementasi sistem informasi desa dan e-government"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Profil Desa", path: "/profile" },
          { title: "Sejarah" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sejarah Desa</h2>
          <p className="text-muted-foreground">
            Perjalanan sejarah dan perkembangan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="periode">Periode Kepemimpinan</TabsTrigger>
            <TabsTrigger value="perkembangan">Perkembangan Desa</TabsTrigger>
          </TabsList>

          <TabsContent value="umum">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <History className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Sejarah Desa</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {sejarahData.umum.content.deskripsi}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tahun Berdiri</span>
                    <span className="text-sm">{sejarahData.umum.content.tahun}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="periode">
            <div className="space-y-4">
              {sejarahData.periode.content.periode.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.nama}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Periode: {item.tahun}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{item.deskripsi}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="perkembangan">
            <div className="space-y-4">
              {sejarahData.perkembangan.content.perkembangan.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.judul}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Tahun: {item.tahun}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{item.deskripsi}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sejarah; 