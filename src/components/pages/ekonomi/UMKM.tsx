
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Fish, Leaf, Lightbulb, Users } from "lucide-react";

const UMKM = () => {
    const umkmData = {
        umum: {
            title: "UMKM Desa Remau Bako Tuo",
            icon: Store,
            content: {
                deskripsi: "Usaha Mikro, Kecil, dan Menengah (UMKM) merupakan tulang punggung ekonomi kerakyatan di Desa Remau Bako Tuo. Berbagai usaha tumbuh dari kreativitas masyarakat dalam mengolah potensi lokal, menciptakan lapangan kerja, dan meningkatkan pendapatan keluarga.",
            }
        },
        sektor: {
            title: "Sektor UMKM Unggulan",
            icon: Lightbulb,
            content: [
                {
                    judul: "Pengolahan Hasil Laut",
                    icon: Fish,
                    deskripsi: "Sektor terbesar yang mengolah hasil tangkapan nelayan menjadi produk bernilai tambah.",
                    produk: [
                        "Ikan Asin Kualitas Premium",
                        "Kerupuk Ikan & Udang",
                        "Terasi Udang Tradisional",
                        "Abon Ikan Tongkol"
                    ]
                },
                {
                    judul: "Pengolahan Kelapa",
                    icon: Leaf,
                    deskripsi: "Memanfaatkan melimpahnya hasil perkebunan kelapa di sekitar desa.",
                    produk: [
                        "Kopra Putih",
                        "Minyak Kelapa Murni (VCO)",
                        "Kerajinan dari Tempurung dan Sabut Kelapa",
                        "Gula Merah Kelapa"
                    ]
                },
                {
                    judul: "Kuliner dan Jasa",
                    icon: Users,
                    deskripsi: "Usaha pendukung yang melayani kebutuhan sehari-hari warga dan wisatawan.",
                    produk: [
                        "Warung Makan Khas Pesisir",
                        "Jasa Perbaikan Mesin Perahu",
                        "Toko Kelontong dan Kebutuhan Melaut",
                        "Penyewaan Perahu Wisata"
                    ]
                }
            ]
        },
        dukungan: {
            title: "Dukungan Pemerintah Desa",
            icon: Users,
            content: {
                deskripsi: "Pemerintah Desa Remau Bako Tuo berkomitmen untuk mendukung pertumbuhan UMKM melalui berbagai program:",
                program: [
                    "Pelatihan Manajemen Usaha dan Pemasaran Digital.",
                    "Fasilitasi akses permodalan melalui Koperasi dan BUMDes.",
                    "Pendampingan untuk pengurusan izin usaha (NIB) dan sertifikasi halal.",
                    "Promosi produk UMKM melalui media sosial desa dan pameran."
                ]
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Usaha Mikro, Kecil, dan Menengah (UMKM)</h2>
                    <p className="text-muted-foreground">
                        Kreativitas Ekonomi Masyarakat Pesisir
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <umkmData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{umkmData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{umkmData.umum.content.deskripsi}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <umkmData.sektor.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{umkmData.sektor.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {umkmData.sektor.content.map((item, index) => {
                             const Icon = item.icon;
                             return (
                                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="h-6 w-6 text-primary" />
                                        <h4 className="font-semibold">{item.judul}</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                                    <p className="text-sm font-medium mt-2">Contoh Produk:</p>
                                    <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                        {item.produk.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                </div>
                             );
                        })}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <umkmData.dukungan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{umkmData.dukungan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{umkmData.dukungan.content.deskripsi}</p>
                         <ul className="space-y-2">
                            {umkmData.dukungan.content.program.map((program, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Lightbulb className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{program}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default UMKM;
