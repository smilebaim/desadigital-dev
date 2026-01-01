
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Anchor, Ship, Coconut, FileText } from "lucide-react";

const BUMDes = () => {
    const bumdesData = {
        umum: {
            title: "BUMDes Bahari Sejahtera",
            icon: Building2,
            content: {
                deskripsi: "Badan Usaha Milik Desa (BUMDes) 'Bahari Sejahtera' adalah pilar utama penggerak ekonomi Desa Remau Bako Tuo. Didirikan untuk mengelola dan mengoptimalkan potensi sumber daya laut dan darat desa secara profesional demi meningkatkan pendapatan asli desa (PADes) dan kesejahteraan masyarakat.",
                dasarHukum: "Peraturan Desa Nomor 5 Tahun 2022 tentang Pendirian dan Pengelolaan BUMDes Bahari Sejahtera."
            }
        },
        unit: {
            title: "Unit Usaha BUMDes",
            icon: Anchor,
            content: [
                {
                    judul: "Unit Pengelolaan Tempat Pelelangan Ikan (TPI)",
                    deskripsi: "Mengelola kegiatan lelang ikan harian, menyediakan fasilitas pendingin (cold storage), dan memastikan harga yang adil bagi nelayan. Unit ini menjadi pusat aktivitas ekonomi perikanan di desa.",
                    kegiatan: [
                        "Fasilitasi lelang hasil tangkapan.",
                        "Penyediaan es balok dan gudang pendingin.",
                        "Kemitraan distribusi dengan pedagang besar."
                    ]
                },
                {
                    judul: "Unit Ekowisata Mangrove dan Pesisir",
                    deskripsi: "Mengembangkan potensi wisata alam desa dengan menawarkan paket tur jelajah hutan mangrove, pengamatan satwa, dan wisata edukasi tentang ekosistem pesisir.",
                    kegiatan: [
                        "Penyediaan perahu wisata dan pemandu lokal.",
                        "Pembangunan jalur (track) kayu di dalam kawasan mangrove.",
                        "Kerja sama dengan homestay milik warga."
                    ]
                },
                {
                    judul: "Unit Pengolahan Hasil Kelapa Terpadu",
                    deskripsi: "Meningkatkan nilai tambah dari komoditas kelapa dengan mengolahnya menjadi produk turunan seperti kopra putih, minyak kelapa murni (VCO), dan arang tempurung.",
                    kegiatan: [
                        "Pembelian kelapa dari petani lokal.",
                        "Proses produksi kopra putih dan VCO.",
                        "Pemasaran produk olahan ke luar daerah."
                    ]
                }
            ]
        },
        dokumen: {
            title: "Dokumen Terkait",
            icon: FileText,
            content: [
                {
                    judul: "Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) BUMDes",
                    status: "Dokumen Publik"
                },
                {
                    judul: "Laporan Keuangan Tahunan BUMDes",
                    status: "Dokumen Publik (dirilis setiap tahun)"
                }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Badan Usaha Milik Desa (BUMDes)</h2>
                    <p className="text-muted-foreground">
                        Motor Penggerak Ekonomi Desa Remau Bako Tuo
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <bumdesData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{bumdesData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{bumdesData.umum.content.deskripsi}</p>
                        <p className="text-sm font-medium text-foreground">Dasar Hukum: <span className="font-normal text-muted-foreground">{bumdesData.umum.content.dasarHukum}</span></p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <bumdesData.unit.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{bumdesData.unit.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {bumdesData.unit.content.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{item.judul}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                    {item.kegiatan.map((k, i) => <li key={i}>{k}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <bumdesData.dokumen.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{bumdesData.dokumen.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {bumdesData.dokumen.content.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="font-semibold">{item.judul}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ketersediaan</span>
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
}

export default BUMDes;
