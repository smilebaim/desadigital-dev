import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Library, Users, Shield } from 'lucide-react';

const kelembagaanLinks = [
    { title: "PKK", href: "/kelembagaan/pkk", description: "Pemberdayaan dan Kesejahteraan Keluarga.", icon: Users },
    { title: "LKD", href: "/kelembagaan/lkd", description: "Lembaga Kemasyarakatan Desa.", icon: Library },
    { title: "Karang Taruna", href: "/kelembagaan/karang-taruna", description: "Organisasi kepemudaan desa.", icon: Shield },
];

export default function KelembagaanPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Kelembagaan Desa</h2>
                <p className="text-muted-foreground">
                    Lembaga-lembaga yang menjadi mitra pemerintah desa.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kelembagaanLinks.map(link => {
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
