import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Leaf, DollarSign } from "lucide-react";

const KetahananDesa = () => {
  const ketahananData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2023",
        nilai: "0.75",
        status: "Mandiri",
        deskripsi: "Indeks Ketahanan Desa adalah ukuran kemampuan desa dalam menghadapi berbagai tantangan dan ancaman, baik dari dalam maupun luar desa, untuk mencapai kesejahteraan masyarakat yang berkelanjutan."
      }
    },
    ekonomi: {
      title: "Ketahanan Ekonomi",
      icon: DollarSign,
      content: {
        nilai: "0.80",
        indikator: [
          {
            nama: "Pertumbuhan Ekonomi",
            nilai: "0.85",
            deskripsi: "Laju pertumbuhan ekonomi desa"
          },
          {
            nama: "Kemiskinan",
            nilai: "0.75",
            deskripsi: "Tingkat kemiskinan desa"
          },
          {
            nama: "Pengangguran",
            nilai: "0.80",
            deskripsi: "Tingkat pengangguran desa"
          },
          {
            nama: "Pendapatan per Kapita",
            nilai: "0.80",
            deskripsi: "Pendapatan per kapita masyarakat"
          }
        ],
        program: [
          "Pengembangan UMKM",
          "Pemberdayaan ekonomi masyarakat",
          "Pengembangan sektor pertanian",
          "Pengembangan sektor pariwisata"
        ]
      }
    },
    sosial: {
      title: "Ketahanan Sosial",
      icon: Users,
      content: {
        nilai: "0.75",
        indikator: [
          {
            nama: "Pendidikan",
            nilai: "0.80",
            deskripsi: "Tingkat pendidikan masyarakat"
          },
          {
            nama: "Kesehatan",
            nilai: "0.75",
            deskripsi: "Derajat kesehatan masyarakat"
          },
          {
            nama: "Kesejahteraan",
            nilai: "0.70",
            deskripsi: "Tingkat kesejahteraan masyarakat"
          },
          {
            nama: "Kebudayaan",
            nilai: "0.75",
            deskripsi: "Pelestarian budaya lokal"
          }
        ],
        program: [
          "Peningkatan kualitas pendidikan",
          "Peningkatan layanan kesehatan",
          "Penguatan kelembagaan sosial",
          "Pelestarian budaya lokal"
        ]
      }
    },
    lingkungan: {
      title: "Ketahanan Lingkungan",
      icon: Leaf,
      content: {
        nilai: "0.70",
        indikator: [
          {
            nama: "Sanitasi",
            nilai: "0.75",
            deskripsi: "Akses sanitasi layak"
          },
          {
            nama: "Air Bersih",
            nilai: "0.70",
            deskripsi: "Akses air bersih"
          },
          {
            nama: "Pengelolaan Sampah",
            nilai: "0.65",
            deskripsi: "Sistem pengelolaan sampah"
          },
          {
            nama: "RTH",
            nilai: "0.70",
            deskripsi: "Ruang terbuka hijau"
          }
        ],
        program: [
          "Peningkatan akses sanitasi",
          "Peningkatan kualitas air bersih",
          "Pengembangan sistem pengelolaan sampah",
          "Pengembangan ruang terbuka hijau"
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ketahanan Desa</h2>
          <p className="text-muted-foreground">
            Indeks Ketahanan Desa tahun {ketahananData.umum.content.tahun}
          </p>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ketahananData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar Ketahanan Desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Detail Ketahanan Desa</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tahun</span>
                    <span className="font-medium">{ketahananData.umum.content.tahun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nilai</span>
                    <span className="font-medium">{ketahananData.umum.content.nilai}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{ketahananData.umum.content.status}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Deskripsi</h4>
                <p className="text-sm text-muted-foreground">
                  {ketahananData.umum.content.deskripsi}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ketahananData.ekonomi.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Nilai: {ketahananData.ekonomi.content.nilai}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Indikator</h4>
              <div className="space-y-4">
                {ketahananData.ekonomi.content.indikator.map((indikator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Program</h4>
              <ul className="space-y-2">
                {ketahananData.ekonomi.content.program.map((program, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ketahananData.sosial.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Nilai: {ketahananData.sosial.content.nilai}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Indikator</h4>
              <div className="space-y-4">
                {ketahananData.sosial.content.indikator.map((indikator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Program</h4>
              <ul className="space-y-2">
                {ketahananData.sosial.content.program.map((program, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{ketahananData.lingkungan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Nilai: {ketahananData.lingkungan.content.nilai}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Indikator</h4>
              <div className="space-y-4">
                {ketahananData.lingkungan.content.indikator.map((indikator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">{indikator.nama}</h5>
                        <p className="text-sm text-muted-foreground">{indikator.deskripsi}</p>
                      </div>
                      <span className="font-medium">{indikator.nilai}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Program</h4>
              <ul className="space-y-2">
                {ketahananData.lingkungan.content.program.map((program, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KetahananDesa;