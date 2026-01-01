
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building2, Users, DollarSign } from "lucide-react";

const RKPDes = () => {
  const rkpData = {
    umum: {
      title: "Informasi Umum RKPDes",
      icon: FileText,
      content: {
        tahun: "2024",
        deskripsi: "Rencana Kerja Pemerintah Desa (RKPDes) adalah dokumen perencanaan tahunan yang menjadi pedoman pelaksanaan pembangunan desa, memuat prioritas program dan kegiatan yang didanai oleh berbagai sumber pendapatan desa, dengan fokus pada potensi maritim dan pesisir.",
        status: "Berlaku",
        tanggal_penetapan: "15 Desember 2023"
      }
    },
    program: {
      title: "Program Prioritas dan Kegiatan",
      icon: Building2,
      content: {
        infrastruktur: {
          nama: "Pembangunan Infrastruktur Pesisir",
          deskripsi: "Meningkatkan kualitas dan jangkauan infrastruktur untuk mendukung ekonomi kelautan dan melindungi pemukiman.",
          kegiatan: [
            {
              nama: "Peningkatan Jalan Akses ke Tempat Pelelangan Ikan (TPI)",
              lokasi: "Jalur utama desa",
              anggaran: "Rp 250.000.000",
              sumber: "Dana Desa"
            },
            {
              nama: "Pembangunan Tambatan Perahu dan Dermaga Kecil",
              lokasi: "Pesisir Dusun Nelayan",
              anggaran: "Rp 150.000.000",
              sumber: "Dana Desa"
            },
            {
              nama: "Pembangunan Sumur Bor Air Tawar",
              lokasi: "Dusun III",
              anggaran: "Rp 100.000.000",
              sumber: "Alokasi Dana Desa (ADD)"
            }
          ]
        },
        pemberdayaan: {
          nama: "Pemberdayaan Masyarakat Pesisir",
          deskripsi: "Meningkatkan kapasitas dan keterampilan masyarakat untuk mengelola sumber daya lokal secara optimal.",
          kegiatan: [
            {
              nama: "Pelatihan Pengolahan Hasil Laut (Ikan Asin, Kerupuk, Terasi)",
              lokasi: "Balai Desa",
              anggaran: "Rp 50.000.000",
              sumber: "Dana Desa"
            },
            {
              nama: "Peningkatan Kapasitas Kelompok Nelayan (Poklayan)",
              lokasi: "Sekretariat Poklayan",
              anggaran: "Rp 35.000.000",
              sumber: "Alokasi Dana Desa (ADD)"
            }
          ]
        },
        lingkungan: {
            nama: "Pelestarian Lingkungan Pesisir",
            deskripsi: "Menjaga ekosistem mangrove dan kebersihan pantai sebagai aset desa.",
            kegiatan: [
              {
                nama: "Rehabilitasi dan Penanaman Mangrove",
                lokasi: "Garis Pantai Desa",
                anggaran: "Rp 75.000.000",
                sumber: "Dana Desa & CSR"
              },
            ]
          }
      }
    },
    pendanaan: {
      title: "Sumber Pendanaan RKPDes",
      icon: DollarSign,
      content: {
        dana_desa: {
          nama: "Dana Desa (DD)",
          jumlah: "Rp 800.000.000",
          persentase: "75%"
        },
        add: {
          nama: "Alokasi Dana Desa (ADD)",
          jumlah: "Rp 215.000.000",
          persentase: "20%"
        },
        lainnya: {
          nama: "PADes, Bagi Hasil Pajak, dan lainnya",
          jumlah: "Rp 53.000.000",
          persentase: "5%"
        }
      }
    },
    monitoring: {
      title: "Monitoring dan Evaluasi",
      icon: Users,
      content: {
        deskripsi: "Proses monitoring dan evaluasi dilakukan secara berkala melalui Musyawarah Desa untuk memastikan program berjalan sesuai rencana dan memberikan manfaat maksimal bagi masyarakat.",
        jadwal: [
          {
            periode: "Evaluasi Triwulan I",
            waktu: "April 2024",
            fokus: "Realisasi fisik dan keuangan program infrastruktur."
          },
          {
            periode: "Evaluasi Tengah Tahun",
            waktu: "Juli 2024",
            fokus: "Perkembangan program pemberdayaan dan penyerapan anggaran."
          },
          {
            periode: "Laporan Pertanggungjawaban (LPJ)",
            waktu: "Januari 2025",
            fokus: "Laporan akhir pelaksanaan RKPDes tahun 2024."
          }
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RKPDes {rkpData.umum.content.tahun}</h2>
          <p className="text-muted-foreground">
            Rencana Kerja Pemerintah Desa
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
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rkpData.umum.content.deskripsi}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{rkpData.umum.content.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Penetapan</span>
                    <span className="font-medium">{rkpData.umum.content.tanggal_penetapan}</span>
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
                Kegiatan pembangunan tahun {rkpData.umum.content.tahun}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 border-b pb-4">
              <div>
                <h4 className="font-semibold">{rkpData.program.content.infrastruktur.nama}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rkpData.program.content.infrastruktur.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rkpData.program.content.infrastruktur.kegiatan.map((kegiatan, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <span>Lokasi: {kegiatan.lokasi}</span>
                        <span>Anggaran: {kegiatan.anggaran}</span>
                        <span className="col-span-2">Sumber: {kegiatan.sumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 border-b pb-4">
              <div>
                <h4 className="font-semibold">{rkpData.program.content.pemberdayaan.nama}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rkpData.program.content.pemberdayaan.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rkpData.program.content.pemberdayaan.kegiatan.map((kegiatan, index) => (
                   <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <span>Lokasi: {kegiatan.lokasi}</span>
                        <span>Anggaran: {kegiatan.anggaran}</span>
                        <span className="col-span-2">Sumber: {kegiatan.sumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             <div className="space-y-4">
              <div>
                <h4 className="font-semibold">{rkpData.program.content.lingkungan.nama}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {rkpData.program.content.lingkungan.deskripsi}
                </p>
              </div>
              <div className="space-y-4">
                {rkpData.program.content.lingkungan.kegiatan.map((kegiatan, index) => (
                   <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium">{kegiatan.nama}</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                        <span>Lokasi: {kegiatan.lokasi}</span>
                        <span>Anggaran: {kegiatan.anggaran}</span>
                        <span className="col-span-2">Sumber: {kegiatan.sumber}</span>
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
                <span className="text-muted-foreground">{rkpData.pendanaan.content.add.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rkpData.pendanaan.content.add.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rkpData.pendanaan.content.add.persentase})</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{rkpData.pendanaan.content.lainnya.nama}</span>
                <div className="text-right">
                  <span className="font-medium">{rkpData.pendanaan.content.lainnya.jumlah}</span>
                  <span className="text-muted-foreground ml-2">({rkpData.pendanaan.content.lainnya.persentase})</span>
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
                Jadwal monitoring dan evaluasi RKPDes
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className="text-sm text-muted-foreground leading-relaxed">
                {rkpData.monitoring.content.deskripsi}
              </p>
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
