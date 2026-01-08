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

import { getMenuDetails } from "@/lib/menu-actions";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import type { Menu, MenuItem } from '@/lib/menu-data';
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

type MenuWithItems = Menu & { items: MenuItem[] };

const MenuItemsPage = () => {
  const params = useParams();
  const { toast } = useToast();
  const menuId = params.menuId as string;
  
  const [menuDetails, setMenuDetails] = useState<MenuWithItems | null>(null);
  const [loading, setLoading] = useState(true);

  // State for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', path: '', icon: '' });
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    if (menuId) {
      const fetchMenuDetails = async () => {
        try {
          const details = await getMenuDetails(parseInt(menuId, 10));
          setMenuDetails(details as MenuWithItems);
        } catch (error) {
          console.error("Failed to fetch menu details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMenuDetails();
    }
  }, [menuId]);
  
  const openAddForm = () => {
    setFormMode('add');
    setSelectedItem(null);
    setFormValues({ title: '', path: '', icon: '' });
    setIsFormOpen(true);
  };

  const openEditForm = (item: MenuItem) => {
    setFormMode('edit');
    setSelectedItem(item);
    setFormValues({ title: item.title, path: item.path, icon: item.icon || '' });
    setIsFormOpen(true);
  };
  
  const openDeleteDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement add/edit logic here
    console.log("Submitting:", formValues);
    toast({
        title: formMode === 'add' ? "Item Ditambahkan (Simulasi)" : "Item Diperbarui (Simulasi)",
        description: `Judul: ${formValues.title}`,
    });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    // TODO: Implement delete logic here
    console.log("Deleting:", selectedItem);
    toast({
        title: "Item Dihapus (Simulasi)",
        description: `Item "${selectedItem.title}" telah dihapus.`,
    });
    setIsDeleteOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Memuat data menu...</div>;
  }

  if (!menuDetails) {
    return <div>Menu tidak ditemukan.</div>;
  }

  const parentItems = menuDetails.items.filter(item => !item.parentId);
  const getSubItems = (parentId: number) => {
    return menuDetails.items.filter(item => item.parentId === parentId);
  }

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
              Total item: {menuDetails.items.length}
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
                <Input id="title" value={formValues.title} onChange={(e) => setFormValues({...formValues, title: e.target.value})} placeholder="Contoh: Sejarah Desa" disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="path">Path</Label>
                <Input id="path" value={formValues.path} onChange={(e) => setFormValues({...formValues, path: e.target.value})} placeholder="/profil/sejarah-desa" disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Opsional)</Label>
                <Input id="icon" value={formValues.icon} onChange={(e) => setFormValues({...formValues, icon: e.target.value})} placeholder="Nama icon dari Lucide" disabled={isSubmitting} />
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
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MenuItemsPage;
