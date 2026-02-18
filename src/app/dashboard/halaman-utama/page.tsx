'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings-actions";

const HalamanUtamaPage = () => {
    const [logoUrl, setLogoUrl] = useState("/logo-desa.png");
    const [heroUrl, setHeroUrl] = useState("/Background utama.png");
    const [heroTitle, setHeroTitle] = useState("");
    const [heroSubtitle, setHeroSubtitle] = useState("");
    const [heroDescription, setHeroDescription] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            const settings = await getSiteSettings();
            if (settings) {
                setLogoUrl(settings.logoUrl || "/logo-desa.png");
                setHeroUrl(settings.heroUrl || "/Background utama.png");
                setHeroTitle(settings.heroTitle || "SELAMAT DATANG DI LAMAN INFORMASI");
                setHeroSubtitle(settings.heroSubtitle || "DESA REMAU BAKO TUO");
                setHeroDescription(settings.heroDescription || "Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan");
            }
            setIsLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const success = await updateSiteSettings({ logoUrl, heroUrl, heroTitle, heroSubtitle, heroDescription });
            if (success) {
                toast({ title: "Perubahan telah disimpan!" });
            } else {
                throw new Error("Gagal menyimpan ke database.");
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
            toast({ title: "Gagal menyimpan perubahan.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div>Memuat pengaturan...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Utama</h2>
                    <p className="text-muted-foreground">
                        Atur tampilan dan konten utama yang tampil di halaman depan.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Konten Teks Hero</CardTitle>
                    <CardDescription>
                        Ubah teks yang ditampilkan di atas gambar utama.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="hero-title">Judul Atas (Kecil)</Label>
                        <Input 
                            id="hero-title" 
                            value={heroTitle} 
                            onChange={(e) => setHeroTitle(e.target.value)}
                            placeholder="Contoh: SELAMAT DATANG DI..."
                            disabled={isSaving}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Judul Utama (Besar)</Label>
                        <Input 
                            id="hero-subtitle" 
                            value={heroSubtitle} 
                            onChange={(e) => setHeroSubtitle(e.target.value)}
                            placeholder="Contoh: DESA REMAU BAKO TUO"
                            disabled={isSaving}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="hero-description">Deskripsi</Label>
                        <Textarea 
                            id="hero-description" 
                            value={heroDescription} 
                            onChange={(e) => setHeroDescription(e.target.value)}
                            placeholder="Jelaskan secara singkat tentang desa atau situs web ini."
                            rows={4}
                            disabled={isSaving}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Logo Aplikasi</CardTitle>
                        <CardDescription>
                            Ubah logo yang ditampilkan di pojok kiri atas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="logo-url">URL Gambar Logo</Label>
                            <Input 
                                id="logo-url" 
                                value={logoUrl} 
                                onChange={(e) => setLogoUrl(e.target.value)}
                                placeholder="https://example.com/logo.png"
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <Label>Preview Logo</Label>
                            <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-muted/50 h-24">
                                {logoUrl && (
                                    <Image 
                                        src={logoUrl} 
                                        alt="Logo Preview" 
                                        width={40} 
                                        height={40} 
                                        className="object-contain"
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Gambar Utama (Hero)</CardTitle>
                        <CardDescription>
                            Ubah gambar latar belakang di bagian atas halaman utama.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="hero-url">URL Gambar Utama</Label>
                            <Input 
                                id="hero-url" 
                                value={heroUrl} 
                                onChange={(e) => setHeroUrl(e.target.value)}
                                placeholder="https://example.com/hero-image.jpg"
                                disabled={isSaving}
                            />
                        </div>
                        <div>
                            <Label>Preview Gambar Utama</Label>
                            <div className="mt-2 border rounded-md aspect-video relative overflow-hidden bg-muted/50">
                                {heroUrl && (
                                     <Image 
                                        src={heroUrl} 
                                        alt="Hero Preview" 
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HalamanUtamaPage;
