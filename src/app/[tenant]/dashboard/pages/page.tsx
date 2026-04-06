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
  Download
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
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCustomPagesStream } from "@/lib/static-pages-client-actions";
import { deleteCustomPage, ensureInitialPages, type CustomPageData } from "@/lib/static-pages-actions";
import { useToast } from "@/components/ui/use-toast";

interface CustomPage extends CustomPageData {
  id: string;
}

const PagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageToDelete, setPageToDelete] = useState<CustomPage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const setupPages = async () => {
        setLoading(true);
        // Ensure initial pages exist, then set up the stream
        await ensureInitialPages();
        const unsubscribe = getCustomPagesStream((data) => {
          setPages(data as CustomPage[]);
          setLoading(false);
        });
        return unsubscribe;
    };

    const unsubscribePromise = setupPages();
    
    return () => {
        unsubscribePromise.then(unsub => {
            if (unsub) unsub();
        });
    };
  }, []);

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = async () => {
      if (!pageToDelete) return;
      const result = await deleteCustomPage(pageToDelete.id);
      if (result.success) {
          toast({ title: "Halaman berhasil dihapus." });
      } else {
          toast({ title: "Gagal menghapus halaman.", variant: "destructive", description: result.error });
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
                Edit, tambah, dan hapus halaman statis untuk situs Anda.
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
                    Total halaman: {pages.length}
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
                    <TableHead>Path (Slug)</TableHead>
                    <TableHead>Tanggal Dibuat</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">Memuat data halaman...</TableCell>
                    </TableRow>
                ) : filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                        <TableRow key={page.id}>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>
                            <Link href={`/${page.slug}`} className="text-blue-600 hover:underline" target="_blank">
                            /{page.slug}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {page.createdAt ? new Date(page.createdAt as string).toLocaleDateString('id-ID') : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                <Link href={`/${page.slug}`} target="_blank">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/pages/edit/${page.id}`}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Ubah Konten
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600" 
                                  onClick={() => setPageToDelete(page)}
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
                    <TableCell colSpan={4} className="text-center">Tidak ada halaman yang cocok.</TableCell>
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
