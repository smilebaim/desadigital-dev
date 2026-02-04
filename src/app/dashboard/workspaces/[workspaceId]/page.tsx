
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWorkspace, addItem, updateItem, deleteItem } from '@/lib/workspace-actions';
import { getItemsStream } from '@/lib/workspace-client-actions';
import { useUser } from '@/firebase';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerUid: string;
}

interface WorkspaceItem {
  id: string;
  text: string;
  completed: boolean;
}

const WorkspaceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!newItemText.trim() || !workspaceId) return;

    setIsSubmitting(true);
    const success = await addItem(workspaceId, { text: newItemText });
    if (success) {
      setNewItemText('');
      toast({ title: 'Item berhasil ditambahkan.' });
    } else {
      toast({ title: 'Gagal menambahkan item.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const handleToggleItem = async (itemId: string, completed: boolean) => {
    if (!workspaceId) return;
    await updateItem(workspaceId, itemId, completed);
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
          <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
            <Input
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Tambahkan item baru..."
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || !newItemText.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Menambahkan...' : 'Tambah'}
            </Button>
          </form>

          <div className="space-y-4">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={(checked) => handleToggleItem(item.id, !!checked)}
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className={`flex-grow text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.text}
                  </label>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Belum ada item di workspace ini.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceDetailPage;
