'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getSejarahDesa, updateSejarahDesa, type SejarahDesaData } from '@/lib/sejarah-desa-actions';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const defaultValues: SejarahDesaData = {
    judul: "",
    tahun: "",
    deskripsi: "",
};

const SejarahDesaControlPage = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<SejarahDesaData>({ defaultValues });
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchSejarah = async () => {
            setIsLoading(true);
            const data = await getSejarahDesa();
            if (data) {
                reset(data);
            }
            setIsLoading(false);
        };
        fetchSejarah();
    }, [reset]);

    const onSubmit = async (data: SejarahDesaData) => {
        const success = await updateSejarahDesa(data);
        if (success) {
            toast({ title: "Sejarah Desa berhasil diperbarui." });
            reset(data);
        } else {
            toast({ title: "Gagal memperbarui sejarah desa.", variant: "destructive" });
        }
    };

    if (isLoading) {
        return <div>Memuat data sejarah desa...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Sejarah Desa</h2>
                    <p className="text-muted-foreground">
                        Ubah konten yang ditampilkan pada halaman sejarah desa.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/pages">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Halaman
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Konten Sejarah Desa</CardTitle>
                    <CardDescription>Isi semua informasi yang relevan di bawah ini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="judul">Judul</Label>
                                <Controller
                                    name="judul"
                                    control={control}
                                    render={({ field }) => <Input id="judul" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tahun">Tahun Berdiri</Label>
                                <Controller
                                    name="tahun"
                                    control={control}
                                    render={({ field }) => <Input id="tahun" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deskripsi">Deskripsi Sejarah</Label>
                            <Controller
                                name="deskripsi"
                                control={control}
                                render={({ field }) => <Textarea id="deskripsi" {...field} rows={12} disabled={isSubmitting} placeholder="Tulis cerita sejarah desa di sini. Anda bisa menggunakan baris baru untuk membuat paragraf." />}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting || !isDirty}>
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

export default SejarahDesaControlPage;
