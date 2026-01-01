
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, ListChecks } from "lucide-react";

const DaftarProgram = () => {
  const programData = {
    berjalan: {
      title: "Program Berjalan",
      icon: ListChecks,
      content: {
        deskripsi: "Program-program yang sedang berjalan di Desa Remau Bako Tuo sesuai RKPDes.",
        periode: "2024",
        program: [
          {
            judul: "Pembangunan Infrastruktur Pesisir",
            deskripsi: "Peningkatan infrastruktur untuk mendukung ekonomi dan mitigasi bencana.",
            kegiatan: [
              "Peningkatan Jalan Akses ke Tempat Pelelangan Ikan (TPI)",
              "Pembangunan Tambatan Perahu dan Dermaga Kecil",
              "Pembangunan Sumur Bor Air Tawar"
            ],
            progress: "70%",
            anggaran: "Rp 500.000.000"
          },
          {
            judul: "Pemberdayaan Masyarakat Pesisir",
            deskripsi: "Peningkatan kapasitas dan keterampilan masyarakat.",
            kegiatan: [
              "Pelatihan Pengolahan Hasil Laut (Ikan Asin, Kerupuk, Terasi)",
              "Peningkatan Kapasitas Kelompok Nelayan (Poklayan)"
            ],
            progress: "50%",
            anggaran: "Rp 85.000.000"
          }
        ]
      }
    },
    rencana: {
      title: "Program Rencana (Usulan)",
      icon: Calendar,
      content: {
        deskripsi: "Program-program yang direncanakan untuk periode berikutnya berdasarkan RPJMDes.",
        periode: "2025-2026",
        program: [
          {
            judul: "Pengembangan Ekonomi Biru",
            deskripsi: "Program hilirisasi dan peningkatan nilai tambah produk lokal.",
            kegiatan: [
              "Pengembangan BUMDes unit usaha wisata mangrove (Ekowisata).",
              "Hilirisasi produk turunan kelapa (VCO, Nata de Coco).",
              "Pengembangan budidaya kepiting bakau dan udang vaname."
            ],
            periode: "2025",
            anggaran: "Estimasi Rp 1.000.000.000"
          },
          {
            judul: "Penguatan Ketahanan Pangan dan Lingkungan",
            deskripsi: "Program untuk menjaga sumber daya alam dan pangan.",
            kegiatan: [
              "Pembangunan lumbung pangan desa.",
              "Program rehabilitasi terumbu karang.",
              "Peningkatan sistem pengelolaan sampah terpadu."
            ],
            periode: "2025-2026",
            anggaran: "Estimasi Rp 800.000.000"
          }
        ]
      }
    },
    selesai: {
      title: "Program Selesai",
      icon: FileText,
      content: {
        deskripsi: "Program-program strategis yang telah selesai dilaksanakan di Desa Remau Bako Tuo.",
        periode: "2021-2023",
        program: [
          {
            judul: "Pembangunan Jalan Poros Desa",
            deskripsi: "Membuka akses utama antar dusun dan ke kecamatan.",
            kegiatan: [
              "Pengaspalan jalan sepanjang 5 km.",
              "Pembangunan 3 jembatan beton.",
            ],
            tahun: "2023",
            anggaran: "Rp 2.000.000.000"
          },
          {
            judul: "Program Listrik Masuk Desa",
            deskripsi: "Kerja sama dengan PLN untuk elektrifikasi seluruh dusun.",
            kegiatan: [
              "Pemasangan jaringan listrik ke 500+ rumah.",
              "Pemasangan Lampu Penerangan Jalan Umum (LPJU)."
            ],
            tahun: "2022",
            anggaran: "Rp 1.500.000.000 (Kolaborasi)"
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Program",
      icon: FileText,
      content: {
        dokumen: [
          {
            judul: "Dokumen RKPDes 2024",
            tahun: "2024",
            status: "Dokumen Resmi"
          },
          {
            judul: "Laporan Realisasi APBDes 2023",
            tahun: "2023",
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
          <h2 className="text-3xl font-bold tracking-tight">Daftar Program Desa</h2>
          <p className="text-muted-foreground">
            Daftar program pembangunan Desa Remau Bako Tuo
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ListChecks className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{programData.berjalan.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program yang sedang berjalan di tahun {programData.berjalan.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {programData.berjalan.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {programData.berjalan.content.program.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-primary">{item.progress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anggaran</span>
                        <span className="font-medium">{item.anggaran}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <h5 className="font-medium text-sm text-foreground">Kegiatan Utama:</h5>
                    {item.kegiatan.map((kegiatan, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ListChecks className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{kegiatan}</span>
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
              <CardTitle>{programData.rencana.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program yang direncanakan untuk periode {programData.rencana.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {programData.rencana.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {programData.rencana.content.program.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Periode</span>
                        <span className="font-medium">{item.periode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anggaran</span>
                        <span className="font-medium">{item.anggaran}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                     <h5 className="font-medium text-sm text-foreground">Kegiatan Utama:</h5>
                    {item.kegiatan.map((kegiatan, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{kegiatan}</span>
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
              <CardTitle>{programData.selesai.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Program yang telah selesai pada periode {programData.selesai.content.periode}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Deskripsi</h4>
              <p className="text-sm text-muted-foreground">
                {programData.selesai.content.deskripsi}
              </p>
            </div>
            <div className="space-y-6">
              {programData.selesai.content.program.map((item, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun</span>
                        <span className="font-medium">{item.tahun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Anggaran</span>
                        <span className="font-medium">{item.anggaran}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                     <h5 className="font-medium text-sm text-foreground">Kegiatan Utama:</h5>
                    {item.kegiatan.map((kegiatan, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FileText className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{kegiatan}</span>
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
                <CardTitle>{programData.dokumen.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Dokumen perencanaan dan pelaporan program desa
                </p>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {programData.dokumen.content.dokumen.map((item, index) => (
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

export default DaftarProgram;
