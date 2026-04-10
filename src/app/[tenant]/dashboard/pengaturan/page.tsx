'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Save, Globe, Search, Phone, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { getSiteSettings, updateSiteSettings, type SiteSettings } from "@/lib/site-settings-actions";
import { seedDefaultMenus } from "@/lib/menu-actions";
import { seedInitialStatistik } from "@/lib/statistik-actions";
import { seedDummyPosts } from "@/lib/posts-actions";
import { Database, LayoutGrid, BarChart, PenTool, AlertCircle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/firebase";

const PengaturanPage = () => {
    const params = useParams();
    const { user } = useUser();
    // Ekstrak tenantId dari URL params (contoh: /[tenant]/dashboard/pengaturan)
    const tenantId = (Array.isArray(params?.tenant) ? params.tenant[0] : params?.tenant) as string | undefined;

    const [settings, setSettings] = useState<Partial<SiteSettings>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            const data = await getSiteSettings(tenantId);
            if (data) setSettings(data);
            setIsLoading(false);
        };
        fetchSettings();
    }, [tenantId]);


    const handleChange = (field: keyof SiteSettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const success = await updateSiteSettings(settings, tenantId);
            if (success) {
                toast({ title: "✅ Pengaturan berhasil disimpan!" });
            } else {
                throw new Error();
            }
        } catch {
            toast({ title: "Gagal menyimpan pengaturan.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSeed = async (type: 'menus' | 'stats' | 'posts') => {
        const confirmSeed = confirm(`Apakah Anda yakin ingin melakukan inisialisasi data ${type}? Data hanya akan ditambah jika belum ada.`);
        if (!confirmSeed) return;

        toast({ title: "⏳ Memproses inisialisasi data..." });
        
        try {
            let result;
            if (type === 'menus') result = await seedDefaultMenus(tenantId);
            else if (type === 'stats') result = await seedInitialStatistik(tenantId);
            else if (type === 'posts') result = await seedDummyPosts(user?.uid || 'system', user?.displayName || user?.email?.split('@')[0] || 'Admin Desa', tenantId);

            if (result?.success) {
                toast({ title: `✅ Berhasil!`, description: (result as any).message || "Data berhasil diinisialisasi." });
            } else {
                toast({ title: "Info", description: (result as any)?.error || (result as any)?.message || "Data sudah ada atau gagal.", variant: "default" });
            }
        } catch (error) {
            toast({ title: "❌ Gagal melakukan inisialisasi.", variant: "destructive" });
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-muted rounded w-56" />
                <div className="h-48 bg-muted rounded" />
                <div className="h-48 bg-muted rounded" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pengaturan Website</h2>
                    <p className="text-muted-foreground">
                        Kelola identitas, SEO, dan informasi kontak desa.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Menyimpan..." : "Simpan Semua"}
                </Button>
            </div>

            {/* SEO & Identitas */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        <CardTitle>SEO &amp; Identitas Website</CardTitle>
                    </div>
                    <CardDescription>
                        Informasi ini digunakan oleh mesin pencari (Google) dan saat link dibagikan di media sosial.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="siteName">Nama Website / Desa</Label>
                        <Input
                            id="siteName"
                            value={settings.siteName || ''}
                            onChange={e => handleChange('siteName', e.target.value)}
                            placeholder="Contoh: Desa Remau Bako Tuo"
                            disabled={isSaving}
                        />
                        <p className="text-xs text-muted-foreground">Tampil di tab browser dan hasil pencarian Google.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="siteDescription">Deskripsi Website</Label>
                        <Textarea
                            id="siteDescription"
                            value={settings.siteDescription || ''}
                            onChange={e => handleChange('siteDescription', e.target.value)}
                            placeholder="Deskripsi singkat tentang website desa ini (150-160 karakter)..."
                            rows={3}
                            disabled={isSaving}
                        />
                        <p className="text-xs text-muted-foreground">
                            {(settings.siteDescription || '').length}/160 karakter — Idealnya 150-160 karakter untuk Google.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="siteKeywords">Kata Kunci (Keywords)</Label>
                        <Input
                            id="siteKeywords"
                            value={settings.siteKeywords || ''}
                            onChange={e => handleChange('siteKeywords', e.target.value)}
                            placeholder="Contoh: desa, sistem informasi, APBDes, layanan desa"
                            disabled={isSaving}
                        />
                        <p className="text-xs text-muted-foreground">Pisahkan dengan koma.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Open Graph / Social Share */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <CardTitle>Gambar Pratampil Media Sosial (Open Graph)</CardTitle>
                    </div>
                    <CardDescription>
                        Gambar yang muncul saat link website dibagikan di WhatsApp, Facebook, atau Twitter.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ogImageUrl">URL Gambar Open Graph</Label>
                        <Input
                            id="ogImageUrl"
                            value={settings.ogImageUrl || ''}
                            onChange={e => handleChange('ogImageUrl', e.target.value)}
                            placeholder="https://... atau /path/to/image.jpg"
                            disabled={isSaving}
                        />
                        <p className="text-xs text-muted-foreground">Ukuran terbaik: 1200 × 630 piksel.</p>
                    </div>

                    {/* Preview Card */}
                    {settings.ogImageUrl && (
                        <div className="rounded-xl border overflow-hidden max-w-sm bg-card shadow-sm">
                            <div className="aspect-[1200/630] relative bg-muted">
                                <Image
                                    src={settings.ogImageUrl}
                                    alt="OG Preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="p-3 border-t">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {typeof window !== 'undefined' ? window.location.hostname : 'website-desa.com'}
                                </p>
                                <p className="text-sm font-semibold truncate">{settings.siteName || 'Nama Website'}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{settings.siteDescription || 'Deskripsi website...'}</p>
                            </div>
                        </div>
                    )}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Preview di atas menunjukkan kurang lebih tampilan saat link dibagikan di media sosial.
                    </p>
                </CardContent>
            </Card>

            <Separator />

            {/* Informasi Kontak */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <CardTitle>Informasi Kontak Desa</CardTitle>
                    </div>
                    <CardDescription>
                        Data kontak yang dapat ditampilkan di halaman publik.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Alamat Email</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                value={settings.contactEmail || ''}
                                onChange={e => handleChange('contactEmail', e.target.value)}
                                placeholder="admin@desaremaubakotuo.id"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Nomor Telepon / WhatsApp</Label>
                            <Input
                                id="contactPhone"
                                type="tel"
                                value={settings.contactPhone || ''}
                                onChange={e => handleChange('contactPhone', e.target.value)}
                                placeholder="0812-3456-7890"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactAddress">Alamat Lengkap</Label>
                        <Textarea
                            id="contactAddress"
                            value={settings.contactAddress || ''}
                            onChange={e => handleChange('contactAddress', e.target.value)}
                            placeholder="Jl. Raya Desa No. 1, Desa Remau Bako Tuo, Kecamatan ..., Kabupaten ..."
                            rows={3}
                            disabled={isSaving}
                        />
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Pengaturan Kop Surat */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle>Identitas Kop Surat &amp; Pemerintahan</CardTitle>
                    </div>
                    <CardDescription>
                        Informasi ini akan digunakan secara otomatis pada cetak surat arsip (Surat Domisili, dsb).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="kabupaten">Kabupaten / Kota</Label>
                            <Input id="kabupaten" value={settings.kabupaten || ''} onChange={e => handleChange('kabupaten', e.target.value)} disabled={isSaving} placeholder="Tanjung Jabung Timur" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kecamatan">Kecamatan</Label>
                            <Input id="kecamatan" value={settings.kecamatan || ''} onChange={e => handleChange('kecamatan', e.target.value)} disabled={isSaving} placeholder="Sadu" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kodePos">Kode Pos</Label>
                            <Input id="kodePos" value={settings.kodePos || ''} onChange={e => handleChange('kodePos', e.target.value)} disabled={isSaving} placeholder="36773" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="kepalaDesaName">Nama Kepala Desa</Label>
                            <Input id="kepalaDesaName" value={settings.kepalaDesaName || ''} onChange={e => handleChange('kepalaDesaName', e.target.value)} disabled={isSaving} placeholder="H. Abdullah" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kepalaDesaNip">NIP Kepala Desa (Jika Ada)</Label>
                            <Input id="kepalaDesaNip" value={settings.kepalaDesaNip || ''} onChange={e => handleChange('kepalaDesaNip', e.target.value)} disabled={isSaving} placeholder="Kosongkan jika tidak ada" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Pemeliharaan Sistem */}
            <Card className="border-orange-200 bg-orange-50/10">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-orange-600" />
                        <CardTitle className="text-orange-950">Pemeliharaan Sistem</CardTitle>
                    </div>
                    <CardDescription>
                        Fungsi untuk inisialisasi data awal jika website masih kosong.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert variant="default" className="bg-orange-50 border-orange-200 text-orange-800">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertTitle>Penting</AlertTitle>
                        <AlertDescription className="text-xs">
                            Gunakan tombol di bawah jika navigasi (menu) atau grafik dana desa tidak muncul di halaman publik.
                        </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex flex-col gap-2 border-orange-200 hover:bg-orange-100/50"
                            onClick={() => handleSeed('menus')}
                        >
                            <LayoutGrid className="h-5 w-5 text-orange-600" />
                            <div className="text-center">
                                <p className="font-semibold text-sm">Menu Navigasi</p>
                                <p className="text-[10px] text-muted-foreground">Reset Menu Publik</p>
                            </div>
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex flex-col gap-2 border-orange-200 hover:bg-orange-100/50"
                            onClick={() => handleSeed('stats')}
                        >
                            <BarChart className="h-5 w-5 text-orange-600" />
                            <div className="text-center">
                                <p className="font-semibold text-sm">Data Statistik</p>
                                <p className="text-[10px] text-muted-foreground">Reset Dana Desa</p>
                            </div>
                        </Button>

                        <Button 
                            variant="outline" 
                            className="h-auto py-4 flex flex-col gap-2 border-orange-200 hover:bg-orange-100/50"
                            onClick={() => handleSeed('posts')}
                        >
                            <PenTool className="h-5 w-5 text-orange-600" />
                            <div className="text-center">
                                <p className="font-semibold text-sm">Contoh Berita</p>
                                <p className="text-[10px] text-muted-foreground">Buat Berita Dummy</p>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Menyimpan..." : "Simpan Semua Pengaturan"}
                </Button>
            </div>
        </div>
    );
};

export default PengaturanPage;
