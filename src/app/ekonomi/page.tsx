import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Building, Users, ShoppingCart } from 'lucide-react';

const ekonomiLinks = [
    { title: "BUMDes", href: "/ekonomi/bumdes", description: "Informasi dan unit usaha Badan Usaha Milik Desa.", icon: Building },
    { title: "Koperasi", href: "/ekonomi/koperasi", description: "Layanan dan kinerja Koperasi Desa.", icon: Users },
    { title: "UMKM", href: "/ekonomi/umkm", description: "Potensi dan produk Usaha Mikro, Kecil, dan Menengah.", icon: ShoppingCart },
];

export default function EkonomiPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Potensi Ekonomi Desa</h2>
                <p className="text-muted-foreground">
                    Jelajahi potensi ekonomi yang ada di Desa Remau Bako Tuo.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ekonomiLinks.map(link => {
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
