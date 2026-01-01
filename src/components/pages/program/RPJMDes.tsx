import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building2, Users, Leaf, DollarSign, Target } from "lucide-react";

const RPJMDes = () => {
  const rpjmData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        periode: "2021-2026",
        deskripsi: "Rencana Pembangunan Jangka Menengah Desa",
        status: "Disetujui",
        tanggal_persetujuan: "15 Desember 2020"
      }
    },
    program: {
      title: "Program Pembangunan",
      icon: Building2,
      content: {
        ekonomi: {
          nama: "Pengembangan Ekonomi",
          deskripsi: "Program penguatan ekonomi desa",
          kegiatan: [
            {
              nama: "Pengembangan Wisata Desa",
              target: "Meningkatkan kunjungan wisatawan",
              indikator: "Jumlah wisatawan meningkat 50%",
              waktu: "2021-2026"
            },
            {
              nama: "Pemberdayaan UMKM",
              target: "Meningkatkan jumlah UMKM",
              indikator: "Jumlah UMKM meningkat 30%",
              waktu: "2021-2026"
            },
            {
              nama: "Pengembangan Pertanian",
              target: "Meningkatkan produksi pertanian",
              indikator: "Produksi meningkat 40%",
              waktu: "2021-2026"
            }
          ]
        },
        sosial: {
          nama: "Pembangunan Sosial",
          deskripsi: "Program peningkatan kesejahteraan sosial",
          kegiatan: [
            {
              nama: "Peningkatan Pendidikan",
              target: "Meningkatkan akses pendidikan",
              indikator: "Angka partisipasi sekolah 100%",
              waktu: "2021-2026"
            },
            {
              nama: "Peningkatan Kesehatan",
              target: "Meningkatkan derajat kesehatan",
              indikator: "Angka harapan hidup meningkat",
              waktu: "2021-2026"
            },
            {
              nama: "Penguatan Kelembagaan",
              target: "Menguatkan kelembagaan desa",
              indikator: "Semua lembaga berfungsi optimal",
              waktu: "2021-2026"
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
            "Pertumbuhan ekonomi 6% per tahun",
            "Pengangguran turun 50%",
            "Pendapatan per kapita meningkat 40%",
            "Jumlah UMKM meningkat 30%"
          ]
        },
        sosial: {
          nama: "Sasaran Sosial",
          target: [
            "Angka partisipasi sekolah 100%",
            "Angka harapan hidup meningkat",
            "Angka kemiskinan turun 50%",
            "Kesejahteraan masyarakat meningkat"
          ]
        },
        lingkungan: {
          nama: "Sasaran Lingkungan",
          target: [
            "Sanitasi 100%",
            "Air bersih 100%",
            "Pengelolaan sampah 100%",
            "RTH 30%"
          ]
        }
      }
    },
    pendanaan: {
      title: "Sumber Pendanaan",
      icon: DollarSign,
      content: {
        dana_desa: {
          nama: "Dana Desa",
          jumlah: "Rp 4.000.000.000",
          persentase: "80%"
        },
        pad: {
          nama: "Pendapatan Asli Desa",
          jumlah: "Rp 750.000.000",
          persentase: "15%"
        },
        bantuan: {
          nama: "Bantuan Pemerintah",
          jumlah: "Rp 250.000.000",
          persentase: "5%"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Detail RPJMDes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Periode</span>
                    <span className="font-medium">{rpjmData.umum.content.periode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{rpjmData.umum.content.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Persetujuan</span>
                    <span className="font-medium">{rpjmData.umum.content.tanggal_persetujuan}</span>
                  </div>
                </div>
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
                Program pembangunan RPJMDes
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.program.content.ekonomi.nama}</h4>
                <p className="text-sm text-muted-foreground">
                  {rpjmData.program.content.ekonomi.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rpjmData.program.content.ekonomi.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target</span>
                        <span>{kegiatan.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Indikator</span>
                        <span>{kegiatan.indikator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Waktu</span>
                        <span>{kegiatan.waktu}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rpjmData.program.content.sosial.nama}</h4>
                <p className="text-sm text-muted-foreground">
                  {rpjmData.program.content.sosial.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rpjmData.program.content.sosial.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target</span>
                        <span>{kegiatan.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Indikator</span>
                        <span>{kegiatan.indikator}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Waktu</span>
                        <span>{kegiatan.waktu}</span>
                      </div>
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
                Sasaran pembangunan RPJMDes
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
                Sumber pendanaan RPJMDes
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
                <span className="text-muted-foreground">{rpjmData.pendanaan.content.pad.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rpjmData.pendanaan.content.pad.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rpjmData.pendanaan.content.pad.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rpjmData.pendanaan.content.bantuan.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rpjmData.pendanaan.content.bantuan.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rpjmData.pendanaan.content.bantuan.persentase})</span>
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