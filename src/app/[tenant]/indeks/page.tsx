
import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, TrendingUp, HeartHandshake, Leaf } from 'lucide-react';

const indeksLinks = [
    { title: "Ketahanan Sosial", href: "/indeks/ketahanan-sosial", description: "Mengukur tingkat kesejahteraan, harmoni, dan keamanan.", icon: HeartHandshake },
    { title: "Ketahanan Ekonomi", href: "/indeks/ketahanan-ekonomi", description: "Mengukur kemampuan ekonomi desa untuk tumbuh dan beradaptasi.", icon: TrendingUp },
    { title: "Ketahanan Lingkungan", href: "/indeks/ketahanan-lingkungan", description: "Menilai kapasitas desa dalam menjaga kelestarian alam.", icon: Leaf },
];

export default function IndeksPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Indeks Desa Membangun (IDM)</h2>
                <p className="text-muted-foreground">
                    Gambaran kemajuan desa berdasarkan tiga pilar utama.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {indeksLinks.map(link => {
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
