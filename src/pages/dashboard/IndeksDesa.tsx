import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, Users, Building2, Heart, BookOpen, Leaf } from "lucide-react";

const IndeksDesa = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Indeks Desa</h2>
        <p className="text-muted-foreground">
          Indeks pembangunan dan kemajuan Desa Remau Bakotuo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indeks Desa Membangun</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.75</div>
            <p className="text-xs text-muted-foreground">
              Kategori: Maju
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indeks Desa Digital</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.65</div>
            <p className="text-xs text-muted-foreground">
              Kategori: Berkembang
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indeks Desa Mandiri</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.55</div>
            <p className="text-xs text-muted-foreground">
              Kategori: Berkembang
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indeks Desa Sejahtera</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.70</div>
            <p className="text-xs text-muted-foreground">
              Kategori: Maju
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="idm" className="space-y-4">
        <TabsList>
          <TabsTrigger value="idm">IDM</TabsTrigger>
          <TabsTrigger value="idd">IDD</TabsTrigger>
          <TabsTrigger value="idmandiri">ID Mandiri</TabsTrigger>
          <TabsTrigger value="ids">ID Sejahtera</TabsTrigger>
        </TabsList>

        <TabsContent value="idm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Desa Membangun (IDM)</CardTitle>
              <CardDescription>
                Komponen dan capaian IDM Desa Remau Bakotuo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Indeks Ketahanan Sosial</h3>
                      <p className="text-sm text-muted-foreground">
                        Pendidikan, Kesehatan, Keamanan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.80</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Indeks Ketahanan Ekonomi</h3>
                      <p className="text-sm text-muted-foreground">
                        Perekonomian, UMKM, Lapangan Kerja
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.75</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Indeks Ketahanan Ekologi</h3>
                      <p className="text-sm text-muted-foreground">
                        Lingkungan, SDA, Mitigasi Bencana
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.70</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="idd" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Desa Digital (IDD)</CardTitle>
              <CardDescription>
                Komponen dan capaian IDD Desa Remau Bakotuo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Infrastruktur Digital</h3>
                      <p className="text-sm text-muted-foreground">
                        Jaringan, Perangkat, Fasilitas
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.70</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Layanan Digital</h3>
                      <p className="text-sm text-muted-foreground">
                        E-Government, E-Commerce, E-Education
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.65</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Literasi Digital</h3>
                      <p className="text-sm text-muted-foreground">
                        Keterampilan, Pengetahuan, Etika
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.60</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="idmandiri" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Desa Mandiri</CardTitle>
              <CardDescription>
                Komponen dan capaian Indeks Desa Mandiri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Ekonomi Mandiri</h3>
                      <p className="text-sm text-muted-foreground">
                        BUMDes, Koperasi, UMKM
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.60</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pangan Mandiri</h3>
                      <p className="text-sm text-muted-foreground">
                        Pertanian, Perikanan, Peternakan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.55</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Energi Mandiri</h3>
                      <p className="text-sm text-muted-foreground">
                        Listrik, Bahan Bakar, Energi Terbarukan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.50</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Desa Sejahtera</CardTitle>
              <CardDescription>
                Komponen dan capaian Indeks Desa Sejahtera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Kesejahteraan Sosial</h3>
                      <p className="text-sm text-muted-foreground">
                        Pendidikan, Kesehatan, Kesejahteraan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.75</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Kesejahteraan Ekonomi</h3>
                      <p className="text-sm text-muted-foreground">
                        Pendapatan, Lapangan Kerja, UMKM
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.70</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Kesejahteraan Lingkungan</h3>
                      <p className="text-sm text-muted-foreground">
                        Sanitasi, Air Bersih, Lingkungan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.65</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndeksDesa; 