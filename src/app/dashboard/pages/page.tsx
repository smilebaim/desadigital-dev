
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
import { useState, useEffect } from "react";
import Link from "next/link";
import { staticPages, type StaticPage } from "@/lib/static-pages";


const PagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPages, setAllPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we only have static content pages.
    setAllPages(staticPages);
    setLoading(false);
  }, []);

  const filteredPages = allPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getEditPath = (path: string) => {
    // This function maps a public path to its corresponding editor page in the dashboard
    if (path === '/profil/profil-desa') {
      return '/dashboard/pages/profil-desa';
    }
    // Add more special cases here if other static pages become editable
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Halaman</h2>
          <p className="text-muted-foreground">
            Edit konten untuk halaman statis yang ada di situs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Halaman
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Halaman</CardTitle>
              <CardDescription>
                Total halaman statis: {filteredPages.length}
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
                  const editPath = getEditPath(page.path);
                  return (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>
                        <Link href={page.path} className="text-blue-600 hover:underline" target="_blank">
                          {page.path}
                        </Link>
                      </TableCell>
                      <TableCell>{page.menuName || 'N/A'}</TableCell>
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
                            <DropdownMenuItem className="text-red-600" disabled>
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
                  <TableCell colSpan={5} className="text-center">Tidak ada halaman yang dapat diedit.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesPage;
