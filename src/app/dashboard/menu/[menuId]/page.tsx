
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
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronRight,
  Save
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

import { getMenuDetails, addMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/menu-actions";
import { useState, useEffect, useCallback } from "react";
import { useParams } from 'next/navigation';
import type { Menu, MenuItem } from '@/lib/menu-data';
import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { staticPages } from "@/lib/static-pages";


const MenuItemsPage = () => {
  const params = useParams();
  const { toast } = useToast();
  const menuId = params.menuId as string;
  
  const [menuDetails, setMenuDetails] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  // State for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', path: '', icon: '', parentId: '' });
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const fetchMenuDetails = useCallback(async () => {
    if (menuId) {
      setLoading(true);
      try {
        const details = await getMenuDetails(menuId);
        setMenuDetails(details);
      } catch (error) {
        console.error("Failed to fetch menu details:", error);
        toast({ title: "Gagal memuat data menu", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  }, [menuId, toast]);

  useEffect(() => {
    fetchMenuDetails();
  }, [fetchMenuDetails]);
  
  const openAddForm = () => {
    setFormMode('add');
    setSelectedItem(null);
    setFormValues({ title: '', path: '', icon: '', parentId: '' });
    setIsFormOpen(true);
  };

  const openEditForm = (item: MenuItem) => {
    setFormMode('edit');
    setSelectedItem(item);
    setFormValues({ title: item.title, path: item.path, icon: item.icon || '', parentId: item.parentId || '' });
    setIsFormOpen(true);
  };
  
  const openDeleteDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuId) return;

    setIsSubmitting(true);
    let result;

    if (formMode === 'add') {
        const newItem: Omit<MenuItem, 'id'> = {
            title: formValues.title,
            path: formValues.path,
            icon: formValues.icon,
            parentId: formValues.parentId || null,
            order: menuDetails?.items?.length || 0,
        };
        result = await addMenuItem(menuId, newItem);
    } else if (selectedItem) {
        const updatedData: Partial<Omit<MenuItem, 'id'>> = {
            title: formValues.title,
            path: formValues.path,
            icon: formValues.icon,
            parentId: formValues.parentId || null,
        };
        result = await updateMenuItem(menuId, selectedItem.id, updatedData);
    }

    if (result?.success) {
        toast({ title: `Item menu berhasil ${formMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
        await fetchMenuDetails();
        setIsFormOpen(false);
    } else {
        toast({ title: `Gagal ${formMode === 'add' ? 'menambahkan' : 'memperbarui'} item.`, description: result?.error, variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!selectedItem || !menuId) return;
    
    const result = await deleteMenuItem(menuId, selectedItem.id);
    
    if (result.success) {
        toast({ title: "Item menu berhasil dihapus." });
        await fetchMenuDetails();
    } else {
        toast({ title: "Gagal menghapus item.", description: result.error, variant: "destructive" });
    }

    setIsDeleteOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Memuat data menu...</div>;
  }

  if (!menuDetails) {
    return <div>Menu tidak ditemukan.</div>;
  }

  const parentItems = menuDetails.items?.filter(item => !item.parentId) || [];
  const getSubItems = (parentId: string) => {
    return menuDetails.items?.filter(item => item.parentId === parentId) || [];
  }
  
  const possibleParents = menuDetails.items?.filter(item => !item.parentId) || [];

  return (
    <>
      <div className="space-y-6">
        <Breadcrumb items={[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Kelola Menu", path: "/dashboard/menu" },
          { title: menuDetails.name }
        ]} />
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Kelola Item untuk &quot;{menuDetails.name}&quot;</h2>
            <p className="text-muted-foreground">
              Atur item yang akan tampil pada menu ini
            </p>
          </div>
          <Button size="sm" onClick={openAddForm}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item Menu
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Item</CardTitle>
            <CardDescription>
              Total item: {menuDetails.items?.length || 0}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Item</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parentItems.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">Belum ada item menu.</TableCell>
                    </TableRow>
                )}
                {parentItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.path}</TableCell>
                      <TableCell>{item.icon}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditForm(item)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(item)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {getSubItems(item.id).map(subItem => (
                      <TableRow key={subItem.id}>
                          <TableCell className="pl-10 font-medium flex items-center">
                            <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                            {subItem.title}
                          </TableCell>
                          <TableCell>{subItem.path}</TableCell>
                          <TableCell>{subItem.icon}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditForm(subItem)}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(subItem)}>
                                  <Trash2 className="h-4 w-4 mr-2" /> Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Tambah Item Menu Baru' : 'Edit Item Menu'}</DialogTitle>
            <DialogDescription>
                Isi detail item menu di bawah ini. Klik simpan jika sudah selesai.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Item</Label>
                <Input id="title" value={formValues.title} onChange={(e) => setFormValues({...formValues, title: e.target.value})} placeholder="Contoh: Sejarah Desa" disabled={isSubmitting} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="path">Path</Label>
                <Input id="path" value={formValues.path} onChange={(e) => setFormValues({...formValues, path: e.target.value})} placeholder="/profil/sejarah-desa" disabled={isSubmitting} required />
                 <Select onValueChange={(value) => { if(value) setFormValues(prev => ({...prev, path: value})) }}>
                    <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Atau pilih dari halaman yang ada..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="/">Halaman Utama (/)</SelectItem>
                        {staticPages.map(page => (
                            <SelectItem key={page.id} value={page.path}>{page.title} ({page.path})</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Pilih dari daftar atau masukkan path secara manual. Contoh: /berita atau https://google.com</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Opsional)</Label>
                <Select value={formValues.icon} onValueChange={(value) => setFormValues({...formValues, icon: value})} disabled={isSubmitting}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Pilih ikon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Info">Info</SelectItem>
                    <SelectItem value="Newspaper">Newspaper</SelectItem>
                    <SelectItem value="Map">Map</SelectItem>
                    <SelectItem value="BookOpen">BookOpen</SelectItem>
                    <SelectItem value="Users">Users</SelectItem>
                    <SelectItem value="Building2">Building2</SelectItem>
                    <SelectItem value="Scale">Scale</SelectItem>
                    <SelectItem value="HeartHandshake">HeartHandshake</SelectItem>
                    <SelectItem value="FileText">FileText</SelectItem>
                    <SelectItem value="Calendar">Calendar</SelectItem>
                    <SelectItem value="Globe">Globe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentId">Item Induk (Opsional)</Label>
                <Select value={formValues.parentId || 'null'} onValueChange={(value) => setFormValues({...formValues, parentId: value === 'null' ? '' : value})} disabled={isSubmitting}>
                    <SelectTrigger id="parentId">
                        <SelectValue placeholder="Jadikan item utama" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="null">Jadikan item utama</SelectItem>
                        {possibleParents
                            .filter(p => p.id !== selectedItem?.id) // Prevent self-parenting
                            .map(parent => (
                                <SelectItem key={parent.id} value={parent.id}>{parent.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus item menu &quot;{selectedItem?.title}&quot; secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MenuItemsPage;
