'use client';
import { useState, useEffect, useCallback } from "react";
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
  Zap,
  Search,
  PauseCircle,
  PlayCircle,
  Wifi,
  WifiOff,
  CalendarDays,
  ShieldAlert,
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
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { 
  getTenantsStream, 
  addTenant, 
  deleteTenant, 
  updateTenantStatus,
  checkFirestoreConnection,
  TenantData 
} from "@/lib/tenant-actions";
import { getSiteSettings, updateSiteSettings, SiteSettings } from "@/lib/site-settings-actions";
import { useUser } from '@/firebase';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── Palette Icon ─────────────────────────────────────────────────────────────
const PaletteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.66 1.7-1.5a1.5 1.5 0 0 0-1.5-1.5c-1.1 0-2-.9-2-2 0-.3.08-.5.21-.71.18-.3.4-.66.49-1.22.1-.64-.2-1.34-.8-1.57C8.6 13.1 8 12.1 8 11c0-2.2 2.2-4 5-4 3.9 0 7 2.1 7 5 0 1.1-.9 2-2 2-1.1 0-2 .9-2 2 0 .84.7 1.5 1.5 1.5.92 0 1.7.66 1.7 1.5 0 .84-.7 1.5-1.5 1.5-5.5 0-10-4.5-10-10S6.5 2 12 2Z"/>
  </svg>
);

