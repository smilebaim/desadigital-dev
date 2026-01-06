import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, List, TrendingUp } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Pendapatan = () => {
  const pendapatanData = {
    umum: {
      title: "Informasi Umum Pendapatan",
      icon: Wallet,
      content: {
        tahun: "2024",
        total: "Rp 3.000.000.000",
        deskripsi: "Pendapatan Desa Remau Bakotuo tahun 2024 berasal dari berbagai sumber pendapatan asli desa, transfer, dan pendapatan lainnya yang digunakan untuk membiayai program pembangunan desa."
      }
    },
    sumber: {
      title: "Sumber Pendapatan",
      icon: List,
      content: {
        sumber: [
          {
            judul: "Pendapatan Asli Desa",
            jumlah: "Rp 1.200.000.000",
            persentase: "40%",
            deskripsi: "Pendapatan yang berasal dari hasil usaha desa, hasil aset desa, swadaya dan partisipasi, serta pendapatan lain-lain"
          },
          {
            judul: "Transfer",
            jumlah: "Rp 1.500.000.000",
            persentase: "50%",
            deskripsi: "Pendapatan yang berasal dari dana desa, alokasi dana desa, dan bantuan keuangan"
          },
          {
            judul: "Pendapatan Lainnya",
            jumlah: "Rp 300.000.000",
            persentase: "10%",
            deskripsi: "Pendapatan yang berasal dari hibah dan sumbangan pihak ketiga"
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Pendapatan",
      icon: TrendingUp,
      content: {
        triwulan: [
          {
            periode: "Triwulan I",
            target: "Rp 750.000.000",
            realisasi: "Rp 720.000.000",
            persentase: "96%",
            deskripsi: "Realisasi pendapatan triwulan pertama tahun 2024"
          },
          {
            periode: "Triwulan II",
            target: "Rp 750.000.000",
            realisasi: "Rp 780.000.000",
            persentase: "104%",
            deskripsi: "Realisasi pendapatan triwulan kedua tahun 2024"
          },
          {
            periode: "Triwulan III",
            target: "Rp 750.000.000",
            realisasi: "Rp 690.000.000",
            persentase: "92%",
            deskripsi: "Realisasi pendapatan triwulan ketiga tahun 2024"
          },
          {
            periode: "Triwulan IV",
            target: "Rp 750.000.000",
            realisasi: "Rp 750.000.000",
            persentase: "100%",
            deskripsi: "Realisasi pendapatan triwulan keempat tahun 2024"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "Pendapatan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pendapatan Desa</h2>
          <p className="text-muted-foreground">
            Informasi anggaran dan realisasi pendapatan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Overview</TabsTrigger>
            <TabsTrigger value="sumber">Sumber</TabsTrigger>
            <TabsTrigger value="realisasi">Realisasi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Informasi Umum Pendapatan</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahun Anggaran: {pendapatanData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Anggaran</span>
                    <span className="text-sm font-semibold">{pendapatanData.umum.content.total}</span>
                  </div>
                  <p className="text-sm">{pendapatanData.umum.content.deskripsi}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sumber">
            <div className="space-y-4">
              {pendapatanData.sumber.content.sumber.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <List className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.judul}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.persentase} dari total anggaran
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Jumlah</span>
                        <span className="text-sm font-semibold">{item.jumlah}</span>
                      </div>
                      <p className="text-sm">{item.deskripsi}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="realisasi">
            <div className="space-y-4">
              {pendapatanData.realisasi.content.triwulan.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{item.periode}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Realisasi: {item.persentase}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Target</span>
                        <span className="text-sm">{item.target}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Realisasi</span>
                        <span className="text-sm font-semibold">{item.realisasi}</span>
                      </div>
                      <p className="text-sm">{item.deskripsi}</p>
                    </div>
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

export default Pendapatan; 