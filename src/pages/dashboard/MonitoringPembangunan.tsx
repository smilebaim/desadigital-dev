import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Building2, Calendar, Users, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";

const MonitoringPembangunan = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Monitoring Pembangunan</h2>
        <p className="text-muted-foreground">
          Pantau perkembangan proyek pembangunan desa
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dalam Pengerjaan</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              3 proyek baru dimulai
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenaga Kerja</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              +20 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggaran</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.5M</div>
            <p className="text-xs text-muted-foreground">
              65% dari total anggaran
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="aktif" className="space-y-4">
        <TabsList>
          <TabsTrigger value="aktif">Proyek Aktif</TabsTrigger>
          <TabsTrigger value="selesai">Proyek Selesai</TabsTrigger>
          <TabsTrigger value="rencana">Rencana Proyek</TabsTrigger>
        </TabsList>

        <TabsContent value="aktif" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proyek dalam Pengerjaan</CardTitle>
              <CardDescription>
                Daftar proyek yang sedang berlangsung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Jalan Desa</h3>
                      <p className="text-sm text-muted-foreground">
                        Dusun I - II
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">75%</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mulai: Jan 2024</span>
                    <span>Target: Mar 2024</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Rehabilitasi Saluran Irigasi</h3>
                      <p className="text-sm text-muted-foreground">
                        Area Persawahan
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">45%</span>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mulai: Feb 2024</span>
                    <span>Target: Apr 2024</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Posyandu</h3>
                      <p className="text-sm text-muted-foreground">
                        Dusun III
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">30%</span>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </div>
                  </div>
                  <Progress value={30} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mulai: Mar 2024</span>
                    <span>Target: Mei 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selesai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proyek Selesai</CardTitle>
              <CardDescription>
                Daftar proyek yang telah selesai
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan MCK Umum</h3>
                      <p className="text-sm text-muted-foreground">
                        Dusun II
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">100%</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Selesai: Jan 2024</span>
                    <span>Anggaran: Rp 150jt</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Drainase</h3>
                      <p className="text-sm text-muted-foreground">
                        Dusun I
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">100%</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Selesai: Des 2023</span>
                    <span>Anggaran: Rp 200jt</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rencana" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rencana Proyek</CardTitle>
              <CardDescription>
                Daftar proyek yang akan dilaksanakan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pembangunan Pasar Desa</h3>
                      <p className="text-sm text-muted-foreground">
                        Pusat Desa
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rencana</span>
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mulai: Jun 2024</span>
                    <span>Anggaran: Rp 500jt</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Pengembangan Wisata Desa</h3>
                      <p className="text-sm text-muted-foreground">
                        Area Pantai
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rencana</span>
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mulai: Jul 2024</span>
                    <span>Anggaran: Rp 300jt</span>
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

export default MonitoringPembangunan; 