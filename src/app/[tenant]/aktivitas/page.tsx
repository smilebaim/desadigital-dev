import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Calendar, CalendarClock, Leaf } from 'lucide-react';

const aktivitasLinks = [
    { title: "Agenda Kegiatan", href: "/aktivitas/agenda", description: "Jadwal kegiatan dan acara yang akan datang di desa.", icon: Calendar },
    { title: "Kalender Kegiatan", href: "/aktivitas/kalender-kegiatan", description: "Lihat jadwal kegiatan desa dalam tampilan kalender interaktif.", icon: CalendarClock },
    { title: "Kalender Pangan", href: "/aktivitas/kalender-pangan", description: "Jadwal siklus tanam komoditas utama dan informasi musim.", icon: Leaf },
];

export default function AktivitasPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Aktivitas Desa</h2>
                <p className="text-muted-foreground">
                    Ikuti perkembangan dan jadwal kegiatan terbaru di desa.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aktivitasLinks.map(link => {
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
