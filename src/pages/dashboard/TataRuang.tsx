import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, Trees, Factory, Home, School, Hospital } from "lucide-react";

const TataRuang = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tata Ruang Desa</h2>
        <p className="text-muted-foreground">
          Pengelolaan dan perencanaan tata ruang Desa Remau Bakotuo
        </p>
      </div>

      <Tabs defaultValue="peta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="peta">Peta Desa</TabsTrigger>
          <TabsTrigger value="zona">Zona Wilayah</TabsTrigger>
          <TabsTrigger value="infrastruktur">Infrastruktur</TabsTrigger>
          <TabsTrigger value="rencana">Rencana Pembangunan</TabsTrigger>
        </TabsList>

        <TabsContent value="peta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peta Desa</CardTitle>
              <CardDescription>
                Visualisasi tata ruang dan pembagian wilayah Desa Remau Bakotuo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Peta Interaktif akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Luas Total</CardTitle>
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
                <CardTitle className="text-sm font-medium">Pemukiman</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">250 Ha</div>
                <p className="text-xs text-muted-foreground">
                  20% dari total luas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pertanian</CardTitle>
                <Trees className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">750 Ha</div>
                <p className="text-xs text-muted-foreground">
                  60% dari total luas
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zona" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Zona Permukiman</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Dusun I - Permukiman Padat</li>
                  <li>Dusun II - Permukiman Menengah</li>
                  <li>Dusun III - Permukiman Jarang</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zona Pertanian</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Sawah - 300 Ha</li>
                  <li>Ladang - 250 Ha</li>
                  <li>Perkebunan - 200 Ha</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zona Industri</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>UMKM - 50 Ha</li>
                  <li>Industri Rumah Tangga - 30 Ha</li>
                  <li>Pergudangan - 20 Ha</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zona Konservasi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Hutan Lindung - 100 Ha</li>
                  <li>Mangrove - 50 Ha</li>
                  <li>Kawasan Resapan Air - 30 Ha</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastruktur" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fasilitas Pendidikan</CardTitle>
                <School className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>SD Negeri - 2 Unit</li>
                  <li>SMP Negeri - 1 Unit</li>
                  <li>PAUD - 3 Unit</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fasilitas Kesehatan</CardTitle>
                <Hospital className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Puskesmas - 1 Unit</li>
                  <li>Posyandu - 3 Unit</li>
                  <li>Klinik - 2 Unit</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fasilitas Umum</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Balai Desa - 1 Unit</li>
                  <li>Masjid - 5 Unit</li>
                  <li>Lapangan - 2 Unit</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rencana" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rencana Pembangunan Jangka Menengah</CardTitle>
              <CardDescription>
                Program pembangunan desa untuk 5 tahun ke depan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2024</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Pembangunan Jalan Desa</li>
                    <li>Rehabilitasi Saluran Irigasi</li>
                    <li>Pembangunan Posyandu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2025</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Pembangunan Pasar Desa</li>
                    <li>Pengembangan Wisata Desa</li>
                    <li>Pembangunan MCK Umum</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2026-2028</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Pengembangan UMKM</li>
                    <li>Pembangunan Infrastruktur Digital</li>
                    <li>Pengembangan Ekonomi Kreatif</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TataRuang; 