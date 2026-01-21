import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Target, Calendar, BarChart, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Treemap } from 'recharts';

const RPJMDes = () => {
  const rpjmdesData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes) adalah dokumen perencanaan desa untuk periode 6 (enam) tahun yang memuat visi, misi, tujuan, strategi, kebijakan, program, dan kegiatan pembangunan desa.",
        data: [
          {
            label: "Periode",
            value: "2021-2027"
          },
          {
            label: "Status",
            value: "Berlaku"
          },
          {
            label: "Dasar Hukum",
            value: "Perdes No. 1 Tahun 2021"
          },
          {
            label: "Fokus Utama",
            value: "Peningkatan Ekonomi dan Infrastruktur"
          }
        ]
      }
    },
    visi_misi: {
      title: "Visi & Misi",
      icon: Target,
      content: {
        visi: "Terwujudnya Desa Remau Bakotuo yang Mandiri, Sejahtera, dan Berbudaya.",
        misi: [
          "Meningkatkan kualitas sumber daya manusia.",
          "Mengembangkan ekonomi kreatif dan pariwisata.",
          "Membangun infrastruktur yang merata dan berkelanjutan.",
          "Meningkatkan kualitas pelayanan publik.",
          "Melestarikan budaya dan kearifan lokal."
        ]
      }
    },
    strategi: {
      title: "Strategi & Arah Kebijakan",
      icon: Calendar,
      content: {
        strategi: [
          {
            nama: "Penguatan Ekonomi Lokal",
            arah: "Mendorong pertumbuhan UMKM dan BUMDes melalui pelatihan, pendampingan, dan akses permodalan."
          },
          {
            nama: "Peningkatan Kualitas SDM",
            arah: "Memperbaiki sarana dan prasarana pendidikan serta meningkatkan akses kesehatan bagi seluruh masyarakat."
          },
          {
            nama: "Pembangunan Infrastruktur",
            arah: "Membangun dan memperbaiki jalan, jembatan, irigasi, dan fasilitas umum lainnya secara bertahap dan merata."
          },
          {
            nama: "Reformasi Birokrasi",
            arah: "Meningkatkan transparansi, akuntabilitas, dan kualitas pelayanan publik di tingkat desa."
          }
        ]
      }
    },
    program: {
      title: "Program Prioritas",
      icon: Briefcase,
      content: {
        kategori: [
          {
            bidang: "Penyelenggaraan Pemerintahan",
            program: [
              "Peningkatan kapasitas aparatur desa",
              "Digitalisasi pelayanan publik",
              "Pengelolaan aset desa"
            ]
          },
          {
            bidang: "Pembangunan",
            program: [
              "Pembangunan jalan usaha tani",
              "Pengembangan embung desa",
              "Pembangunan sarana olahraga"
            ]
          },
          {
            bidang: "Pembinaan Kemasyarakatan",
            program: [
              "Penguatan lembaga adat",
              "Pembinaan Karang Taruna dan PKK",
              "Penyelenggaraan festival budaya"
            ]
          },
          {
            bidang: "Pemberdayaan Masyarakat",
            program: [
              "Pelatihan kewirausahaan",
              "Pengembangan produk unggulan desa",
              "Pemberdayaan kelompok tani dan nelayan"
            ]
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
          { title: "RPJMDes" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RPJMDes</h2>
          <p className="text-muted-foreground">
            Rencana Pembangunan Jangka Menengah Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="visi_misi">Visi & Misi</TabsTrigger>
            <TabsTrigger value="strategi">Strategi</TabsTrigger>
            <TabsTrigger value="program">Program Prioritas</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.umum.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {rpjmdesData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {rpjmdesData.umum.content.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visi_misi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.visi_misi.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Visi</h4>
                  <p className="text-muted-foreground italic">&quot;{rpjmdesData.visi_misi.content.visi}&quot;</p>
                </div>
                 <div>
                  <h4 className="font-semibold mb-2">Misi</h4>
                  <ul className="space-y-2">
                    {rpjmdesData.visi_misi.content.misi.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategi" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.strategi.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {rpjmdesData.strategi.content.strategi.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{item.nama}</h4>
                    <p className="text-sm text-muted-foreground">{item.arah}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{rpjmdesData.program.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 {rpjmdesData.program.content.kategori.map((kategori, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{kategori.bidang}</h4>
                     <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Briefcase className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{program}</span>
                          </li>
                        ))}
                      </ul>
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

export default RPJMDes;
