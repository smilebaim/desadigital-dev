
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, LineChart, Briefcase } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const KetahananEkonomi = () => {
  const ekonomiData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        deskripsi: "Ketahanan Ekonomi Desa adalah kemampuan desa dalam mengelola dan memanfaatkan sumber daya ekonomi untuk meningkatkan kesejahteraan masyarakat, menciptakan lapangan kerja, dan mengembangkan perekonomian desa secara berkelanjutan.",
        data: [
          {
            label: "Status Ketahanan",
            value: "Baik"
          },
          {
            label: "Nilai Indeks",
            value: "0.7567"
          },
          {
            label: "Tahun",
            value: "2024"
          },
          {
            label: "Kategori",
            value: "Desa Mandiri"
          }
        ]
      }
    },
    sektor: {
      title: "Sektor Ekonomi",
      icon: Users,
      content: {
        kategori: [
          {
            nama: "Pertanian",
            nilai: 0.8234,
            persentase: "82.34%",
            indikator: [
              {
                nama: "Produktivitas",
                nilai: 0.8567,
                status: "Sangat Baik"
              },
              {
                nama: "Teknologi",
                nilai: 0.8234,
                status: "Baik"
              },
              {
                nama: "Pemasaran",
                nilai: 0.7890,
                status: "Baik"
              },
              {
                nama: "Kelembagaan",
                nilai: 0.8123,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Perdagangan",
            nilai: 0.7567,
            persentase: "75.67%",
            indikator: [
              {
                nama: "UMKM",
                nilai: 0.7789,
                status: "Baik"
              },
              {
                nama: "Pasar Desa",
                nilai: 0.7456,
                status: "Baik"
              },
              {
                nama: "Ekspor",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Digital",
                nilai: 0.7789,
                status: "Baik"
              }
            ]
          },
          {
            nama: "Jasa",
            nilai: 0.7123,
            persentase: "71.23%",
            indikator: [
              {
                nama: "Pariwisata",
                nilai: 0.7567,
                status: "Baik"
              },
              {
                nama: "Transportasi",
                nilai: 0.7234,
                status: "Cukup"
              },
              {
                nama: "Pendidikan",
                nilai: 0.6789,
                status: "Cukup"
              },
              {
                nama: "Kesehatan",
                nilai: 0.6901,
                status: "Cukup"
              }
            ]
          }
        ]
      }
    },
    perkembangan: {
      title: "Perkembangan",
      icon: LineChart,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: 0.6123,
            status: "Cukup"
          },
          {
            tahun: "2021",
            nilai: 0.6456,
            status: "Cukup"
          },
          {
            tahun: "2022",
            nilai: 0.6789,
            status: "Baik"
          },
          {
            tahun: "2023",
            nilai: 0.7123,
            status: "Baik"
          },
          {
            tahun: "2024",
            nilai: 0.7567,
            status: "Baik"
          }
        ]
      }
    },
    strategi: {
      title: "Strategi",
      icon: Briefcase,
      content: {
        program: [
          {
            nama: "Penguatan Pertanian",
            target: "Meningkatkan Ketahanan Pangan",
            kegiatan: [
              "Modernisasi Pertanian",
              "Pengembangan Agribisnis",
              "Peningkatan Produktivitas",
              "Penguatan Kelembagaan"
            ]
          },
          {
            nama: "Pengembangan UMKM",
            target: "Meningkatkan Ekonomi Kerakyatan",
            kegiatan: [
              "Pelatihan Kewirausahaan",
              "Akses Permodalan",
              "Pemasaran Digital",
              "Pengembangan Produk"
            ]
          },
          {
            nama: "Pengembangan Pariwisata",
            target: "Meningkatkan Pendapatan Desa",
            kegiatan: [
              "Pengembangan Destinasi",
              "Peningkatan SDM",
              "Promosi Wisata",
              "Pengembangan Homestay"
            ]
          }
        ]
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sangat baik":
        return "text-green-600";
      case "baik":
        return "text-green-500";
      case "cukup":
        return "text-yellow-500";
      case "kurang":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Ekonomi</h2>
          <p className="text-muted-foreground">
            Indeks Ketahanan Ekonomi Desa
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ekonomiData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar Ketahanan Ekonomi Desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {ekonomiData.umum.content.deskripsi}
              </p>
            </div>
            <div className="space-y-2">
              {ekonomiData.umum.content.data.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ekonomiData.sektor.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sektor dan Indikator Ekonomi Desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {ekonomiData.sektor.content.kategori.map((kategori, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <h4 className="font-semibold">{kategori.nama}</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nilai: {kategori.nilai}</span>
                      <span>{kategori.persentase}</span>
                    </div>
                    <Progress value={kategori.nilai * 100} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  {kategori.indikator.map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium">{item.nama}</h5>
                            <span className={`text-sm ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Nilai: {item.nilai}</span>
                            </div>
                            <Progress value={item.nilai * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <LineChart className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ekonomiData.perkembangan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Perkembangan Ketahanan Ekonomi per tahun
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ekonomiData.perkembangan.content.tahun.map((tahun, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">{tahun.tahun}</h5>
                      <span className="text-sm text-muted-foreground">{tahun.status}</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Nilai: {tahun.nilai}</span>
                      </div>
                      <Progress value={tahun.nilai * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ekonomiData.strategi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Strategi penguatan ekonomi desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ekonomiData.strategi.content.program.map((program, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{program.nama}</h4>
                      <p className="text-sm text-muted-foreground">Target: {program.target}</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Kegiatan:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {program.kegiatan.map((kegiatan, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {kegiatan}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KetahananEkonomi;
