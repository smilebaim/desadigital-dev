import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Map, Users, Building, Leaf, School, Heart } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const MonografiDesa = () => {
  const monografiData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Monografi desa merupakan dokumen yang berisi informasi lengkap tentang kondisi dan potensi desa yang mencakup aspek geografis, demografis, sosial, ekonomi, dan budaya.",
        data: [
          {
            label: "Nama Desa",
            value: "Remaubakotuo"
          },
          {
            label: "Kecamatan",
            value: "Kecamatan Remaubakotuo"
          },
          {
            label: "Kabupaten",
            value: "Kabupaten Remaubakotuo"
          },
          {
            label: "Provinsi",
            value: "Provinsi Remaubakotuo"
          }
        ]
      }
    },
    geografis: {
      title: "Kondisi Geografis",
      icon: Map,
      content: {
        data: [
          {
            label: "Luas Wilayah",
            value: "1.234 Ha"
          },
          {
            label: "Batas Utara",
            value: "Desa A"
          },
          {
            label: "Batas Selatan",
            value: "Desa B"
          },
          {
            label: "Batas Timur",
            value: "Desa C"
          },
          {
            label: "Batas Barat",
            value: "Desa D"
          },
          {
            label: "Topografi",
            value: "Dataran Tinggi"
          },
          {
            label: "Iklim",
            value: "Tropis"
          }
        ]
      }
    },
    demografis: {
      title: "Kondisi Demografis",
      icon: Users,
      content: {
        data: [
          {
            label: "Jumlah Penduduk",
            value: "5.000 Jiwa"
          },
          {
            label: "Jumlah KK",
            value: "1.250 KK"
          },
          {
            label: "Laki-laki",
            value: "2.500 Jiwa"
          },
          {
            label: "Perempuan",
            value: "2.500 Jiwa"
          },
          {
            label: "Kepadatan Penduduk",
            value: "405 Jiwa/Km²"
          }
        ]
      }
    },
    infrastruktur: {
      title: "Infrastruktur",
      icon: Building,
      content: {
        kategori: [
          {
            nama: "Jalan",
            fasilitas: [
              "Jalan Aspal: 5 Km",
              "Jalan Makadam: 10 Km",
              "Jalan Tanah: 15 Km"
            ]
          },
          {
            nama: "Sarana Ibadah",
            fasilitas: [
              "Masjid: 5 Unit",
              "Musholla: 10 Unit",
              "Gereja: 2 Unit"
            ]
          },
          {
            nama: "Sarana Pendidikan",
            fasilitas: [
              "SD: 3 Unit",
              "SMP: 1 Unit",
              "PAUD: 5 Unit"
            ]
          },
          {
            nama: "Sarana Kesehatan",
            fasilitas: [
              "Puskesmas: 1 Unit",
              "Posyandu: 10 Unit",
              "Klinik: 2 Unit"
            ]
          }
        ]
      }
    },
    potensi: {
      title: "Potensi Desa",
      icon: Leaf,
      content: {
        kategori: [
          {
            nama: "Pertanian",
            potensi: [
              "Padi",
              "Jagung",
              "Sayuran",
              "Buah-buahan"
            ]
          },
          {
            nama: "Peternakan",
            potensi: [
              "Sapi",
              "Kambing",
              "Ayam",
              "Bebek"
            ]
          },
          {
            nama: "Perikanan",
            potensi: [
              "Ikan Air Tawar",
              "Ikan Air Payau",
              "Tambak"
            ]
          },
          {
            nama: "UMKM",
            potensi: [
              "Kerajinan",
              "Makanan Olahan",
              "Jasa"
            ]
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "Monografi Desa" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Monografi Desa</h2>
          <p className="text-muted-foreground">
            Informasi lengkap tentang kondisi dan potensi desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="geografis">Geografis</TabsTrigger>
            <TabsTrigger value="demografis">Demografis</TabsTrigger>
            <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
            <TabsTrigger value="potensi">Potensi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{monografiData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {monografiData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {monografiData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geografis" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Map className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{monografiData.geografis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kondisi geografis desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {monografiData.geografis.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demografis" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{monografiData.demografis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Data kependudukan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {monografiData.demografis.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastruktur" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{monografiData.infrastruktur.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sarana dan prasarana desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {monografiData.infrastruktur.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.fasilitas.map((fasilitas, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Building className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{fasilitas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="potensi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{monografiData.potensi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Potensi dan sumber daya desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {monografiData.potensi.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.potensi.map((potensi, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{potensi}</span>
                          </li>
                        ))}
                      </ul>
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

export default MonografiDesa; 