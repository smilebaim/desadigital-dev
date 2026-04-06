'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Settings, 
  Save, 
  Shield, 
  Cloud,
  Globe,
  Phone,
  MapPin,
  User2,
  RefreshCw,
  ImageIcon,
  Wifi,
  WifiOff,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  getSiteSettings, 
  updateSiteSettings, 
  resetSiteSettings,
  SiteSettings, 
  DEFAULT_SETTINGS 
} from "@/lib/site-settings-actions";
import { checkFirestoreConnection } from "@/lib/tenant-actions";

const GlobalSettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoProvisioning, setAutoProvisioning] = useState(true);
  const [firestoreStatus, setFirestoreStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      const [data, status] = await Promise.all([
        getSiteSettings(),
        checkFirestoreConnection(),
      ]);
      if (data) setSettings(data);
      setFirestoreStatus(status);
      setIsLoading(false);
    };
    fetchAll();
  }, []);

  const updateSetting = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateSiteSettings(settings);
    if (success) {
      toast({ title: "✅ Pengaturan Disimpan", description: "Semua konfigurasi global platform telah diperbarui ke Firestore." });
      setIsDirty(false);
    } else {
      toast({ title: "❌ Gagal Menyimpan", description: "Koneksi Firestore bermasalah. Pastikan Anda terhubung ke internet.", variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleReset = async () => {
    setIsResetting(true);
    const success = await resetSiteSettings();
    if (success) {
      setSettings(DEFAULT_SETTINGS);
      setIsDirty(false);
      toast({ title: "🔄 Reset Berhasil", description: "Pengaturan platform telah dikembalikan ke nilai default." });
    } else {
      toast({ title: "Gagal Reset", description: "Terjadi kesalahan saat mereset pengaturan.", variant: "destructive" });
    }
    setIsResetting(false);
    setShowResetDialog(false);
  };

  const FieldGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-4">{children}</div>
  );

  const Field = ({ id, label, placeholder, value, onChange, type = 'text', hint }: {
    id: string; label: string; placeholder?: string; value: string; onChange: (v: string) => void;
    type?: string; hint?: string;
  }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-10 text-sm"
      />
      {hint && <p className="text-[10px] text-slate-600 pl-0.5">{hint}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto pb-10">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Settings className="h-7 w-7 text-blue-500" />
            Sistem Global
          </h2>
          <p className="text-slate-400 mt-1.5 text-sm">Konfigurasi inti platform SaaS DesaHub yang berlaku secara global.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Firestore status badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium ${
            firestoreStatus === 'online' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : firestoreStatus === 'offline'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-slate-700/50 border-slate-700 text-slate-400'
          }`}>
            {firestoreStatus === 'online' ? <Wifi size={11} /> : firestoreStatus === 'offline' ? <WifiOff size={11} /> : <RefreshCw size={11} className="animate-spin" />}
            <span>{firestoreStatus === 'online' ? 'Firestore Online' : firestoreStatus === 'offline' ? 'Firestore Offline' : 'Memeriksa...'}</span>
          </div>
          {isDirty && (
            <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-400 text-[10px]">
              Belum Disimpan
            </Badge>
          )}
          <Button type="submit" disabled={isSaving || isLoading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan Semua'}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">

          {/* ── Section: Platform Identity ── */}
          <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  <Cloud className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Identitas Platform Utama</CardTitle>
                  <CardDescription className="text-slate-500 text-xs mt-0.5">Tampil di Landing Page (domain root) dan metadata SEO global.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field id="gs-name" label="Nama Platform" placeholder="DesaHub" value={settings.siteName || ''} onChange={(v) => updateSetting('siteName', v)} />
                  <Field id="gs-logo" label="Logo URL (SaaS)" placeholder="/logo-platform.png" value={settings.logoUrl || ''} onChange={(v) => updateSetting('logoUrl', v)} />
                </div>
                <Field id="gs-desc" label="Deskripsi SEO" placeholder="Platform digital terpadu untuk desa-desa Indonesia" value={settings.siteDescription || ''} onChange={(v) => updateSetting('siteDescription', v)} />
                <Field id="gs-keywords" label="Keywords SEO" placeholder="desa, digital, platform, administrasi" value={settings.siteKeywords || ''} onChange={(v) => updateSetting('siteKeywords', v)} hint="Pisahkan dengan koma." />
              </FieldGroup>
            </CardContent>
          </Card>

          {/* ── Section: Hero Content ── */}
          <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-purple-500/10 rounded-lg">
                  <ImageIcon className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Konten Hero Default</CardTitle>
                  <CardDescription className="text-slate-500 text-xs mt-0.5">Teks banner yang tampil di semua desa yang belum mengatur branding sendiri.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field id="gs-hero-title" label="Judul Hero" placeholder="SELAMAT DATANG" value={settings.heroTitle || ''} onChange={(v) => updateSetting('heroTitle', v)} />
                  <Field id="gs-hero-sub" label="Sub-judul Hero" placeholder="di Platform DesaHub" value={settings.heroSubtitle || ''} onChange={(v) => updateSetting('heroSubtitle', v)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gs-hero-desc" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Deskripsi Hero</Label>
                  <Textarea
                    id="gs-hero-desc"
                    placeholder="Deskripsi platform digital desa..."
                    value={settings.heroDescription || ''}
                    onChange={(e) => updateSetting('heroDescription', e.target.value)}
                    className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 text-sm resize-none min-h-[80px]"
                    rows={3}
                  />
                </div>
                <Field id="gs-hero-url" label="URL Gambar Hero" placeholder="/Background utama.png" value={settings.heroUrl || ''} onChange={(v) => updateSetting('heroUrl', v)} />
              </FieldGroup>
            </CardContent>
          </Card>

          {/* ── Section: Contact ── */}
          <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-green-500/10 rounded-lg">
                  <Globe className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Kontak & Pemerintahan Default</CardTitle>
                  <CardDescription className="text-slate-500 text-xs mt-0.5">Digunakan sebagai fallback jika tenant tidak memiliki konfigurasi sendiri.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field id="gs-phone" label="Telepon" placeholder="+62..." value={settings.contactPhone || ''} onChange={(v) => updateSetting('contactPhone', v)} />
                  <Field id="gs-email" label="Email Kontak" type="email" placeholder="info@desahub.id" value={settings.contactEmail || ''} onChange={(v) => updateSetting('contactEmail', v)} />
                </div>
                <Field id="gs-address" label="Alamat" placeholder="Jl. ..." value={settings.contactAddress || ''} onChange={(v) => updateSetting('contactAddress', v)} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field id="gs-kab" label="Kabupaten" value={settings.kabupaten || ''} onChange={(v) => updateSetting('kabupaten', v)} />
                  <Field id="gs-kec" label="Kecamatan" value={settings.kecamatan || ''} onChange={(v) => updateSetting('kecamatan', v)} />
                  <Field id="gs-kodepos" label="Kode Pos" value={settings.kodePos || ''} onChange={(v) => updateSetting('kodePos', v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field id="gs-kades" label="Nama Kepala Desa Default" value={settings.kepalaDesaName || ''} onChange={(v) => updateSetting('kepalaDesaName', v)} />
                  <Field id="gs-nip" label="NIP Kepala Desa" value={settings.kepalaDesaNip || ''} onChange={(v) => updateSetting('kepalaDesaNip', v)} />
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* ── Section: Security ── */}
          <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-base">Kontrol Sistem</CardTitle>
                  <CardDescription className="text-slate-500 text-xs mt-0.5">Pengaturan yang mempengaruhi ketersediaan seluruh platform.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <p className="text-sm font-medium text-white">Mode Pemeliharaan</p>
                  <p className="text-xs text-slate-500 mt-0.5">Blokir semua akses tenant saat update sistem berlangsung.</p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  className="data-[state=checked]:bg-red-500"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <p className="text-sm font-medium text-white">Auto-Provisioning</p>
                  <p className="text-xs text-slate-500 mt-0.5">Otomatis alokasikan workspace Firestore untuk desa baru.</p>
                </div>
                <Switch
                  checked={autoProvisioning}
                  onCheckedChange={setAutoProvisioning}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Danger Zone ── */}
          <Card className="bg-slate-900 border-red-900/50 text-white shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-base text-red-400">Danger Zone</CardTitle>
                  <CardDescription className="text-slate-500 text-xs mt-0.5">Tindakan berisiko yang tidak dapat dibatalkan.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-red-950/20 rounded-xl border border-red-900/30">
                <div>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <RotateCcw size={14} className="text-red-400" />
                    Reset ke Pengaturan Default
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Kembalikan semua pengaturan global ke nilai bawaan sistem. Data tenant tidak terpengaruh.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetDialog(true)}
                  className="border-red-700 text-red-400 hover:bg-red-950/40 hover:text-red-300 shrink-0 ml-4"
                >
                  Reset Default
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      )}

      {/* ── Reset Confirm Dialog ── */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-red-400" />
              Konfirmasi Reset Pengaturan
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Semua pengaturan platform (nama, logo, hero, kontak) akan dikembalikan ke nilai default sistem. Pengaturan branding masing-masing tenant tidak akan terpengaruh.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 hover:bg-slate-700">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} disabled={isResetting} className="bg-red-600 hover:bg-red-700 text-white">
              {isResetting ? 'Mereset...' : 'Ya, Reset Sekarang'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </form>
  );
};

export default GlobalSettingsPage;
