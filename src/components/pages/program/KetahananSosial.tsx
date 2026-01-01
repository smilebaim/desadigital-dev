import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Building2, Heart } from "lucide-react";

const KetahananSosial = () => {
  const sosialData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Ketahanan sosial desa adalah kemampuan desa dalam mempertahankan dan meningkatkan kualitas hidup masyarakat melalui penguatan kelembagaan sosial, pemberdayaan masyarakat, dan pengembangan budaya lokal."
      }
    },
    indikator: {
      title: "Indikator Ketahanan Sosial",
      icon: TrendingUp,
      content: {
        nilai: "0.75",
        status: "Tinggi",
        aspek: [
          {
            nama: "Indeks Pembangunan Manusia",
            nilai: "75.5",
            target: "80",
            deskripsi: "Indeks yang mengukur kualitas hidup manusia"
          },
          {
            nama: "Angka Harapan Hidup",
            nilai: "70",
            target: "75",
            deskripsi: "Rata-rata usia harapan hidup penduduk"
          },
          {
            nama: "Angka Melek Huruf",
            nilai: "95%",
            target: "100%",
            deskripsi: "Persentase penduduk yang melek huruf"
          }
        ]
      }
    },
    program: {
      title: "Program Penguatan Sosial",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Pendidikan",
            program: [
              "Peningkatan Kualitas Pendidikan",
              "Bantuan Beasiswa",
              "Pengembangan Perpustakaan Desa"
            ]
          },
          {
            nama: "Kesehatan",
            program: [
              "Posyandu Lansia",
              "Posyandu Balita",
              "Peningkatan Sanitasi"
            ]
          },
          {
            nama: "Sosial Budaya",
            program: [
              "Pengembangan Budaya Lokal",
              "Pemberdayaan Perempuan",
              "Penguatan Lembaga Adat"
            ]
          }
        ]
      }
    },
    pencapaian: {
      title: "Pencapaian",
      icon: Heart,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: "0.65",
            status: "Sedang"
          },
          {
            tahun: "2021",
            nilai: "0.68",
            status: "Sedang"
          },
          {
            tahun: "2022",
            nilai: "0.72",
            status: "Tinggi"
          },
          {
            tahun: "2023",
            nilai: "0.75",
            status: "Tinggi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Sosial</h2>
          <p className="text-muted-foreground">
            Informasi ketahanan sosial desa tahun {sosialData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sosialData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar ketahanan sosial desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {sosialData.umum.content.deskripsi}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sosialData.indikator.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Nilai: {sosialData.indikator.content.nilai} ({sosialData.indikator.content.status})
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sosialData.indikator.content.aspek.map((aspek, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{aspek.nama}</h4>
                    <p className="text-sm text-muted-foreground">{aspek.deskripsi}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{aspek.nilai}</span>
                    <p className="text-sm text-muted-foreground">Target: {aspek.target}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sosialData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program penguatan sosial desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {sosialData.program.content.kategori.map((kategori, index) => (
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

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sosialData.pencapaian.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pencapaian ketahanan sosial desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sosialData.pencapaian.content.tahun.map((tahun, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Tahun {tahun.tahun}</h4>
                  <p className="text-sm text-muted-foreground">Status: {tahun.status}</p>
                </div>
                <span className="font-medium">Nilai: {tahun.nilai}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KetahananSosial;