'use client';
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
  Eye,
  Download,
  Book,
  File as FileIcon
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { staticPages, type StaticPage as BuiltInPage } from "@/lib/static-pages";
import { getCustomPagesStream } from "@/lib/static-pages-client-actions";
import { deleteCustomPage, type CustomPageData } from "@/lib/static-pages-actions";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface CustomPage extends CustomPageData {
  id: string;
}

type CombinedPage = (BuiltInPage & { type: 'Bawaan' }) | (CustomPage & { type: 'Kustom' });


const PagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageToDelete, setPageToDelete] = useState<CustomPage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getCustomPagesStream((data) => {
      setCustomPages(data as CustomPage[]);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allPages: CombinedPage[] = useMemo(() => {
    const builtIn: CombinedPage[] = staticPages.map(p => ({ ...p, type: 'Bawaan' }));
    const custom: CombinedPage[] = customPages.map(p => ({ ...p, type: 'Kustom', path: `/p/${p.slug}` }));
    return [...builtIn, ...custom].sort((a, b) => a.title.localeCompare(b.title));
  }, [customPages]);

  const filteredPages = allPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getEditPath = (page: CombinedPage) => {
      if (page.type === 'Kustom') {
          return `/dashboard/pages/edit/${page.id}`;
      }
      const pathMap: { [key: string]: string } = {
          '/profil/profil-desa': '/dashboard/pages/profil-desa',
          '/profil/sejarah-desa': '/dashboard/pages/sejarah-desa',
          '/profil/visi-misi': '/dashboard/pages/visi-misi',
          '/profil/struktur-pemerintah': '/dashboard/pages/struktur-pemerintah',
      };
      return pathMap[page.path] || null;
  }

  const handleDelete = async () => {
      if (!pageToDelete) return;
      const result = await deleteCustomPage(pageToDelete.id);
      if (result.success) {
          toast({ title: "Halaman berhasil dihapus." });
      } else {
          toast({ title: "Gagal menghapus halaman.", variant: "destructive" });
      }
      setPageToDelete(null);
  }

  return (
    <>
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Kelola Halaman</h2>
            <p className="text-muted-foreground">
                Edit dan buat halaman statis untuk situs Anda.
            </p>
            </div>
            <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
                <Download className="h-4 w-4 mr-2" />
                Export Data
            </Button>
            <Button size="sm" asChild>
                <Link href="/dashboard/pages/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Halaman
                </Link>
            </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                <CardTitle>Daftar Halaman</CardTitle>
                <CardDescription>
                    Total halaman: {allPages.length}
                </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    placeholder="Cari halaman..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                </div>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Judul Halaman</TableHead>
                    <TableHead>Path</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">Memuat data halaman...</TableCell>
                    </TableRow>
                ) : filteredPages.length > 0 ? (
                    filteredPages.map((page) => {
                    const editPath = getEditPath(page);
                    return (
                        <TableRow key={`${page.type}-${page.id}`}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {page.type === 'Bawaan' ? <Book className="h-4 w-4 text-muted-foreground" /> : <FileIcon className="h-4 w-4 text-muted-foreground" />}
                          {page.title}
                        </TableCell>
                        <TableCell>
                            <Link href={page.path} className="text-blue-600 hover:underline" target="_blank">
                            {page.path}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge variant={page.type === 'Bawaan' ? 'secondary' : 'outline'}>{page.type}</Badge>
                        </TableCell>
                        <TableCell>
                            <span className={'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'}>
                            Published
                            </span>
                        </TableCell>
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
                                <Link href={page.path} target="_blank">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild disabled={!editPath}>
                                {editPath ? (
                                    <Link href={editPath}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Ubah Konten
                                    </Link>
                                ) : (
                                    <span>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Ubah Konten
                                    </span>
                                )}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600" 
                                  disabled={page.type !== 'Kustom'}
                                  onClick={() => page.type === 'Kustom' && setPageToDelete(page)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    );
                    })
                ) : (
                    <TableRow>
                    <TableCell colSpan={5} className="text-center">Tidak ada halaman yang cocok.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>

        <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                Tindakan ini akan menghapus halaman &quot;{pageToDelete?.title}&quot; secara permanen dan tidak dapat dibatalkan.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setPageToDelete(null)}>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
};

export default PagesPage;
