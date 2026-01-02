'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { addPost, type PostData } from '@/lib/posts-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const NewPostPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Berita' | 'Pengumuman'>('Berita');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: "Anda harus login untuk membuat post.", variant: "destructive" });
            return;
        }

        if (!title || !content || !category || !status) {
             toast({ title: "Semua field harus diisi.", variant: "destructive" });
             return;
        }

        setIsSubmitting(true);

        const postData: PostData = {
            title,
            category,
            content,
            status,
            author: user.displayName || user.email || 'Admin',
            userId: user.uid,
        };

        const success = await addPost(postData);

        if (success) {
            toast({ title: "Artikel berhasil ditambahkan!" });
            router.push('/dashboard/info');
        } else {
            toast({ title: "Gagal menambahkan artikel.", variant: "destructive" });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tambah Artikel Baru</h2>
                    <p className="text-muted-foreground">
                        Buat pengumuman atau berita baru untuk ditampilkan di situs.
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
                    <CardDescription>Isi detail artikel di bawah ini.</CardDescription>
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
                                {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewPostPage;
