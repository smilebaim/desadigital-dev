
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Download, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";

const PeraturanDesa = () => {
  const peraturanData = {
    umum: {
      title: "Produk Hukum Desa",
      icon: Scale,
      content: {
        deskripsi: "Produk hukum desa adalah semua peraturan yang ditetapkan oleh Kepala Desa setelah dibahas dan disepakati bersama Badan Permusyawaratan Desa (BPD). Produk hukum ini menjadi landasan dalam penyelenggaraan pemerintahan, pembangunan, dan kemasyarakatan di Desa Remau Bako Tuo."
      }
    },
    jenis: {
      title: "Jenis Produk Hukum Desa",
      icon: Gavel,
      content: [
          {
            nama: "Peraturan Desa (Perdes)",
            deskripsi: "Merupakan produk hukum tertinggi di tingkat desa, mengatur hal-hal yang bersifat strategis dan umum. Contoh: Perdes tentang APBDes, Perdes tentang BUMDes, Perdes tentang Kewenangan Desa."
          },
          {
            nama: "Peraturan Kepala Desa (Perkades)",
            deskripsi: "Merupakan peraturan pelaksana dari Peraturan Desa. Contoh: Perkades tentang Penjabaran APBDes, Perkades tentang Tata Cara Pemungutan Pungutan Desa."
          },
          {
            nama: "Keputusan Kepala Desa (Kepkades)",
            deskripsi: "Produk hukum yang bersifat konkret, individual, dan final. Contoh: Kepkades tentang Pengangkatan Perangkat Desa, Kepkades tentang Penetapan Penerima BLT-DD."
          }
      ]
    },
    daftar: {
        title: "Daftar Peraturan Desa Terbaru",
        icon: FileText,
        deskripsi: "Berikut adalah beberapa Peraturan Desa yang telah diundangkan dan dapat diakses oleh publik:",
        items: [
            { judul: "Perdes No. 1 Tahun 2024 tentang Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2024", link: "#" },
            { judul: "Perdes No. 5 Tahun 2023 tentang Pengelolaan Aset Desa", link: "#" },
            { judul: "Perdes No. 4 Tahun 2023 tentang Rencana Pembangunan Jangka Menengah Desa (RPJMDes) 2023-2029", link: "#" },
            { judul: "Perdes No. 2 Tahun 2023 tentang Pungutan Desa", link: "#" },
        ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Peraturan Desa</h2>
          <p className="text-muted-foreground">
            Dasar hukum penyelenggaraan pemerintahan dan pembangunan desa
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <peraturanData.umum.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{peraturanData.umum.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {peraturanData.umum.content.deskripsi}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <peraturanData.jenis.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{peraturanData.jenis.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {peraturanData.jenis.content.map((item, index) => (
              <div key={index}>
                <h4 className="font-semibold">{item.nama}</h4>
                <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <peraturanData.daftar.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{peraturanData.daftar.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{peraturanData.daftar.deskripsi}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {peraturanData.daftar.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-sm">{item.judul}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={item.link}>
                    <Download className="h-4 w-4 mr-2" />
                    Unduh
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeraturanDesa;
