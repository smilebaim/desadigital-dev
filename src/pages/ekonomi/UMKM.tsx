import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Store, LineChart, Users, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const UMKM = () => {
  const umkmData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "UMKM (Usaha Mikro, Kecil, dan Menengah) adalah usaha produktif yang dimiliki perorangan maupun badan usaha sesuai dengan kriteria yang ditetapkan oleh Undang-Undang. UMKM memiliki peran penting dalam perekonomian desa.",
        data: [
          {
            label: "Total UMKM",
            value: "150 Unit"
          },
          {
            label: "Usaha Mikro",
            value: "100 Unit"
          },
          {
            label: "Usaha Kecil",
            value: "40 Unit"
          },
          {
            label: "Usaha Menengah",
            value: "10 Unit"
          }
        ]
      }
    },
    sektor: {
      title: "Sektor Usaha",
      icon: Store,
      content: {
        kategori: [
          {
            nama: "Pertanian",
            usaha: [
              "Budidaya Tanaman",
              "Peternakan",
              "Perikanan",
              "Perkebunan"
            ]
          },
          {
            nama: "Perdagangan",
            usaha: [
              "Warung Makan",
              "Toko Kelontong",
              "Pasar Tradisional",
              "E-commerce"
            ]
          },
          {
            nama: "Industri",
            usaha: [
              "Makanan & Minuman",
              "Kerajinan",
              "Konveksi",
              "Pengolahan Hasil Pertanian"
            ]
          },
          {
            nama: "Jasa",
            usaha: [
              "Warung Internet",
              "Bengkel",
              "Salon",
              "Jasa Transportasi"
            ]
          }
        ]
      }
    },
    kinerja: {
      title: "Kinerja",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2020",
            omzet: "Rp 1.000.000.000",
            tenaga_kerja: "300 Orang",
            kontribusi: "15%"
          },
          {
            tahun: "2021",
            omzet: "Rp 1.200.000.000",
            tenaga_kerja: "350 Orang",
            kontribusi: "18%"
          },
          {
            tahun: "2022",
            omzet: "Rp 1.500.000.000",
            tenaga_kerja: "400 Orang",
            kontribusi: "20%"
          },
          {
            tahun: "2023",
            omzet: "Rp 1.800.000.000",
            tenaga_kerja: "450 Orang",
            kontribusi: "22%"
          }
        ]
      }
    },
    pengembangan: {
      title: "Pengembangan",
      icon: Briefcase,
      content: {
        program: [
          {
            nama: "Pelatihan",
            deskripsi: "Program peningkatan kapasitas pelaku UMKM"
          },
          {
            nama: "Pendampingan",
            deskripsi: "Pendampingan teknis dan manajemen usaha"
          },
          {
            nama: "Pembiayaan",
            deskripsi: "Akses modal usaha dan pembiayaan"
          },
          {
            nama: "Pemasaran",
            deskripsi: "Pengembangan pasar dan pemasaran produk"
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
          { title: "UMKM" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">UMKM</h2>
          <p className="text-muted-foreground">
            Informasi Usaha Mikro, Kecil, dan Menengah
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="sektor">Sektor Usaha</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengembangan">Pengembangan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{umkmData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar UMKM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {umkmData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {umkmData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sektor" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Store className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{umkmData.sektor.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sektor usaha UMKM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {umkmData.sektor.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.usaha.map((usaha, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Store className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{usaha}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kinerja" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{umkmData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja UMKM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {umkmData.kinerja.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Omzet</span>
                          <span className="text-sm text-muted-foreground">{tahun.omzet}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Tenaga Kerja</span>
                          <span className="text-sm text-muted-foreground">{tahun.tenaga_kerja}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Kontribusi PDRB</span>
                          <span className="text-sm text-muted-foreground">{tahun.kontribusi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengembangan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{umkmData.pengembangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program pengembangan UMKM
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {umkmData.pengembangan.content.program.map((program, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{program.nama}</h4>
                        <p className="text-sm text-muted-foreground">{program.deskripsi}</p>
                      </div>
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

export default UMKM; 