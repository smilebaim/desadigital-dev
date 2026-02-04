'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@/firebase';
import { getPost, updatePost, type PostData } from '@/lib/posts-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const EditPostPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    
    const postId = params.id as string;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Berita' | 'Pengumuman'>('Berita');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!postId) return;
        
        const fetchPost = async () => {
            const post = await getPost(postId);
            if (post) {
                setTitle(post.title);
                setCategory(post.category as 'Berita' | 'Pengumuman');
                setContent(post.content);
                setStatus(post.status as 'Published' | 'Draft');
            } else {
                toast({ title: "Artikel tidak ditemukan.", variant: "destructive" });
                router.push('/dashboard/info');
            }
            setIsLoading(false);
        };

        fetchPost();
    }, [postId, router, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Anda harus login untuk mengedit post.", variant: "destructive" });
            return;
        }

        if (!title || !content || !category || !status) {
             toast({ title: "Semua field harus diisi.", variant: "destructive" });
             return;
        }

        setIsSubmitting(true);

        const postData: Partial<PostData> = {
            title,
            category,
            content,
            status,
        };

        const success = await updatePost(postId, postData);

        if (success) {
            toast({ title: "Artikel berhasil diperbarui!" });
            router.push('/dashboard/info');
        } else {
            toast({ title: "Gagal memperbarui artikel.", variant: "destructive" });
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Memuat data artikel...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Artikel</h2>
                    <p className="text-muted-foreground">
                        Perbarui detail artikel di bawah ini.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/info">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Artikel
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Konten Artikel</CardTitle>
                    <CardDescription>Ubah detail artikel yang ada.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                           <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Artikel</Label>
                                    <Input 
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Contoh: Peringatan HUT RI ke-79"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content">Isi Konten</Label>
                                    <Textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Tulis isi lengkap artikel di sini..."
                                        rows={10}
                                        disabled={isSubmitting}
                                    />
                                </div>
                           </div>
                           <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <Select 
                                        value={category} 
                                        onValueChange={(value: 'Berita' | 'Pengumuman') => setCategory(value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Berita">Berita</SelectItem>
                                            <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select 
                                        value={status} 
                                        onValueChange={(value: 'Published' | 'Draft') => setStatus(value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Published">Publikasikan (Published)</SelectItem>
                                            <SelectItem value="Draft">Simpan sebagai Draft</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                           </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                <Save className="h-4 w-4 mr-2" />
                                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditPostPage;
