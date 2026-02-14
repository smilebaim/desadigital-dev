'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, BarChart3, PieChart, ChevronDown, Shield, TrendingUp, Leaf } from 'lucide-react';
import Link from 'next/link';
import { getCustomPage, updateCustomPage } from '@/lib/static-pages-actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pageSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi').regex(/^[a-z0-9\/-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, tanda hubung (-), dan garis miring (/)'),
  content: z.string(),
});

type PageFormValues = z.infer<typeof pageSchema>;

const EditCustomPage = () => {
    const router = useRouter();
    const params = useParams();
    const pageId = params.id as string;
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    const { control, handleSubmit, setValue, watch, reset, getValues, formState: { errors, isSubmitting } } = useForm<PageFormValues>({
        resolver: zodResolver(pageSchema)
    });
    
    useEffect(() => {
        if (!pageId) return;
        const fetchPage = async () => {
            setIsLoading(true);
            const page = await getCustomPage(pageId);
            if (page) {
                reset(page);
            } else {
                toast({ title: "Halaman tidak ditemukan.", variant: 'destructive' });
                router.push('/dashboard/pages');
            }
            setIsLoading(false);
        };
        fetchPage();
    }, [pageId, reset, router, toast]);
    
    const onSubmit = async (data: PageFormValues) => {
        const result = await updateCustomPage(pageId, data);
        if (result.success) {
            toast({ title: "Halaman berhasil diperbarui." });
            router.push('/dashboard/pages');
        } else {
            toast({ title: "Gagal memperbarui halaman.", description: result.error, variant: 'destructive' });
        }
    };
    
    const handleInsertPlaceholder = (placeholder: string) => {
      const currentContent = getValues('content') || '';
      const textToInsert = `\n\n${placeholder}\n\n`;
      setValue('content', currentContent + textToInsert, { shouldDirty: true });
    };

    if (isLoading) {
        return <div>Memuat data halaman...</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Edit Halaman</h2>
                    <p className="text-muted-foreground">Perbarui konten halaman kustom Anda.</p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/pages"><ArrowLeft className="h-4 w-4 mr-2" />Kembali</Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Konten Halaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Halaman</Label>
                            <Controller name="title" control={control} render={({ field }) => (
                                <Input id="title" {...field} placeholder="Judul halaman..." />
                            )} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Controller name="slug" control={control} render={({ field }) => (
                                <Input id="slug" {...field} placeholder="contoh/slug-url-halaman" />
                            )} />
                            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                             <p className="text-xs text-muted-foreground">URL akan menjadi: {typeof window !== 'undefined' ? window.location.origin : ''}/{watch('slug')}</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Konten</Label>
                            <Controller name="content" control={control} render={({ field }) => (
                                <Textarea id="content" {...field} rows={15} placeholder="Tulis konten halaman di sini. Anda dapat menggunakan HTML sederhana." />
                            )} />
                            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
                        </div>
                        <div className="flex justify-between items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button type="button" variant="outline">
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Sisipkan Visualisasi
                                        <ChevronDown className="h-4 w-4 ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[STATISTIK_PENDUDUK_CHART]')}>
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Piramida Penduduk
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[STATISTIK_PENDIDIKAN_CHART]')}>
                                        <PieChart className="h-4 w-4 mr-2" />
                                        Diagram Pendidikan
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[STATISTIK_PEKERJAAN_CHART]')}>
                                        <BarChart3 className="h-4 w-4 mr-2" />
                                        Diagram Pekerjaan
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[INDEKS_KETAHANAN_SOSIAL]')}>
                                        <Shield className="h-4 w-4 mr-2" />
                                        Indeks Ketahanan Sosial
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[INDEKS_KETAHANAN_EKONOMI]')}>
                                        <TrendingUp className="h-4 w-4 mr-2" />
                                        Indeks Ketahanan Ekonomi
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleInsertPlaceholder('[INDEKS_KETAHANAN_LINGKUNGAN]')}>
                                        <Leaf className="h-4 w-4 mr-2" />
                                        Indeks Ketahanan Lingkungan
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button type="submit" disabled={isSubmitting}>
                                <Save className="h-4 w-4 mr-2" />{isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditCustomPage;
