'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const publikasiData = [
  {
    title: "Laporan Pertanggungjawaban (LPJ) APBDes 2023",
    category: "Laporan Keuangan",
    date: "15 Januari 2024",
    description: "Dokumen resmi LPJ Anggaran Pendapatan dan Belanja Desa tahun 2023 yang telah disahkan.",
    fileUrl: "#"
  },
  {
    title: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes) 2021-2026",
    category: "Perencanaan",
    date: "10 Februari 2021",
    description: "Dokumen perencanaan strategis pembangunan desa untuk periode enam tahun.",
    fileUrl: "#"
  },
  {
    title: "Profil Desa Remau Bako Tuo Tahun 2024",
    category: "Profil Desa",
    date: "01 Maret 2024",
    description: "Buku profil desa yang berisi data demografi, geografis, dan potensi desa terbaru.",
    fileUrl: "#"
  },
  {
    title: "Peraturan Desa (Perdes) No. 3 Tahun 2023 tentang Pengelolaan Sampah",
    category: "Produk Hukum",
    date: "20 September 2023",
    description: "Peraturan desa yang mengatur tentang mekanisme pengelolaan sampah di lingkungan desa.",
    fileUrl: "#"
  }
];

const Publikasi = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Pustaka", path: "/pustaka" },
          { title: "Publikasi" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Publikasi Desa</h2>
          <p className="text-muted-foreground">
            Dokumen, laporan, dan produk hukum resmi yang dipublikasikan oleh Pemerintah Desa.
          </p>
        </div>

        <div className="space-y-4">
          {publikasiData.map((item, index) => (
            <Card key={index} className="flex flex-col sm:flex-row items-start">
              <div className="p-6 flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="p-6 pt-0 sm:pt-6 sm:pl-0 flex-grow">
                <p className="text-sm font-semibold text-primary">{item.category}</p>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Dipublikasikan pada: {item.date}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
               <div className="p-6 pt-0 sm:pt-6 flex-shrink-0">
                 <Button asChild>
                    <a href={item.fileUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      Unduh
                    </a>
                  </Button>
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publikasi;
