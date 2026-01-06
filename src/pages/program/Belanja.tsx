import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TrendingDown, Building2, DollarSign, Wallet } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Belanja = () => {
  const belanjaData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Informasi belanja desa meliputi pengeluaran yang dilakukan oleh pemerintah desa dalam rangka melaksanakan program dan kegiatan pembangunan desa."
      }
    },
    kategori: {
      title: "Kategori Belanja",
      icon: TrendingDown,
      content: {
        total: "Rp 1.200.000.000",
        kategori: [
          {
            nama: "Belanja Pegawai",
            jumlah: "Rp 300.000.000",
            persentase: "25%",
            deskripsi: "Pengeluaran untuk gaji dan tunjangan aparat desa"
          },
          {
            nama: "Belanja Barang dan Jasa",
            jumlah: "Rp 400.000.000",
            persentase: "33.33%",
            deskripsi: "Pengeluaran untuk pembelian barang dan jasa"
          },
          {
            nama: "Belanja Modal",
            jumlah: "Rp 500.000.000",
            persentase: "41.67%",
            deskripsi: "Pengeluaran untuk pembelian aset tetap"
          }
        ]
      }
    },
    program: {
      title: "Program Belanja",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Belanja Pegawai",
            program: [
              "Gaji Kepala Desa",
              "Tunjangan Perangkat Desa",
              "Honor Kader Pembangunan"
            ]
          },
          {
            nama: "Belanja Barang dan Jasa",
            program: [
              "Operasional Kantor Desa",
              "Pengadaan Barang",
              "Jasa Konsultasi"
            ]
          },
          {
            nama: "Belanja Modal",
            program: [
              "Pembangunan Infrastruktur",
              "Pengadaan Peralatan",
              "Pengembangan Aset Desa"
            ]
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Belanja",
      icon: DollarSign,
      content: {
        tahun: [
          {
            tahun: "2020",
            total: "Rp 900.000.000",
            realisasi: "85%"
          },
          {
            tahun: "2021",
            total: "Rp 1.000.000.000",
            realisasi: "90%"
          },
          {
            tahun: "2022",
            total: "Rp 1.100.000.000",
            realisasi: "95%"
          },
          {
            tahun: "2023",
            total: "Rp 1.200.000.000",
            realisasi: "80%"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Program", path: "/program" },
          { title: "Belanja" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Belanja Desa</h2>
          <p className="text-muted-foreground">
            Informasi belanja desa tahun {belanjaData.umum.content.tahun}
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="kategori">Kategori</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="realisasi">Realisasi</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{belanjaData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar belanja desa tahun {belanjaData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {belanjaData.umum.content.deskripsi}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kategori" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <TrendingDown className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{belanjaData.kategori.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Total belanja: {belanjaData.kategori.content.total}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {belanjaData.kategori.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{kategori.nama}</h4>
                        <p className="text-sm text-muted-foreground">{kategori.deskripsi}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{kategori.jumlah}</span>
                        <p className="text-sm text-muted-foreground">{kategori.persentase}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{belanjaData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program belanja desa tahun {belanjaData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {belanjaData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{program}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realisasi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{belanjaData.realisasi.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Realisasi belanja desa dari tahun ke tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {belanjaData.realisasi.content.tahun.map((tahun, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Tahun {tahun.tahun}</h4>
                      <p className="text-sm text-muted-foreground">Total: {tahun.total}</p>
                    </div>
                    <span className="font-medium">Realisasi: {tahun.realisasi}</span>
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

export default Belanja; 