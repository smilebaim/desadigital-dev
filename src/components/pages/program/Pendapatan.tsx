import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Building2, DollarSign, Wallet } from "lucide-react";

const Pendapatan = () => {
  const pendapatanData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        deskripsi: "Informasi pendapatan desa meliputi semua penerimaan uang melalui rekening desa yang merupakan hak desa dalam satu tahun anggaran yang tidak perlu dibayar kembali oleh desa."
      }
    },
    kategori: {
      title: "Kategori Pendapatan",
      icon: TrendingUp,
      content: {
        total: "Rp 2.000.000.000",
        kategori: [
          {
            nama: "Pendapatan Asli Desa",
            jumlah: "Rp 500.000.000",
            persentase: "25%",
            deskripsi: "Pendapatan yang berasal dari hasil usaha, hasil aset, swadaya dan partisipasi, gotong royong, dan lain-lain pendapatan asli desa yang sah"
          },
          {
            nama: "Transfer",
            jumlah: "Rp 1.400.000.000",
            persentase: "70%",
            deskripsi: "Pendapatan yang berasal dari pemerintah pusat, pemerintah daerah provinsi, dan pemerintah daerah kabupaten/kota"
          },
          {
            nama: "Lain-lain Pendapatan",
            jumlah: "Rp 100.000.000",
            persentase: "5%",
            deskripsi: "Pendapatan yang berasal dari hibah dan sumbangan yang tidak mengikat dari pihak ketiga"
          }
        ]
      }
    },
    program: {
      title: "Program Pendapatan",
      icon: Building2,
      content: {
        kategori: [
          {
            nama: "Pendapatan Asli Desa",
            program: [
              "Hasil Usaha Desa",
              "Hasil Aset Desa",
              "Swadaya dan Partisipasi",
              "Gotong Royong"
            ]
          },
          {
            nama: "Transfer",
            program: [
              "Dana Desa",
              "Alokasi Dana Desa",
              "Bantuan Keuangan"
            ]
          },
          {
            nama: "Lain-lain Pendapatan",
            program: [
              "Hibah",
              "Sumbangan Pihak Ketiga"
            ]
          }
        ]
      }
    },
    realisasi: {
      title: "Realisasi Pendapatan",
      icon: DollarSign,
      content: {
        tahun: [
          {
            tahun: "2020",
            total: "Rp 1.500.000.000",
            realisasi: "85%"
          },
          {
            tahun: "2021",
            total: "Rp 1.600.000.000",
            realisasi: "90%"
          },
          {
            tahun: "2022",
            total: "Rp 1.800.000.000",
            realisasi: "95%"
          },
          {
            tahun: "2023",
            total: "Rp 2.000.000.000",
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
          <h2 className="text-3xl font-bold tracking-tight">Pendapatan Desa</h2>
          <p className="text-muted-foreground">
            Informasi pendapatan desa tahun {pendapatanData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pendapatanData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar pendapatan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {pendapatanData.umum.content.deskripsi}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{pendapatanData.kategori.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total pendapatan: {pendapatanData.kategori.content.total}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendapatanData.kategori.content.kategori.map((kategori, index) => (
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
              <CardTitle>{pendapatanData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program pendapatan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {pendapatanData.program.content.kategori.map((kategori, index) => (
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
              <CardTitle>{pendapatanData.realisasi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Realisasi pendapatan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendapatanData.realisasi.content.tahun.map((tahun, index) => (
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

export default Pendapatan;