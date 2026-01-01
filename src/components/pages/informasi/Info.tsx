'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const mockInfoData = [
  {
    id: 1,
    title: "Peringatan HUT RI ke-79: Rangkaian Acara dan Lomba",
    category: "Pengumuman",
    date: "2024-08-01",
    author: "Panitia Desa",
    excerpt: "Dalam rangka menyambut Hari Ulang Tahun Republik Indonesia yang ke-79, Pemerintah Desa Remau Bako Tuo akan menyelenggarakan berbagai kegiatan lomba untuk memeriahkan...",
    imageUrl: "https://picsum.photos/seed/hut-ri/600/400"
  },
  {
    id: 2,
    title: "Rehabilitasi Mangrove Tahap II Dimulai",
    category: "Berita",
    date: "2024-07-28",
    author: "Tim Lingkungan",
    excerpt: "Program pelestarian lingkungan pesisir kembali dilanjutkan dengan dimulainya rehabilitasi hutan mangrove tahap kedua. Kegiatan ini melibatkan partisipasi aktif dari kelompok pemuda...",
    imageUrl: "https://picsum.photos/seed/mangrove/600/400"
  },
  {
    id: 3,
    title: "Jadwal Penyaluran Bantuan Pangan Bulan Agustus 2024",
    category: "Pengumuman",
    date: "2024-07-25",
    author: "Seksi Kesra",
    excerpt: "Diberitahukan kepada seluruh Keluarga Penerima Manfaat (KPM) bahwa penyaluran bantuan pangan untuk bulan Agustus akan dilaksanakan pada tanggal 19 Agustus 2024 di Aula Kantor Desa...",
    imageUrl: "https://picsum.photos/seed/bantuan-pangan/600/400"
  },
  {
    id: 4,
    title: "BUMDes Bahari Sejahtera Luncurkan Produk Olahan Ikan Baru",
    category: "Berita",
    date: "2024-07-20",
    author: "BUMDes",
    excerpt: "BUMDes 'Bahari Sejahtera' sukses meluncurkan produk inovasi baru berupa abon ikan tongkol dan kerupuk kulit ikan yang siap dipasarkan ke luar daerah. Langkah ini diharapkan dapat...",
    imageUrl: "https://picsum.photos/seed/bumdes-produk/600/400"
  }
];

const Info = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Info & Berita Desa</h2>
                    <p className="text-muted-foreground">
                        Informasi terbaru dari Desa Remau Bako Tuo
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockInfoData.map((info) => (
                        <Card key={info.id} className="overflow-hidden flex flex-col">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={info.imageUrl}
                                        alt={info.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Tag className="h-3 w-3" />
                                    <span>{info.category}</span>
                                    <span className="mx-1">|</span>
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(info.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <CardTitle className="text-lg leading-snug">{info.title}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                                    {info.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <Link href={`/info/${info.id}`} className="flex items-center gap-1">
                                        Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Info;
