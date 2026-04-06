'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus,
  MoreVertical,
  Trash2,
  Globe,
  ExternalLink,
  Edit,
  Layout,
  Activity,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import { getTenantsStream, addTenant, deleteTenant, TenantData } from "@/lib/tenant-actions";
import { getSiteSettings, updateSiteSettings, SiteSettings } from "@/lib/site-settings-actions";
import { useUser } from '@/firebase';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DeveloperDashboard = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newVillageName, setNewVillageName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // Branding Edit state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<TenantData | null>(null);
  const [brandingSettings, setBrandingSettings] = useState<Partial<SiteSettings>>({});
  const [isUpdatingBranding, setIsUpdatingBranding] = useState(false);

  useEffect(() => {
     const unsubscribe = getTenantsStream((data) => {
        setTenants(data);
        setIsLoading(false);
     });
     return () => unsubscribe();
  }, []);

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillageName.trim() || !newSubdomain.trim() || !adminEmail.trim()) return;

    setIsSubmitting(true);
    const result = await addTenant({
        name: newVillageName,
        subdomain: newSubdomain,
        adminEmail: adminEmail
    });

    if (result.success) {
      toast({ title: "Berhasil!", description: `Aplikasi untuk desa ${newVillageName} sedang diproses live.` });
      setIsAddDialogOpen(false);
      setNewVillageName('');
      setNewSubdomain('');
      setAdminEmail('');
    } else {
      toast({ title: "Gagal", description: result.error, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if(confirm(`Yakin ingin menghapus seluruh data untuk desa ${name}?`)) {
        await deleteTenant(id);
        toast({ title: "Terhapus", description: `Tenant ${name} berhasil dihapus.` });
    }
  }

  const openBrandingDialog = async (tenant: TenantData) => {
    setEditingTenant(tenant);
    setIsEditDialogOpen(true);
    const settings = await getSiteSettings(tenant.subdomain);
    if (settings) {
      setBrandingSettings(settings);
    }
  };

  const handleUpdateBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTenant) return;

    setIsUpdatingBranding(true);
    const success = await updateSiteSettings(brandingSettings, editingTenant.subdomain);
    
    if (success) {
      toast({ title: "Berhasil diperbarui", description: `Branding untuk ${editingTenant.name} telah disimpan.` });
      setIsEditDialogOpen(false);
    } else {
      toast({ title: "Gagal", description: "Terjadi kesalahan saat menyimpan pengaturan.", variant: "destructive" });
    }
    setIsUpdatingBranding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Daftar Desa (Tenants)</h2>
            <p className="text-slate-400">
                Data real-time aplikasi desa yang beroperasi di platform ini.
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
              <Plus className="h-4 w-4 mr-2" />
              Buat Desa Baru
          </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-2xl rounded-full -mr-8 -mt-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-tight">Total Desa</CardTitle>
            <Layout className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{tenants.length}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium"> 
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Terdaftar di sistem DesaHub
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-2xl rounded-full -mr-8 -mt-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-tight">Instance Aktif</CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{tenants.filter(t => t.status === 'active').length}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-500/80 font-medium"> 
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Koneksi backend stabil
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 blur-2xl rounded-full -mr-8 -mt-8" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-tight">Status Jaringan</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium"> 
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                Uptime platform global
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
          <CardHeader>
              <CardTitle className="text-white text-lg">Daftar Instansi Berjalan</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Kelola delegasi branding dan status operasional desa secara real-time.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader className="border-b border-slate-800">
                <TableRow className="hover:bg-transparent border-slate-800">
                    <TableHead className="text-slate-400 w-[200px]">Nama Desa</TableHead>
                    <TableHead className="text-slate-400">Subdomain</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Admin Email</TableHead>
                    <TableHead className="text-right text-slate-400">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow className="border-slate-800">
                    <TableCell colSpan={5} className="text-center py-8 text-slate-400 italic">Memuat data...</TableCell>
                    </TableRow>
                ) : tenants.length > 0 ? (
                    tenants.map((ts) => (
                    <TableRow key={ts.id} className="border-slate-800 hover:bg-slate-800/40 transition-all duration-200">
                        <TableCell className="font-semibold text-slate-200 uppercase tracking-tight">
                           {ts.name}
                        </TableCell>
                        <TableCell>
                           <a href={`http://${ts.subdomain}.localhost:3000`} target="_blank" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group">
                              <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                              <span className="text-sm">{ts.subdomain}.localhost</span>
                              <ExternalLink size={10} className="ml-0.5 opacity-60" />
                           </a>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className={ts.status === 'active' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 px-2' : 'bg-red-500/5 text-red-400 border-red-500/20 px-2'}>
                               <span className={`w-1 h-1 rounded-full mr-2 ${ts.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                               {ts.status.toUpperCase()}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 text-xs font-mono">{ts.adminEmail}</TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild tabIndex={-1}>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 shadow-2xl p-1.5 min-w-[160px]">
                              <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer rounded-md mb-1" onClick={() => openBrandingDialog(ts)}>
                                  <Edit className="h-3.5 w-3.5 mr-2.5 text-blue-400" />
                                  Kelola Branding
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-800 my-1" />
                              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 cursor-pointer rounded-md" onClick={() => handleDelete(ts.id!, ts.name)}>
                                  <Trash2 className="h-3.5 w-3.5 mr-2.5" />
                                  Hapus Tenant
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow className="border-slate-800">
                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">Belum ada desa yang terdaftar di platform ini.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl rounded-xl sm:max-w-[425px]">
              <DialogHeader>
              <DialogTitle className="text-white text-xl">Instansiasi Desa Baru</DialogTitle>
              <DialogDescription className="text-slate-400 text-xs">Mulai alokasikan ruang digital baru untuk desa terpilih dalam hitungan detik.</DialogDescription>
              </DialogHeader>
              <Separator className="bg-slate-800 opacity-50" />
              <form onSubmit={handleAddTenant} className="space-y-5 pt-3">
                  <div className="space-y-2">
                    <Label htmlFor="v-name" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1">Nama Desa Resmi</Label>
                    <Input 
                        id="v-name" 
                        placeholder="Contoh: Sukamaju"
                        value={newVillageName}
                        onChange={(e) => {
                            setNewVillageName(e.target.value);
                            if(!newSubdomain) setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                        }} 
                        disabled={isSubmitting}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v-sub" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1">ID Subdomain</Label>
                    <div className="flex items-center">
                        <Input 
                            id="v-sub" 
                            placeholder="sukamaju"
                            value={newSubdomain}
                            onChange={(e) => setNewSubdomain(e.target.value)} 
                            disabled={isSubmitting}
                            className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 rounded-r-none border-r-0 flex-1"
                        />
                        <div className="bg-slate-800/50 px-3 h-11 flex items-center border border-slate-800 rounded-r-md text-slate-500 text-sm font-medium">.localhost</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v-email" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1">Email Administrator</Label>
                    <Input 
                        id="v-email" 
                        type="email"
                        placeholder="admin@sukamaju.desa.id"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)} 
                        disabled={isSubmitting}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11"
                    />
                  </div>
                  <DialogFooter className="pt-4">
                      <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="hover:bg-slate-800 text-slate-400">Batal</Button>
                      <Button type="submit" disabled={isSubmitting || !newVillageName.trim()} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-8">
                          {isSubmitting ? "Deploying..." : "Konfirmasi Deploy"}
                      </Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>

      {/* Edit Branding Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-2xl shadow-2xl rounded-xl">
              <DialogHeader>
              <DialogTitle className="text-white text-xl flex items-center gap-2">
                  <Palette className="h-5 w-5 text-emerald-400" />
                  Kelola Branding: {editingTenant?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs">Konfigurasi unik untuk {editingTenant?.subdomain}.localhost</DialogDescription>
              </DialogHeader>
              <Separator className="bg-slate-800 opacity-50" />
              <form onSubmit={handleUpdateBranding} className="space-y-6 pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="bs-name" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1 font-bold">Judul Situs</Label>
                        <Input 
                            id="bs-name" 
                            value={brandingSettings.siteName || ''}
                            onChange={(e) => setBrandingSettings({...brandingSettings, siteName: e.target.value})} 
                            className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 px-4"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bs-logo" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1 font-bold">File Logo (URL)</Label>
                        <Input 
                            id="bs-logo" 
                            placeholder="/logo-desa.png"
                            value={brandingSettings.logoUrl || ''}
                            onChange={(e) => setBrandingSettings({...brandingSettings, logoUrl: e.target.value})} 
                            className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 px-4"
                        />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bs-desc" className="text-slate-400 text-[10px] uppercase tracking-wider pl-1 font-bold">Deskripsi SEO Platform</Label>
                    <Input 
                        id="bs-desc" 
                        value={brandingSettings.siteDescription || ''}
                        onChange={(e) => setBrandingSettings({...brandingSettings, siteDescription: e.target.value})} 
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 px-4"
                    />
                  </div>
                  
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 mt-2 space-y-4">
                     <div className="flex items-center justify-between">
                         <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                             <Layout className="h-3.5 w-3.5 text-emerald-500" />
                             Landing Page Content
                         </h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                            <Label htmlFor="bs-hero" className="text-slate-500 text-[10px]">Judul Utama Hero</Label>
                            <Input 
                                id="bs-hero" 
                                value={brandingSettings.heroTitle || ''}
                                onChange={(e) => setBrandingSettings({...brandingSettings, heroTitle: e.target.value})} 
                                className="bg-slate-900 border-slate-700 h-9 text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="bs-sub" className="text-slate-500 text-[10px]">Sub-judul Hero</Label>
                            <Input 
                                id="bs-sub" 
                                value={brandingSettings.heroSubtitle || ''}
                                onChange={(e) => setBrandingSettings({...brandingSettings, heroSubtitle: e.target.value})} 
                                className="bg-slate-900 border-slate-700 h-9 text-sm"
                            />
                        </div>
                     </div>
                  </div>
                  
                  <DialogFooter className="pt-4">
                      <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="hover:bg-slate-800 text-slate-400">Tutup</Button>
                      <Button type="submit" disabled={isUpdatingBranding} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 shadow-lg shadow-emerald-500/10">
                          {isUpdatingBranding ? "Menyimpan Data..." : "Terapkan Branding Baru"}
                      </Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeveloperDashboard;

// Add Palette icon for the branding header
const Palette = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.66 1.7-1.5a1.5 1.5 0 0 0-1.5-1.5c-1.1 0-2-.9-2-2 0-.3.08-.5.21-.71.18-.3.4-.66.49-1.22.1-.64-.2-1.34-.8-1.57C8.6 13.1 8 12.1 8 11c0-2.2 2.2-4 5-4 3.9 0 7 2.1 7 5 0 1.1-.9 2-2 2-1.1 0-2 .9-2 2 0 .84.7 1.5 1.5 1.5.92 0 1.7.66 1.7 1.5 0 .84-.7 1.5-1.5 1.5-5.5 0-10-4.5-10-10S6.5 2 12 2Z"/>
    </svg>
);
