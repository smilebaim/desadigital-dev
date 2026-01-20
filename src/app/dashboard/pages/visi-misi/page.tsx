'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getVisiMisi, updateVisiMisi, type VisiMisiData } from '@/lib/visi-misi-actions';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormValues {
    visi: string;
    misi: string;
}

const VisiMisiControlPage = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<FormValues>();
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchVisiMisi = async () => {
            setIsLoading(true);
            const data = await getVisiMisi();
            if (data) {
                reset({
                    visi: data.visi,
                    misi: data.misi.join('\n')
                });
            }
            setIsLoading(false);
        };
        fetchVisiMisi();
    }, [reset]);

    const onSubmit = async (formData: FormValues) => {
        const dataToUpdate: VisiMisiData = {
            visi: formData.visi,
            misi: formData.misi.split('\n').filter(line => line.trim() !== ''),
        };
        
        const success = await updateVisiMisi(dataToUpdate);
        if (success) {
            toast({ title: "Visi & Misi berhasil diperbarui." });
            reset(formData);
        } else {
            toast({ title: "Gagal memperbarui Visi & Misi.", variant: "destructive" });
        }
    };

    if (isLoading) {
        return <div>Memuat data Visi & Misi...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Visi & Misi</h2>
                    <p className="text-muted-foreground">
                        Ubah konten yang ditampilkan pada halaman Visi & Misi.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/pages">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Daftar Halaman
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visi</CardTitle>
                            <CardDescription>Tuliskan Visi Desa dalam satu kalimat atau paragraf singkat.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Controller
                                name="visi"
                                control={control}
                                render={({ field }) => <Textarea {...field} rows={8} disabled={isSubmitting} />}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Misi</CardTitle>
                            <CardDescription>Tuliskan setiap poin Misi dalam baris baru.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Controller
                                name="misi"
                                control={control}
                                render={({ field }) => <Textarea {...field} rows={8} disabled={isSubmitting} />}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting || !isDirty}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VisiMisiControlPage;
