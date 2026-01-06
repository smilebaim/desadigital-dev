import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Clock, AlertTriangle, FileText, Users, LineChart, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, Treemap } from 'recharts';

const DaftarProgram = () => {
  const programData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Daftar Program Pembangunan Desa adalah kumpulan program dan kegiatan pembangunan yang direncanakan dan dilaksanakan oleh Pemerintah Desa dalam rangka mewujudkan visi dan misi pembangunan desa. Program-program ini mencakup berbagai aspek pembangunan seperti infrastruktur, ekonomi, sosial, dan budaya.",
        data: [
          {
            label: "Total Program",
            value: "25 Program"
          },
          {
            label: "Tahun Anggaran",
            value: "2024"
          },
          {
            label: "Status",
            value: "Aktif"
          },
          {
            label: "Sumber Dana",
            value: "Dana Desa, ADD, BUMDes"
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
            nama: "Infrastruktur",
            program: [
              {
                nama: "Pembangunan Jalan Desa",
                lokasi: "Dusun I, II, III",
                anggaran: "Rp 500.000.000",
                target: "1.5 km jalan hotmix",
                status: "Berjalan"
              },
              {
                nama: "Pembangunan Drainase",
                lokasi: "Dusun II",
                anggaran: "Rp 200.000.000",
                target: "500m drainase",
                status: "Berjalan"
              },
              {
                nama: "Pembangunan MCK Umum",
                lokasi: "Dusun III",
                anggaran: "Rp 150.000.000",
                target: "2 unit MCK",
                status: "Berjalan"
              }
            ]
          },
          {
            nama: "Ekonomi",
            program: [
              {
                nama: "Pengembangan UMKM",
                lokasi: "Seluruh Dusun",
                anggaran: "Rp 300.000.000",
                target: "50 UMKM",
                status: "Berjalan"
              },
              {
                nama: "Pengembangan BUMDes",
                lokasi: "Kantor Desa",
                anggaran: "Rp 250.000.000",
                target: "3 unit usaha",
                status: "Berjalan"
              },
              {
                nama: "Pengembangan Wisata",
                lokasi: "Dusun I",
                anggaran: "Rp 200.000.000",
                target: "2 destinasi",
                status: "Berjalan"
              }
            ]
          },
          {
            nama: "Sosial",
            program: [
              {
                nama: "Peningkatan Kesehatan",
                lokasi: "Seluruh Dusun",
                anggaran: "Rp 100.000.000",
                target: "3 Posyandu",
                status: "Berjalan"
              },
              {
                nama: "Pengembangan Pendidikan",
                lokasi: "Seluruh Dusun",
                anggaran: "Rp 150.000.000",
                target: "100 siswa",
                status: "Berjalan"
              },
              {
                nama: "Pemberdayaan Perempuan",
                lokasi: "Seluruh Dusun",
                anggaran: "Rp 100.000.000",
                target: "5 kelompok",
                status: "Berjalan"
              }
            ]
          }
        ]
      }
    },
    anggaran: {
      title: "Anggaran",
      icon: LineChart,
      content: {
        total: "Rp 2.050.000.000",
        sumber: [
          {
            nama: "Dana Desa",
            jumlah: "Rp 1.500.000.000",
            persentase: "73.17%"
          },
          {
            nama: "Alokasi Dana Desa",
            jumlah: "Rp 400.000.000",
            persentase: "19.51%"
          },
          {
            nama: "BUMDes",
            jumlah: "Rp 150.000.000",
            persentase: "7.32%"
          }
        ],
        alokasi: [
          {
            kategori: "Infrastruktur",
            jumlah: "Rp 850.000.000",
            persentase: "41.46%"
          },
          {
            kategori: "Ekonomi",
            jumlah: "Rp 750.000.000",
            persentase: "36.59%"
          },
          {
            kategori: "Sosial",
            jumlah: "Rp 350.000.000",
            persentase: "17.07%"
          },
          {
            kategori: "Administrasi",
            jumlah: "Rp 100.000.000",
            persentase: "4.88%"
          }
        ]
      }
    },
    pengelolaan: {
      title: "Pengelolaan",
      icon: Briefcase,
      content: {
        tahapan: [
          {
            nama: "Perencanaan",
            deskripsi: "Penyusunan program berdasarkan RPJMDes dan RKPDes"
          },
          {
            nama: "Pembahasan",
            deskripsi: "Musyawarah Desa untuk membahas dan menyepakati program"
          },
          {
            nama: "Pelaksanaan",
            deskripsi: "Implementasi program oleh Tim Pelaksana"
          },
          {
            nama: "Pengawasan",
            deskripsi: "Monitoring dan evaluasi oleh Tim Pengawas"
          },
          {
            nama: "Pelaporan",
            deskripsi: "Penyusunan laporan pertanggungjawaban"
          }
        ]
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "tinggi":
        return "bg-red-500";
      case "menengah":
        return "bg-yellow-500";
      case "rendah":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aktif":
        return "bg-green-500";
      case "persiapan":
        return "bg-yellow-500";
      case "perencanaan":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const anggaranByPeriod = [
    {
      name: 'Jangka Pendek',
      Infrastruktur: 800,
      Ekonomi: 550,
      Sosial: 0
    },
    {
      name: 'Jangka Menengah',
      Infrastruktur: 0,
      Ekonomi: 1800,
      Sosial: 1500
    },
    {
      name: 'Jangka Panjang',
      Infrastruktur: 3000,
      Ekonomi: 2000,
      Sosial: 1500
    }
  ];

  const prioritasData = [
    { name: 'Tinggi', value: 5 },
    { name: 'Menengah', value: 3 },
    { name: 'Rendah', value: 1 }
  ];

  const treeMapData = [
    {
      name: 'Jangka Pendek',
      children: [
        { name: 'Jalan Desa', size: 800 },
        { name: 'BUMDes', size: 300 },
        { name: 'UMKM', size: 250 }
      ]
    },
    {
      name: 'Jangka Menengah',
      children: [
        { name: 'Wisata', size: 1500 },
        { name: 'Pertanian', size: 1000 },
        { name: 'Pasar', size: 800 }
      ]
    },
    {
      name: 'Jangka Panjang',
      children: [
        { name: 'Smart Village', size: 2000 },
        { name: 'Energi', size: 1500 },
        { name: 'Kawasan Terpadu', size: 3000 }
      ]
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Pembangunan", path: "/pembangunan" },
          { title: "Daftar Program" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daftar Program</h2>
          <p className="text-muted-foreground">
            Program Pembangunan Desa
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="anggaran">Anggaran</TabsTrigger>
            <TabsTrigger value="pengelolaan">Pengelolaan</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar program pembangunan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-sm text-muted-foreground">
                    {programData.umum.content.deskripsi}
                  </p>
                </div>
                <div className="space-y-2">
                  {programData.umum.content.data.map((item, index) => (
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
                  <CardTitle>{programData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Daftar program pembangunan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {programData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <div className="space-y-4 mt-4">
                        {kategori.program.map((program, idx) => (
                          <Card key={idx}>
                            <CardContent className="pt-6">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-medium">{program.nama}</h5>
                                  <span className="text-sm text-muted-foreground">{program.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Lokasi:</span>
                                    <p>{program.lokasi}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Anggaran:</span>
                                    <p>{program.anggaran}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-muted-foreground">Target:</span>
                                    <p>{program.target}</p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anggaran" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <LineChart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.anggaran.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi anggaran program
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Total Anggaran</h4>
                  <p className="text-2xl font-bold">{programData.anggaran.content.total}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Sumber Dana</h4>
                  <div className="space-y-4">
                    {programData.anggaran.content.sumber.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.nama}</span>
                          <span className="text-sm text-muted-foreground">{item.persentase}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.jumlah}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Alokasi Anggaran</h4>
                  <div className="space-y-4">
                    {programData.anggaran.content.alokasi.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.kategori}</span>
                          <span className="text-sm text-muted-foreground">{item.persentase}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.jumlah}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pengelolaan" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{programData.pengelolaan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tahapan pengelolaan program
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {programData.pengelolaan.content.tahapan.map((tahap, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{tahap.nama}</h4>
                        <p className="text-sm text-muted-foreground">{tahap.deskripsi}</p>
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

export default DaftarProgram; 