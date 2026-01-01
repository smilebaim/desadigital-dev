import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building2, Users, DollarSign } from "lucide-react";

const RKPDes = () => {
  const rkpData = {
    umum: {
      title: "Informasi Umum",
      icon: FileText,
      content: {
        tahun: "2024",
        periode: "1 Januari - 31 Desember 2024",
        deskripsi: "Rencana Kerja Pemerintah Desa tahun 2024",
        status: "Disetujui",
        tanggal_persetujuan: "15 Desember 2023"
      }
    },
    program: {
      title: "Program dan Kegiatan",
      icon: Building2,
      content: {
        infrastruktur: {
          nama: "Pembangunan Infrastruktur",
          deskripsi: "Pembangunan dan perbaikan sarana prasarana desa",
          kegiatan: [
            {
              nama: "Pembangunan Jalan Desa",
              lokasi: "Dusun I",
              anggaran: "Rp 200.000.000",
              target: "500 meter",
              waktu: "Januari - Maret 2024"
            },
            {
              nama: "Perbaikan Drainase",
              lokasi: "Dusun II",
              anggaran: "Rp 150.000.000",
              target: "300 meter",
              waktu: "Februari - April 2024"
            },
            {
              nama: "Pembangunan MCK Umum",
              lokasi: "Dusun III",
              anggaran: "Rp 100.000.000",
              target: "2 unit",
              waktu: "Maret - Mei 2024"
            }
          ]
        },
        pemberdayaan: {
          nama: "Pemberdayaan Masyarakat",
          deskripsi: "Program peningkatan kapasitas masyarakat",
          kegiatan: [
            {
              nama: "Pelatihan UMKM",
              lokasi: "Balai Desa",
              anggaran: "Rp 50.000.000",
              target: "50 peserta",
              waktu: "April - Juni 2024"
            },
            {
              nama: "Pendampingan Kelompok Tani",
              lokasi: "Lahan Pertanian",
              anggaran: "Rp 75.000.000",
              target: "5 kelompok",
              waktu: "Mei - Juli 2024"
            }
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
          jumlah: "Rp 800.000.000",
          persentase: "80%"
        },
        pad: {
          nama: "Pendapatan Asli Desa",
          jumlah: "Rp 150.000.000",
          persentase: "15%"
        },
        bantuan: {
          nama: "Bantuan Pemerintah",
          jumlah: "Rp 50.000.000",
          persentase: "5%"
        }
      }
    },
    monitoring: {
      title: "Monitoring dan Evaluasi",
      icon: Users,
      content: {
        jadwal: [
          {
            periode: "Triwulan I",
            waktu: "Maret 2024",
            fokus: "Evaluasi program infrastruktur"
          },
          {
            periode: "Triwulan II",
            waktu: "Juni 2024",
            fokus: "Evaluasi program pemberdayaan"
          },
          {
            periode: "Triwulan III",
            waktu: "September 2024",
            fokus: "Evaluasi keseluruhan program"
          },
          {
            periode: "Triwulan IV",
            waktu: "Desember 2024",
            fokus: "Evaluasi akhir tahun"
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RKPDes</h2>
          <p className="text-muted-foreground">
            Rencana Kerja Pemerintah Desa tahun {rkpData.umum.content.tahun}
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rkpData.umum.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Informasi dasar RKPDes {rkpData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Detail RKPDes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tahun</span>
                    <span className="font-medium">{rkpData.umum.content.tahun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Periode</span>
                    <span className="font-medium">{rkpData.umum.content.periode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{rkpData.umum.content.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Persetujuan</span>
                    <span className="font-medium">{rkpData.umum.content.tanggal_persetujuan}</span>
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
              <CardTitle>{rkpData.program.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program dan kegiatan RKPDes {rkpData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rkpData.program.content.infrastruktur.nama}</h4>
                <p className="text-sm text-muted-foreground">
                  {rkpData.program.content.infrastruktur.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rkpData.program.content.infrastruktur.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lokasi</span>
                        <span>{kegiatan.lokasi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anggaran</span>
                        <span>{kegiatan.anggaran}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target</span>
                        <span>{kegiatan.target}</span>
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
                <h4 className="font-semibold">{rkpData.program.content.pemberdayaan.nama}</h4>
                <p className="text-sm text-muted-foreground">
                  {rkpData.program.content.pemberdayaan.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rkpData.program.content.pemberdayaan.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="space-y-2">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lokasi</span>
                        <span>{kegiatan.lokasi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anggaran</span>
                        <span>{kegiatan.anggaran}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target</span>
                        <span>{kegiatan.target}</span>
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
            <DollarSign className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rkpData.pendanaan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sumber pendanaan RKPDes {rkpData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rkpData.pendanaan.content.dana_desa.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rkpData.pendanaan.content.dana_desa.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rkpData.pendanaan.content.dana_desa.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rkpData.pendanaan.content.pad.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rkpData.pendanaan.content.pad.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rkpData.pendanaan.content.pad.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rkpData.pendanaan.content.bantuan.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rkpData.pendanaan.content.bantuan.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rkpData.pendanaan.content.bantuan.persentase})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{rkpData.monitoring.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Jadwal monitoring dan evaluasi RKPDes {rkpData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {rkpData.monitoring.content.jadwal.map((jadwal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{jadwal.periode}</h4>
                    <p className="text-sm text-muted-foreground">{jadwal.fokus}</p>
                  </div>
                  <span className="text-muted-foreground">{jadwal.waktu}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RKPDes;