// ─── Helper: format Firestore timestamp ───────────────────────────────────────
const formatDate = (ts: any): string => {
  if (!ts) return '—';
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
const DeveloperDashboard = () => {
  const { toast } = useToast();
  const { user } = useUser();

  // ── Data state ──────────────────────────────────────────────────────────────
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firestoreStatus, setFirestoreStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Add Dialog state ────────────────────────────────────────────────────────
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newVillageName, setNewVillageName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // ── Branding Edit state ─────────────────────────────────────────────────────
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<TenantData | null>(null);
  const [brandingSettings, setBrandingSettings] = useState<Partial<SiteSettings>>({});
  const [isUpdatingBranding, setIsUpdatingBranding] = useState(false);
  const [isBrandingLoading, setIsBrandingLoading] = useState(false);

  // ── Delete Confirm state ────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<TenantData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Effects ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Tunggu hingga user di-load untuk menghindari error ABORTED jika navigasi cepat
    if (user === undefined) return;

    const unsubscribe = getTenantsStream((data) => {
      setTenants(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (user === undefined) return;
    checkFirestoreConnection().then((s) => setFirestoreStatus(s));
  }, [user]);

  // ── Filtered tenants ────────────────────────────────────────────────────────
  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.adminEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVillageName.trim() || !newSubdomain.trim() || !adminEmail.trim()) return;

    setIsSubmitting(true);
    const result = await addTenant({
      name: newVillageName,
      subdomain: newSubdomain,
      adminEmail,
    });

    if (result.success) {
      toast({ title: "✅ Berhasil!", description: `Desa "${newVillageName}" telah didaftarkan. Subdomain aktif dalam hitungan detik.` });
      setIsAddDialogOpen(false);
      setNewVillageName('');
      setNewSubdomain('');
      setAdminEmail('');
    } else {
      toast({ title: "Gagal Mendaftarkan", description: result.error, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget?.id || !deleteTarget.subdomain) return;
    setIsDeleting(true);
    const result = await deleteTenant(deleteTarget.id, deleteTarget.subdomain);
    if (result.success) {
      toast({ title: "🗑️ Tenant Dihapus", description: `Semua data untuk "${deleteTarget.name}" telah dibersihkan dari sistem.` });
    } else {
      toast({ title: "Gagal Menghapus", description: result.error, variant: "destructive" });
    }
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const handleToggleStatus = async (tenant: TenantData) => {
    if (!tenant.id) return;
    const newStatus = tenant.status === 'active' ? 'suspended' : 'active';
    const result = await updateTenantStatus(tenant.id, newStatus);
    if (result.success) {
      toast({
        title: newStatus === 'active' ? '▶️ Tenant Diaktifkan' : '⏸️ Tenant Disuspend',
        description: `Status "${tenant.name}" diubah menjadi ${newStatus.toUpperCase()}.`,
      });
    } else {
      toast({ title: "Gagal", description: result.error, variant: "destructive" });
    }
  };

  const openBrandingDialog = async (tenant: TenantData) => {
    setEditingTenant(tenant);
    setIsEditDialogOpen(true);
    setIsBrandingLoading(true);
    setBrandingSettings({});
    const settings = await getSiteSettings(tenant.subdomain);
    if (settings) setBrandingSettings(settings);
    setIsBrandingLoading(false);
  };

  const handleUpdateBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTenant) return;
    setIsUpdatingBranding(true);
    const success = await updateSiteSettings(brandingSettings, editingTenant.subdomain);
    if (success) {
      toast({ title: "✅ Branding Disimpan", description: `Konfigurasi "${editingTenant.name}" telah diperbarui di Firestore.` });
      setIsEditDialogOpen(false);
    } else {
      toast({ title: "Gagal Menyimpan", description: "Koneksi Firestore bermasalah. Coba lagi.", variant: "destructive" });
    }
    setIsUpdatingBranding(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Tenant</h2>
          <p className="text-slate-400 mt-1 text-sm">
            Kelola semua instansi desa yang berjalan di atas platform DesaHub.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Firestore status */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
            firestoreStatus === 'online' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : firestoreStatus === 'offline'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-slate-700/50 border-slate-700 text-slate-400'
          }`}>
            {firestoreStatus === 'online' ? <Wifi size={12} /> : firestoreStatus === 'offline' ? <WifiOff size={12} /> : null}
            <span className={firestoreStatus === 'checking' ? 'animate-pulse' : ''}>
              {firestoreStatus === 'online' ? 'Firestore Online' : firestoreStatus === 'offline' ? 'Firestore Offline' : 'Memeriksa...'}
            </span>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
            <Plus className="h-4 w-4 mr-2" />
            Buat Desa Baru
          </Button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full -mr-6 -mt-6" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Desa</CardTitle>
            <Layout className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{tenants.length}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Terdaftar di sistem DesaHub
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-6 -mt-6" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Instance Aktif</CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{tenants.filter(t => t.status === 'active').length}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-500/70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Koneksi backend stabil
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full -mr-6 -mt-6" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">Disuspend</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{tenants.filter(t => t.status === 'suspended').length}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Akses dinonaktifkan sementara
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Tenant Table ── */}
      <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-white text-lg">Daftar Instansi Berjalan</CardTitle>
              <CardDescription className="text-slate-400 text-xs mt-1">
                Kelola branding, status, dan konfigurasi setiap desa secara real-time.
              </CardDescription>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <Input
                placeholder="Cari desa, subdomain, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b border-slate-800">
              <TableRow className="hover:bg-transparent border-slate-800">
                <TableHead className="text-slate-400 text-xs">Nama Desa</TableHead>
                <TableHead className="text-slate-400 text-xs">Subdomain</TableHead>
                <TableHead className="text-slate-400 text-xs">Status</TableHead>
                <TableHead className="text-slate-400 text-xs">Admin Email</TableHead>
                <TableHead className="text-slate-400 text-xs">Terdaftar</TableHead>
                <TableHead className="text-right text-slate-400 text-xs">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-800">
                    <TableCell colSpan={6}>
                      <div className="h-4 bg-slate-800 rounded animate-pulse w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredTenants.length > 0 ? (
                filteredTenants.map((ts) => (
                  <TableRow key={ts.id} className="border-slate-800 hover:bg-slate-800/40 transition-all duration-150">
                    <TableCell className="font-semibold text-slate-200">
                      {ts.name}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`http://${ts.subdomain}.localhost:3000`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors group text-sm"
                      >
                        <Globe size={13} className="group-hover:rotate-12 transition-transform shrink-0" />
                        <span className="font-mono">{ts.subdomain}.localhost</span>
                        <ExternalLink size={10} className="opacity-50 shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ts.status === 'active'
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 text-[10px] px-2 py-0.5'
                            : 'bg-amber-500/5 text-amber-400 border-amber-500/20 text-[10px] px-2 py-0.5'
                        }
                      >
                        <span className={`w-1 h-1 rounded-full mr-1.5 inline-block ${ts.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        {ts.status === 'active' ? 'ACTIVE' : 'SUSPENDED'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs font-mono">{ts.adminEmail}</TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <CalendarDays size={11} />
                        {formatDate(ts.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white hover:bg-slate-800 h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 shadow-2xl p-1.5 min-w-[170px]">
                          <DropdownMenuItem
                            className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer rounded-md gap-2.5"
                            onClick={() => openBrandingDialog(ts)}
                          >
                            <PaletteIcon className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                            Kelola Branding
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`cursor-pointer rounded-md gap-2.5 ${
                              ts.status === 'active'
                                ? 'hover:bg-amber-500/10 focus:bg-amber-500/10 text-amber-400'
                                : 'hover:bg-emerald-500/10 focus:bg-emerald-500/10 text-emerald-400'
                            }`}
                            onClick={() => handleToggleStatus(ts)}
                          >
                            {ts.status === 'active'
                              ? <PauseCircle className="h-3.5 w-3.5 shrink-0" />
                              : <PlayCircle className="h-3.5 w-3.5 shrink-0" />
                            }
                            {ts.status === 'active' ? 'Suspend Tenant' : 'Aktifkan Kembali'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-800 my-1" />
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300 cursor-pointer rounded-md gap-2.5"
                            onClick={() => setDeleteTarget(ts)}
                          >
                            <Trash2 className="h-3.5 w-3.5 shrink-0" />
                            Hapus Permanen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : searchQuery ? (
                <TableRow className="border-slate-800">
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="text-slate-500 text-sm">
                      Tidak ada hasil untuk <span className="text-white font-medium">"{searchQuery}"</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow className="border-slate-800">
                  <TableCell colSpan={6} className="text-center py-14">
                    <div className="flex flex-col items-center gap-3">
                      <Globe className="h-10 w-10 text-slate-700" />
                      <p className="text-slate-500 font-medium">Belum ada desa yang terdaftar</p>
                      <p className="text-slate-600 text-xs">Mulai dengan mendaftarkan desa pertama Anda</p>
                      <Button
                        size="sm"
                        onClick={() => setIsAddDialogOpen(true)}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> Daftarkan Desa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ════════════════════════════════════════════════════
          DIALOG: Add New Tenant
      ════════════════════════════════════════════════════ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Instansiasi Desa Baru
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Alokasikan ruang digital baru. Subdomain aktif otomatis dalam hitungan detik.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-slate-800/60" />
          <form onSubmit={handleAddTenant} className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="v-name" className="text-[10px] uppercase tracking-widest text-slate-400">Nama Desa Resmi</Label>
              <Input
                id="v-name"
                placeholder="Contoh: Sukamaju"
                value={newVillageName}
                onChange={(e) => {
                  setNewVillageName(e.target.value);
                  if (!newSubdomain) setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                }}
                disabled={isSubmitting}
                className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="v-sub" className="text-[10px] uppercase tracking-widest text-slate-400">ID Subdomain</Label>
              <div className="flex">
                <Input
                  id="v-sub"
                  placeholder="sukamaju"
                  value={newSubdomain}
                  onChange={(e) => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  disabled={isSubmitting}
                  className="bg-slate-950 border-slate-800 focus-visible:ring-blue-600 h-11 rounded-r-none border-r-0 flex-1 font-mono"
                />
                <div className="bg-slate-800/60 px-3 h-11 flex items-center border border-slate-800 rounded-r-md text-slate-500 text-sm">
                  .localhost
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="v-email" className="text-[10px] uppercase tracking-widest text-slate-400">Email Administrator Desa</Label>
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
            <DialogFooter className="pt-2 gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="text-slate-400 hover:bg-slate-800">
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !newVillageName.trim() || !newSubdomain.trim() || !adminEmail.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-lg shadow-blue-500/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deploying...</span>
                ) : 'Konfirmasi Deploy'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════════════════
          DIALOG: Edit Branding
      ════════════════════════════════════════════════════ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <PaletteIcon className="text-emerald-400" />
              Kelola Branding: {editingTenant?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Konfigurasi identitas visual unik untuk <span className="font-mono text-blue-400">{editingTenant?.subdomain}.localhost</span>
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-slate-800/60" />

          {isBrandingLoading ? (
            <div className="py-12 flex items-center justify-center gap-3 text-slate-400">
              <span className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
              Memuat pengaturan dari Firestore...
            </div>
          ) : (
            <form onSubmit={handleUpdateBranding} className="space-y-5 pt-2 max-h-[65vh] overflow-y-auto pr-1">
              {/* Identity Section */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Identitas Situs</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-name" className="text-slate-400 text-[10px] uppercase tracking-wider">Nama Situs</Label>
                    <Input id="bs-name" value={brandingSettings.siteName || ''} onChange={(e) => setBrandingSettings(p => ({...p, siteName: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-logo" className="text-slate-400 text-[10px] uppercase tracking-wider">Logo URL</Label>
                    <Input id="bs-logo" placeholder="/logo-desa.png" value={brandingSettings.logoUrl || ''} onChange={(e) => setBrandingSettings(p => ({...p, logoUrl: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bs-desc" className="text-slate-400 text-[10px] uppercase tracking-wider">SEO Deskripsi</Label>
                  <Input id="bs-desc" value={brandingSettings.siteDescription || ''} onChange={(e) => setBrandingSettings(p => ({...p, siteDescription: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-kab" className="text-slate-400 text-[10px] uppercase tracking-wider">Kabupaten</Label>
                    <Input id="bs-kab" value={brandingSettings.kabupaten || ''} onChange={(e) => setBrandingSettings(p => ({...p, kabupaten: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-kec" className="text-slate-400 text-[10px] uppercase tracking-wider">Kecamatan</Label>
                    <Input id="bs-kec" value={brandingSettings.kecamatan || ''} onChange={(e) => setBrandingSettings(p => ({...p, kecamatan: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-800/40" />

              {/* Hero Section */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Layout size={11} /> Landing Page Hero
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-hero-title" className="text-slate-400 text-[10px] uppercase tracking-wider">Judul Utama</Label>
                    <Input id="bs-hero-title" value={brandingSettings.heroTitle || ''} onChange={(e) => setBrandingSettings(p => ({...p, heroTitle: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-hero-sub" className="text-slate-400 text-[10px] uppercase tracking-wider">Sub-judul</Label>
                    <Input id="bs-hero-sub" value={brandingSettings.heroSubtitle || ''} onChange={(e) => setBrandingSettings(p => ({...p, heroSubtitle: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bs-hero-desc" className="text-slate-400 text-[10px] uppercase tracking-wider">Deskripsi Hero</Label>
                  <Input id="bs-hero-desc" value={brandingSettings.heroDescription || ''} onChange={(e) => setBrandingSettings(p => ({...p, heroDescription: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-kades" className="text-slate-400 text-[10px] uppercase tracking-wider">Nama Kepala Desa</Label>
                    <Input id="bs-kades" value={brandingSettings.kepalaDesaName || ''} onChange={(e) => setBrandingSettings(p => ({...p, kepalaDesaName: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bs-kontak" className="text-slate-400 text-[10px] uppercase tracking-wider">Kontak Desa</Label>
                    <Input id="bs-kontak" placeholder="+62..." value={brandingSettings.contactPhone || ''} onChange={(e) => setBrandingSettings(p => ({...p, contactPhone: e.target.value}))} className="bg-slate-950 border-slate-800 h-10" />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="text-slate-400 hover:bg-slate-800">Tutup</Button>
                <Button type="submit" disabled={isUpdatingBranding} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 shadow-emerald-900/20 shadow-lg">
                  {isUpdatingBranding ? (
                    <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyimpan...</span>
                  ) : 'Terapkan Branding'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════════════════
          ALERT DIALOG: Confirm Delete
      ════════════════════════════════════════════════════ */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              Konfirmasi Hapus Permanen
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Tindakan ini akan menghapus <span className="text-white font-semibold">"{deleteTarget?.name}"</span> beserta seluruh data terkait (site settings, workspaces) secara permanen dari Firestore.
              <span className="block mt-2 text-red-400/80 text-xs">⚠️ Tindakan ini tidak dapat dibatalkan.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menghapus...</span>
              ) : 'Ya, Hapus Semua Data'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default DeveloperDashboard;
