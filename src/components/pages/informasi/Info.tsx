'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPostsStream } from "@/lib/posts-actions";

interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: any;
  author: string;
  excerpt: string;
  status: 'Published' | 'Draft';
  content: string;
  imageUrl?: string; // Optional image
}

const Info = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getPostsStream((allPosts) => {
            const publishedPosts = allPosts.filter(post => post.status === 'Published').map((post: any) => ({
                ...post,
                // Create a short excerpt from content if not present
                excerpt: post.excerpt || post.content.substring(0, 150) + '...'
            }));
            setPosts(publishedPosts as Post[]);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 mt-16 mb-20 text-center">
                Memuat artikel...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Info & Berita Desa</h2>
                    <p className="text-muted-foreground">
                        Informasi terbaru dari Desa Remau Bako Tuo
                    </p>
                </div>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((info) => (
                            <Card key={info.id} className="overflow-hidden flex flex-col">
                                <CardHeader className="p-0">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={info.imageUrl || `https://picsum.photos/seed/${info.id}/600/400`}
                                            alt={info.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                        <Tag className="h-3 w-3" />
                                        <span>{info.category}</span>
                                        <span className="mx-1">|</span>
                                        <Calendar className="h-3 w-3" />
                                        <span>{info.createdAt ? new Date(info.createdAt.seconds * 1000).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
                                    </div>
                                    <CardTitle className="text-lg leading-snug">{info.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                                        {info.excerpt}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button variant="link" asChild className="p-0 h-auto">
                                        <Link href={`/info/${info.id}`} className="flex items-center gap-1">
                                            Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg">Belum ada berita atau pengumuman yang dipublikasikan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;
