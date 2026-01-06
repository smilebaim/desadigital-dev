import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DollarSign, TrendingUp, Building2, Users } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const KetahananEkonomi = () => {
  const ekonomiData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Ketahanan ekonomi desa adalah kemampuan desa dalam mempertahankan dan meningkatkan kesejahteraan ekonomi masyarakat melalui pengembangan potensi ekonomi lokal, pemberdayaan masyarakat, dan penguatan kelembagaan ekonomi desa."
      }
    },
    indikator: {
      title: "Indikator Ketahanan Ekonomi",
      icon: TrendingUp,
      content: {
        nilai: "0.80",
        status: "Tinggi",
        aspek: [
          {
            nama: "Pertumbuhan Ekonomi",
            nilai: "5.5%",
            target: "7%",
            deskripsi: "Pertumbuhan ekonomi desa berdasarkan PDRB"
          },
          {
            nama: "Pendapatan Per Kapita",
            nilai: "Rp 4.500.000",
            target: "Rp 5.000.000",
            deskripsi: "Rata-rata pendapatan per kapita per tahun"
          },
          {
            nama: "Angka Kemiskinan",
            nilai: "5%",
            target: "0%",
            deskripsi: "Persentase penduduk miskin"
          }
        ]
      }
    },
    program: {
      title: "Program Penguatan Ekonomi",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Pengembangan UMKM",
            program: [
              "Pelatihan Kewirausahaan",
              "Bantuan Modal Usaha",
              "Pemasaran Produk"
            ]
          },
          {
            nama: "Pengembangan Sektor Pertanian",
            program: [
              "Intensifikasi Pertanian",
              "Diversifikasi Tanaman",
              "Pengembangan Agribisnis"
            ]
          },
          {
            nama: "Pengembangan Pariwisata",
            program: [
              "Pengembangan Destinasi",
              "Pemberdayaan Masyarakat",
              "Promosi Wisata"
            ]
          }
        ]
      }
    },
    pencapaian: {
      title: "Pencapaian",
      icon: DollarSign,
      content: {
        tahun: [
          {
            tahun: "2020",
            nilai: "0.65",
            status: "Sedang"
          },
          {
            tahun: "2021",
            nilai: "0.70",
            status: "Sedang"
          },
          {
            tahun: "2022",
            nilai: "0.75",
            status: "Tinggi"
          },
          {
            tahun: "2023",
            nilai: "0.80",
            status: "Tinggi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { title: "Program", path: "/program" },
          { title: "Ketahanan Ekonomi" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Ekonomi</h2>
          <p className="text-muted-foreground">
            Informasi ketahanan ekonomi desa tahun {ekonomiData.umum.content.tahun}
          </p>
        </div>

        <Tabs defaultValue="umum" className="space-y-4">
          <TabsList>
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="indikator">Indikator</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="pencapaian">Pencapaian</TabsTrigger>
          </TabsList>

          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ekonomiData.umum.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Informasi dasar ketahanan ekonomi desa tahun {ekonomiData.umum.content.tahun}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="indikator" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ekonomiData.indikator.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nilai: {ekonomiData.indikator.content.nilai} ({ekonomiData.indikator.content.status})
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {ekonomiData.indikator.content.aspek.map((aspek, index) => (
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
          </TabsContent>

          <TabsContent value="program" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ekonomiData.program.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Program penguatan ekonomi desa tahun {ekonomiData.umum.content.tahun}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {ekonomiData.program.content.kategori.map((kategori, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{kategori.nama}</h4>
                      <ul className="space-y-2 mt-2">
                        {kategori.program.map((program, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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

          <TabsContent value="pencapaian" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{ekonomiData.pencapaian.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Pencapaian ketahanan ekonomi desa dari tahun ke tahun
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {ekonomiData.pencapaian.content.tahun.map((tahun, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KetahananEkonomi; 