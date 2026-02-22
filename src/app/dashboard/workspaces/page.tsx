'use client';
import { useState, useEffect, use } from "react";
import Link from "next/link";
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
  Briefcase,
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUser } from '@/firebase';
import { addWorkspace, deleteWorkspace, updateWorkspace, seedDummyWorkspaces } from "@/lib/workspace-actions";
import { getWorkspacesStream } from "@/lib/workspace-client-actions";
import { useToast } from "@/components/ui/use-toast";

interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: any;
}

const WorkspacesPage = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for Add Dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState("");
  
  // States for delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null);

  // States for edit dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [workspaceToEdit, setWorkspaceToEdit] = useState<Workspace | null>(null);
  const [editWorkspaceName, setEditWorkspaceName] = useState("");
  const [editWorkspaceDesc, setEditWorkspaceDesc] = useState("");

  // State for seeding
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      const unsubscribe = getWorkspacesStream(user.uid, (data) => {
        setWorkspaces(data as Workspace[]);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else if (!user) {
        setIsLoading(false);
    }
  }, [user]);

  const handleAddWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim() || !user) return;
    
    setIsSubmitting(true);
    const success = await addWorkspace({
      name: newWorkspaceName,
      description: newWorkspaceDesc,
      ownerUid: user.uid,
    });

    if (success) {
      toast({ title: "Workspace berhasil dibuat!" });
      setNewWorkspaceName("");
      setNewWorkspaceDesc("");
      setIsAddDialogOpen(false);
    } else {
      toast({ title: "Gagal membuat workspace", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  const openDeleteDialog = (id: string) => {
    setWorkspaceToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteWorkspace = async () => {
    if (!workspaceToDelete) return;

    const success = await deleteWorkspace(workspaceToDelete);
    if (success) {
        toast({ title: "Workspace berhasil dihapus." });
    } else {
        toast({ title: "Gagal menghapus workspace.", variant: "destructive" });
    }
    setShowDeleteDialog(false);
    setWorkspaceToDelete(null);
  };

  const openEditDialog = (workspace: Workspace) => {
    setWorkspaceToEdit(workspace);
    setEditWorkspaceName(workspace.name);
    setEditWorkspaceDesc(workspace.description);
    setShowEditDialog(true);
  };

  const handleEditWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceToEdit || !editWorkspaceName.trim()) return;

    setIsSubmitting(true);
    const success = await updateWorkspace(workspaceToEdit.id, {
        name: editWorkspaceName,
        description: editWorkspaceDesc,
    });

    if (success) {
        toast({ title: "Workspace berhasil diperbarui." });
    } else {
        toast({ title: "Gagal memperbarui workspace.", variant: "destructive" });
    }
    
    setIsSubmitting(false);
    setShowEditDialog(false);
    setWorkspaceToEdit(null);
  };
  
  const handleSeedData = async () => {
    if (!user) return;
    setIsSeeding(true);
    const result = await seedDummyWorkspaces(user.uid);
    if (result.success) {
        toast({
            title: "Data Dummy Berhasil Ditambahkan",
            description: `${result.count} workspace dummy telah ditambahkan.`,
        });
    } else {
        toast({
            title: "Gagal Menambahkan Data Dummy",
            description: result.error,
            variant: "destructive",
        });
    }
    setIsSeeding(false);
  };


  return (
    <>
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
            <p className="text-muted-foreground">
                Kelola ruang kerja kolaboratif Anda.
            </p>
            </div>
             <div className="flex gap-2">
                {workspaces.length === 0 && !isLoading && (
                    <Button variant="outline" size="sm" onClick={handleSeedData} disabled={isSeeding}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isSeeding ? 'Menambahkan...' : 'Tambah Data Dummy'}
                    </Button>
                )}
                <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Workspace Baru
                </Button>
             </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Daftar Workspace</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Nama Workspace</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    <TableRow>
                    <TableCell colSpan={3} className="text-center">Memuat data...</TableCell>
                    </TableRow>
                ) : workspaces.length > 0 ? (
                    workspaces.map((ws) => (
                    <TableRow key={ws.id}>
                        <TableCell className="font-medium">
                        <Link href={`/dashboard/workspaces/${ws.id}`} className="hover:underline">
                            {ws.name}
                        </Link>
                        </TableCell>
                        <TableCell>{ws.description}</TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(ws)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => openDeleteDialog(ws.id)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={3} className="text-center">Belum ada workspace. Klik "Tambah Data Dummy" atau "Buat Workspace Baru" untuk memulai.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
      
        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Buat Workspace Baru</DialogTitle>
                <DialogDescription>Mulai proyek baru dengan membuat workspace.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddWorkspace} className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="ws-name">Nama Workspace</Label>
                    <Input 
                        id="ws-name" 
                        placeholder="Contoh: Proyek Desa Digital"
                        value={newWorkspaceName}
                        onChange={(e) => setNewWorkspaceName(e.target.value)} 
                        disabled={isSubmitting}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="ws-desc">Deskripsi (Opsional)</Label>
                    <Input 
                        id="ws-desc" 
                        placeholder="Deskripsi singkat tentang workspace ini"
                        value={newWorkspaceDesc}
                        onChange={(e) => setNewWorkspaceDesc(e.target.value)} 
                        disabled={isSubmitting}
                    />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isSubmitting || !newWorkspaceName.trim()}>
                            <Plus className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Menyimpan..." : "Buat Workspace"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus workspace secara permanen.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteWorkspace}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Workspace</DialogTitle>
                <DialogDescription>
                    Perbarui nama dan deskripsi untuk workspace &quot;{workspaceToEdit?.name}&quot;.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditWorkspace}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-ws-name" className="text-right">
                        Nama
                        </Label>
                        <Input
                        id="edit-ws-name"
                        value={editWorkspaceName}
                        onChange={(e) => setEditWorkspaceName(e.target.value)}
                        className="col-span-3"
                        disabled={isSubmitting}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-ws-desc" className="text-right">
                        Deskripsi
                        </Label>
                        <Input
                        id="edit-ws-desc"
                        value={editWorkspaceDesc}
                        onChange={(e) => setEditWorkspaceDesc(e.target.value)}
                        className="col-span-3"
                        disabled={isSubmitting}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>Batal</Button>
                    <Button type="submit" disabled={isSubmitting || !editWorkspaceName.trim()}>
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  );
};

export default WorkspacesPage;
