
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Home, FileText } from "lucide-react";

const Perkembangan = () => {
  const perkembanganData = {
    demografi: {
      title: "Perkembangan Demografi",
      icon: Users,
      content: {
        deskripsi: "Dinamika kependudukan Desa Remau Bako Tuo menunjukkan tren pertumbuhan penduduk yang stabil, didorong oleh angka kelahiran dan migrasi masuk dari daerah sekitar.",
        periode: "Data 5 Tahun Terakhir",
        data: [
          {
            judul: "Pertumbuhan Penduduk",
            deskripsi: "Jumlah penduduk desa terus bertambah seiring dengan perkembangan desa.",
            detail: [
              "2020: 2.500 jiwa",
              "2021: 2.600 jiwa",
              "2022: 2.700 jiwa",
              "2023: 2.800 jiwa",
              "2024: 2.900 jiwa (Proyeksi)"
            ]
          },
          {
            judul: "Struktur Usia",
            deskripsi: "Komposisi penduduk didominasi oleh usia produktif, yang menjadi modal penting pembangunan.",
            detail: [
              "Usia Produktif (15-64 tahun): ~65%",
              "Usia Anak (0-14 tahun): ~25%",
              "Usia Lanjut (65+ tahun): ~10%"
            ]
          }
        ]
      }
    },
    infrastruktur: {
      title: "Perkembangan Infrastruktur",
      icon: Home,
      content: {
        deskripsi: "Pembangunan infrastruktur terus digalakkan untuk meningkatkan konektivitas dan kualitas hidup masyarakat.",
        periode: "Capaian 5 Tahun Terakhir",
        data: [
          {
            judul: "Infrastruktur Transportasi",
            deskripsi: "Peningkatan aksesibilitas antar dusun dan ke pusat kecamatan.",
            detail: [
              "Pembangunan jalan desa sepanjang 5 km.",
              "Perbaikan jembatan dan gorong-gorong.",
              "Pemasangan lampu penerangan jalan umum di 50 titik."
            ]
          },
          {
            judul: "Infrastruktur Layanan Dasar",
            deskripsi: "Peningkatan akses terhadap layanan dasar bagi masyarakat.",
            detail: [
              "Rehabilitasi 3 gedung Posyandu.",
              "Pembangunan 10 unit MCK umum.",
              "Perluasan jaringan pipa air bersih ke 100 rumah tangga."
            ]
          }
        ]
      }
    },
    ekonomi: {
      title: "Perkembangan Ekonomi",
      icon: TrendingUp,
      content: {
        deskripsi: "Perekonomian desa menunjukkan tren positif dengan diversifikasi usaha dan peningkatan pendapatan masyarakat.",
        periode: "Data 5 Tahun Terakhir",
        data: [
          {
            judul: "Peningkatan Sektor Ekonomi",
            deskripsi: "Pertumbuhan di berbagai sektor ekonomi lokal.",
            detail: [
              "Peningkatan jumlah UMKM sebesar 20%.",
              "Pengembangan BUMDes dengan unit usaha baru (misal: pengelolaan sampah).",
              "Peningkatan produktivitas hasil pertanian dan perikanan."
            ]
          },
          {
            judul: "Peningkatan Kesejahteraan",
            deskripsi: "Dampak positif perkembangan ekonomi terhadap kesejahteraan masyarakat.",
            detail: [
              "Penurunan angka keluarga prasejahtera.",
              "Peningkatan rata-rata pendapatan per kapita.",
              "Meningkatnya partisipasi masyarakat dalam program pembangunan."
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Perkembangan",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Laporan Perkembangan Desa (LPD)",
            tahun: "Setiap Akhir Tahun Anggaran",
            status: "Dokumen Publik"
          },
          {
            judul: "Data Pokok Desa (Prodeskel)",
            tahun: "Diperbarui secara berkala",
            status: "Sistem Informasi Kemendagri"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perkembangan Desa</h2>
          <p className="text-muted-foreground">
            Potret perkembangan Desa Remau Bako Tuo dari berbagai sektor.
          </p>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perkembanganData.demografi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dinamika Kependudukan Desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {perkembanganData.demografi.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {perkembanganData.demografi.content.data.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {item.detail.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Home className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perkembanganData.infrastruktur.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pembangunan Sarana dan Prasarana
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {perkembanganData.infrastruktur.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {perkembanganData.infrastruktur.content.data.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {item.detail.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Home className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perkembanganData.ekonomi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Peningkatan Kesejahteraan Masyarakat
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {perkembanganData.ekonomi.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {perkembanganData.ekonomi.content.data.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {item.detail.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{perkembanganData.dokumen.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dokumen resmi perkembangan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {perkembanganData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frekuensi</span>
                    <span className="font-medium">{item.tahun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sumber</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perkembangan;
