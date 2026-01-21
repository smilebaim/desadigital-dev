import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const BankSampah = () => {
  const bankSampahData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Bank Sampah adalah sistem pengelolaan sampah kering secara kolektif yang mendorong masyarakat untuk berperan aktif dalam pengelolaan sampah. Bank Sampah menerapkan prinsip 3R (Reduce, Reuse, Recycle) dan memberikan insentif kepada masyarakat yang menabung sampah.",
        data: [
          {
            label: "Nama Organisasi",
            value: "Bank Sampah Remaubakotuo"
          },
          {
            label: "Tahun Berdiri",
            value: "2018"
          },
          {
            label: "Jumlah Nasabah",
            value: "100 Orang"
          },
          {
            label: "Status",
            value: "Aktif"
          }
        ]
      }
    },
    program: {
      title: "Program",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pengumpulan",
            program: [
              "Pemilahan Sampah",
              "Pengumpulan Sampah",
              "Penimbangan Sampah",
              "Pencatatan Tabungan"
            ]
          },
          {
            nama: "Pengolahan",
            program: [
              "Daur Ulang Kertas",
              "Daur Ulang Plastik",
              "Daur Ulang Kaca",
              "Kompos Organik"
            ]
          },
          {
            nama: "Pemasaran",
            program: [
              "Penjualan Sampah",
              "Pengolahan Produk",
              "Pemasaran Produk",
              "Distribusi Hasil"
            ]
          },
          {
            nama: "Edukasi",
            program: [
              "Penyuluhan 3R",
              "Pelatihan Pengolahan",
              "Kampanye Lingkungan",
              "Pendampingan Masyarakat"
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
            sampah: "10 Ton",
            nasabah: 50,
            anggaran: "Rp 20.000.000",
            manfaat: "Pengurangan Sampah"
          },
          {
            tahun: "2021",
            sampah: "15 Ton",
            nasabah: 75,
            anggaran: "Rp 25.000.000",
            manfaat: "Peningkatan Partisipasi"
          },
          {
            tahun: "2022",
            sampah: "20 Ton",
            nasabah: 90,
            anggaran: "Rp 30.000.000",
            manfaat: "Pengembangan Produk"
          },
          {
            tahun: "2023",
            sampah: "25 Ton",
            nasabah: 100,
            anggaran: "Rp 35.000.000",
            manfaat: "Peningkatan Ekonomi"
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
            nama: "Ketua Bank Sampah",
            tugas: "Memimpin dan mengkoordinasikan seluruh kegiatan Bank Sampah"
          },
          {
            nama: "Wakil Ketua",
            tugas: "Membantu ketua dalam melaksanakan tugas dan fungsi organisasi"
          },
          {
            nama: "Sekretaris",
            tugas: "Mengelola administrasi dan dokumentasi organisasi"
          },
          {
            nama: "Bendahara",
            tugas: "Mengelola keuangan dan aset organisasi"
          },
          {
            nama: "Petugas Lapangan",
            tugas: "Melaksanakan pengumpulan dan pengolahan sampah"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "Bank Sampah" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bank Sampah</h2>
          <p className="text-muted-foreground">
            Pengelolaan Sampah Berbasis Masyarakat
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bankSampahData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar Bank Sampah
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {bankSampahData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {bankSampahData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bankSampahData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program dan kegiatan Bank Sampah
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {bankSampahData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="kinerja" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bankSampahData.kinerja.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Kinerja Bank Sampah per tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bankSampahData.kinerja.content.tahun.map((tahun, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{tahun.tahun}</h5>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Sampah:</span>
                            <span>{tahun.sampah}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jumlah Nasabah:</span>
                            <span>{tahun.nasabah}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Anggaran:</span>
                            <span>{tahun.anggaran}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Manfaat:</span>
                            <span>{tahun.manfaat}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{bankSampahData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pengelolaan Bank Sampah
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bankSampahData.pengelolaan.content.struktur.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{item.nama}</h4>
                        <p className="text-sm text-muted-foreground">{item.tugas}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BankSampah; 