'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { addCustomPage } from '@/lib/static-pages-actions';

const pageSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)'),
  content: z.string().min(1, 'Konten wajib diisi'),
});

type PageFormValues = z.infer<typeof pageSchema>;

const NewCustomPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PageFormValues>({
        resolver: zodResolver(pageSchema),
        defaultValues: { title: '', slug: '', content: '' }
    });

    const titleValue = watch('title');

    const generateSlug = (str: string) => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    };
    
    useEffect(() => {
        setValue('slug', generateSlug(titleValue));
    }, [titleValue, setValue]);

    const onSubmit = async (data: PageFormValues) => {
        const result = await addCustomPage(data);
        if (result.success) {
            toast({ title: "Halaman baru berhasil dibuat." });
            router.push('/dashboard/pages');
        } else {
            toast({ title: "Gagal membuat halaman.", description: result.error, variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tambah Halaman Baru</h2>
                    <p className="text-muted-foreground">Buat halaman kustom baru untuk situs Anda.</p>
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
                                <Input id="slug" {...field} placeholder="slug-url-halaman" />
                            )} />
                            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                             <p className="text-xs text-muted-foreground">Contoh: /p/{watch('slug')}</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Konten</Label>
                            <Controller name="content" control={control} render={({ field }) => (
                                <Textarea id="content" {...field} rows={15} placeholder="Tulis konten halaman di sini. Anda dapat menggunakan HTML sederhana." />
                            )} />
                            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                <Save className="h-4 w-4 mr-2" />{isSubmitting ? "Menyimpan..." : "Simpan Halaman"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewCustomPage;
