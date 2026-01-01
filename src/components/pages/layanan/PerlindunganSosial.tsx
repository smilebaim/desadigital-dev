
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, ListChecks } from "lucide-react";

const PerlindunganSosial = () => {
  const perlindunganData = {
    umum: {
      title: "Program Perlindungan Sosial",
      icon: Heart,
      content: {
        deskripsi: "Program Perlindungan Sosial di Desa Remau Bako Tuo bertujuan untuk membantu warga miskin dan rentan agar dapat memenuhi kebutuhan dasar, mengurangi beban hidup, dan meningkatkan kualitas hidup mereka. Program ini merupakan jaring pengaman sosial yang diselenggarakan oleh Pemerintah Pusat maupun Daerah."
      }
    },
    program: {
      title: "Jenis Program Bantuan Sosial",
      icon: ListChecks,
      content: {
        kategori: [
          {
            nama: "Bantuan Langsung Tunai Dana Desa (BLT-DD)",
            deskripsi: "Bantuan uang tunai yang bersumber dari Dana Desa, diberikan kepada keluarga miskin atau tidak mampu yang kehilangan mata pencaharian dan belum menerima bantuan sosial lainnya."
          },
          {
            nama: "Program Keluarga Harapan (PKH)",
            deskripsi: "Bantuan tunai bersyarat dari Kementerian Sosial yang diberikan kepada keluarga sangat miskin (KSM) dengan komponen kesehatan (ibu hamil, anak usia dini) dan pendidikan (anak sekolah)."
          },
          {
            nama: "Bantuan Pangan Non-Tunai (BPNT) / Program Sembako",
            deskripsi: "Bantuan sosial pangan yang disalurkan secara non-tunai setiap bulan kepada Keluarga Penerima Manfaat (KPM) untuk dibelanjakan bahan pangan di e-Warong."
          },
          {
            nama: "Bantuan Sosial lainnya",
            deskripsi: "Bantuan insidental lainnya seperti bantuan untuk korban bencana alam, bantuan untuk penyandang disabilitas, dan lain-lain sesuai kebijakan pemerintah."
          }
        ]
      }
    },
    sasaran: {
      title: "Kriteria dan Sasaran Penerima",
      icon: Users,
      content: {
        deskripsi: "Sasaran utama program perlindungan sosial adalah rumah tangga miskin dan rentan yang terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS).",
        kriteria: [
          "Keluarga dengan pendapatan di bawah garis kemiskinan.",
          "Keluarga yang terdapat ibu hamil atau anak balita.",
          "Keluarga yang memiliki anak usia sekolah.",
          "Keluarga yang terdapat lanjut usia (lansia) atau penyandang disabilitas.",
          "Keluarga yang kehilangan mata pencaharian akibat krisis atau bencana."
        ]
      }
    },
    mekanisme: {
      title: "Mekanisme Penyaluran",
      icon: Shield,
      content: {
        tahap: [
          {
            nama: "1. Pendataan dan Verifikasi",
            deskripsi: "Pendataan calon penerima dilakukan melalui Musyawarah Desa Khusus (Musdesus) untuk validasi data DTKS."
          },
          {
            nama: "2. Penetapan Penerima",
            deskripsi: "Pemerintah Desa menetapkan daftar akhir Keluarga Penerima Manfaat (KPM) berdasarkan hasil Musdesus dan kuota yang ada."
          },
          {
            nama: "3. Penyaluran Bantuan",
            deskripsi: "Bantuan disalurkan sesuai jadwal yang ditetapkan, baik secara tunai melalui kantor pos/bank maupun non-tunai melalui agen yang ditunjuk."
          },
          {
            nama: "4. Monitoring dan Evaluasi",
            deskripsi: "Pemerintah Desa melakukan pemantauan untuk memastikan bantuan tepat sasaran dan memberikan laporan secara berkala."
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perlindungan Sosial</h2>
          <p className="text-muted-foreground">
            Informasi program bantuan sosial untuk masyarakat desa
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <perlindunganData.umum.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perlindunganData.umum.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {perlindunganData.umum.content.deskripsi}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <perlindunganData.program.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perlindunganData.program.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {perlindunganData.program.content.kategori.map((kategori, index) => (
              <div key={index}>
                <h4 className="font-semibold">{kategori.nama}</h4>
                <p className="text-sm text-muted-foreground">{kategori.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <perlindunganData.sasaran.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perlindunganData.sasaran.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{perlindunganData.sasaran.content.deskripsi}</p>
            <ul className="space-y-2 list-disc list-inside">
              {perlindunganData.sasaran.content.kriteria.map((item, index) => (
                <li key={index} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <perlindunganData.mekanisme.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perlindunganData.mekanisme.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {perlindunganData.mekanisme.content.tahap.map((tahap, index) => (
              <div key={index}>
                <h4 className="font-semibold">{tahap.nama}</h4>
                <p className="text-sm text-muted-foreground">{tahap.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerlindunganSosial;
