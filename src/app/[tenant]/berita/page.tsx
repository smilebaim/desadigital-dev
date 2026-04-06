import PublicLayout from "@/layouts/PublicLayout";
import { getPublishedPosts } from "@/lib/posts-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react";
import type { PostData } from "@/lib/posts-actions";

export default async function BeritaPage() {
    const allPosts = await getPublishedPosts();
    // Filter specifically for 'Berita' category
    const newsPosts = (allPosts as (PostData & { id: string})[]).filter(post => post.category === 'Berita');

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <div className="space-y-6 max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                            <Newspaper className="h-8 w-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Kabar Desa</h2>
                            <p className="text-muted-foreground">
                                Kumpulan berita dan liputan kegiatan terbaru di Desa Remau Bako Tuo.
                            </p>
                        </div>
                    </div>

                    {newsPosts.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {newsPosts.map((post) => (
                                <Card key={post.id} className="flex flex-col border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                    <div className="aspect-video relative bg-muted overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <div className="absolute bottom-3 left-3 z-20">
                                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            {post.createdAt && <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col pt-0">
                                        <p className="text-muted-foreground line-clamp-3 flex-grow text-sm leading-relaxed">{post.content}</p>
                                        <Button asChild variant="outline" className="mt-6 w-full rounded-xl group/btn">
                                            <Link href={`/info/${post.id}`} className="flex items-center justify-center gap-2">
                                                Selengkapnya <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed">
                            <CardContent className="py-20 text-center text-muted-foreground">
                                <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p className="text-lg font-medium">Belum ada berita yang diterbitkan.</p>
                                <p className="text-sm mt-1">Silakan cek kembali nanti untuk informasi terbaru.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
