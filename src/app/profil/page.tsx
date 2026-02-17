
import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const profileLinks = [
    { title: "Profil Desa", href: "/profil/profil-desa", description: "Gambaran umum, geografis, dan demografi desa." },
    { title: "Sejarah Desa", href: "/profil/sejarah-desa", description: "Jejak langkah dan asal-usul berdirinya desa." },
    { title: "Visi & Misi", href: "/profil/visi-misi", description: "Arah dan tujuan pembangunan desa ke depan." },
    { title: "Struktur Pemerintahan", href: "/profil/struktur-pemerintahan", description: "Susunan perangkat desa yang bertugas." },
    { title: "Struktur BPD", href: "/profil/struktur-badan", description: "Badan Permusyawaratan Desa sebagai mitra pemerintah." },
];

export default function ProfilPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Profil Desa</h2>
                <p className="text-muted-foreground">
                    Kenali lebih dalam tentang Desa Remau Bako Tuo.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileLinks.map(link => (
                    <Link key={link.href} href={link.href} className="block group">
                        <Card className="h-full transition-all group-hover:shadow-md group-hover:-translate-y-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {link.title}
                                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
