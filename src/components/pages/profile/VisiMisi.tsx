
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ListChecks, FileText } from "lucide-react";

const VisiMisi = () => {
  const visiMisiData = {
    visi: {
      title: "Visi Desa",
      icon: Target,
      content: {
        deskripsi: "Visi pembangunan Desa Remau Bako Tuo untuk periode 2021-2027 adalah cita-cita bersama yang ingin diwujudkan oleh seluruh elemen masyarakat dan pemerintah desa, dengan mempertimbangkan potensi dan tantangan sebagai desa pesisir.",
        periode: "2021-2027",
        visi: [
          {
            judul: "Visi Utama",
            deskripsi: "“Terwujudnya Desa Remau Bako Tuo sebagai Desa Maritim yang Maju, Mandiri, dan Sejahtera Berbasis Ekonomi Biru dan Kelestarian Lingkungan”",
            poin: [
              "Maju dalam penerapan teknologi perikanan dan kualitas sumber daya manusia.",
              "Mandiri secara ekonomi dengan mengoptimalkan potensi kelautan dan perkebunan kelapa.",
              "Sejahtera melalui peningkatan pendapatan dan kualitas hidup masyarakat pesisir.",
              "Berbasis Ekonomi Biru yang mengelola sumber daya laut secara berkelanjutan."
            ]
          }
        ]
      }
    },
    misi: {
      title: "Misi Desa",
      icon: ListChecks,
      content: {
        deskripsi: "Untuk mencapai visi maritim tersebut, dirumuskan lima misi strategis sebagai berikut:",
        periode: "2021-2027",
        misi: [
          {
            judul: "Meningkatkan Kualitas Tata Kelola Pemerintahan Desa",
            deskripsi: "Mewujudkan pemerintahan yang bersih, transparan, akuntabel, dan berorientasi pada pelayanan publik yang prima bagi masyarakat pesisir.",
            program: [
              "Digitalisasi layanan administrasi kependudukan dan persuratan.",
              "Peningkatan kapasitas aparatur desa dalam manajemen pemerintahan dan keuangan.",
              "Menerapkan keterbukaan informasi publik terkait APBDes dan program pembangunan."
            ]
          },
          {
            judul: "Mengembangkan Ekonomi Lokal Berbasis Potensi Kelautan dan Perkebunan",
            deskripsi: "Memperkuat ekonomi desa melalui pemberdayaan nelayan, petambak, petani kelapa, dan UMKM pengolahan hasil laut.",
            program: [
              "Penguatan BUMDes untuk mengelola TPI, unit pengolahan ikan, dan agrowisata kelapa.",
              "Pelatihan dan pendampingan bagi nelayan untuk penggunaan teknologi penangkapan ikan yang efisien.",
              "Fasilitasi pemasaran digital bagi produk UMKM (ikan asin, kerupuk, minyak kelapa, dll)."
            ]
          },
          {
            judul: "Membangun Infrastruktur yang Mendukung Konektivitas dan Produktivitas",
            deskripsi: "Meningkatkan kualitas infrastruktur dasar untuk mendukung aktivitas ekonomi dan sosial masyarakat.",
            program: [
              "Peningkatan dan pemeliharaan jalan desa dan dermaga.",
              "Pembangunan pemecah ombak untuk melindungi pemukiman.",
              "Perluasan jaringan air bersih dan pembangunan sanitasi komunal."
            ]
          },
          {
            judul: "Meningkatkan Kualitas Sumber Daya Manusia dan Kesejahteraan Sosial",
            deskripsi: "Meningkatkan akses dan mutu layanan pendidikan dan kesehatan untuk menciptakan generasi yang cerdas dan sehat.",
            program: [
              "Pemberian beasiswa bagi anak nelayan berprestasi.",
              "Program desa siaga sehat dengan fokus pada kesehatan ibu dan anak pesisir.",
              "Penguatan lembaga adat dan kegiatan kepemudaan Karang Taruna."
            ]
          },
          {
            judul: "Menjaga Kelestarian Lingkungan dan Mitigasi Bencana Pesisir",
            deskripsi: "Mengelola sumber daya alam secara berkelanjutan dan meningkatkan kesiapsiagaan masyarakat terhadap bencana.",
            program: [
              "Program rehabilitasi dan penanaman kembali hutan mangrove.",
              "Pengembangan sistem pengelolaan sampah terpadu di wilayah pesisir.",
              "Sosialisasi dan simulasi mitigasi bencana abrasi dan banjir rob."
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Visi Misi",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Dokumen RPJMDes 2021-2027",
            tahun: "2021",
            status: "Dokumen Resmi"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visi dan Misi Desa</h2>
          <p className="text-muted-foreground">
            Visi dan Misi Desa Remau Bako Tuo periode {visiMisiData.visi.content.periode}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{visiMisiData.visi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Cita-cita bersama Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-6">
              {visiMisiData.visi.content.visi.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <blockquote className="mt-2 border-l-2 pl-6 italic text-muted-foreground">
                      {item.deskripsi}
                    </blockquote>
                  </div>
                  <ul className="space-y-2">
                    {item.poin.map((poin, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{poin}</span>
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
            <ListChecks className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{visiMisiData.misi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Langkah-langkah strategis untuk mencapai visi
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {visiMisiData.misi.content.misi.map((item, index) => (
              <div key={index} className="space-y-4 border-b pb-4 last:border-b-0 last:pb-0">
                <div>
                  <h4 className="font-semibold">{item.judul}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.deskripsi}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-foreground mb-2">Contoh Program Prioritas:</h5>
                  <ul className="space-y-2">
                    {item.program.map((program, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ListChecks className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{program}</span>
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
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{visiMisiData.dokumen.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dokumen resmi Visi dan Misi Desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {visiMisiData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tahun</span>
                    <span className="font-medium">{item.tahun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
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

export default VisiMisi;
