
import PublicLayout from "@/layouts/PublicLayout";
import { getPublishedPosts } from "@/lib/posts-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostData } from "@/lib/posts-actions";

export default async function InfoPage() {
    const posts = await getPublishedPosts();

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Info & Berita</h2>
                        <p className="text-muted-foreground">
                            Informasi, berita, dan pengumuman terbaru dari desa.
                        </p>
                    </div>
                    {posts.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {(posts as (PostData & { id: string})[]).map((post) => (
                                <Card key={post.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                        <CardDescription>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                post.category === 'Berita' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-orange-100 text-orange-800'
                                            }`}>{post.category}</span>
                                            {post.createdAt && <span className="ml-2">{new Date(post.createdAt).toLocaleDateString('id-ID')}</span>}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col">
                                        <p className="text-muted-foreground line-clamp-3 flex-grow">{post.content}</p>
                                        <Button asChild className="mt-4 w-fit">
                                            <Link href={`/info/${post.id}`}>
                                                Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>Belum ada berita atau pengumuman yang dipublikasikan.</p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
