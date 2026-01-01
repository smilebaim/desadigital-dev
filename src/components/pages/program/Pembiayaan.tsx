import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Building2, DollarSign, Wallet } from "lucide-react";

const Pembiayaan = () => {
  const pembiayaanData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Informasi pembiayaan desa meliputi penerimaan pembiayaan dan pengeluaran pembiayaan yang dilakukan oleh pemerintah desa dalam rangka melaksanakan program dan kegiatan pembangunan desa."
      }
    },
    kategori: {
      title: "Kategori Pembiayaan",
      icon: TrendingUp,
      content: {
        total: "Rp 500.000.000",
        kategori: [
          {
            nama: "Penerimaan Pembiayaan",
            jumlah: "Rp 300.000.000",
            persentase: "60%",
            deskripsi: "Penerimaan yang berasal dari sisa lebih perhitungan anggaran tahun sebelumnya"
          },
          {
            nama: "Pengeluaran Pembiayaan",
            jumlah: "Rp 200.000.000",
            persentase: "40%",
            deskripsi: "Pengeluaran yang digunakan untuk pembiayaan program dan kegiatan"
          }
        ]
      }
    },
    program: {
      title: "Program Pembiayaan",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Penerimaan Pembiayaan",
            program: [
              "Sisa Lebih Perhitungan Anggaran",
              "Pencairan Dana Cadangan",
              "Hasil Penjualan Aset Desa"
            ]
          },
          {
            nama: "Pengeluaran Pembiayaan",
            program: [
              "Pembentukan Dana Cadangan",
              "Penyertaan Modal Desa",
              "Pembayaran Utang"
            ]
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Pembiayaan",
      icon: DollarSign,
      content: {
        tahun: [
          {
            tahun: "2020",
            total: "Rp 300.000.000",
            realisasi: "85%"
          },
          {
            tahun: "2021",
            total: "Rp 350.000.000",
            realisasi: "90%"
          },
          {
            tahun: "2022",
            total: "Rp 400.000.000",
            realisasi: "95%"
          },
          {
            tahun: "2023",
            total: "Rp 500.000.000",
            realisasi: "80%"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pembiayaan Desa</h2>
          <p className="text-muted-foreground">
            Informasi pembiayaan desa tahun {pembiayaanData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pembiayaanData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar pembiayaan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {pembiayaanData.umum.content.deskripsi}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pembiayaanData.kategori.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total pembiayaan: {pembiayaanData.kategori.content.total}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.kategori.content.kategori.map((kategori, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{kategori.nama}</h4>
                    <p className="text-sm text-muted-foreground">{kategori.deskripsi}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{kategori.jumlah}</span>
                    <p className="text-sm text-muted-foreground">{kategori.persentase}</p>
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
              <CardTitle>{pembiayaanData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program pembiayaan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {pembiayaanData.program.content.kategori.map((kategori, index) => (
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

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pembiayaanData.realisasi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Realisasi pembiayaan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pembiayaanData.realisasi.content.tahun.map((tahun, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Tahun {tahun.tahun}</h4>
                  <p className="text-sm text-muted-foreground">Total: {tahun.total}</p>
                </div>
                <span className="font-medium">Realisasi: {tahun.realisasi}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pembiayaan;