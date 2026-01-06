import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Building2, LineChart, Users, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const Koperasi = () => {
  const koperasiData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Koperasi adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasarkan asas kekeluargaan.",
        data: [
          {
            label: "Nama Koperasi",
            value: "Koperasi Remaubakotuo"
          },
          {
            label: "Berdiri",
            value: "2020"
          },
          {
            label: "Bentuk Badan Hukum",
            value: "Koperasi Serba Usaha"
          },
          {
            label: "Modal Awal",
            value: "Rp 100.000.000"
          }
        ]
      }
    },
    layanan: {
      title: "Layanan",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Simpanan",
            layanan: [
              "Simpanan Pokok",
              "Simpanan Wajib",
              "Simpanan Sukarela",
              "Deposito"
            ]
          },
          {
            nama: "Pinjaman",
            layanan: [
              "Pinjaman Modal Kerja",
              "Pinjaman Investasi",
              "Pinjaman Konsumtif",
              "Pinjaman Mikro"
            ]
          },
          {
            nama: "Usaha",
            layanan: [
              "Toko Koperasi",
              "Warung Koperasi",
              "Pengolahan Hasil Pertanian",
              "Jasa Keuangan"
            ]
          },
          {
            nama: "Pendidikan",
            layanan: [
              "Pelatihan Koperasi",
              "Pendampingan Usaha",
              "Konsultasi Keuangan",
              "Workshop Kewirausahaan"
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
            modal: "Rp 100.000.000",
            aset: "Rp 150.000.000",
            volume_usaha: "Rp 200.000.000",
            shu: "Rp 20.000.000"
          },
          {
            tahun: "2021",
            modal: "Rp 150.000.000",
            aset: "Rp 200.000.000",
            volume_usaha: "Rp 250.000.000",
            shu: "Rp 25.000.000"
          },
          {
            tahun: "2022",
            modal: "Rp 200.000.000",
            aset: "Rp 250.000.000",
            volume_usaha: "Rp 300.000.000",
            shu: "Rp 30.000.000"
          },
          {
            tahun: "2023",
            modal: "Rp 250.000.000",
            aset: "Rp 300.000.000",
            volume_usaha: "Rp 350.000.000",
            shu: "Rp 35.000.000"
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
            nama: "Rapat Anggota",
            tugas: "Pemegang kekuasaan tertinggi dalam koperasi"
          },
          {
            nama: "Pengurus",
            tugas: "Mengelola koperasi dan usahanya"
          },
          {
            nama: "Pengawas",
            tugas: "Melakukan pengawasan terhadap pengelolaan koperasi"
          },
          {
            nama: "Manajer",
            tugas: "Mengelola operasional koperasi"
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
          { title: "Koperasi" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Koperasi</h2>
          <p className="text-muted-foreground">
            Informasi Koperasi Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="layanan">Layanan</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{koperasiData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar koperasi
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {koperasiData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {koperasiData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layanan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{koperasiData.layanan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Layanan koperasi
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {koperasiData.layanan.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.layanan.map((layanan, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Building2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{layanan}</span>
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
                  <CardTitle>{koperasiData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja keuangan koperasi
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {koperasiData.kinerja.content.tahun.map((tahun, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{tahun.tahun}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Modal</span>
                          <span className="text-sm text-muted-foreground">{tahun.modal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Aset</span>
                          <span className="text-sm text-muted-foreground">{tahun.aset}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Volume Usaha</span>
                          <span className="text-sm text-muted-foreground">{tahun.volume_usaha}</span>
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
                  <CardTitle>{koperasiData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan koperasi
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {koperasiData.pengelolaan.content.struktur.map((jabatan, index) => (
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

export default Koperasi; 