import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BookOpen, BarChart, Users, Leaf, Building2, DollarSign, ArrowUpDown, Wallet } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const DaftarProgram = () => {
  const programData = {
    rkp: {
      title: "RKPDes",
      icon: FileText,
      content: {
        tahun: "2024",
        deskripsi: "Rencana Kerja Pemerintah Desa tahun 2024",
        program: [
          {
            nama: "Pembangunan Infrastruktur",
            deskripsi: "Pembangunan dan perbaikan sarana prasarana desa",
            kegiatan: [
              "Pembangunan jalan desa",
              "Perbaikan drainase",
              "Pembangunan MCK umum",
              "Pembangunan posyandu"
            ]
          },
          {
            nama: "Pemberdayaan Masyarakat",
            deskripsi: "Program peningkatan kapasitas masyarakat",
            kegiatan: [
              "Pelatihan UMKM",
              "Pendampingan kelompok tani",
              "Pelatihan pengolahan hasil perikanan",
              "Pembinaan karang taruna"
            ]
          }
        ]
      }
    },
    rpjm: {
      title: "RPJMDes",
      icon: BookOpen,
      content: {
        periode: "2021-2026",
        deskripsi: "Rencana Pembangunan Jangka Menengah Desa",
        program: [
          {
            nama: "Pengembangan Ekonomi",
            deskripsi: "Program penguatan ekonomi desa",
            kegiatan: [
              "Pengembangan wisata desa",
              "Pemberdayaan UMKM",
              "Pengembangan pertanian",
              "Pengembangan perikanan"
            ]
          },
          {
            nama: "Pembangunan Sosial",
            deskripsi: "Program peningkatan kesejahteraan sosial",
            kegiatan: [
              "Peningkatan pendidikan",
              "Peningkatan kesehatan",
              "Penguatan kelembagaan",
              "Pemberdayaan perempuan"
            ]
          }
        ]
      }
    },
    idm: {
      title: "Indeks Desa Membangun",
      icon: BarChart,
      content: {
        tahun: "2023",
        nilai: "0.75",
        status: "Maju",
        aspek: [
          {
            nama: "Ekonomi",
            nilai: "0.80",
            indikator: [
              "Pertumbuhan ekonomi",
              "Kemiskinan",
              "Pengangguran",
              "Pendapatan per kapita"
            ]
          },
          {
            nama: "Sosial",
            nilai: "0.75",
            indikator: [
              "Pendidikan",
              "Kesehatan",
              "Kesejahteraan",
              "Kebudayaan"
            ]
          },
          {
            nama: "Lingkungan",
            nilai: "0.70",
            indikator: [
              "Sanitasi",
              "Air bersih",
              "Pengelolaan sampah",
              "RTH"
            ]
          }
        ]
      }
    },
    ketahanan: {
      title: "Ketahanan Desa",
      icon: Building2,
      content: {
        ekonomi: {
          title: "Ketahanan Ekonomi",
          icon: DollarSign,
          indikator: [
            "Pertumbuhan ekonomi stabil",
            "Pengangguran rendah",
            "UMKM berkembang",
            "Pendapatan meningkat"
          ]
        },
        sosial: {
          title: "Ketahanan Sosial",
          icon: Users,
          indikator: [
            "Gotong royong kuat",
            "Kesejahteraan meningkat",
            "Pendidikan merata",
            "Kesehatan terjaga"
          ]
        },
        lingkungan: {
          title: "Ketahanan Lingkungan",
          icon: Leaf,
          indikator: [
            "Lingkungan bersih",
            "SDA lestari",
            "Bencana minimal",
            "Adaptasi iklim"
          ]
        }
      }
    },
    sdgs: {
      title: "SDGs Desa",
      icon: FileText,
      content: {
        target: [
          {
            nomor: "1",
            nama: "Desa Tanpa Kemiskinan",
            indikator: [
              "Penurunan kemiskinan",
              "Bantuan sosial tepat",
              "Pemberdayaan ekonomi",
              "Kesempatan kerja"
            ]
          },
          {
            nomor: "2",
            nama: "Desa Tanpa Kelaparan",
            indikator: [
              "Ketahanan pangan",
              "Gizi seimbang",
              "Pertanian berkelanjutan",
              "Pangan lokal"
            ]
          },
          {
            nomor: "3",
            nama: "Desa Sehat dan Sejahtera",
            indikator: [
              "Kesehatan universal",
              "Sanitasi layak",
              "Air bersih",
              "Lingkungan sehat"
            ]
          }
        ]
      }
    },
    keuangan: {
      title: "Keuangan Desa",
      icon: Wallet,
      content: {
        pendapatan: {
          title: "Pendapatan",
          icon: ArrowUpDown,
          sumber: [
            {
              nama: "Dana Desa",
              jumlah: "Rp 1.000.000.000",
              persentase: "60%"
            },
            {
              nama: "PADes",
              jumlah: "Rp 400.000.000",
              persentase: "25%"
            },
            {
              nama: "Bantuan",
              jumlah: "Rp 200.000.000",
              persentase: "15%"
            }
          ]
        },
        belanja: {
          title: "Belanja",
          icon: DollarSign,
          jenis: [
            {
              nama: "Pembangunan",
              jumlah: "Rp 800.000.000",
              persentase: "50%"
            },
            {
              nama: "Pemberdayaan",
              jumlah: "Rp 400.000.000",
              persentase: "25%"
            },
            {
              nama: "Operasional",
              jumlah: "Rp 400.000.000",
              persentase: "25%"
            }
          ]
        },
        pembiayaan: {
          title: "Pembiayaan",
          icon: ArrowUpDown,
          jenis: [
            {
              nama: "Sisa Tahun Lalu",
              jumlah: "Rp 100.000.000",
              persentase: "100%"
            }
          ]
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Program", path: "/program" },
          { title: "Daftar Program" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daftar Program</h2>
          <p className="text-muted-foreground">
            Program dan dokumen perencanaan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="rkp" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rkp">RKPDes</TabsTrigger>
            <TabsTrigger value="rpjm">RPJMDes</TabsTrigger>
            <TabsTrigger value="idm">IDM</TabsTrigger>
            <TabsTrigger value="ketahanan">Ketahanan</TabsTrigger>
            <TabsTrigger value="sdgs">SDGs</TabsTrigger>
            <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
          </TabsList>

          <TabsContent value="rkp" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.rkp.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Rencana Kerja Pemerintah Desa {programData.rkp.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.rkp.content.program.map((prog, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{prog.nama}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prog.deskripsi}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {prog.kegiatan.map((kegiatan, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{kegiatan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rpjm" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.rpjm.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Periode {programData.rpjm.content.periode}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.rpjm.content.program.map((prog, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{prog.nama}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prog.deskripsi}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {prog.kegiatan.map((kegiatan, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <BookOpen className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{kegiatan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="idm" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BarChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.idm.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahun {programData.idm.content.tahun} - Status: {programData.idm.content.status}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.idm.content.aspek.map((aspek, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{aspek.nama}</h4>
                      <p className="text-sm text-muted-foreground">
                        Nilai: {aspek.nilai}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {aspek.indikator.map((indikator, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <BarChart className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{indikator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ketahanan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.ketahanan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Indeks ketahanan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.ketahanan.content.ekonomi.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {programData.ketahanan.content.ekonomi.indikator.map((indikator, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{indikator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.ketahanan.content.sosial.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {programData.ketahanan.content.sosial.indikator.map((indikator, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{indikator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.ketahanan.content.lingkungan.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {programData.ketahanan.content.lingkungan.indikator.map((indikator, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{indikator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdgs" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.sdgs.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tujuan Pembangunan Berkelanjutan Desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.sdgs.content.target.map((target, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">SDGs {target.nomor}: {target.nama}</h4>
                    </div>
                    <ul className="space-y-2">
                      {target.indikator.map((indikator, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{indikator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keuangan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wallet className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.keuangan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Laporan keuangan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.keuangan.content.pendapatan.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {programData.keuangan.content.pendapatan.sumber.map((sumber, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{sumber.nama}</span>
                        <div className="text-right">
                          <span className="font-medium">{sumber.jumlah}</span>
                          <span className="text-muted-foreground ml-2">({sumber.persentase})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.keuangan.content.belanja.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {programData.keuangan.content.belanja.jenis.map((jenis, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{jenis.nama}</span>
                        <div className="text-right">
                          <span className="font-medium">{jenis.jumlah}</span>
                          <span className="text-muted-foreground ml-2">({jenis.persentase})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{programData.keuangan.content.pembiayaan.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {programData.keuangan.content.pembiayaan.jenis.map((jenis, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{jenis.nama}</span>
                        <div className="text-right">
                          <span className="font-medium">{jenis.jumlah}</span>
                          <span className="text-muted-foreground ml-2">({jenis.persentase})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DaftarProgram; 