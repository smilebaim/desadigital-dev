import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, HeartPulse, Shield, Trash2, Apple, FileSignature, MessageSquareWarning } from 'lucide-react';

const layananLinks = [
    { title: "Layanan Persuratan", href: "/layanan/persuratan", description: "Pengurusan berbagai surat keterangan untuk warga.", icon: FileSignature },
    { title: "Pos Kesehatan Desa (Poskesdes)", href: "/layanan/poskesdes", description: "Layanan kesehatan primer untuk masyarakat desa.", icon: HeartPulse },
    { title: "Menu Pendamping Gizi (MPG)", href: "/layanan/mpg", description: "Contoh menu sehat untuk balita dan ibu hamil/menyusui.", icon: Apple },
    { title: "Pos Keamanan Lingkungan (Poskamling)", href: "/layanan/poskamling", description: "Sistem keamanan swadaya untuk menjaga ketertiban.", icon: Shield },
    { title: "Bank Sampah", href: "/layanan/bank-sampah", description: "Pengelolaan sampah kering kolektif dengan insentif.", icon: Trash2 },
    { title: "Penanganan Keluhan", href: "/layanan/penanganan-keluhan", description: "Sampaikan aspirasi dan keluhan Anda terkait pelayanan.", icon: MessageSquareWarning },
];

export default function LayananPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Layanan Desa</h2>
                <p className="text-muted-foreground">
                    Jelajahi berbagai layanan publik yang tersedia untuk warga Desa Remau Bako Tuo.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {layananLinks.map(link => {
                    const Icon = link.icon;
                    return (
                        <Link key={link.href} href={link.href} className="block group">
                            <Card className="h-full transition-all group-hover:shadow-md group-hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary" />
                                            {link.title}
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
