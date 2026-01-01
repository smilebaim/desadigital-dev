
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, FileText, Calendar, Users } from "lucide-react";

const SejarahDesa = () => {
  const sejarahData = {
    asal: {
      title: "Asal Usul Desa",
      icon: History,
      content: {
        deskripsi: "Sejarah Desa Remau Bako Tuo erat kaitannya dengan para perantau Bugis yang mencari penghidupan baru di pesisir timur Jambi. Nama desa ini sendiri menyimpan cerita tentang alam dan keberanian para pendirinya.",
        periode: "Awal Abad ke-20",
        asal: [
          {
            judul: "Pendirian Desa",
            deskripsi: "Didorong oleh keahlian melaut dan semangat untuk membuka lahan baru, para perantau dari Sulawesi Selatan menemukan lokasi yang ideal di muara sungai yang dikelilingi hutan bakau lebat. Mereka mendirikan perkampungan nelayan yang menjadi cikal bakal desa ini.",
            detail: [
              "Dipimpin oleh seorang tokoh maritim yang disegani.",
              "Membentuk komunitas berbasis nilai-nilai gotong royong dan kekeluargaan.",
              "Menetapkan batas wilayah berdasarkan bentang alam seperti sungai dan tanjung.",
              "Membangun pemukiman di atas tiang-tiang kayu untuk beradaptasi dengan pasang surut air laut."
            ]
          },
          {
            judul: "Makna Nama 'Remau Bako Tuo'",
            deskripsi: "Nama desa ini berasal dari bahasa Melayu Jambi Pesisir yang kaya makna.",
            detail: [
              "'Remau' berarti Harimau, melambangkan keberanian dan kekuatan dalam menghadapi tantangan alam.",
              "'Bako' merujuk pada Bakau, pohon penyangga kehidupan di ekosistem pesisir.",
              "'Tuo' berarti Tua, menandakan bahwa ini adalah salah satu pemukiman perintis di kawasan tersebut.",
              "Secara keseluruhan, nama ini adalah doa agar desa menjadi komunitas yang kuat, tangguh seperti bakau, dan sejahtera."
            ]
          }
        ]
      }
    },
    perkembangan: {
      title: "Perkembangan Desa dari Masa ke Masa",
      icon: Calendar,
      content: {
        deskripsi: "Perjalanan Desa Remau Bako Tuo dari perkampungan nelayan tradisional hingga menjadi desa pesisir yang berkembang.",
        periode: "1900 - Sekarang",
        perkembangan: [
          {
            periode: "Masa Perintisan (Awal 1900-an)",
            judul: "Fase Komunitas Nelayan",
            deskripsi: "Fokus utama pada masa ini adalah perikanan tangkap, pengolahan ikan asin, dan pemanfaatan hasil hutan bakau.",
            peristiwa: [
              "Pembukaan tambak-tambak udang dan ikan secara tradisional.",
              "Pembangunan bagan-bagan penangkap ikan di lepas pantai.",
              "Pengenalan budidaya kelapa sebagai komoditas tambahan."
            ]
          },
          {
            periode: "Masa Pembangunan (1970-2000)",
            judul: "Fase Infrastruktur dan Konektivitas",
            deskripsi: "Setelah resmi menjadi desa definitif, pemerintah mulai membangun infrastruktur untuk membuka isolasi wilayah.",
            peristiwa: [
              "Pembangunan jalan darat yang menghubungkan desa ke ibukota kecamatan.",
              "Pendirian Sekolah Dasar Negeri dan Puskesmas Pembantu.",
              "Pembangunan dermaga kayu untuk pendaratan kapal nelayan.",
              "Masuknya listrik dan program-program pembangunan dari pemerintah."
            ]
          },
          {
            periode: "Masa Modern (2000-an - Sekarang)",
            judul: "Fase Transformasi Ekonomi dan Lingkungan",
            deskripsi: "Desa mulai sadar akan potensi ekonomi yang lebih luas serta pentingnya menjaga kelestarian lingkungan pesisir.",
            peristiwa: [
              "Penguatan BUMDes untuk mengelola unit usaha desa seperti wisata mangrove dan pengolahan kopra.",
              "Program rehabilitasi mangrove bekerja sama dengan lembaga lingkungan.",
              "Peningkatan teknologi penangkapan ikan yang lebih modern dan ramah lingkungan.",
              "Implementasi Sistem Informasi Desa untuk transparansi dan pelayanan publik."
            ]
          }
        ]
      }
    },
    tokoh: {
      title: "Tokoh-Tokoh Penting",
      icon: Users,
      content: {
        deskripsi: "Beberapa tokoh yang berjasa besar dalam sejarah dan perkembangan desa.",
        tokoh: [
          {
            nama: "Para Puang dan Daeng (Pendiri Desa)",
            periode: "Awal 1900-an",
            peran: "Perintis dan Pemimpin Komunitas",
            kontribusi: [
              "Memimpin pelayaran dan pembukaan pemukiman awal.",
              "Meletakkan dasar-dasar kehidupan sosial dan ekonomi berbasis kelautan.",
              "Mewariskan pengetahuan navigasi dan kearifan lokal dalam mengelola laut."
            ]
          },
          {
            nama: "Generasi Kepala Desa Pembangun",
            periode: "1970-2000",
            peran: "Kepala Desa dan Aktivis Pembangunan",
            kontribusi: [
              "Memperjuangkan status definitif desa.",
              "Menginisiasi pembangunan sekolah, puskesmas, dan jalan.",
              "Menjalin kerja sama dengan pemerintah kabupaten untuk program pembangunan."
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Sejarah",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Buku Monografi Desa",
            tahun: "Terakhir diperbarui 2023",
            status: "Dokumen Resmi"
          },
          {
            judul: "Arsip Sejarah Lisan dan Foto",
            tahun: "Dikumpulkan secara berkala",
            status: "Arsip Desa"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sejarah Desa</h2>
          <p className="text-muted-foreground">
            Perjalanan sejarah dan perkembangan Desa Remau Bako Tuo dari masa ke masa
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <History className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sejarahData.asal.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Kisah di balik nama dan berdirinya Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sejarahData.asal.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {sejarahData.asal.content.asal.map((item, index) => (
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
                        <History className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sejarahData.perkembangan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tahapan perkembangan Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sejarahData.perkembangan.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {sejarahData.perkembangan.content.perkembangan.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul} ({item.periode})</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <h5 className="font-medium text-sm text-foreground">Peristiwa Penting:</h5>
                    {item.peristiwa.map((peristiwa, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{peristiwa}</span>
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
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{sejarahData.tokoh.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Tokoh-tokoh yang berjasa dalam sejarah desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sejarahData.tokoh.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {sejarahData.tokoh.content.tokoh.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.nama}</h4>
                    <p className="text-sm text-muted-foreground">
                      Peran: {item.peran} ({item.periode})
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <h5 className="font-medium text-sm text-foreground">Kontribusi Utama:</h5>
                    {item.kontribusi.map((kontribusi, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{kontribusi}</span>
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
              <CardTitle>{sejarahData.dokumen.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Dokumen sejarah Desa Remau Bako Tuo
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {sejarahData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sumber</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-muted-foreground">Keterangan</span>
                    <span className="font-medium">{item.tahun}</span>
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

export default SejarahDesa;
