
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, BrainCircuit, Users, Mic, Gamepad2 } from "lucide-react";

const MPG = () => {
    const mpgData = {
        umum: {
            title: "Masyarakat Peduli Gen Z (MPG)",
            icon: HeartHandshake,
            deskripsi: "Masyarakat Peduli Gen Z (MPG) adalah sebuah inisiatif dan wadah kemasyarakatan di Desa Remau Bako Tuo yang berfokus pada pembinaan, pemberdayaan, dan pendampingan generasi Z (remaja dan pemuda) agar menjadi generasi yang tangguh, kreatif, berakhlak mulia, dan siap menghadapi tantangan zaman."
        },
        tujuan: {
            title: "Tujuan dan Sasaran",
            icon: Users,
            items: [
                "Mencegah kenakalan remaja, penyalahgunaan narkoba, dan perilaku negatif lainnya.",
                "Mengembangkan potensi, bakat, dan minat generasi Z di berbagai bidang.",
                "Meningkatkan partisipasi pemuda dalam kegiatan sosial dan pembangunan desa.",
                "Menciptakan ruang aman dan positif bagi remaja untuk berekspresi dan berinteraksi."
            ]
        },
        program: {
            title: "Program Unggulan",
            icon: BrainCircuit,
            items: [
                { icon: Gamepad2, title: "Pengembangan Minat dan Bakat", description: "Mengadakan kegiatan rutin seperti turnamen e-sports, kompetisi olahraga pesisir (voli pantai, sepak takraw), dan festival musik lokal." },
                { icon: Mic, title: "Peningkatan Kapasitas", description: "Menyelenggarakan workshop keterampilan digital (digital marketing, desain grafis), public speaking, dan kewirausahaan untuk pemuda." },
                { icon: HeartHandshake, title: "Aksi Sosial dan Lingkungan", description: "Mengajak pemuda dalam kegiatan bersih-bersih pantai, penanaman mangrove, dan bakti sosial kepada masyarakat." },
                { icon: Users, title: "Ruang Konseling dan Diskusi", description: "Menyediakan wadah bagi remaja untuk berdiskusi tentang tantangan yang mereka hadapi dengan didampingi oleh tokoh masyarakat atau ahli." }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Masyarakat Peduli Gen Z (MPG)</h2>
                    <p className="text-muted-foreground">
                        Membina Generasi Muda yang Tangguh dan Kreatif
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <mpgData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{mpgData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{mpgData.umum.deskripsi}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <mpgData.tujuan.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{mpgData.tujuan.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {mpgData.tujuan.items.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <mpgData.program.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{mpgData.program.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mpgData.program.items.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="p-4 bg-muted/50 rounded-lg flex items-start gap-4">
                                    <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default MPG;
