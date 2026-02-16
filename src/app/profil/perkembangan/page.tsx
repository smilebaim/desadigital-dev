'use client';
import PublicLayout from "@/layouts/PublicLayout";
import IndeksEkonomi from "@/components/charts/IndeksEkonomi";
import IndeksSosial from "@/components/charts/IndeksSosial";
import IndeksLingkungan from "@/components/charts/IndeksLingkungan";
import Breadcrumb from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <Breadcrumb
          items={[
            { title: "Profil", path: "/profil" },
            { title: "Perkembangan Desa" }
          ]}
        />
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Perkembangan Desa</h2>
                <p className="text-muted-foreground">
                    Gambaran kemajuan desa berdasarkan tiga pilar Indeks Desa Membangun (IDM).
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Indeks Ketahanan Sosial (IKS)</CardTitle>
                        <CardDescription>Mengukur tingkat kesejahteraan, harmoni, dan keamanan dalam masyarakat.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <IndeksSosial isPreview={true} />
                        <Button asChild variant="link" className="mt-4 self-start px-0">
                            <Link href="/indeks/ketahanan-sosial">Lihat Detail &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Indeks Ketahanan Ekonomi (IKE)</CardTitle>
                         <CardDescription>Mengukur kemampuan ekonomi desa untuk tumbuh dan beradaptasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <IndeksEkonomi isPreview={true} />
                        <Button asChild variant="link" className="mt-4 self-start px-0">
                            <Link href="/indeks/ketahanan-ekonomi">Lihat Detail &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Indeks Ketahanan Lingkungan (IKL)</CardTitle>
                        <CardDescription>Menilai kapasitas desa dalam menjaga kelestarian alam.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <IndeksLingkungan isPreview={true} />
                        <Button asChild variant="link" className="mt-4 self-start px-0">
                            <Link href="/indeks/ketahanan-lingkungan">Lihat Detail &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
