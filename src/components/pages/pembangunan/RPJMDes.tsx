
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building2, Users, Leaf, DollarSign, Target } from "lucide-react";

const RPJMDes = () => {
  const rpjmData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        periode: "2021-2027",
        deskripsi: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes) Desa Remau Bako Tuo adalah dokumen perencanaan strategis untuk periode enam tahun yang menjadi acuan dalam penyusunan RKPDes setiap tahunnya.",
        status: "Disetujui",
        tanggal_persetujuan: "15 Desember 2020"
      }
    },
    program: {
      title: "Arah dan Program Pembangunan",
      icon: Building2,
      content: {
        ekonomi: {
          nama: "Pengembangan Ekonomi Maritim dan Agribisnis",
          deskripsi: "Program untuk mengoptimalkan potensi utama desa yaitu sektor kelautan, perikanan, dan perkebunan kelapa.",
          kegiatan: [
            {
              nama: "Modernisasi Armada dan Alat Tangkap Nelayan",
              target: "Meningkatkan hasil tangkapan nelayan sebesar 25%",
              indikator: "Jumlah hasil tangkapan (ton/tahun)",
              waktu: "2022-2026"
            },
            {
              nama: "Pengembangan Kawasan Budidaya Tambak Udang dan Kepiting",
              target: "Meningkatkan produksi budidaya sebesar 40%",
              indikator: "Jumlah produksi (ton/tahun)",
              waktu: "2022-2026"
            },
            {
              nama: "Hilirisasi Produk Kelapa (Kopra Putih, Minyak, dll)",
              target: "Meningkatkan nilai tambah produk kelapa",
              indikator: "Pendapatan dari produk olahan kelapa",
              waktu: "2023-2027"
            }
          ]
        },
        sosial: {
          nama: "Peningkatan Kualitas Sumber Daya Manusia Pesisir",
          deskripsi: "Program peningkatan akses dan mutu pendidikan, kesehatan, serta penguatan budaya lokal.",
          kegiatan: [
            {
              nama: "Peningkatan Akses Pendidikan Menengah",
              target: "Angka partisipasi sekolah jenjang SMP/SMA meningkat",
              indikator: "APK dan APM",
              waktu: "2021-2027"
            },
            {
              nama: "Penurunan Angka Stunting dan Peningkatan Gizi",
              target: "Angka stunting turun hingga di bawah standar nasional",
              indikator: "Persentase balita stunting",
              waktu: "2021-2027"
            },
            {
              nama: "Penguatan Kelembagaan Adat dan Budaya Maritim",
              target: "Lestarinya tradisi dan kearifan lokal",
              indikator: "Jumlah kegiatan budaya yang dilaksanakan",
              waktu: "2021-2027"
            }
          ]
        }
      }
    },
    sasaran: {
      title: "Sasaran Pembangunan",
      icon: Target,
      content: {
        ekonomi: {
          nama: "Sasaran Ekonomi",
          target: [
            "Pertumbuhan ekonomi desa di atas 6% per tahun.",
            "Penurunan persentase penduduk miskin menjadi di bawah 5%.",
            "Peningkatan pendapatan per kapita masyarakat nelayan dan petani."
          ]
        },
        sosial: {
          nama: "Sasaran Sosial dan Budaya",
          target: [
            "Rata-rata lama sekolah penduduk mencapai 9 tahun.",
            "Angka harapan hidup meningkat.",
            "Terpeliharanya kerukunan sosial dan kearifan lokal."
          ]
        },
        lingkungan: {
          nama: "Sasaran Lingkungan",
          target: [
            "Luas hutan mangrove yang direhabilitasi mencapai 50 hektar.",
            "Tersedianya sistem pengelolaan sampah yang menjangkau seluruh dusun.",
            "Terjaganya kualitas air laut dan pesisir dari pencemaran."
          ]
        }
      }
    },
    pendanaan: {
      title: "Indikasi Sumber Pendanaan",
      icon: DollarSign,
      content: {
        dana_desa: {
          nama: "Dana Desa (DD)",
          jumlah: "± Rp 4.8 Miliar",
          persentase: "50%"
        },
        add: {
          nama: "Alokasi Dana Desa (ADD) & Bagi Hasil",
          jumlah: "± Rp 2.4 Miliar",
          persentase: "25%"
        },
        lainnya: {
          nama: "APBD Provinsi/Pusat, CSR, Swadaya",
          jumlah: "± Rp 2.4 Miliar",
          persentase: "25%"
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RPJMDes</h2>
          <p className="text-muted-foreground">
            Rencana Pembangunan Jangka Menengah Desa {rpjmData.umum.content.periode}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rpjmData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar RPJMDes
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{rpjmData.umum.content.deskripsi}</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Periode</span>
                  <span className="font-medium">{rpjmData.umum.content.periode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{rpjmData.umum.content.status}</span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-muted-foreground">Tanggal Persetujuan</span>
                  <span className="font-medium">{rpjmData.umum.content.tanggal_persetujuan}</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rpjmData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program pembangunan strategis desa
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border-b pb-4">
              <div>
                <h4 className="font-semibold">{rpjmData.program.content.ekonomi.nama}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rpjmData.program.content.ekonomi.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rpjmData.program.content.ekonomi.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <p><span className="text-muted-foreground">Target: </span>{kegiatan.target}</p>
                        <p><span className="text-muted-foreground">Indikator: </span>{kegiatan.indikator}</p>
                        <p><span className="text-muted-foreground">Waktu: </span>{kegiatan.waktu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.program.content.sosial.nama}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rpjmData.program.content.sosial.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rpjmData.program.content.sosial.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-sm">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                       <p><span className="text-muted-foreground">Target: </span>{kegiatan.target}</p>
                        <p><span className="text-muted-foreground">Indikator: </span>{kegiatan.indikator}</p>
                        <p><span className="text-muted-foreground">Waktu: </span>{kegiatan.waktu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rpjmData.sasaran.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Target capaian pembangunan hingga akhir periode
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.sasaran.content.ekonomi.nama}</h4>
              </div>
              <ul className="space-y-2">
                {rpjmData.sasaran.content.ekonomi.target.map((target, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{target}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.sasaran.content.sosial.nama}</h4>
              </div>
              <ul className="space-y-2">
                {rpjmData.sasaran.content.sosial.target.map((target, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{target}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.sasaran.content.lingkungan.nama}</h4>
              </div>
              <ul className="space-y-2">
                {rpjmData.sasaran.content.lingkungan.target.map((target, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{target}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rpjmData.pendanaan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total Kebutuhan Pendanaan Selama {rpjmData.umum.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rpjmData.pendanaan.content.dana_desa.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rpjmData.pendanaan.content.dana_desa.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rpjmData.pendanaan.content.dana_desa.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rpjmData.pendanaan.content.add.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rpjmData.pendanaan.content.add.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rpjmData.pendanaan.content.add.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rpjmData.pendanaan.content.lainnya.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rpjmData.pendanaan.content.lainnya.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rpjmData.pendanaan.content.lainnya.persentase})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RPJMDes;
