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
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { useUser } from '@/firebase';

const DeveloperDashboard = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newVillageName, setNewVillageName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">Daftar Desa (Tenants)</h2>
            <p className="text-slate-400">
                Data real-time aplikasi desa yang beroperasi di platform ini.
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Buat Desa Baru
          </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-100">
          <CardHeader>
              <CardTitle>Instances Berjalan</CardTitle>
          </CardHeader>
          <CardContent>
          <Table>
              <TableHeader className="border-b border-slate-800">
              <TableRow className="hover:bg-transparent border-slate-800 text-slate-400">
                  <TableHead className="text-slate-400">Nama Desa</TableHead>
                  <TableHead className="text-slate-400">URL Akses</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Admin Email</TableHead>
                  <TableHead className="text-right text-slate-400">Aksi</TableHead>
              </TableRow>
              </TableHeader>
              <TableBody>
              {isLoading ? (
                  <TableRow className="border-slate-800">
                  <TableCell colSpan={5} className="text-center py-8 text-slate-400">Memuat data...</TableCell>
                  </TableRow>
              ) : tenants.length > 0 ? (
                  tenants.map((ts) => (
                  <TableRow key={ts.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-medium text-slate-200">
                         {ts.name}
                      </TableCell>
                      <TableCell>
                         <a href={`http://${ts.subdomain}.localhost:3000`} target="_blank" className="flex items-center gap-2 text-blue-400 hover:underline">
                            <Globe size={14} />
                            {ts.subdomain}.localhost
                            <ExternalLink size={12} />
                         </a>
                      </TableCell>
                      <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${ts.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'}`}>
                             {ts.status.toUpperCase()}
                          </span>
                      </TableCell>
                      <TableCell className="text-slate-400">{ts.adminEmail}</TableCell>
                      <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                          <DropdownMenuItem className="text-red-400 hover:bg-slate-800 hover:text-red-300 focus:bg-slate-800 focus:text-red-300 cursor-pointer" onClick={() => handleDelete(ts.id!, ts.name)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus Instance
                          </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                  </TableRow>
                  ))
              ) : (
                  <TableRow className="border-slate-800">
                  <TableCell colSpan={5} className="text-center py-8 text-slate-400">Belum ada desa yang terdaftar.</TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
          </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
              <DialogHeader>
              <DialogTitle>Buat Aplikasi Desa</DialogTitle>
              <DialogDescription className="text-slate-400">Instansiasi database terpisah dan subdomain baru otomatis aktif secara real-time.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTenant} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="v-name" className="text-slate-300">Nama Desa Resmi</Label>
                    <Input 
                        id="v-name" 
                        placeholder="Contoh: Margaya"
                        value={newVillageName}
                        onChange={(e) => {
                            setNewVillageName(e.target.value);
                            // auto generate subdomain
                            if(!newSubdomain) setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                        }} 
                        disabled={isSubmitting}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v-sub" className="text-slate-300">Subdomain</Label>
                    <div className="flex items-center gap-2">
                        <Input 
                            id="v-sub" 
                            placeholder="margaya"
                            value={newSubdomain}
                            onChange={(e) => setNewSubdomain(e.target.value)} 
                            disabled={isSubmitting}
                            className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500 flex-1"
                        />
                        <span className="text-slate-500">.domain.com</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="v-email" className="text-slate-300">Email Akun Staff Pertama</Label>
                    <Input 
                        id="v-email" 
                        type="email"
                        placeholder="admin@margaya.desa.id"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)} 
                        disabled={isSubmitting}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-blue-500"
                    />
                  </div>
                  <DialogFooter className="pt-4">
                      <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="hover:bg-slate-800 hover:text-white">Batal</Button>
                      <Button type="submit" disabled={isSubmitting || !newVillageName.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Globe className="h-4 w-4 mr-2" />
                          {isSubmitting ? "Proses Instansiasi..." : "Deploy Subdomain"}
                      </Button>
                  </DialogFooter>
              </form>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeveloperDashboard;
