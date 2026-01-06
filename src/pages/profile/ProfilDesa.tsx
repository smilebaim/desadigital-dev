import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Building2, Leaf, Mountain, Waves, Landmark, FileText } from "lucide-react";

const ProfilDesa = () => {
  const profilData = {
    umum: {
      title: "Informasi Umum",
      icon: Building2,
      data: {
        nama: "Desa Remau Bakotuo",
        kecamatan: "Kecamatan Kulisusu",
        kabupaten: "Kabupaten Buton Utara",
        provinsi: "Provinsi Sulawesi Tenggara",
        luas: "1.250 Hektar",
        penduduk: "1.250 Jiwa",
        kepala_desa: "H. Muhammad Yusuf, S.Pd.",
        periode: "2021-2027"
      }
    },
    geografis: {
      title: "Kondisi Geografis",
      icon: MapPin,
      data: {
        batas: {
          utara: "Desa Wakambangura",
          selatan: "Laut Banda",
          timur: "Desa Wakambangura",
          barat: "Desa Wakambangura"
        },
        topografi: [
          "Wilayah pesisir pantai",
          "Dataran rendah",
          "Pegunungan rendah",
          "Hutan mangrove"
        ],
        iklim: [
          "Tropis basah",
          "Curah hujan 2.000-3.000 mm/tahun",
          "Suhu rata-rata 27-32°C",
          "Kelembaban 80-90%"
        ]
      }
    },
    demografis: {
      title: "Kondisi Demografis",
      icon: Users,
      data: {
        penduduk: {
          total: "1.250 Jiwa",
          laki_laki: "620 Jiwa",
          perempuan: "630 Jiwa",
          kepala_keluarga: "250 KK"
        },
        pendidikan: {
          sd: "450 Orang",
          smp: "300 Orang",
          sma: "200 Orang",
          perguruan_tinggi: "100 Orang"
        },
        mata_pencaharian: {
          nelayan: "40%",
          petani: "30%",
          pedagang: "15%",
          lainnya: "15%"
        }
      }
    },
    potensi: {
      title: "Potensi Desa",
      icon: Leaf,
      data: {
        pertanian: [
          "Padi sawah",
          "Jagung",
          "Ubi kayu",
          "Sayuran"
        ],
        perikanan: [
          "Ikan tangkap",
          "Rumput laut",
          "Kerang hijau",
          "Budidaya ikan"
        ],
        wisata: [
          "Pantai pasir putih",
          "Hutan mangrove",
          "Spot diving",
          "Kuliner seafood"
        ],
        industri: [
          "Pengolahan ikan",
          "Pengolahan rumput laut",
          "Kerajinan tangan",
          "Homestay"
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profil Desa</h2>
          <p className="text-muted-foreground">
            Informasi lengkap tentang Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList className="w-full overflow-x-auto">
            <TabsTrigger value="umum">Umum</TabsTrigger>
            <TabsTrigger value="geografis">Geografis</TabsTrigger>
            <TabsTrigger value="demografis">Demografis</TabsTrigger>
            <TabsTrigger value="potensi">Potensi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{profilData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Identitas Desa</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama Desa</span>
                        <span className="font-medium">{profilData.umum.data.nama}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kecamatan</span>
                        <span className="font-medium">{profilData.umum.data.kecamatan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kabupaten</span>
                        <span className="font-medium">{profilData.umum.data.kabupaten}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provinsi</span>
                        <span className="font-medium">{profilData.umum.data.provinsi}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Administratif</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Luas Wilayah</span>
                        <span className="font-medium">{profilData.umum.data.luas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jumlah Penduduk</span>
                        <span className="font-medium">{profilData.umum.data.penduduk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kepala Desa</span>
                        <span className="font-medium">{profilData.umum.data.kepala_desa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Periode</span>
                        <span className="font-medium">{profilData.umum.data.periode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geografis" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{profilData.geografis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kondisi geografis Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Batas Wilayah</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Utara</span>
                      <span className="font-medium">{profilData.geografis.data.batas.utara}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Selatan</span>
                      <span className="font-medium">{profilData.geografis.data.batas.selatan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timur</span>
                      <span className="font-medium">{profilData.geografis.data.batas.timur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Barat</span>
                      <span className="font-medium">{profilData.geografis.data.batas.barat}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Topografi</h4>
                  <ul className="space-y-2">
                    {profilData.geografis.data.topografi.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Mountain className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Iklim</h4>
                  <ul className="space-y-2">
                    {profilData.geografis.data.iklim.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Waves className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demografis" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{profilData.demografis.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Data kependudukan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Jumlah Penduduk</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium">{profilData.demografis.data.penduduk.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Laki-laki</span>
                      <span className="font-medium">{profilData.demografis.data.penduduk.laki_laki}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Perempuan</span>
                      <span className="font-medium">{profilData.demografis.data.penduduk.perempuan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kepala Keluarga</span>
                      <span className="font-medium">{profilData.demografis.data.penduduk.kepala_keluarga}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tingkat Pendidikan</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SD</span>
                      <span className="font-medium">{profilData.demografis.data.pendidikan.sd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SMP</span>
                      <span className="font-medium">{profilData.demografis.data.pendidikan.smp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SMA</span>
                      <span className="font-medium">{profilData.demografis.data.pendidikan.sma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Perguruan Tinggi</span>
                      <span className="font-medium">{profilData.demografis.data.pendidikan.perguruan_tinggi}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mata Pencaharian</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nelayan</span>
                      <span className="font-medium">{profilData.demografis.data.mata_pencaharian.nelayan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Petani</span>
                      <span className="font-medium">{profilData.demografis.data.mata_pencaharian.petani}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pedagang</span>
                      <span className="font-medium">{profilData.demografis.data.mata_pencaharian.pedagang}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lainnya</span>
                      <span className="font-medium">{profilData.demografis.data.mata_pencaharian.lainnya}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="potensi" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{profilData.potensi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Potensi dan sumber daya Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Pertanian</h4>
                  <ul className="space-y-2">
                    {profilData.potensi.data.pertanian.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perikanan</h4>
                  <ul className="space-y-2">
                    {profilData.potensi.data.perikanan.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Waves className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Wisata</h4>
                  <ul className="space-y-2">
                    {profilData.potensi.data.wisata.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Industri</h4>
                  <ul className="space-y-2">
                    {profilData.potensi.data.industri.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Building2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilDesa; 