
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Newspaper, BarChart2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Publikasi = () => {
    const publikasiData = {
        umum: {
            title: "Publikasi Resmi Desa",
            icon: FileSpreadsheet,
            content: {
                deskripsi: "Halaman ini menyediakan akses publik terhadap berbagai dokumen, laporan, dan media informasi yang diterbitkan secara resmi oleh Pemerintah Desa Remau Bako Tuo. Ini adalah wujud komitmen kami terhadap transparansi dan penyebarluasan informasi kepada seluruh masyarakat.",
            }
        },
        laporan: {
            title: "Laporan & Dokumen Perencanaan",
            icon: FileSpreadsheet,
            deskripsi: "Dokumen perencanaan dan pertanggungjawaban tahunan.",
            items: [
                { judul: "Laporan Penyelenggaraan Pemerintahan Desa (LPPD) 2023", tipe: "PDF", link: "#" },
                { judul: "Laporan Keterangan Pertanggungjawaban (LKPJ) Kepala Desa 2023", tipe: "PDF", link: "#" },
                { judul: "Dokumen RKPDes 2024", tipe: "PDF", link: "#" },
            ]
        },
        berkala: {
            title: "Media Informasi Berkala",
            icon: Newspaper,
            deskripsi: "Buletin dan infografis tentang program dan capaian desa.",
            items: [
                { judul: "Buletin Desa 'Suara Pesisir' Edisi Q1 2024", tipe: "PDF", link: "#" },
                { judul: "Infografis Realisasi APBDes 2023", tipe: "Gambar (PNG)", link: "#" },
                { judul: "Infografis Data Kependudukan Semester II 2023", tipe: "Gambar (PNG)", link: "#" },
            ]
        },
        data: {
            title: "Data Statistik Desa",
            icon: BarChart2,
            deskripsi: "Kumpulan data statistik sektoral yang diperbarui secara berkala.",
            items: [
                { judul: "Data Statistik Perikanan dan Kelautan 2023", tipe: "Excel (XLSX)", link: "#" },
                { judul: "Data Monografi Desa 2023", tipe: "Excel (XLSX)", link: "#" },
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Publikasi Desa</h2>
                    <p className="text-muted-foreground">
                        Pusat Informasi dan Dokumen Publik
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <FileSpreadsheet className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{publikasiData.umum.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Transparansi Informasi untuk Masyarakat
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {publikasiData.umum.content.deskripsi}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <FileSpreadsheet className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{publikasiData.laporan.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{publikasiData.laporan.deskripsi}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {publikasiData.laporan.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">{item.judul}</p>
                                    <p className="text-xs text-muted-foreground">Tipe File: {item.tipe}</p>
                                </div>
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

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Newspaper className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{publikasiData.berkala.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{publikasiData.berkala.deskripsi}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {publikasiData.berkala.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">{item.judul}</p>
                                    <p className="text-xs text-muted-foreground">Tipe File: {item.tipe}</p>
                                </div>
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

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <BarChart2 className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{publikasiData.data.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{publikasiData.data.deskripsi}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {publikasiData.data.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">{item.judul}</p>
                                    <p className="text-xs text-muted-foreground">Tipe File: {item.tipe}</p>
                                </div>
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
}

export default Publikasi;
