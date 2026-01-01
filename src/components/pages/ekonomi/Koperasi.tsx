
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, ShoppingCart, TrendingUp, FileText } from "lucide-react";

const Koperasi = () => {
    const koperasiData = {
        umum: {
            title: "Koperasi Nelayan Merah Putih",
            icon: Handshake,
            content: {
                deskripsi: "Koperasi Nelayan 'Merah Putih' adalah lembaga ekonomi yang beranggotakan para nelayan dan masyarakat pesisir Desa Remau Bako Tuo. Koperasi ini bertujuan untuk meningkatkan kesejahteraan anggota melalui usaha bersama yang berasaskan kekeluargaan dan gotong royong.",
                prinsip: "Dari anggota, oleh anggota, dan untuk anggota."
            }
        },
        unit: {
            title: "Layanan dan Unit Usaha Koperasi",
            icon: ShoppingCart,
            content: [
                {
                    judul: "Unit Simpan Pinjam",
                    deskripsi: "Menyediakan layanan simpanan dan pinjaman dengan bunga ringan untuk anggota, terutama untuk modal melaut, perbaikan perahu, atau kebutuhan mendesak lainnya.",
                    layanan: [
                        "Simpanan Pokok dan Wajib",
                        "Simpanan Sukarela (Tabungan)",
                        "Pinjaman Modal Usaha",
                        "Pinjaman multiguna"
                    ]
                },
                {
                    judul: "Unit Penyediaan Sarana Produksi Kelautan (SAPROKEL)",
                    deskripsi: "Menyediakan kebutuhan pokok bagi nelayan untuk melaut dengan harga yang lebih terjangkau, seperti bahan bakar (BBM), jaring, umpan, dan suku cadang mesin perahu.",
                    layanan: [
                        "Penjualan BBM bersubsidi untuk anggota",
                        "Toko kelengkapan melaut",
                        "Penyediaan es balok"
                    ]
                },
                {
                    judul: "Unit Pemasaran Bersama",
                    deskripsi: "Membantu anggota memasarkan hasil tangkapan secara kolektif untuk mendapatkan harga jual yang lebih baik dan memotong rantai tengkulak.",
                    layanan: [
                        "Pengumpulan dan penjualan ikan hasil tangkapan anggota",
                        "Kemitraan dengan BUMDes dan eksportir",
                    ]
                }
            ]
        },
        dokumen: {
            title: "Dokumen Terkait",
            icon: FileText,
            content: [
                {
                    judul: "Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Koperasi",
                    status: "Tersedia di Kantor Koperasi"
                },
                {
                    judul: "Laporan Rapat Anggota Tahunan (RAT)",
                    status: "Dokumen Publik (dirilis setiap tahun)"
                }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Koperasi Desa</h2>
                    <p className="text-muted-foreground">
                        Soko Guru Perekonomian Nelayan Desa Remau Bako Tuo
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <koperasiData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{koperasiData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{koperasiData.umum.content.deskripsi}</p>
                        <p className="text-sm font-medium text-foreground">Prinsip: <span className="font-normal text-muted-foreground italic">"{koperasiData.umum.content.prinsip}"</span></p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <koperasiData.unit.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{koperasiData.unit.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {koperasiData.unit.content.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{item.judul}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                    {item.layanan.map((l, i) => <li key={i}>{l}</li>)}
                                </ul>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <koperasiData.dokumen.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{koperasiData.dokumen.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {koperasiData.dokumen.content.map((item, index) => (
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

export default Koperasi;
