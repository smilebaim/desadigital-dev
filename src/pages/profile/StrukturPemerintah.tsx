import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, FileText, Award } from "lucide-react";

const StrukturPemerintah = () => {
  const strukturData = {
    pemerintahan: {
      title: "Struktur Pemerintahan",
      icon: Building2,
      content: {
        deskripsi: "Struktur pemerintahan Desa Remau Bakotuo terdiri dari Kepala Desa, Perangkat Desa, dan Badan Permusyawaratan Desa (BPD)",
        periode: "2021-2027",
        struktur: [
          {
            jabatan: "Kepala Desa",
      nama: "H. Muhammad Yusuf, S.Pd.",
      periode: "2021-2027",
            tugas: [
              "Memimpin penyelenggaraan pemerintahan desa",
              "Membina kehidupan masyarakat desa",
              "Membina perekonomian desa",
              "Mengkoordinasikan pembangunan desa"
            ]
          },
      {
        jabatan: "Sekretaris Desa",
            nama: "La Ode Abdul Rahman, S.E.",
            periode: "2021-2027",
        tugas: [
              "Membantu kepala desa dalam urusan administrasi",
              "Mengkoordinasikan perangkat desa",
              "Menyusun laporan pelaksanaan kegiatan",
              "Melaksanakan tugas lain yang diberikan kepala desa"
        ]
      },
      {
            jabatan: "Kepala Urusan Pemerintahan",
            nama: "La Ode Hidayat, S.Sos.",
            periode: "2021-2027",
        tugas: [
              "Membantu kepala desa dalam urusan pemerintahan",
              "Melaksanakan administrasi kependudukan",
              "Mengkoordinasikan kegiatan RT/RW",
              "Melaksanakan tugas lain yang diberikan kepala desa"
            ]
          }
        ]
      }
    },
    bpd: {
      title: "Badan Permusyawaratan Desa",
      icon: Users,
      content: {
        deskripsi: "BPD adalah lembaga yang melaksanakan fungsi pemerintahan yang anggotanya merupakan wakil dari penduduk desa",
        periode: "2021-2027",
        struktur: [
          {
            jabatan: "Ketua BPD",
            nama: "La Ode Mustafa",
            periode: "2021-2027",
            tugas: [
              "Memimpin rapat BPD",
              "Mengkoordinasikan anggota BPD",
              "Menandatangani keputusan BPD",
              "Mewakili BPD di dalam dan di luar pengadilan"
        ]
      },
      {
            jabatan: "Wakil Ketua BPD",
            nama: "La Ode Rahim",
            periode: "2021-2027",
        tugas: [
              "Membantu ketua BPD",
              "Melaksanakan tugas ketua BPD jika berhalangan",
              "Mengkoordinasikan komisi-komisi",
              "Melaksanakan tugas lain yang diberikan ketua BPD"
        ]
      },
      {
            jabatan: "Sekretaris BPD",
            nama: "La Ode Jafar",
            periode: "2021-2027",
        tugas: [
              "Membantu ketua BPD dalam urusan administrasi",
              "Menyusun laporan kegiatan BPD",
              "Mengelola administrasi BPD",
              "Melaksanakan tugas lain yang diberikan ketua BPD"
        ]
      }
        ]
      }
    },
    lembaga: {
      title: "Lembaga Kemasyarakatan",
      icon: Award,
      content: {
        deskripsi: "Lembaga kemasyarakatan desa adalah lembaga yang dibentuk oleh masyarakat sesuai kebutuhan",
        periode: "2021-2027",
        lembaga: [
      {
            nama: "LPMD",
            ketua: "La Ode Hamid",
            periode: "2021-2027",
            tugas: [
              "Membantu pelaksanaan pembangunan",
              "Menggerakkan swadaya gotong royong",
              "Melaksanakan dan mengembangkan upaya partisipasi masyarakat",
              "Menumbuhkan dan mengembangkan kesadaran masyarakat"
            ]
          },
      {
        nama: "PKK",
            ketua: "Hj. Aminah",
            periode: "2021-2027",
            tugas: [
              "Membina kesejahteraan keluarga",
              "Mengembangkan program pemberdayaan perempuan",
              "Melaksanakan program kesehatan",
              "Mengembangkan program pendidikan"
        ]
      },
      {
        nama: "Karang Taruna",
            ketua: "La Ode Fadli",
            periode: "2021-2027",
            tugas: [
              "Mengembangkan kreativitas pemuda",
              "Melaksanakan kegiatan olahraga",
              "Mengembangkan wirausaha pemuda",
              "Melaksanakan kegiatan sosial"
        ]
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Struktur",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Peraturan Desa tentang Struktur Organisasi",
            tahun: "2021",
            status: "Dokumen Resmi"
          },
          {
            judul: "SK Pengangkatan Perangkat Desa",
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
          <h2 className="text-3xl font-bold tracking-tight">Struktur Pemerintahan Desa</h2>
          <p className="text-muted-foreground">
            Struktur organisasi dan lembaga pemerintahan Desa Remau Bakotuo
          </p>
        </div>

        <Tabs defaultValue="pemerintahan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pemerintahan">Pemerintahan</TabsTrigger>
            <TabsTrigger value="bpd">BPD</TabsTrigger>
            <TabsTrigger value="lembaga">Lembaga</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="pemerintahan" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Building2 className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{strukturData.pemerintahan.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Struktur pemerintahan Desa Remau Bakotuo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {strukturData.pemerintahan.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {strukturData.pemerintahan.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {strukturData.pemerintahan.content.struktur.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.jabatan}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.nama} ({item.periode})
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.tugas.map((tugas, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Building2 className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{tugas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bpd" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{strukturData.bpd.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Badan Permusyawaratan Desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {strukturData.bpd.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {strukturData.bpd.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {strukturData.bpd.content.struktur.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.jabatan}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.nama} ({item.periode})
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.tugas.map((tugas, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{tugas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lembaga" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{strukturData.lembaga.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Lembaga kemasyarakatan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi</h4>
                  <p className="text-lg font-medium mb-4">
                    {strukturData.lembaga.content.deskripsi}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Periode: {strukturData.lembaga.content.periode}
                  </p>
                </div>
                <div className="space-y-6">
                  {strukturData.lembaga.content.lembaga.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{item.nama}</h4>
                        <p className="text-sm text-muted-foreground">
                          Ketua: {item.ketua} ({item.periode})
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {item.tugas.map((tugas, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Award className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{tugas}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dokumen" className="space-y-4">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-emerald-600" />
                <div>
                  <CardTitle>{strukturData.dokumen.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Dokumen struktur pemerintahan desa
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {strukturData.dokumen.content.dokumen.map((item, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StrukturPemerintah; 