'use client';
import { useState, useEffect, use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Briefcase
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
import { useAuth } from "@/contexts/AuthContext";
import { addWorkspace, getWorkspaces, deleteWorkspace } from "@/lib/workspace-actions";
import { useToast } from "@/components/ui/use-toast";

interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: any;
}

const WorkspacesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = getWorkspaces(user.uid, (data) => {
        setWorkspaces(data);
        setIsLoading(false);
      });
      return () => unsubscribe();
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
          <p className="text-muted-foreground">
            Kelola ruang kerja kolaboratif Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
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
                        <TableCell className="font-medium">{ws.name}</TableCell>
                        <TableCell>{ws.description}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
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
                      <TableCell colSpan={3} className="text-center">Belum ada workspace.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Buat Workspace Baru</CardTitle>
              <CardDescription>Mulai proyek baru dengan membuat workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddWorkspace} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="ws-name">Nama Workspace</label>
                  <Input 
                    id="ws-name" 
                    placeholder="Contoh: Proyek Desa Digital"
                    value={newWorkspaceName}
                    onChange={(e) => setNewWorkspaceName(e.target.value)} 
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="ws-desc">Deskripsi (Opsional)</label>
                  <Input 
                    id="ws-desc" 
                    placeholder="Deskripsi singkat tentang workspace ini"
                    value={newWorkspaceDesc}
                    onChange={(e) => setNewWorkspaceDesc(e.target.value)} 
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || !newWorkspaceName.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Menyimpan..." : "Buat Workspace"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
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
    </div>
  );
};

export default WorkspacesPage;
