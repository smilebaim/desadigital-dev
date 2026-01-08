'use client';
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const recentPosts = [
    {
        id: 1,
        title: "Pembangunan Infrastruktur Jalan Desa",
        category: "Pembangunan",
        excerpt: "Proses pembangunan jalan utama desa telah mencapai 80% dan diharapkan selesai pada akhir bulan depan...",
        imageUrl: "https://picsum.photos/seed/1/600/400",
    },
    {
        id: 2,
        title: "Pelatihan UMKM untuk Ibu-Ibu PKK",
        category: "Ekonomi",
        excerpt: "Dalam rangka meningkatkan keterampilan, diadakan pelatihan pembuatan produk olahan dari hasil bumi setempat...",
        imageUrl: "https://picsum.photos/seed/2/600/400",
    },
    {
        id: 3,
        title: "Program Posyandu Balita Bulan Ini",
        category: "Kesehatan",
        excerpt: "Jangan lewatkan jadwal posyandu untuk penimbangan dan imunisasi balita yang akan dilaksanakan minggu ini...",
        imageUrl: "https://picsum.photos/seed/3/600/400",
    },
];

const LandingPage = () => {
  return (
    <div className="flex-1">
      <Hero />
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Info & Berita Terkini</h2>
            <p className="text-muted-foreground mt-2">
              Ikuti perkembangan dan kegiatan terbaru dari Desa Remau Bako Tuo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col">
                <div className="relative h-56 w-full">
                    <Image src={post.imageUrl} alt={post.title} layout="fill" objectFit="cover" />
                </div>
                <CardHeader>
                  <p className="text-sm text-primary font-semibold">{post.category}</p>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardContent>
                   <Button asChild variant="link" className="p-0">
                        <Link href="/berita">
                            Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/berita">Lihat Semua Berita</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
