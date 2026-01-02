
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWorkspace } from '@/lib/workspace-actions';
import { useAuth } from '@/contexts/AuthContext';
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerUid: string;
}

const WorkspaceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
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
          <CardTitle>Konten Workspace</CardTitle>
          <CardDescription>
            Kelola tugas, catatan, atau item lain yang terkait dengan workspace ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Fitur untuk menambahkan konten akan segera tersedia.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceDetailPage;
