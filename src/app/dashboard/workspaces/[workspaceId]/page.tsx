
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWorkspace, addItem, updateItem, deleteItem } from '@/lib/workspace-actions';
import { getItemsStream } from '@/lib/workspace-client-actions';
import { useUser } from '@/firebase';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerUid: string;
}

interface WorkspaceItem {
  id: string;
  title: string;
  description: string;
  label?: string;
  completed: boolean;
  createdAt: any;
}

const WorkspaceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemLabel, setNewItemLabel] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<WorkspaceItem | null>(null);

  const workspaceId = Array.isArray(params.workspaceId) ? params.workspaceId[0] : params.workspaceId;

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!workspaceId || !user) return;

      setLoading(true);
      const data = await getWorkspace(workspaceId);

      if (!data) {
        setError("Workspace tidak ditemukan.");
        setLoading(false);
        return;
      }
      
      if (data.ownerUid !== user.uid) {
        setError("Anda tidak memiliki akses ke workspace ini.");
        setLoading(false);
        return;
      }
      
      setWorkspace(data as Workspace);
      setLoading(false);
    };

    fetchWorkspace();
  }, [workspaceId, user]);

  useEffect(() => {
    if (workspaceId) {
      const unsubscribe = getItemsStream(workspaceId, (data) => {
        setItems(data as WorkspaceItem[]);
      });
      return () => unsubscribe();
    }
  }, [workspaceId]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !workspaceId) return;

    setIsSubmitting(true);
    const success = await addItem(workspaceId, { title: newItemTitle, description: newItemDesc, label: newItemLabel });
    if (success) {
      setNewItemTitle('');
      setNewItemDesc('');
      setNewItemLabel('');
      toast({ title: 'Item berhasil ditambahkan.' });
    } else {
      toast({ title: 'Gagal menambahkan item.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const handleToggleItem = async (itemId: string, completed: boolean) => {
    if (!workspaceId) return;
    await updateItem(workspaceId, itemId, { completed });
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!workspaceId) return;
    const success = await deleteItem(workspaceId, itemId);
    if (success) {
      toast({ title: 'Item berhasil dihapus.' });
    } else {
      toast({ title: 'Gagal menghapus item.', variant: 'destructive' });
    }
  };
  
  const openEditDialog = (item: WorkspaceItem) => {
    setItemToEdit(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId || !itemToEdit || !itemToEdit.title.trim()) return;

    setIsSubmitting(true);
    const success = await updateItem(workspaceId, itemToEdit.id, {
        title: itemToEdit.title,
        description: itemToEdit.description,
        label: itemToEdit.label,
    });

    if (success) {
        toast({ title: 'Item berhasil diperbarui.' });
        setIsEditDialogOpen(false);
        setItemToEdit(null);
    } else {
        toast({ title: 'Gagal memperbarui item.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Memuat data workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p>{error}</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/dashboard/workspaces">Kembali ke Workspaces</Link>
        </Button>
      </div>
    );
  }
  
  if (!workspace) {
    return null; // Should be handled by error state
  }

  return (
    <>
      <div className="space-y-6">
        <Breadcrumb items={[
            { title: "Dashboard", path: "/dashboard" },
            { title: "Workspaces", path: "/dashboard/workspaces" },
            { title: workspace.name }
          ]} />

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{workspace.name}</h2>
            <p className="text-muted-foreground">{workspace.description || 'Tidak ada deskripsi.'}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/workspaces">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Item</CardTitle>
            <CardDescription>
              Kelola tugas, catatan, atau item lain yang terkait dengan workspace ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4 mb-6 border-b pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="item-title">Judul Item Baru</Label>
                      <Input
                        id="item-title"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        placeholder="Apa yang perlu dilakukan?"
                        disabled={isSubmitting}
                      />
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="item-label">Label (Opsional)</Label>
                      <Input
                        id="item-label"
                        value={newItemLabel}
                        onChange={(e) => setNewItemLabel(e.target.value)}
                        placeholder="Contoh: Penting"
                        disabled={isSubmitting}
                      />
                  </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="item-desc">Deskripsi (Opsional)</Label>
                  <Textarea
                    id="item-desc"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Tambahkan detail lebih lanjut..."
                    disabled={isSubmitting}
                    rows={3}
                  />
              </div>
              <Button type="submit" disabled={isSubmitting || !newItemTitle.trim()} className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Menambahkan...' : 'Tambah Item'}
              </Button>
            </form>

            <div className="space-y-2">
              {items.length > 0 ? (
                 <Accordion type="single" collapsible className="w-full space-y-2">
                  {items.map(item => (
                    <AccordionItem value={item.id} key={item.id} className="border rounded-md bg-muted/50 data-[state=open]:bg-white">
                      <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-4 flex-grow">
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={item.completed}
                            onCheckedChange={(checked) => handleToggleItem(item.id, !!checked)}
                            onClick={(e) => e.stopPropagation()} // Prevent accordion from toggling when clicking checkbox
                          />
                          <label
                            htmlFor={`item-${item.id}`}
                            className={`flex-grow text-left text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                          >
                            {item.title}
                          </label>
                          {item.label && <Badge variant="secondary">{item.label}</Badge>}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4 space-y-4">
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {item.description || "Tidak ada deskripsi."}
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id)}>
                                  <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                                  Hapus
                                </Button>
                            </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Belum ada item di workspace ini.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription>
                    Perbarui detail item di bawah ini.
                </DialogDescription>
            </DialogHeader>
            {itemToEdit && (
                <form onSubmit={handleUpdateItem}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-item-title">Judul</Label>
                            <Input
                                id="edit-item-title"
                                value={itemToEdit.title}
                                onChange={(e) => setItemToEdit(prev => prev ? {...prev, title: e.target.value} : null)}
                                disabled={isSubmitting}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="edit-item-label">Label</Label>
                            <Input
                                id="edit-item-label"
                                value={itemToEdit.label || ''}
                                onChange={(e) => setItemToEdit(prev => prev ? {...prev, label: e.target.value} : null)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-item-desc">Deskripsi</Label>
                            <Textarea
                                id="edit-item-desc"
                                value={itemToEdit.description}
                                onChange={(e) => setItemToEdit(prev => prev ? {...prev, description: e.target.value} : null)}
                                disabled={isSubmitting}
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </DialogFooter>
                </form>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkspaceDetailPage;
