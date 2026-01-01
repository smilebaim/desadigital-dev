
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FileText, Award } from "lucide-react";

const StrukturPemerintah = () => {
  const strukturData = {
    pemerintahan: {
      title: "Pemerintahan Desa",
      icon: Building2,
      content: {
        deskripsi: "Penyelenggaraan urusan pemerintahan di tingkat desa dilaksanakan oleh Pemerintah Desa Remau Bako Tuo, yang terdiri dari Kepala Desa dan Perangkat Desa.",
        periode: "2021-2027",
        struktur: [
          {
            jabatan: "Kepala Desa",
            nama: "H. Muhammad Yusuf, S.Pd.",
            tugas: [
              "Memimpin penyelenggaraan Pemerintahan Desa.",
              "Membina kehidupan masyarakat dan kerukunan sosial.",
              "Membina perekonomian Desa dengan fokus pada sektor kelautan dan perkebunan.",
              "Mengkoordinasikan pembangunan Desa secara partisipatif."
            ]
          },
          {
            jabatan: "Sekretaris Desa",
            nama: "La Ode Abdul Rahman, S.E.",
            tugas: [
              "Membantu Kepala Desa dalam bidang administrasi pemerintahan dan keuangan.",
              "Mengkoordinasikan tugas-tugas Kepala Urusan dan Kepala Dusun.",
              "Menyusun laporan penyelenggaraan pemerintahan Desa."
            ]
          },
          {
            jabatan: "Kepala Urusan Pemerintahan",
            nama: "La Ode Hidayat, S.Sos.",
            tugas: [
              "Melaksanakan manajemen administrasi kependudukan.",
              "Mengelola data profil desa, monografi, dan aset desa.",
              "Membantu pelaksanaan urusan pertanahan dan tata ruang desa."
            ]
          }
        ]
      }
    },
    bpd: {
      title: "Badan Permusyawaratan Desa (BPD)",
      icon: Users,
      content: {
        deskripsi: "BPD merupakan lembaga legislatif desa yang anggotanya adalah wakil dari penduduk desa, berfungsi untuk menyalurkan aspirasi masyarakat, membahas dan menyepakati Peraturan Desa bersama Kepala Desa, serta melakukan pengawasan kinerja Pemerintah Desa.",
        periode: "2021-2027",
        struktur: [
          {
            jabatan: "Ketua BPD",
            nama: "La Ode Mustafa",
            tugas: [
              "Memimpin dan mengkoordinasikan seluruh kegiatan BPD.",
              "Menyelenggarakan musyawarah desa untuk membahas hal-hal strategis.",
              "Melakukan pengawasan terhadap pelaksanaan Perdes dan APBDes."
            ]
          },
          {
            jabatan: "Wakil Ketua BPD",
            nama: "La Ode Rahim",
            tugas: [
              "Membantu Ketua BPD dalam melaksanakan tugas.",
              "Mengkoordinasikan kegiatan alat kelengkapan BPD."
            ]
          },
          {
            jabatan: "Sekretaris BPD",
            nama: "La Ode Jafar",
            tugas: [
              "Melaksanakan administrasi dan persuratan BPD.",
              "Menyusun risalah dan notulensi rapat-rapat BPD."
            ]
          }
        ]
      }
    },
    lembaga: {
      title: "Lembaga Kemasyarakatan Desa (LKD)",
      icon: Award,
      content: {
        deskripsi: "LKD adalah wadah partisipasi masyarakat yang dibentuk atas prakarsa masyarakat sebagai mitra Pemerintah Desa dalam merencanakan dan melaksanakan pembangunan.",
        periode: "Masa Bakti 2021-2024",
        lembaga: [
          {
            nama: "Lembaga Pemberdayaan Masyarakat Desa (LPMD)",
            ketua: "La Ode Hamid",
            tugas: [
              "Menyusun rencana pembangunan secara partisipatif melalui Musrenbangdes.",
              "Menggerakkan swadaya gotong royong masyarakat dalam pembangunan fisik.",
              "Membantu pengawasan pelaksanaan program pembangunan di tingkat dusun."
            ]
          },
          {
            nama: "Pemberdayaan Kesejahteraan Keluarga (PKK)",
            ketua: "Hj. Aminah",
            tugas: [
              "Melaksanakan 10 Program Pokok PKK dengan fokus pada kesehatan keluarga, pendidikan anak, dan ekonomi keluarga.",
              "Menggerakkan partisipasi perempuan dalam pembangunan desa.",
              "Mengelola Posyandu dan program pencegahan stunting."
            ]
          },
          {
            nama: "Karang Taruna Bahari",
            ketua: "La Ode Fadli",
            tugas: [
              "Mengembangkan potensi dan kreativitas pemuda di bidang kelautan dan ekonomi kreatif.",
              "Menyelenggarakan kegiatan olahraga pesisir, seni budaya, dan pelestarian lingkungan.",
              "Menjadi pelopor dalam kegiatan sosial dan penanggulangan masalah kenakalan remaja."
            ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Terkait",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Peraturan Desa tentang Struktur Organisasi dan Tata Kerja (SOTK) Pemerintah Desa",
            tahun: "2021",
            status: "Dokumen Resmi"
          },
          {
            judul: "SK Pengangkatan Perangkat Desa dan Pengurus Lembaga Kemasyarakatan",
            tahun: "2021",
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
          <h2 className="text-3xl font-bold tracking-tight">Struktur Pemerintahan Desa</h2>
          <p className="text-muted-foreground">
            Struktur organisasi dan lembaga pemerintahan Desa Remau Bako Tuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{strukturData.pemerintahan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Periode {strukturData.pemerintahan.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {strukturData.pemerintahan.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {strukturData.pemerintahan.content.struktur.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.jabatan}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.nama}
                    </p>
                  </div>
                  <ul className="space-y-2">
                     <h5 className="font-medium text-sm text-foreground">Tugas Pokok:</h5>
                    {item.tugas.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Building2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{tugas}</span>
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
              <CardTitle>{strukturData.bpd.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Periode {strukturData.bpd.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {strukturData.bpd.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {strukturData.bpd.content.struktur.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.jabatan}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.nama}
                    </p>
                  </div>
                   <ul className="space-y-2">
                     <h5 className="font-medium text-sm text-foreground">Tugas Pokok:</h5>
                    {item.tugas.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{tugas}</span>
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
            <Award className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{strukturData.lembaga.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Masa Bakti {strukturData.lembaga.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {strukturData.lembaga.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {strukturData.lembaga.content.lembaga.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.nama}</h4>
                    <p className="text-sm text-muted-foreground">
                      Ketua: {item.ketua}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    <h5 className="font-medium text-sm text-foreground">Tugas Pokok:</h5>
                    {item.tugas.map((tugas, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{tugas}</span>
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
              <CardTitle>{strukturData.dokumen.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Landasan hukum struktur pemerintahan desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {strukturData.dokumen.content.dokumen.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{item.judul}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
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

export default StrukturPemerintah;
