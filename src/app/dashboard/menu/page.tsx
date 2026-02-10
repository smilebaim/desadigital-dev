'use client';
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
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Save,
  ArrowUpToLine,
  ArrowDownToLine,
  PanelLeft,
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { getMenusWithItems, addMenu, updateMenu, deleteMenu, seedDefaultMenus } from "@/lib/menu-actions";
import type { Menu } from "@/lib/menu-data";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MenuPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // State for Add Menu Dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuDescription, setNewMenuDescription] = useState("");
  const [newMenuLocation, setNewMenuLocation] = useState<'topnav' | 'bottomnav' | 'sidebar' | ''>('');
  
  // State for Edit Menu Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [menuToEdit, setMenuToEdit] = useState<Menu | null>(null);
  const [editMenuName, setEditMenuName] = useState("");
  const [editMenuDescription, setEditMenuDescription] = useState("");
  const [editMenuLocation, setEditMenuLocation] = useState<'topnav' | 'bottomnav' | 'sidebar' | ''>('');

  // State for Delete Menu Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<{ id: string, name: string } | null>(null);


  const fetchMenus = useCallback(async () => {
    setLoading(true);
    const data = await getMenusWithItems();
    setMenus(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleSeedMenus = async () => {
    setIsSeeding(true);
    const result = await seedDefaultMenus();
    if (result.success) {
      toast({ title: "Berhasil!", description: result.message });
      await fetchMenus();
    } else {
      toast({ title: "Gagal", description: result.error, variant: "destructive" });
    }
    setIsSeeding(false);
  }

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName || !newMenuLocation) {
      toast({ title: "Nama dan lokasi menu tidak boleh kosong.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    const result = await addMenu({ 
      name: newMenuName, 
      description: newMenuDescription,
      location: newMenuLocation as 'topnav' | 'bottomnav' | 'sidebar',
    });

    if (result.success) {
      toast({ title: "Menu berhasil dibuat." });
      await fetchMenus(); // Refresh list
      setIsAddDialogOpen(false);
      setNewMenuName("");
      setNewMenuDescription("");
      setNewMenuLocation("");
    } else {
      toast({ title: "Gagal membuat menu.", description: result.error, variant: "destructive" });
    }
    setIsSubmitting(false);
  };
  
  const openEditDialog = (menu: Menu) => {
    setMenuToEdit(menu);
    setEditMenuName(menu.name);
    setEditMenuDescription(menu.description);
    setEditMenuLocation(menu.location || '');
    setIsEditDialogOpen(true);
  };
  
  const handleEditMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuToEdit || !editMenuName || !editMenuLocation) {
        toast({ title: "Nama dan lokasi menu tidak boleh kosong.", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    const result = await updateMenu(menuToEdit.id, {
        name: editMenuName,
        description: editMenuDescription,
        location: editMenuLocation as 'topnav' | 'bottomnav' | 'sidebar',
    });

    if (result.success) {
        toast({ title: "Menu berhasil diperbarui." });
        await fetchMenus();
        setIsEditDialogOpen(false);
    } else {
        toast({ title: "Gagal memperbarui menu.", description: result.error, variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const openDeleteDialog = (menu: Menu) => {
    setMenuToDelete({ id: menu.id, name: menu.name });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return;
    
    const result = await deleteMenu(menuToDelete.id);

    if (result.success) {
        toast({ title: "Menu berhasil dihapus." });
        await fetchMenus();
    } else {
        toast({ title: "Gagal menghapus menu.", description: result.error, variant: "destructive" });
    }
    
    setIsDeleteDialogOpen(false);
    setMenuToDelete(null);
  };

  const LocationDisplay = ({ location }: { location?: 'topnav' | 'bottomnav' | 'sidebar' | string }) => {
    if (!location) return <span>N/A</span>;

    const Icon = {
        topnav: ArrowUpToLine,
        bottomnav: ArrowDownToLine,
        sidebar: PanelLeft
    }[location as 'topnav' | 'bottomnav' | 'sidebar'];

    const text = {
        topnav: 'Navigasi Atas',
        bottomnav: 'Navigasi Bawah',
        sidebar: 'Sidebar'
    }[location as 'topnav' | 'bottomnav' | 'sidebar'];

    return (
        <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <span>{text || 'N/A'}</span>
        </div>
    );
  };


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Kelola Menu</h2>
            <p className="text-muted-foreground">
              Atur menu navigasi publik dari sini
            </p>
          </div>
          <div className="flex gap-2">
            {menus.length === 0 && (
                <Button variant="outline" size="sm" onClick={handleSeedMenus} disabled={isSeeding}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isSeeding ? 'Membuat...' : 'Buat Menu Default'}
                </Button>
            )}
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Menu Baru
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Daftar Menu</CardTitle>
                <CardDescription>
                  Total menu: {menus.length}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari menu..."
                    className="pl-8"
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Menu</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Jumlah Item</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Memuat data menu...</TableCell>
                  </TableRow>
                ) : menus.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Belum ada menu. Klik "Buat Menu Default" untuk memulai.</TableCell>
                  </TableRow>
                ) : (
                  menus.map((menu) => (
                    <TableRow key={menu.id}>
                      <TableCell className="font-medium">{menu.name}</TableCell>
                      <TableCell><LocationDisplay location={menu.location} /></TableCell>
                      <TableCell>{menu.items?.length || 0}</TableCell>
                      <TableCell>{menu.description}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/menu/${menu.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Kelola Item
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(menu)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Menu
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(menu)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus Menu
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Menu Baru</DialogTitle>
            <DialogDescription>
              Buat sebuah grup menu baru untuk navigasi situs.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddMenu}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="menu-name">Nama Menu</Label>
                <Input
                  id="menu-name"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="Contoh: Menu Utama"
                  disabled={isSubmitting}
                  required
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="menu-location">Lokasi Menu</Label>
                <Select value={newMenuLocation} onValueChange={(value) => setNewMenuLocation(value as any)} disabled={isSubmitting} required>
                    <SelectTrigger id="menu-location">
                        <SelectValue placeholder="Pilih lokasi penempatan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="topnav">Navigasi Atas (TopNav)</SelectItem>
                        <SelectItem value="bottomnav">Navigasi Bawah (BottomNav)</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-description">Deskripsi (Opsional)</Label>
                <Input
                  id="menu-description"
                  value={newMenuDescription}
                  onChange={(e) => setNewMenuDescription(e.target.value)}
                  placeholder="Deskripsi singkat mengenai menu ini"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu</DialogTitle>
            <DialogDescription>
              Ubah detail untuk menu &quot;{menuToEdit?.name}&quot;.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditMenu}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-menu-name">Nama Menu</Label>
                <Input
                  id="edit-menu-name"
                  value={editMenuName}
                  onChange={(e) => setEditMenuName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-menu-location">Lokasi Menu</Label>
                <Select value={editMenuLocation} onValueChange={(value) => setEditMenuLocation(value as any)} disabled={isSubmitting} required>
                  <SelectTrigger id="edit-menu-location">
                    <SelectValue placeholder="Pilih lokasi penempatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="topnav">Navigasi Atas (TopNav)</SelectItem>
                    <SelectItem value="bottomnav">Navigasi Bawah (BottomNav)</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-menu-description">Deskripsi (Opsional)</Label>
                <Input
                  id="edit-menu-description"
                  value={editMenuDescription}
                  onChange={(e) => setEditMenuDescription(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isSubmitting || !editMenuName.trim()}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus menu &quot;{menuToDelete?.name}&quot; dan semua item di dalamnya secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMenu}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MenuPage;
