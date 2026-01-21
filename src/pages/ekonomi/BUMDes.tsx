import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Building2, LineChart, Users, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const BUMDes = () => {
  const bumdesData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "BUMDes adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh desa melalui penyertaan secara langsung yang berasal dari kekayaan desa yang dipisahkan guna mengelola aset, jasa pelayanan, dan usaha lainnya untuk sebesar-besarnya kesejahteraan masyarakat desa.",
        data: [
          {
            label: "Nama BUMDes",
            value: "BUMDes Remaubakotuo"
          },
          {
            label: "Berdiri",
            value: "2020"
          },
          {
            label: "Bentuk Badan Hukum",
            value: "Peraturan Desa"
          },
          {
            label: "Modal Awal",
            value: "Rp 500.000.000"
          }
        ]
      }
    },
    unit: {
      title: "Unit Usaha",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Jasa Keuangan",
            unit: [
              "Simpan Pinjam",
              "Pembayaran Pajak",
              "Pembayaran Listrik",
              "Pembayaran Air"
            ]
          },
          {
            nama: "Jasa Umum",
            unit: [
              "Air Minum",
              "Listrik Desa",
              "Internet Desa",
              "Pengelolaan Pasar"
            ]
          },
          {
            nama: "Perdagangan",
            unit: [
              "Toko Desa",
              "Warung Desa",
              "Pasar Desa",
              "Pengolahan Hasil Pertanian"
            ]
          },
          {
            nama: "Pariwisata",
            unit: [
              "Homestay",
              "Wisata Alam",
              "Wisata Budaya",
              "Kuliner"
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
            pendapatan: "Rp 100.000.000",
            laba: "Rp 20.000.000",
            shu: "Rp 10.000.000"
          },
          {
            tahun: "2021",
            pendapatan: "Rp 150.000.000",
            laba: "Rp 30.000.000",
            shu: "Rp 15.000.000"
          },
          {
            tahun: "2022",
            pendapatan: "Rp 200.000.000",
            laba: "Rp 40.000.000",
            shu: "Rp 20.000.000"
          },
          {
            tahun: "2023",
            pendapatan: "Rp 250.000.000",
            laba: "Rp 50.000.000",
            shu: "Rp 25.000.000"
          }
        ]
      }
    },
    pengelolaan: {
      title: "Pengelolaan",
      icon: Briefcase,
      content: {
        struktur: [
          {
            nama: "Direktur",
            tugas: "Memimpin dan mengelola BUMDes secara keseluruhan"
          },
          {
            nama: "Manager Unit",
            tugas: "Mengelola unit usaha sesuai bidangnya"
          },
          {
            nama: "Staff Operasional",
            tugas: "Melaksanakan operasional unit usaha"
          },
          {
            nama: "Staff Keuangan",
            tugas: "Mengelola keuangan dan pembukuan"
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
          { title: "BUMDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">BUMDes</h2>
          <p className="text-muted-foreground">
            Informasi Badan Usaha Milik Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="unit">Unit Usaha</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bumdesData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar BUMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {bumdesData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {bumdesData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unit" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bumdesData.unit.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Unit-unit usaha BUMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {bumdesData.unit.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.unit.map((unit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Building2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{unit}</span>
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
                  <CardTitle>{bumdesData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja keuangan BUMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {bumdesData.kinerja.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Pendapatan</span>
                          <span className="text-sm text-muted-foreground">{tahun.pendapatan}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Laba</span>
                          <span className="text-sm text-muted-foreground">{tahun.laba}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">SHU</span>
                          <span className="text-sm text-muted-foreground">{tahun.shu}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bumdesData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan BUMDes
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bumdesData.pengelolaan.content.struktur.map((jabatan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{jabatan.nama}</h4>
                        <p className="text-sm text-muted-foreground">{jabatan.tugas}</p>
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

export default BUMDes; 