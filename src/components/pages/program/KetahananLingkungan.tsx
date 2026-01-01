import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Leaf, TrendingUp, Building2, TreePine } from "lucide-react";

const KetahananLingkungan = () => {
  const lingkunganData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Ketahanan lingkungan desa adalah kemampuan desa dalam mempertahankan dan meningkatkan kualitas lingkungan melalui pengelolaan sumber daya alam, pengendalian pencemaran, dan pengembangan energi terbarukan."
      }
    },
    indikator: {
      title: "Indikator Ketahanan Lingkungan",
      icon: TrendingUp,
      content: {
        nilai: "0.70",
        status: "Tinggi",
        aspek: [
          {
            nama: "Kualitas Air",
            nilai: "75%",
            target: "100%",
            deskripsi: "Persentase kualitas air yang memenuhi standar"
          },
          {
            nama: "Pengelolaan Sampah",
            nilai: "70%",
            target: "100%",
            deskripsi: "Persentase sampah yang dikelola dengan baik"
          },
          {
            nama: "Tutupan Vegetasi",
            nilai: "65%",
            target: "80%",
            deskripsi: "Persentase lahan yang tertutup vegetasi"
          }
        ]
      }
    },
    program: {
      title: "Program Penguatan Lingkungan",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Pengelolaan Sampah",
            program: [
              "Bank Sampah",
              "Komposting",
              "Pengurangan Sampah Plastik"
            ]
          },
          {
            nama: "Pengelolaan Air",
            program: [
              "Pengolahan Air Limbah",
              "Konservasi Air",
              "Peningkatan Kualitas Air"
            ]
          },
          {
            nama: "Konservasi Lingkungan",
            program: [
              "Penghijauan",
              "Pengembangan Energi Terbarukan",
              "Pemulihan Lahan Kritis"
            ]
          }
        ]
      }
    },
    pencapaian: {
      title: "Pencapaian",
      icon: TreePine,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: "0.60",
            status: "Sedang"
          },
          {
            tahun: "2021",
            nilai: "0.63",
            status: "Sedang"
          },
          {
            tahun: "2022",
            nilai: "0.67",
            status: "Tinggi"
          },
          {
            tahun: "2023",
            nilai: "0.70",
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
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Lingkungan</h2>
          <p className="text-muted-foreground">
            Informasi ketahanan lingkungan desa tahun {lingkunganData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{lingkunganData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar ketahanan lingkungan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {lingkunganData.umum.content.deskripsi}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{lingkunganData.indikator.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Nilai: {lingkunganData.indikator.content.nilai} ({lingkunganData.indikator.content.status})
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lingkunganData.indikator.content.aspek.map((aspek, index) => (
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
              <CardTitle>{lingkunganData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program penguatan lingkungan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {lingkunganData.program.content.kategori.map((kategori, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <h4 className="font-semibold">{kategori.nama}</h4>
                  <ul className="space-y-2 mt-2">
                    {kategori.program.map((program, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
            <TreePine className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{lingkunganData.pencapaian.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pencapaian ketahanan lingkungan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lingkunganData.pencapaian.content.tahun.map((tahun, index) => (
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

export default KetahananLingkungan;