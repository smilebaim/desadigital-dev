
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, BookOpen, Utensils, Shirt, Home, Wallet, Leaf, CheckSquare } from "lucide-react";

const PKK = () => {
    const pkkData = {
        umum: {
            title: "Pemberdayaan Kesejahteraan Keluarga (PKK)",
            icon: HeartHandshake,
            deskripsi: "Gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah, yang pengelolaannya dari, oleh, dan untuk masyarakat menuju terwujudnya keluarga yang beriman, bertaqwa, berakhlak mulia, berbudi luhur, sehat, sejahtera, maju, dan mandiri."
        },
        program: {
            title: "10 Program Pokok PKK",
            icon: CheckSquare,
            items: [
                { icon: BookOpen, title: "Penghayatan dan Pengamalan Pancasila", description: "Membina sikap dan perilaku yang sesuai dengan nilai-nilai Pancasila." },
                { icon: Users, title: "Gotong Royong", description: "Meningkatkan semangat kebersamaan dan kepedulian sosial dalam masyarakat." },
                { icon: Utensils, title: "Pangan", description: "Mendorong pemanfaatan lahan pekarangan untuk ketahanan pangan keluarga (Hatinya PKK)." },
                { icon: Shirt, title: "Sandang", description: "Mengembangkan keterampilan membuat pakaian dan kerajinan untuk kebutuhan keluarga dan usaha." },
                { icon: Home, title: "Perumahan dan Tata Laksana Rumah Tangga", description: "Mewujudkan rumah sehat dan layak huni serta pengelolaan rumah tangga yang efektif." },
                { icon: BookOpen, title: "Pendidikan dan Keterampilan", description: "Meningkatkan pengetahuan dan keterampilan anggota keluarga, terutama kaum perempuan." },
                { icon: HeartHandshake, title: "Kesehatan", description: "Menggerakkan program kesehatan keluarga, gizi, dan pengelolaan Posyandu." },
                { icon: Wallet, title: "Pengembangan Kehidupan Berkoperasi", description: "Mendorong tumbuhnya usaha ekonomi keluarga melalui koperasi dan UP2K (Usaha Peningkatan Pendapatan Keluarga)." },
                { icon: Leaf, title: "Kelestarian Lingkungan Hidup", description: "Meningkatkan kesadaran tentang pentingnya menjaga kebersihan dan kelestarian lingkungan." },
                { icon: BarChart2, title: "Perencanaan Sehat", description: "Membina kesadaran keluarga dalam merencanakan keuangan dan jumlah anak yang ideal (Program KB)." }
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pemberdayaan Kesejahteraan Keluarga (PKK)</h2>
                    <p className="text-muted-foreground">
                        Motor Penggerak Kesejahteraan Keluarga di Desa Remau Bako Tuo
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <pkkData.umum.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{pkkData.umum.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{pkkData.umum.deskripsi}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <pkkData.program.icon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{pkkData.program.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pkkData.program.items.map((item, index) => {
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

// Dummy icons for missing ones
const Users = (props: any) => <HeartHandshake {...props} />;
const BarChart2 = (props: any) => <Wallet {...props} />;


export default PKK;
