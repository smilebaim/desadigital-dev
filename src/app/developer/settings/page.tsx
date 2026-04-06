'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Save, 
  Shield, 
  Server, 
  Palette,
  Cloud
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getSiteSettings, updateSiteSettings, SiteSettings } from "@/lib/site-settings-actions";
import { Separator } from "@/components/ui/separator";

const GlobalSettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings(); // Use 'main' by default
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateSiteSettings(settings);
    if (success) {
      toast({ title: "Pengaturan Disimpan", description: "Konfigurasi global platform telah diperbarui." });
    } else {
      toast({ title: "Gagal Menyimpan", description: "Terjadi kesalahan pada koneksi Firestore.", variant: "destructive" });
    }
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Settings className="h-8 w-8 text-blue-500" />
            Sistem Global
          </h2>
          <p className="text-slate-400 mt-1">Konfigurasi dasar platform SaaS DesaHub.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Menyimpan..." : "Simpan Semua"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-lg">Identitas Platform Utama</CardTitle>
            </div>
            <CardDescription className="text-slate-400 text-xs">Pengaturan ini akan terlihat pada domain utama (Landing Page SaaS).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-[10px] uppercase tracking-widest">Nama Platform</Label>
                <Input 
                  value={settings.siteName || ''} 
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="bg-slate-950 border-slate-800 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-[10px] uppercase tracking-widest">Logo URL (SaaS)</Label>
                <Input 
                  value={settings.logoUrl || ''} 
                  onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                  className="bg-slate-950 border-slate-800 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-[10px] uppercase tracking-widest">Slogan Utama (Landing)</Label>
              <Input 
                value={settings.heroTitle || ''} 
                onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                className="bg-slate-950 border-slate-800 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <CardTitle className="text-lg">Keamanan & Keandalan</CardTitle>
            </div>
            <CardDescription className="text-slate-400 text-xs">Kontrol akses dan status operasional platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <p className="text-sm font-medium">Mode Pemeliharaan (Maintenance)</p>
                <p className="text-xs text-slate-500">Mencegah akses tenant selama proses update sistem.</p>
              </div>
              <Switch 
                checked={maintenanceMode} 
                onCheckedChange={setMaintenanceMode}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-Provisioning</p>
                <p className="text-xs text-slate-500">Otomatisasi pembuatan database Firestore untuk desa baru.</p>
              </div>
              <Switch checked defaultChecked className="data-[state=checked]:bg-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalSettingsPage;
