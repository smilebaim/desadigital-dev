'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { getSiteSettings, updateSiteSettings } from "@/lib/site-settings-actions";

const HalamanUtamaPage = () => {
    const [logoUrl, setLogoUrl] = useState("/logo-desa.png");
    const [heroUrl, setHeroUrl] = useState("/Background utama.png");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            const settings = await getSiteSettings();
            if (settings) {
                setLogoUrl(settings.logoUrl || "/logo-desa.png");
                setHeroUrl(settings.heroUrl || "/Background utama.png");
            }
            setIsLoading(false);
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const success = await updateSiteSettings({ logoUrl, heroUrl });
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
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Utama</h2>
                <p className="text-muted-foreground">
                    Atur gambar logo dan gambar utama (hero) yang tampil di halaman depan.
                </p>
            </div>

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
            
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>
        </div>
    );
};

export default HalamanUtamaPage;
