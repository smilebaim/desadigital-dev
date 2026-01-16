'use client';
import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { recentPosts } from '@/lib/placeholder-images.json';
import type { SiteSettings } from "@/lib/site-settings-actions";

const LandingPage = ({ settings }: { settings: SiteSettings | null }) => {
  return (
    <div className="flex-1">
      <Hero heroUrl={settings?.heroUrl} />
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
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title} 
                      fill
                      className="object-cover"
                      data-ai-hint={post.imageHint}
                    />
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
