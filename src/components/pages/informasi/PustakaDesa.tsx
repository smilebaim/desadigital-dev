
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, History, Anchor, BookCopy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const PustakaDesa = () => {
    const pustakaData = {
        umum: {
            title: "Pustaka Digital Desa Remau Bako Tuo",
            icon: Library,
            content: {
                deskripsi: "Selamat datang di Pustaka Digital Desa Remau Bako Tuo, gerbang pengetahuan untuk seluruh masyarakat. Di sini, kami mengumpulkan, merawat, dan membagikan berbagai informasi, dokumen, dan karya yang berkaitan dengan kehidupan, sejarah, dan potensi desa kita. Tujuan kami adalah meningkatkan literasi dan menyediakan akses pengetahuan yang mudah bagi semua warga.",
            }
        },
        koleksi: {
            title: "Koleksi Digital",
            icon: BookCopy,
            content: {
                kategori: [
                    {
                        nama: "Sejarah dan Budaya Pesisir",
                        icon: History,
                        deskripsi: "Dokumen, cerita lisan, dan catatan sejarah tentang asal-usul Desa Remau Bako Tuo, tradisi melaut, dan kearifan lokal masyarakat pesisir.",
                        item: [
                            { judul: "Asal Usul Nama Remau Bako Tuo", tipe: "PDF", link: "#" },
                            { judul: "Kisah Para Perantau Bugis di Pesisir Jambi", tipe: "PDF", link: "#" },
                        ]
                    },
                    {
                        nama: "Potensi Kelautan dan Perikanan",
                        icon: Anchor,
                        deskripsi: "Panduan praktis, hasil penelitian, dan informasi terkait pengelolaan sumber daya laut, teknik penangkapan ikan, dan budidaya perikanan.",
                        item: [
                            { judul: "Panduan Budidaya Kepiting Bakau", tipe: "PDF", link: "#" },
                            { judul: "Teknik Pengolahan Ikan Asin Kualitas Ekspor", tipe: "PDF", link: "#" },
                        ]
                    },
                ]
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pustaka Desa</h2>
                    <p className="text-muted-foreground">
                        Pusat Pengetahuan dan Literasi Digital Desa
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Library className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{pustakaData.umum.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Gerbang Pengetahuan untuk Masyarakat
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {pustakaData.umum.content.deskripsi}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <BookCopy className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{pustakaData.koleksi.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Jelajahi dan unduh koleksi pengetahuan kami.
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {pustakaData.koleksi.content.kategori.map((kategori, index) => (
                            <div key={index} className="space-y-4 border-b pb-4 last:border-b-0 last:pb-0">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <kategori.icon className="h-5 w-5 text-primary" />
                                        {kategori.nama}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {kategori.deskripsi}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    {kategori.item.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
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
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PustakaDesa;
