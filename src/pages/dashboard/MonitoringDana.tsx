import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, TrendingDown, Wallet, AlertCircle, CheckCircle2 } from "lucide-react";

const MonitoringDana = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Monitoring Dana Desa</h2>
        <p className="text-muted-foreground">
          Pantau alokasi dan penggunaan dana desa
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anggaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 3.5M</div>
            <p className="text-xs text-muted-foreground">
              Tahun Anggaran 2024
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dana Terserap</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.5M</div>
            <p className="text-xs text-muted-foreground">
              71% dari total anggaran
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sisa Anggaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 1M</div>
            <p className="text-xs text-muted-foreground">
              29% dari total anggaran
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Dalam pengerjaan
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alokasi" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alokasi">Alokasi Dana</TabsTrigger>
          <TabsTrigger value="realisasi">Realisasi</TabsTrigger>
          <TabsTrigger value="laporan">Laporan Keuangan</TabsTrigger>
        </TabsList>

        <TabsContent value="alokasi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alokasi Dana Desa</CardTitle>
              <CardDescription>
                Pembagian anggaran berdasarkan sektor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Infrastruktur</h3>
                      <p className="text-sm text-muted-foreground">
                        Jalan, Drainase, MCK
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rp 1.5M</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>45% dari total anggaran</span>
                    <span>Terserap: 80%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pemberdayaan Masyarakat</h3>
                      <p className="text-sm text-muted-foreground">
                        Pelatihan, UMKM, Kesehatan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rp 1M</span>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>30% dari total anggaran</span>
                    <span>Terserap: 45%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Operasional Desa</h3>
                      <p className="text-sm text-muted-foreground">
                        Administrasi, Kegiatan Rutin
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rp 500jt</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={90} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>15% dari total anggaran</span>
                    <span>Terserap: 90%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Dana Cadangan</h3>
                      <p className="text-sm text-muted-foreground">
                        Penanganan Darurat
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rp 500jt</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={10} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10% dari total anggaran</span>
                    <span>Terserap: 10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realisasi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Realisasi Anggaran</CardTitle>
              <CardDescription>
                Progress penggunaan dana per proyek
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Jalan Desa</h3>
                      <p className="text-sm text-muted-foreground">
                        Anggaran: Rp 500jt
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">75%</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Terserap: Rp 375jt</span>
                    <span>Sisa: Rp 125jt</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Rehabilitasi Saluran Irigasi</h3>
                      <p className="text-sm text-muted-foreground">
                        Anggaran: Rp 300jt
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">45%</span>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Terserap: Rp 135jt</span>
                    <span>Sisa: Rp 165jt</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Posyandu</h3>
                      <p className="text-sm text-muted-foreground">
                        Anggaran: Rp 200jt
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">30%</span>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <Progress value={30} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Terserap: Rp 60jt</span>
                    <span>Sisa: Rp 140jt</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="laporan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Keuangan</CardTitle>
              <CardDescription>
                Ringkasan laporan keuangan desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Pendapatan</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dana Desa</span>
                      <span className="font-medium">Rp 3.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PAD</span>
                      <span className="font-medium">Rp 500jt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bantuan</span>
                      <span className="font-medium">Rp 200jt</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Pendapatan</span>
                      <span>Rp 4.2M</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Pengeluaran</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Infrastruktur</span>
                      <span className="font-medium">Rp 1.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pemberdayaan</span>
                      <span className="font-medium">Rp 1M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operasional</span>
                      <span className="font-medium">Rp 500jt</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Pengeluaran</span>
                      <span>Rp 3M</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Saldo</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saldo Awal</span>
                      <span className="font-medium">Rp 500jt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pendapatan</span>
                      <span className="font-medium">+ Rp 4.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pengeluaran</span>
                      <span className="font-medium">- Rp 3M</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Saldo Akhir</span>
                      <span>Rp 1.7M</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoringDana; 