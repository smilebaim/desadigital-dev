'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getLandingPage, updateLandingPage, type LandingPageData } from "@/lib/landing-pages-actions";

const linkSchema = z.object({
    title: z.string().min(1, "Judul wajib diisi"),
    href: z.string().min(1, "URL wajib diisi"),
    description: z.string().optional(),
    icon: z.string().optional()
});

const landingPageSchema = z.object({
    title: z.string().min(1, "Judul utama halaman wajib diisi"),
    subtitle: z.string().optional(),
    links: z.array(linkSchema)
});

type FormValues = z.infer<typeof landingPageSchema>;

export default function EditLandingPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [loading, setLoading] = useState(true);

    const { 
        control, 
        handleSubmit, 
        reset, 
        formState: { isSubmitting } 
    } = useForm<FormValues>({
        resolver: zodResolver(landingPageSchema),
        defaultValues: { title: "", subtitle: "", links: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "links"
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getLandingPage(id);
            if (data) {
                reset({
                    title: data.title || "",
                    subtitle: data.subtitle || "",
                    links: data.links || []
                });
            }
            setLoading(false);
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (values: FormValues) => {
        try {
            const result = await updateLandingPage(id, {
                title: values.title,
                subtitle: values.subtitle,
                // Ensure optional string fields fall back to empty string to avoid undefined
                links: values.links.map(l => ({
                    title: l.title,
                    href: l.href,
                    description: l.description || '',
                    icon: l.icon || ''
                }))
            });

            if (result.success) {
                toast({ title: "Perubahan berhasil disimpan!" });
                router.push("/dashboard/landing-pages");
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            console.error("Failed to save:", error);
            toast({ title: "Gagal menyimpan perubahan.", description: error.message, variant: "destructive" });
        }
    };

    if (loading) return <div className="p-6">Memuat konfigurasi halaman...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/landing-pages">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight capitalize">
                        Edit Halaman {id.replace('-', ' ')}
                    </h2>
                    <p className="text-muted-foreground">
                        Sesuaikan judul, teks perkenalan, dan daftar link yang tampil.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Konten Utama Halaman</CardTitle>
                        <CardDescription>Bagian teks teratas sebelum daftar kartu link.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Halaman (H1)</Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Contoh: Layanan Desa" disabled={isSubmitting} />
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Teks Perkenalan / Subtitle</Label>
                            <Controller
                                name="subtitle"
                                control={control}
                                render={({ field }) => (
                                    <Textarea {...field} rows={3} placeholder="Penjelasan singkat di bawah judul utama." disabled={isSubmitting} />
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Daftar Kartu / Link Navigasi</CardTitle>
                            <CardDescription>Menu atau sub-kategori yang dapat diakses pengguna dari halaman ini.</CardDescription>
                        </div>
                        <Button 
                            type="button" 
                            size="sm" 
                            variant="secondary"
                            onClick={() => append({ title: "", href: "", description: "", icon: "ArrowRight" })}
                            disabled={isSubmitting}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Kartu
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {fields.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                Belum ada kartu link. Klik &quot;Tambah Kartu&quot; untuk memulai.
                            </div>
                        )}
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid gap-4 p-4 border rounded-lg bg-gray-50/50 relative group">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => remove(index)}
                                    disabled={isSubmitting}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Judul Kartu</Label>
                                        <Controller
                                            name={`links.${index}.title`}
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder="Contoh: Profil Desa" disabled={isSubmitting} required />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>URL Tujuan / Href</Label>
                                        <Controller
                                            name={`links.${index}.href`}
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder="Contoh: /profil/profil-desa" disabled={isSubmitting} required />}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4">
                                     <div className="space-y-2">
                                        <Label>Deskripsi Singkat</Label>
                                        <Controller
                                            name={`links.${index}.description`}
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder="Deskripsi pendek di bawah judul kartu" disabled={isSubmitting} />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ikon (Nama Ikon Lucide - Opsional)</Label>
                                        <Controller
                                            name={`links.${index}.icon`}
                                            control={control}
                                            render={({ field }) => <Input {...field} placeholder="Contoh: Users, Building, FileText" disabled={isSubmitting} />}
                                        />
                                        <p className="text-xs text-muted-foreground">Lihat referensi ikon di <a href="https://lucide.dev/icons" target="_blank" className="text-blue-500 underline">lucide.dev/icons</a>. Kosongkan untuk default.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                         <Link href="/dashboard/landing-pages">Batal</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
