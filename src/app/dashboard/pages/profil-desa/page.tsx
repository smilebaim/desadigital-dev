'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getProfilDesa, updateProfilDesa, type ProfilDesaData } from '@/lib/profil-desa-actions';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const defaultValues: ProfilDesaData = {
    nama: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    luas: "",
    penduduk: "",
    kepalaDesa: "",
    periode: "",
};

const ProfilDesaControlPage = () => {
    const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<ProfilDesaData>({ defaultValues });
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProfil = async () => {
            setIsLoading(true);
            const data = await getProfilDesa();
            if (data) {
                reset(data);
            }
            setIsLoading(false);
        };
        fetchProfil();
    }, [reset]);

    const onSubmit = async (data: ProfilDesaData) => {
        const success = await updateProfilDesa(data);
        if (success) {
            toast({ title: "Profil Desa berhasil diperbarui." });
            reset(data); // reset form to new values to clear isDirty state
        } else {
            toast({ title: "Gagal memperbarui profil desa.", variant: "destructive" });
        }
    };

    if (isLoading) {
        return <div>Memuat data profil desa...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Profil Desa</h2>
                    <p className="text-muted-foreground">
                        Ubah konten yang ditampilkan pada halaman profil desa publik.
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
                    <CardTitle>Data Umum Desa</CardTitle>
                    <CardDescription>Isi semua informasi yang relevan di bawah ini.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Desa</Label>
                                <Controller
                                    name="nama"
                                    control={control}
                                    render={({ field }) => <Input id="nama" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kecamatan">Kecamatan</Label>
                                <Controller
                                    name="kecamatan"
                                    control={control}
                                    render={({ field }) => <Input id="kecamatan" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kabupaten">Kabupaten</Label>
                                <Controller
                                    name="kabupaten"
                                    control={control}
                                    render={({ field }) => <Input id="kabupaten" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="provinsi">Provinsi</Label>
                                <Controller
                                    name="provinsi"
                                    control={control}
                                    render={({ field }) => <Input id="provinsi" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="luas">Luas Wilayah</Label>
                                <Controller
                                    name="luas"
                                    control={control}
                                    render={({ field }) => <Input id="luas" placeholder="Contoh: 2.500 Ha" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="penduduk">Jumlah Penduduk</Label>
                                <Controller
                                    name="penduduk"
                                    control={control}
                                    render={({ field }) => <Input id="penduduk" placeholder="Contoh: 3.245 Jiwa" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="kepalaDesa">Nama Kepala Desa</Label>
                                <Controller
                                    name="kepalaDesa"
                                    control={control}
                                    render={({ field }) => <Input id="kepalaDesa" {...field} disabled={isSubmitting} />}
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="periode">Periode Jabatan</Label>
                                <Controller
                                    name="periode"
                                    control={control}
                                    render={({ field }) => <Input id="periode" placeholder="Contoh: 2020 - 2026" {...field} disabled={isSubmitting} />}
                                />
                            </div>
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

export default ProfilDesaControlPage;
