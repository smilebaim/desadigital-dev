import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, BookOpen, FileArchive } from 'lucide-react';

const pustakaLinks = [
    { title: "Publikasi Desa", href: "/pustaka/publikasi", description: "Dokumen, laporan, dan produk hukum resmi desa.", icon: FileArchive },
    { title: "Pustaka Digital", href: "/pustaka/pustaka-desa", description: "Koleksi karya tulis yang berkaitan dengan desa.", icon: BookOpen },
];

export default function PustakaPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Pustaka Desa</h2>
                <p className="text-muted-foreground">
                    Pusat informasi dan dokumen digital desa.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pustakaLinks.map(link => {
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
