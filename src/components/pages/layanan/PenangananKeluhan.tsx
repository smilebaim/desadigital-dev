
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareWarning, Phone, Mail, FilePen, CheckSquare } from "lucide-react";

const PenangananKeluhan = () => {
  // Dummy Icon moved to the top
  const Building2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;

  const keluhanData = {
    umum: {
      title: "Layanan Penanganan Keluhan",
      icon: MessageSquareWarning,
      content: {
        deskripsi: "Pemerintah Desa Remau Bako Tuo berkomitmen untuk memberikan pelayanan terbaik. Layanan penanganan keluhan ini adalah sarana bagi masyarakat untuk menyampaikan aspirasi, kritik, saran, atau pengaduan terkait pelayanan publik, program pembangunan, atau masalah sosial di lingkungan desa."
      }
    },
    jenis: {
      title: "Jenis Keluhan yang Dapat Disampaikan",
      icon: FilePen,
      content: {
        kategori: [
          "Pelayanan administrasi yang lambat atau tidak memuaskan.",
          "Kualitas infrastruktur desa (jalan, drainase, lampu jalan).",
          "Masalah kebersihan dan pengelolaan sampah lingkungan.",
          "Gangguan ketertiban dan keamanan umum.",
          "Penyaluran bantuan sosial yang tidak tepat sasaran.",
          "Masalah terkait kinerja perangkat desa."
        ]
      }
    },
    prosedur: {
      title: "Alur dan Prosedur Pengaduan",
      icon: CheckSquare,
      content: {
        tahap: [
          {
            nama: "1. Penyampaian Keluhan",
            deskripsi: "Warga dapat menyampaikan keluhan melalui beberapa kanal yang disediakan (lihat di bawah)."
          },
          {
            nama: "2. Penerimaan dan Registrasi",
            deskripsi: "Setiap keluhan akan dicatat dan diregistrasi oleh petugas untuk ditindaklanjuti."
          },
          {
            nama: "3. Verifikasi dan Tindak Lanjut",
            deskripsi: "Keluhan akan diverifikasi kebenarannya dan diteruskan ke bidang atau seksi yang berwenang untuk ditangani."
          },
          {
            nama: "4. Pemberian Umpan Balik",
            deskripsi: "Pemerintah Desa akan memberikan informasi kepada pelapor mengenai status dan hasil penanganan keluhan."
          }
        ]
      }
    },
    kontak: {
      title: "Kanal Pengaduan",
      icon: Phone,
      content: {
        deskripsi: "Sampaikan keluhan Anda melalui kanal-kanal berikut:",
        kontak: [
          {
            metode: "Datang Langsung",
            detail: "Kantor Desa Remau Bako Tuo pada jam kerja.",
            icon: Building2,
          },
          {
            metode: "Kotak Saran",
            detail: "Tersedia di depan Kantor Desa.",
            icon: Mail,
          },
          {
            metode: "Telepon / WhatsApp",
            detail: "Hubungi nomor layanan desa: 0812-xxxx-xxxx",
            icon: Phone,
          }
        ]
      }
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Penanganan Keluhan</h2>
          <p className="text-muted-foreground">
            Sarana untuk menyalurkan aspirasi dan pengaduan masyarakat
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <keluhanData.umum.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{keluhanData.umum.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {keluhanData.umum.content.deskripsi}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <keluhanData.jenis.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{keluhanData.jenis.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside">
              {keluhanData.jenis.content.kategori.map((item, index) => (
                <li key={index} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <keluhanData.prosedur.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{keluhanData.prosedur.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {keluhanData.prosedur.content.tahap.map((tahap, index) => (
              <div key={index}>
                <h4 className="font-semibold">{tahap.nama}</h4>
                <p className="text-sm text-muted-foreground">{tahap.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <keluhanData.kontak.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{keluhanData.kontak.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">{keluhanData.kontak.content.deskripsi}</p>
            <div className="space-y-4">
              {keluhanData.kontak.content.kontak.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">{item.metode}</h4>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PenangananKeluhan;
