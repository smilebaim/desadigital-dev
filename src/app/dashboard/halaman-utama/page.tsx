'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { getSiteSettings, updateSiteSettings, type SiteSettings } from "@/lib/site-settings-actions";
import {
    Save,
    ImageIcon,
    Type,
    Layers,
    Eye,
    Loader2,
    Tag,
    MousePointerClick,
    Link as LinkIcon,
    Monitor,
    Maximize2,
} from "lucide-react";

// ─── Skeleton Loader ────────────────────────────────────────────────────────
const PageSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <div className="h-8 bg-muted rounded-lg w-64" />
                <div className="h-4 bg-muted rounded w-80" />
            </div>
            <div className="h-10 bg-muted rounded-lg w-36" />
        </div>
        <div className="h-12 bg-muted rounded-xl w-full" />
        <div className="h-80 bg-muted rounded-xl w-full" />
        <div className="h-64 bg-muted rounded-xl w-full" />
    </div>
);

// ─── Live Hero Preview ───────────────────────────────────────────────────────
const HeroPreview = ({ settings }: { settings: Partial<SiteSettings> }) => {
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
            : '0, 0, 0';
    };

    const overlayStyle = {
        backgroundColor: `rgba(${hexToRgb(settings.heroOverlayColor || '#000000')}, ${(settings.heroOverlayOpacity ?? 20) / 100})`,
    };

    const heightClass =
        settings.heroHeight === 'three-quarter' ? 'h-32' :
        settings.heroHeight === 'half' ? 'h-24' : 'h-40';

    return (
        <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden border shadow-inner bg-slate-900`}>
            {settings.heroUrl && (
                <img
                    src={settings.heroUrl}
                    alt="Hero Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 transition-all duration-300" style={overlayStyle} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                {settings.heroBadge && (
                    <span className="inline-block mb-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[8px] font-semibold tracking-widest uppercase">
                        {settings.heroBadge}
                    </span>
                )}
                <p className="text-[9px] font-semibold tracking-widest text-emerald-400 uppercase mb-0.5 leading-tight">
                    {settings.heroTitle || 'Judul Atas'}
                </p>
                <p className="text-sm font-bold text-white leading-tight mb-1 line-clamp-2">
                    {settings.heroSubtitle || 'Judul Utama'}
                </p>
                <p className="text-[8px] text-white/70 leading-tight line-clamp-2 max-w-xs">
                    {settings.heroDescription || 'Deskripsi singkat...'}
                </p>
                {settings.heroButtonText && (
                    <div className="mt-2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-semibold">
                        {settings.heroButtonText}
                    </div>
                )}
            </div>
            {/* Label overlay */}
            <div className="absolute bottom-2 right-2">
                <span className="text-[8px] bg-black/50 text-white/70 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                    Live Preview
                </span>
            </div>
        </div>
    );
};

// ─── Character Counter ───────────────────────────────────────────────────────
const CharCounter = ({ value, max }: { value: string; max: number }) => (
    <p className={`text-xs mt-1 ${value.length > max ? 'text-destructive' : 'text-muted-foreground'}`}>
        {value.length}/{max} karakter
    </p>
);

// ─── Main Page Component ─────────────────────────────────────────────────────
const HalamanUtamaPage = () => {
    const [settings, setSettings] = useState<Partial<SiteSettings>>({
        heroOverlayOpacity: 20,
        heroOverlayColor: '#000000',
        heroHeight: 'full',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            const data = await getSiteSettings();
            if (data) setSettings(data);
            setIsLoading(false);
        };
        fetchSettings();
    }, []);

    const handleChange = (field: keyof SiteSettings, value: string | number) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const success = await updateSiteSettings(settings);
            if (success) {
                toast({ title: "✅ Perubahan berhasil disimpan!" });
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

    if (isLoading) return <PageSkeleton />;

    const overlayPercent = settings.heroOverlayOpacity ?? 20;

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Utama</h2>
                    <p className="text-muted-foreground mt-1">
                        Atur tampilan dan konten di halaman depan publik.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} size="lg" className="w-full sm:w-auto">
                    {isSaving ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Menyimpan...</>
                    ) : (
                        <><Save className="h-4 w-4 mr-2" />Simpan Perubahan</>
                    )}
                </Button>
            </div>

            {/* ── Tabs ── */}
            <Tabs defaultValue="konten" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="konten" className="gap-2">
                        <Type className="h-4 w-4" />
                        <span className="hidden sm:inline">Konten Hero</span>
                        <span className="sm:hidden">Konten</span>
                    </TabsTrigger>
                    <TabsTrigger value="media" className="gap-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Gambar & Media</span>
                        <span className="sm:hidden">Media</span>
                    </TabsTrigger>
                    <TabsTrigger value="tampilan" className="gap-2">
                        <Layers className="h-4 w-4" />
                        <span className="hidden sm:inline">Overlay & Tampilan</span>
                        <span className="sm:hidden">Tampilan</span>
                    </TabsTrigger>
                </TabsList>

                {/* ══ TAB 1: KONTEN ══ */}
                <TabsContent value="konten" className="space-y-6">
                    {/* Live Preview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Preview Langsung</CardTitle>
                            </div>
                            <CardDescription>Tampilan berubah secara real-time saat Anda mengedit.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HeroPreview settings={settings} />
                        </CardContent>
                    </Card>

                    {/* Badge */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Label / Badge Hero</CardTitle>
                            </div>
                            <CardDescription>
                                Teks kecil berbentuk pill yang tampil di atas judul. Biarkan kosong jika tidak ingin ditampilkan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="hero-badge">Teks Badge</Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        id="hero-badge"
                                        value={settings.heroBadge || ''}
                                        onChange={e => handleChange('heroBadge', e.target.value)}
                                        placeholder="Contoh: Portal Resmi Desa • Newly Launched"
                                        disabled={isSaving}
                                        className="flex-1"
                                    />
                                    {settings.heroBadge && (
                                        <Badge variant="secondary" className="shrink-0 bg-emerald-500/10 text-emerald-700 border-emerald-200">
                                            {settings.heroBadge}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Teks utama */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Type className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Teks Utama Hero</CardTitle>
                            </div>
                            <CardDescription>Judul dan deskripsi yang tampil di atas gambar utama.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-1.5">
                                <Label htmlFor="hero-title">Judul Atas (Kecil)</Label>
                                <Input
                                    id="hero-title"
                                    value={settings.heroTitle || ''}
                                    onChange={e => handleChange('heroTitle', e.target.value)}
                                    placeholder="Contoh: SELAMAT DATANG DI LAMAN INFORMASI"
                                    disabled={isSaving}
                                />
                                <CharCounter value={settings.heroTitle || ''} max={80} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="hero-subtitle">Judul Utama (Besar)</Label>
                                <Input
                                    id="hero-subtitle"
                                    value={settings.heroSubtitle || ''}
                                    onChange={e => handleChange('heroSubtitle', e.target.value)}
                                    placeholder="Contoh: DESA REMAU BAKO TUO"
                                    disabled={isSaving}
                                />
                                <CharCounter value={settings.heroSubtitle || ''} max={60} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="hero-description">Deskripsi</Label>
                                <Textarea
                                    id="hero-description"
                                    value={settings.heroDescription || ''}
                                    onChange={e => handleChange('heroDescription', e.target.value)}
                                    placeholder="Jelaskan secara singkat tentang desa atau situs web ini."
                                    rows={4}
                                    disabled={isSaving}
                                />
                                <CharCounter value={settings.heroDescription || ''} max={250} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tombol CTA */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <MousePointerClick className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Tombol Aksi (CTA)</CardTitle>
                            </div>
                            <CardDescription>
                                Tombol yang muncul di bawah deskripsi hero. Biarkan kosong untuk menyembunyikan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="hero-btn-text">Teks Tombol</Label>
                                <Input
                                    id="hero-btn-text"
                                    value={settings.heroButtonText || ''}
                                    onChange={e => handleChange('heroButtonText', e.target.value)}
                                    placeholder="Contoh: Jelajahi Desa"
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="hero-btn-link">Link Tujuan</Label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="hero-btn-link"
                                        value={settings.heroButtonLink || ''}
                                        onChange={e => handleChange('heroButtonLink', e.target.value)}
                                        placeholder="Contoh: /informasi"
                                        disabled={isSaving}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ══ TAB 2: GAMBAR & MEDIA ══ */}
                <TabsContent value="media" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Logo */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Logo Aplikasi</CardTitle>
                                <CardDescription>Logo di pojok kiri atas navbar.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="logo-url">URL Gambar Logo</Label>
                                    <Input
                                        id="logo-url"
                                        value={settings.logoUrl || ''}
                                        onChange={e => handleChange('logoUrl', e.target.value)}
                                        placeholder="/logo-desa.png atau https://..."
                                        disabled={isSaving}
                                    />
                                    <p className="text-xs text-muted-foreground">Format PNG transparan, rasio 1:1 dianjurkan.</p>
                                </div>
                                <div>
                                    <Label>Preview Logo</Label>
                                    <div className="mt-2 p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-muted/30 h-32 gap-2">
                                        {settings.logoUrl ? (
                                            <Image
                                                src={settings.logoUrl}
                                                alt="Logo Preview"
                                                width={64}
                                                height={64}
                                                className="object-contain max-h-16"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="text-muted-foreground text-xs text-center">
                                                <ImageIcon className="h-8 w-8 mx-auto mb-1 opacity-30" />
                                                Masukkan URL untuk preview
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gambar Hero */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Gambar Utama (Hero)</CardTitle>
                                <CardDescription>Gambar latar belakang di bagian atas halaman.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="hero-url">URL Gambar Utama</Label>
                                    <Input
                                        id="hero-url"
                                        value={settings.heroUrl || ''}
                                        onChange={e => handleChange('heroUrl', e.target.value)}
                                        placeholder="/Background utama.png atau https://..."
                                        disabled={isSaving}
                                    />
                                    <p className="text-xs text-muted-foreground">Ukuran terbaik: 1920×1080 piksel (landscape).</p>
                                </div>
                                <div>
                                    <Label>Preview Gambar Utama</Label>
                                    <div className="mt-2 border-2 border-dashed rounded-xl aspect-video relative overflow-hidden bg-muted/30">
                                        {settings.heroUrl ? (
                                            <Image
                                                src={settings.heroUrl}
                                                alt="Hero Preview"
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-xs gap-1">
                                                <ImageIcon className="h-8 w-8 opacity-30" />
                                                Masukkan URL untuk preview
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* ══ TAB 3: OVERLAY & TAMPILAN ══ */}
                <TabsContent value="tampilan" className="space-y-6">
                    {/* Live Preview */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Preview Langsung</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <HeroPreview settings={settings} />
                        </CardContent>
                    </Card>

                    {/* Overlay */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Layers className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Overlay Gambar</CardTitle>
                            </div>
                            <CardDescription>
                                Lapisan warna gelap di atas gambar agar teks mudah dibaca.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Opacity Slider */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Tingkat Kegelapan Overlay</Label>
                                    <span className="text-sm font-semibold tabular-nums bg-muted px-2 py-0.5 rounded-md">
                                        {overlayPercent}%
                                    </span>
                                </div>
                                <Slider
                                    value={[overlayPercent]}
                                    onValueChange={([val]) => handleChange('heroOverlayOpacity', val)}
                                    min={0}
                                    max={90}
                                    step={5}
                                    disabled={isSaving}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>0% — Transparan</span>
                                    <span>90% — Sangat Gelap</span>
                                </div>
                            </div>

                            <Separator />

                            {/* Overlay Color */}
                            <div className="space-y-3">
                                <Label>Warna Overlay</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: 'Hitam', value: '#000000' },
                                        { label: 'Biru Tua', value: '#0f172a' },
                                        { label: 'Hijau Tua', value: '#052e16' },
                                        { label: 'Ungu Tua', value: '#1e1b4b' },
                                    ].map(color => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => handleChange('heroOverlayColor', color.value)}
                                            disabled={isSaving}
                                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all hover:scale-[1.02] ${
                                                settings.heroOverlayColor === color.value
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-border'
                                            }`}
                                        >
                                            <span
                                                className="h-4 w-4 rounded-full border border-white/20 shrink-0"
                                                style={{ backgroundColor: color.value }}
                                            />
                                            {color.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <Label htmlFor="custom-color" className="shrink-0 text-xs text-muted-foreground">Warna Custom:</Label>
                                    <input
                                        id="custom-color"
                                        type="color"
                                        value={settings.heroOverlayColor || '#000000'}
                                        onChange={e => handleChange('heroOverlayColor', e.target.value)}
                                        disabled={isSaving}
                                        className="h-8 w-14 rounded-md border border-input cursor-pointer"
                                    />
                                    <span className="text-xs text-muted-foreground font-mono">{settings.heroOverlayColor}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tinggi Hero */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Maximize2 className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">Tinggi Section Hero</CardTitle>
                            </div>
                            <CardDescription>Seberapa besar section gambar utama menempati layar.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    {
                                        value: 'full',
                                        label: 'Layar Penuh',
                                        desc: '100vh',
                                        icon: <Monitor className="h-5 w-5" />,
                                    },
                                    {
                                        value: 'three-quarter',
                                        label: '¾ Layar',
                                        desc: '75vh',
                                        icon: (
                                            <div className="relative h-5 w-4 border-2 border-current rounded-sm overflow-hidden">
                                                <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-current opacity-20" />
                                            </div>
                                        ),
                                    },
                                    {
                                        value: 'half',
                                        label: '½ Layar',
                                        desc: '50vh',
                                        icon: (
                                            <div className="relative h-5 w-4 border-2 border-current rounded-sm overflow-hidden">
                                                <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-current opacity-20" />
                                            </div>
                                        ),
                                    },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleChange('heroHeight', opt.value)}
                                        disabled={isSaving}
                                        className={`flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 text-sm font-medium transition-all hover:scale-[1.02] ${
                                            settings.heroHeight === opt.value
                                                ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                                                : 'border-border text-muted-foreground hover:border-primary/40'
                                        }`}
                                    >
                                        {opt.icon}
                                        <span className="font-semibold">{opt.label}</span>
                                        <span className="text-xs opacity-60">{opt.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ── Bottom Save Bar ── */}
            <div className="flex justify-end pt-2 border-t">
                <Button onClick={handleSave} disabled={isSaving} size="lg">
                    {isSaving ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Menyimpan...</>
                    ) : (
                        <><Save className="h-4 w-4 mr-2" />Simpan Semua Perubahan</>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default HalamanUtamaPage;
