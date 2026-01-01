
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Target, FileText } from "lucide-react";

const ArahKebijakan = () => {
  const arahKebijakanData = {
    arah: {
      title: "Arah Kebijakan Pembangunan Desa",
      icon: Compass,
      content: {
        deskripsi: "Arah kebijakan pembangunan Desa Remau Bako Tuo dirancang sebagai pedoman strategis untuk mewujudkan visi desa maritim yang maju, mandiri, dan sejahtera dalam periode RPJMDes.",
        periode: "2021-2027",
        poin: [
          "Peningkatan Kualitas SDM Pesisir.",
          "Penguatan Ekonomi Biru yang Berdaya Saing dan Berkelanjutan.",
          "Pembangunan Infrastruktur yang Adaptif terhadap Perubahan Iklim.",
          "Peningkatan Kualitas Tata Kelola Pemerintahan yang Akuntabel.",
          "Pelestarian Lingkungan Pesisir dan Kearifan Lokal."
        ]
      }
    },
    prioritas: {
      title: "Prioritas Pembangunan",
      icon: Target,
      content: {
        prioritas: [
          {
            judul: "Sektor Ekonomi Kelautan dan Perikanan",
            deskripsi: "Menggerakkan potensi ekonomi utama desa untuk meningkatkan pendapatan dan kesejahteraan nelayan, petambak, dan pelaku usaha perikanan.",
            program: [
              "Penguatan BUMDes dengan unit usaha Tempat Pelelangan Ikan (TPI) dan pengolahan hasil laut.",
              "Pelatihan dan adopsi teknologi penangkapan ikan yang ramah lingkungan.",
              "Pengembangan budidaya perikanan air payau (udang, kepiting) yang berkelanjutan."
            ]
          },
          {
            judul: "Sektor Infrastruktur Pesisir dan Konektivitas",
            deskripsi: "Memenuhi kebutuhan infrastruktur dasar yang vital untuk mendukung aktivitas ekonomi dan melindungi pemukiman dari ancaman bencana pesisir.",
            program: [
              "Pembangunan dan pemeliharaan jalan akses menuju pelabuhan dan TPI.",
              "Pembangunan tanggul laut dan pemecah ombak (revetment).",
              "Perluasan jaringan air bersih dan sanitasi yang tahan terhadap intrusi air laut."
            ]
          },
          {
            judul: "Sektor Lingkungan dan Mitigasi Bencana",
            deskripsi: "Menjaga kelestarian ekosistem pesisir sebagai benteng alami dan sumber kehidupan, serta meningkatkan kesiapsiagaan masyarakat.",
            program: [
              "Rehabilitasi dan penanaman hutan mangrove di sepanjang garis pantai.",
              "Program pengelolaan sampah pesisir dan laut.",
              "Pembentukan Kelompok Masyarakat Siaga Bencana (KMSB)."
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Kebijakan",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "RPJMDes 2021-2027",
            tahun: "2021",
            status: "Dokumen Induk Perencanaan"
          },
          {
            judul: "RKPDes Tahunan",
            tahun: "Setiap Tahun",
            status: "Dokumen Operasional Tahunan"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Arah Kebijakan Desa</h2>
          <p className="text-muted-foreground">
            Arah kebijakan dan prioritas pembangunan Desa Remau Bako Tuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Compass className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{arahKebijakanData.arah.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Periode {arahKebijakanData.arah.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {arahKebijakanData.arah.content.deskripsi}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lima Pilar Kebijakan</h4>
              <ul className="space-y-2">
                {arahKebijakanData.arah.content.poin.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Compass className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{arahKebijakanData.prioritas.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fokus utama pembangunan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {arahKebijakanData.prioritas.content.prioritas.map((item, index) => (
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
                        <Target className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
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
              <CardTitle>{arahKebijakanData.dokumen.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Landasan hukum perencanaan pembangunan
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {arahKebijakanData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Keterangan</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frekuensi</span>
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

export default ArahKebijakan;
