
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { getWorkspace, addItem, updateItem, deleteItem, addMemberToWorkspace, removeMemberFromWorkspace, addAttachmentMetadata, removeAttachment } from '@/lib/workspace-actions';
import { getItemsStream } from '@/lib/workspace-client-actions';
import { useUser, useStorage } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2, Edit, File as FileIcon, Upload, Loader2, AlignLeft, Paperclip } from 'lucide-react';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface UserProfile {
  id: string;
  displayName: string;
  email: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerUid: string;
  owner: UserProfile;
  members: UserProfile[];
}

interface Attachment {
  name: string;
  url: string;
  path: string;
}

interface WorkspaceItem {
  id: string;
  title: string;
  description: string;
  label?: string;
  completed: boolean;
  createdAt: any;
  attachments?: Attachment[];
}

const WorkspaceDetailPage = () => {
  const params = useParams();
  const { user } = useUser();
  const storage = useStorage();
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Item Dialog states
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [itemInDialog, setItemInDialog] = useState<WorkspaceItem | null>(null);


  // Member management states
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<UserProfile | null>(null);
  
  // Attachment states
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [attachmentToDelete, setAttachmentToDelete] = useState<Attachment | null>(null);

  // Delete item state
  const [itemToDelete, setItemToDelete] = useState<WorkspaceItem | null>(null);


  const workspaceId = Array.isArray(params?.workspaceId) ? params.workspaceId[0] : params?.workspaceId as string;

  const fetchWorkspace = useCallback(async () => {
    if (!workspaceId || !user) return;
    setLoading(true);
    const data = await getWorkspace(workspaceId);

    if (!data) {
      setError("Workspace tidak ditemukan atau Anda tidak memiliki akses.");
      setLoading(false);
      return;
    }
    
    setWorkspace(data as unknown as Workspace);
    setLoading(false);
    setError(null);
  }, [workspaceId, user]);


  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  useEffect(() => {
    if (workspaceId) {
      const unsubscribe = getItemsStream(workspaceId, (data) => {
        setItems(data as WorkspaceItem[]);
      });
      return () => unsubscribe();
    }
  }, [workspaceId]);
  
  useEffect(() => {
    if (isItemDialogOpen && itemInDialog && dialogMode === 'edit') {
      const currentItem = items.find(item => item.id === itemInDialog.id);
      if(currentItem) {
        setItemInDialog(currentItem);
      }
    }
  }, [items, isItemDialogOpen, itemInDialog, dialogMode]);

  const handleToggleItem = async (itemId: string, completed: boolean) => {
    if (!workspaceId) return;
    await updateItem(workspaceId, itemId, { completed });
  };

  const confirmDeleteItem = async () => {
    if (!workspaceId || !itemToDelete) return;
    const success = await deleteItem(workspaceId, itemToDelete.id);
    if (success) {
      toast({ title: 'Item berhasil dihapus.' });
    } else {
      toast({ title: 'Gagal menghapus item.', variant: 'destructive' });
    }
    setItemToDelete(null);
  };

  const openAddDialog = () => {
    setItemInDialog({
      id: '', title: '', description: '', label: '',
      completed: false, createdAt: null, attachments: []
    });
    setDialogMode('add');
    setUploadingFile(null);
    setUploadProgress(null);
    setIsItemDialogOpen(true);
  };
  
  const openEditDialog = (item: WorkspaceItem) => {
    setItemInDialog(JSON.parse(JSON.stringify(item))); // Deep copy
    setDialogMode('edit');
    setUploadingFile(null);
    setUploadProgress(null);
    setIsItemDialogOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId || !itemInDialog || !itemInDialog.title.trim()) return;

    setIsSubmitting(true);

    if (dialogMode === 'add') {
        const result = await addItem(workspaceId, {
            title: itemInDialog.title,
            description: itemInDialog.description,
            label: itemInDialog.label,
        });

        if (result.success && result.id) {
            toast({ title: 'Item berhasil ditambahkan.' });
            // Wait a moment for the new item to appear in the stream, then transition to edit mode
            setTimeout(() => {
                const newItemFromStream = items.find(i => i.id === result.id);
                if (newItemFromStream) {
                    setItemInDialog(newItemFromStream);
                } else {
                    // Fallback if stream is slow
                    setItemInDialog(prev => prev ? {...prev, id: result.id!, attachments: []} : null);
                }
                setDialogMode('edit');
                setIsSubmitting(false);
            }, 500); // 500ms delay to allow Firestore stream to update
            return; // Exit here to prevent setIsSubmitting(false) from running too early
        } else {
            toast({ title: 'Gagal menambahkan item.', description: result.error, variant: 'destructive' });
        }
    } else { // 'edit' mode
        const success = await updateItem(workspaceId, itemInDialog.id, {
            title: itemInDialog.title,
            description: itemInDialog.description,
            label: itemInDialog.label,
        });
        if (success) {
            toast({ title: 'Item berhasil diperbarui.' });
            // Don't close dialog if user is editing
        } else {
            toast({ title: 'Gagal memperbarui item.', variant: 'destructive' });
        }
    }

    setIsSubmitting(false);
  };


  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim() || !workspaceId) return;

    setIsInviting(true);
    const result = await addMemberToWorkspace(workspaceId, newMemberEmail);

    if (result.success) {
        toast({ title: 'Anggota berhasil diundang.' });
        setNewMemberEmail('');
        await fetchWorkspace(); // Refresh data
    } else {
        toast({ title: 'Gagal mengundang anggota.', description: result.error, variant: 'destructive' });
    }
    setIsInviting(false);
  };

  const confirmRemoveMember = async () => {
      if (!workspaceId || !memberToRemove) return;
      const result = await removeMemberFromWorkspace(workspaceId, memberToRemove.id);
      if (result.success) {
          toast({ title: 'Anggota berhasil dihapus.' });
          await fetchWorkspace(); // Refresh data
      } else {
          toast({ title: 'Gagal menghapus anggota.', variant: 'destructive' });
      }
      setMemberToRemove(null);
  };

  const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!uploadingFile || !itemInDialog || !storage) {
        toast({ title: 'File atau item tidak dipilih.', variant: 'destructive' });
        return;
    }

    setUploadProgress(0);

    const storagePath = `workspaces/${workspaceId}/items/${itemInDialog.id}/${Date.now()}-${uploadingFile.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, uploadingFile);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        },
        (error) => {
            console.error("Upload failed:", error);
            toast({ title: 'Gagal mengunggah file.', description: error.message, variant: 'destructive' });
            setUploadProgress(null);
            setUploadingFile(null);
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const attachmentData: Attachment = {
                name: uploadingFile.name,
                url: downloadURL,
                path: storagePath,
            };
            
            const result = await addAttachmentMetadata(workspaceId, itemInDialog.id, attachmentData);
            
            if (result.success) {
                toast({ title: 'Lampiran berhasil ditambahkan.' });
            } else {
                toast({ title: 'Gagal menyimpan metadata lampiran.', variant: 'destructive' });
            }

            setUploadProgress(null);
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
            setUploadingFile(null);
        }
    );
};

const confirmRemoveAttachment = async () => {
    if (!workspaceId || !itemInDialog || !attachmentToDelete) return;

    const result = await removeAttachment(workspaceId, itemInDialog.id, attachmentToDelete);

    if (result.success) {
        toast({ title: "Lampiran berhasil dihapus." });
    } else {
        toast({ title: "Gagal menghapus lampiran.", description: result.error, variant: 'destructive' });
    }
    setAttachmentToDelete(null);
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
    <TooltipProvider>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar Item</CardTitle>
                    <CardDescription>
                      Kelola tugas, catatan, atau item lain yang terkait dengan workspace ini.
                    </CardDescription>
                </div>
                <Button onClick={openAddDialog}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Item
                </Button>
              </CardHeader>
              <CardContent>
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
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <label
                                  htmlFor={`item-${item.id}`}
                                  className={`flex-grow text-left text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                                >
                                  {item.title}
                                </label>
                                <div className="flex items-center gap-3 text-muted-foreground ml-auto shrink-0">
                                    {item.description && (
                                        <Tooltip>
                                            <TooltipTrigger asChild><AlignLeft className="h-4 w-4" /></TooltipTrigger>
                                            <TooltipContent><p>Memiliki deskripsi</p></TooltipContent>
                                        </Tooltip>
                                    )}
                                    {item.attachments && item.attachments.length > 0 && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-1">
                                                    <Paperclip className="h-4 w-4" />
                                                    <span className="text-xs">{item.attachments.length}</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent><p>{item.attachments.length} lampiran</p></TooltipContent>
                                        </Tooltip>
                                    )}
                                    {item.label && <Badge variant="secondary">{item.label}</Badge>}
                                </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 pt-0">
                            <div className="border-t pt-4 space-y-4">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {item.description || "Tidak ada deskripsi."}
                                </p>
                                {item.attachments && item.attachments.length > 0 && (
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-muted-foreground">Lampiran:</h4>
                                        <ul className="space-y-1">
                                            {item.attachments.map((att, index) => (
                                                <li key={index}>
                                                    <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                        <FileIcon className="h-4 w-4"/>
                                                        {att.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setItemToDelete(item)}>
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

          <div>
             <Card>
                <CardHeader>
                    <CardTitle>Anggota Workspace</CardTitle>
                    <CardDescription>Undang dan kelola anggota untuk berkolaborasi.</CardDescription>
                </CardHeader>
                <CardContent>
                    {user?.uid === workspace.ownerUid && (
                      <form onSubmit={handleInviteMember} className="flex gap-2 mb-6">
                          <Input 
                              type="email" 
                              placeholder="Email anggota baru"
                              value={newMemberEmail}
                              onChange={(e) => setNewMemberEmail(e.target.value)}
                              disabled={isInviting}
                          />
                          <Button type="submit" disabled={isInviting || !newMemberEmail.trim()}>
                              {isInviting ? 'Mengundang...' : 'Undang'}
                          </Button>
                      </form>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium text-muted-foreground">Pemilik</h4>
                            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                <div className="flex items-center gap-3">
                                    <Avatar><AvatarFallback>{workspace.owner?.displayName?.charAt(0) || 'O'}</AvatarFallback></Avatar>
                                    <div>
                                        <p className="font-medium text-sm">{workspace.owner?.displayName}</p>
                                        <p className="text-xs text-muted-foreground">{workspace.owner?.email}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Pemilik</Badge>
                            </div>
                        </div>
                        
                        {workspace.members && workspace.members.length > 0 && (
                            <div className="space-y-1">
                                 <h4 className="text-sm font-medium text-muted-foreground">Anggota</h4>
                                {workspace.members.map(member => (
                                    <div key={member.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <Avatar><AvatarFallback>{member.displayName?.charAt(0) || '?'}</AvatarFallback></Avatar>
                                            <div>
                                                <p className="font-medium text-sm">{member.displayName}</p>
                                                <p className="text-xs text-muted-foreground">{member.email}</p>
                                            </div>
                                        </div>
                                        {user?.uid === workspace.ownerUid && member.id !== user.uid && (
                                            <Button variant="ghost" size="icon" onClick={() => setMemberToRemove(member)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>{dialogMode === 'add' ? 'Tambah Item Baru' : 'Edit Item'}</DialogTitle>
                <DialogDescription>
                    {dialogMode === 'add' ? 'Isi detail item baru. Setelah disimpan, Anda bisa menambahkan lampiran.' : 'Perbarui detail item dan kelola lampiran.'}
                </DialogDescription>
            </DialogHeader>
            {itemInDialog && (
                 <div className="max-h-[70vh] overflow-y-auto pr-4 -mr-6 space-y-6">
                    <form id="item-dialog-form" onSubmit={handleSaveItem} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="item-dialog-title">Judul</Label>
                            <Input
                                id="item-dialog-title"
                                value={itemInDialog.title}
                                onChange={(e) => setItemInDialog(prev => prev ? {...prev, title: e.target.value} : null)}
                                disabled={isSubmitting}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="item-dialog-label">Label</Label>
                            <Input
                                id="item-dialog-label"
                                value={itemInDialog.label || ''}
                                onChange={(e) => setItemInDialog(prev => prev ? {...prev, label: e.target.value} : null)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="item-dialog-desc">Deskripsi</Label>
                            <Textarea
                                id="item-dialog-desc"
                                value={itemInDialog.description}
                                onChange={(e) => setItemInDialog(prev => prev ? {...prev, description: e.target.value} : null)}
                                disabled={isSubmitting}
                                rows={4}
                            />
                        </div>
                    </form>

                     {dialogMode === 'edit' && (
                        <>
                            {/* Attachments Section */}
                            <div className="space-y-2">
                                <Label>Lampiran</Label>
                                {(itemInDialog.attachments?.length || 0) > 0 ? (
                                    <ul className="mt-2 space-y-2">
                                        {itemInDialog.attachments?.map((att, index) => (
                                            <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted">
                                                <a href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline truncate">
                                                    <FileIcon className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{att.name}</span>
                                                </a>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => setAttachmentToDelete(att)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground mt-2">Belum ada lampiran.</p>
                                )}
                            </div>

                            {/* Upload Section */}
                            <div className="space-y-2">
                                <Label htmlFor="file-upload">Unggah Lampiran Baru</Label>
                                <div className="flex gap-2">
                                    <Input id="file-upload" type="file" onChange={(e) => setUploadingFile(e.target.files ? e.target.files[0] : null)} disabled={uploadProgress !== null} />
                                    <Button onClick={handleFileUpload} disabled={!uploadingFile || uploadProgress !== null}>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Unggah
                                    </Button>
                                </div>
                                {uploadProgress !== null && (
                                    <div className="mt-2">
                                        <Progress value={uploadProgress} />
                                        <p className="text-xs text-muted-foreground mt-1">{uploadProgress.toFixed(0)}% selesai</p>
                                    </div>
                                )}
                            </div>
                        </>
                     )}
                </div>
            )}
            <DialogFooter className="pt-6">
                <Button type="button" variant="outline" onClick={() => setIsItemDialogOpen(false)}>Tutup</Button>
                <Button type="submit" form="item-dialog-form" disabled={isSubmitting}>
                    {isSubmitting ? 'Menyimpan...' : (dialogMode === 'add' ? 'Simpan & Lanjutkan' : 'Simpan Perubahan')}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

       <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus item "{itemToDelete?.title}" secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteItem}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus {memberToRemove?.displayName} dari workspace ini? Mereka akan kehilangan akses ke semua item di dalamnya.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={confirmRemoveMember}>Hapus Anggota</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={!!attachmentToDelete} onOpenChange={(open) => !open && setAttachmentToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Hapus Lampiran?</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus file "{attachmentToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={confirmRemoveAttachment}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};

export default WorkspaceDetailPage;
