'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const publikasiData = [
  { judul: "Laporan Pertanggungjawaban APBDes 2023", deskripsi: "Dokumen laporan realisasi Anggaran Pendapatan dan Belanja Desa tahun 2023.", tanggal: "15 Januari 2024", file: "/dokumen/lpj-2023.pdf" },
  { judul: "Rencana Kerja Pemerintah Desa (RKPDes) 2024", deskripsi: "Dokumen perencanaan pembangunan tahunan untuk tahun 2024.", tanggal: "10 Desember 2023", file: "/dokumen/rkpdes-2024.pdf" },
  { judul: "Profil Desa dan Potensi Desa 2024", deskripsi: "Gambaran umum kondisi desa, potensi sumber daya alam, dan sumber daya manusia.", tanggal: "20 Februari 2024", file: "/dokumen/profil-desa-2024.pdf" },
];

const Publikasi = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Publikasi Desa</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publikasiData.map((item, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{item.judul}</CardTitle>
              <CardDescription>{item.tanggal}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={item.file} download>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Dokumen
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Publikasi;
