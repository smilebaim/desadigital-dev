
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ScrollText, FileSignature, ClipboardList } from "lucide-react";

const Persuratan = () => {
  const persuratanData = {
    umum: {
      title: "Layanan Administrasi Persuratan",
      icon: FileText,
      content: {
        deskripsi: "Pemerintah Desa Remau Bako Tuo menyediakan berbagai layanan administrasi persuratan untuk memenuhi kebutuhan masyarakat. Layanan ini bertujuan untuk memberikan kemudahan, kecepatan, dan kepastian hukum dalam pengurusan dokumen-dokumen penting."
      }
    },
    jenis: {
      title: "Jenis Surat yang Dilayani",
      icon: ScrollText,
      content: {
        kategori: [
          {
            nama: "Surat Keterangan",
            jenis: [
              "Surat Keterangan Domisili",
              "Surat Keterangan Usaha (SKU) untuk nelayan, petani, dan UMKM",
              "Surat Keterangan Tidak Mampu (SKTM) untuk keperluan bantuan sosial, kesehatan, atau pendidikan",
              "Surat Keterangan Kelahiran dan Kematian",
              "Surat Keterangan Catatan Kepolisian (SKCK) - Pengantar"
            ]
          },
          {
            nama: "Surat Pengantar",
            jenis: [
              "Surat Pengantar Nikah (Formulir N1, N2, N4)",
              "Surat Pengantar Pembuatan KTP dan Kartu Keluarga (KK)",
              "Surat Pengantar Pindah Datang Penduduk"
            ]
          }
        ]
      }
    },
    prosedur: {
      title: "Prosedur Pengajuan",
      icon: FileSignature,
      content: {
        langkah: [
          {
            tahap: "1. Pengajuan oleh Warga",
            deskripsi: "Warga datang ke kantor desa dengan membawa dokumen pendukung yang diperlukan (KTP, KK, dan dokumen lain sesuai jenis surat)."
          },
          {
            tahap: "2. Verifikasi Dokumen",
            deskripsi: "Petugas layanan memeriksa kelengkapan dan keabsahan dokumen yang diajukan oleh warga."
          },
          {
            tahap: "3. Proses Pembuatan Surat",
            deskripsi: "Jika dokumen lengkap, petugas akan memproses pembuatan draf surat sesuai dengan permohonan."
          },
          {
            tahap: "4. Penandatanganan dan Stempel",
            deskripsi: "Draf surat diperiksa dan ditandatangani oleh Kepala Desa atau Sekretaris Desa, kemudian diberi stempel resmi."
          },
          {
            tahap: "5. Penyerahan kepada Warga",
            deskripsi: "Surat yang telah selesai diproses diserahkan kepada warga pemohon."
          }
        ]
      }
    },
    dokumen: {
      title: "Dokumen Persyaratan Umum",
      icon: ClipboardList,
      content: {
        deskripsi: "Secara umum, dokumen yang wajib dibawa adalah:",
        persyaratan: [
          "Fotokopi Kartu Tanda Penduduk (KTP) pemohon.",
          "Fotokopi Kartu Keluarga (KK).",
          "Surat Pengantar dari Ketua RT/RW setempat.",
          "Dokumen pendukung lainnya sesuai dengan jenis surat yang diajukan (misalnya: surat keterangan dari rumah sakit untuk surat kematian, dll)."
        ]
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Layanan Persuratan</h2>
          <p className="text-muted-foreground">
            Informasi layanan administrasi dan persuratan desa
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <persuratanData.umum.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{persuratanData.umum.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {persuratanData.umum.content.deskripsi}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <persuratanData.jenis.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{persuratanData.jenis.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {persuratanData.jenis.content.kategori.map((kategori, index) => (
              <div key={index}>
                <h4 className="font-semibold">{kategori.nama}</h4>
                <ul className="space-y-2 mt-2 list-disc list-inside">
                  {kategori.jenis.map((jenis, idx) => (
                    <li key={idx} className="text-muted-foreground">{jenis}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <persuratanData.prosedur.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{persuratanData.prosedur.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {persuratanData.prosedur.content.langkah.map((langkah, index) => (
              <div key={index}>
                <h4 className="font-semibold">{langkah.tahap}</h4>
                <p className="text-sm text-muted-foreground">{langkah.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <persuratanData.dokumen.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{persuratanData.dokumen.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{persuratanData.dokumen.content.deskripsi}</p>
            <ul className="space-y-2 mt-2 list-disc list-inside">
              {persuratanData.dokumen.content.persyaratan.map((syarat, index) => (
                <li key={index} className="text-muted-foreground">{syarat}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Persuratan;
