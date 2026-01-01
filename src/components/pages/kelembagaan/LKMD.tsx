
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, BarChart2 } from "lucide-react";

const LKMD = () => {
    const lkmdData = {
        umum: {
            title: "Lembaga Ketahanan Masyarakat Desa (LKMD)",
            icon: Users,
            content: {
                deskripsi: "Lembaga Ketahanan Masyarakat Desa (LKMD) adalah lembaga kemasyarakatan yang tumbuh dari, oleh, dan untuk masyarakat, yang berfungsi sebagai mitra Pemerintah Desa dalam merencanakan, melaksanakan, dan mengendalikan pembangunan di Desa Remau Bako Tuo.",
                dasarHukum: "Peraturan Desa Nomor 4 Tahun 2021 tentang Lembaga Kemasyarakatan Desa."
            }
        },
        tugas: {
            title: "Tugas dan Fungsi Utama",
            icon: Briefcase,
            content: [
                "Menampung dan menyalurkan aspirasi masyarakat dalam musyawarah perencanaan pembangunan desa (Musrenbangdes).",
                "Membantu Pemerintah Desa dalam menyusun Rencana Kerja Pemerintah Desa (RKPDes) dan Rencana Pembangunan Jangka Menengah Desa (RPJMDes).",
                "Menggerakkan partisipasi dan swadaya gotong royong masyarakat dalam pelaksanaan program pembangunan.",
                "Melakukan pengawasan partisipatif terhadap pelaksanaan pembangunan di tingkat desa.",
                "Menumbuhkan kondisi dinamis masyarakat untuk memperkuat ketahanan sosial, ekonomi, dan lingkungan."
            ]
        },
        program: {
            title: "Contoh Program Kerja",
            icon: BarChart2,
            content: [
                {
                    judul: "Pengawasan Pembangunan Dermaga",
                    deskripsi: "Memastikan pembangunan dermaga baru berjalan sesuai spesifikasi dan selesai tepat waktu."
                },
                {
                    judul: "Gotong Royong Perbaikan Jalan Usaha Tani",
                    deskripsi: "Mengorganisir masyarakat untuk memperbaiki akses jalan ke area perkebunan kelapa."
                },
                {
                    judul: "Musyawarah Dusun (Musdus)",
                    deskripsi: "Menjaring aspirasi warga di setiap dusun sebagai bahan masukan untuk Musrenbangdes."
                },
            ]
        },
        dokumen: {
            title: "Dokumen Terkait",
            icon: FileText,
            content: [
                {
                    judul: "SK Pengurus LKMD Periode 2021-2026",
                    status: "Arsip Desa"
                },
                {
                    judul: "Laporan Kegiatan Tahunan LKMD",
                    status: "Dokumen Publik"
                }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Lembaga Ketahanan Masyarakat Desa (LKMD)</h2>
                    <p className="text-muted-foreground">
                        Mitra Pemerintah Desa dalam Pembangunan Partisipatif
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <lkmdData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{lkmdData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{lkmdData.umum.content.deskripsi}</p>
                        <p className="text-sm font-medium text-foreground">Dasar Hukum: <span className="font-normal text-muted-foreground">{lkmdData.umum.content.dasarHukum}</span></p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <lkmdData.tugas.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{lkmdData.tugas.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {lkmdData.tugas.content.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Briefcase className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <lkmdData.program.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{lkmdData.program.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {lkmdData.program.content.map((item, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{item.judul}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.deskripsi}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <lkmdData.dokumen.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{lkmdData.dokumen.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {lkmdData.dokumen.content.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h4 className="font-semibold">{item.judul}</h4>
                            <div className="grid grid-cols-2 gap-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status Dokumen</span>
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

export default LKMD;
