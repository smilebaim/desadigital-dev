import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Building2, Landmark, FileText, Image } from "lucide-react";

const ProfilDesa = () => {
  return (
    <div className="page-container">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profil Desa</h2>
        <p className="text-muted-foreground">
          Informasi lengkap tentang Desa Remau Bakotuo
        </p>
      </div>

      <Tabs defaultValue="umum" className="space-y-4">
        <TabsList>
          <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
          <TabsTrigger value="wilayah">Wilayah</TabsTrigger>
          <TabsTrigger value="demografi">Demografi</TabsTrigger>
          <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
          <TabsTrigger value="potensi">Potensi</TabsTrigger>
        </TabsList>

        <TabsContent value="umum" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nama Desa</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Remau Bakotuo</div>
                <p className="text-xs text-muted-foreground">
                  Kecamatan Kulisusu, Kabupaten Buton Utara
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Luas Wilayah</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250 Ha</div>
                <p className="text-xs text-muted-foreground">
                  Terdiri dari 3 Dusun
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Penduduk</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,500</div>
                <p className="text-xs text-muted-foreground">
                  750 KK
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Visi & Misi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Visi</h3>
                <p className="text-muted-foreground">
                  "Terwujudnya Desa Remau Bakotuo yang Mandiri, Maju, dan Sejahtera"
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Misi</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Meningkatkan kualitas pendidikan dan kesehatan masyarakat</li>
                  <li>Mengembangkan perekonomian desa berbasis potensi lokal</li>
                  <li>Membangun infrastruktur desa yang berkelanjutan</li>
                  <li>Menguatkan kelembagaan desa dan partisipasi masyarakat</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wilayah" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batas Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Utara</span>
                    <span className="font-medium">Desa Wakambangura</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selatan</span>
                    <span className="font-medium">Laut Banda</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timur</span>
                    <span className="font-medium">Desa Wakambangura</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Barat</span>
                    <span className="font-medium">Desa Wakambangura</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Dusun</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Dusun I - Wakambangura</li>
                    <li>Dusun II - Wakambangura</li>
                    <li>Dusun III - Wakambangura</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demografi" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Komposisi Penduduk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Laki-laki</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Perempuan</span>
                    <span className="font-medium">1,250</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Agama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Islam</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kristen</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pendidikan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SD</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SMP</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SMA</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Perguruan Tinggi</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sejarah" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sejarah Desa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>
                  Desa Remau Bakotuo didirikan pada tahun 1920 oleh sekelompok masyarakat yang berasal dari berbagai daerah di Sulawesi Tenggara. Nama "Remau Bakotuo" diambil dari bahasa lokal yang berarti "tempat yang subur dan makmur".
                </p>
                <p>
                  Pada awalnya, desa ini hanya dihuni oleh beberapa keluarga yang membuka lahan pertanian. Seiring berjalannya waktu, jumlah penduduk semakin bertambah dan berkembang menjadi desa yang mandiri.
                </p>
                <p>
                  Pada tahun 1945, desa ini resmi menjadi bagian dari Kecamatan Kulisusu, Kabupaten Buton Utara. Sejak saat itu, pembangunan infrastruktur dan fasilitas umum terus dilakukan untuk meningkatkan kesejahteraan masyarakat.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="potensi" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Potensi Sumber Daya Alam</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Pertanian (Padi, Jagung, Ubi)</li>
                  <li>Perkebunan (Kelapa, Cengkeh)</li>
                  <li>Perikanan (Ikan Laut)</li>
                  <li>Peternakan (Sapi, Kambing)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Potensi Wisata</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Pantai Pasir Putih</li>
                  <li>Air Terjun Remau</li>
                  <li>Kebun Raya Desa</li>
                  <li>Wisata Kuliner Tradisional</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilDesa; 