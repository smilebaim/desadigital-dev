
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
import { getMenus } from "@/lib/menu-actions";
import type { Menu, MenuItem } from "@/lib/menu-data";

// Manually add static pages that are not in the menu system
const staticPages: (MenuItem & {menuName?: string})[] = [
  { id: '999', title: "Profil Desa", path: "/profil/profil-desa", menuId: '0', parentId: null, order: 0, menuName: "Statis" },
  // Add other static pages here if needed
];


const PagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPages, setAllPages] = useState<(MenuItem & {menuName?: string})[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      const menusData = await getMenus();
      const pagesFromMenus = (await Promise.all(menusData.map(async (menu) => {
        // Here you might need a function that gets items for each menu
        // For now, let's assume getMenus can be adapted or another function is made.
        // This is a placeholder for fetching items. Let's assume items are not fetched here for now.
        // A better approach is to have a dedicated function getMenusWithItems.
        // Let's just create a flat list of pages from menus if available.
        return menu.items?.map(item => ({ ...item, menuName: menu.name })) || [];
      }))).flat();
      
      // This is a simplified version. A full implementation would fetch items for each menu.
      // For now, this will be empty if `getMenus` doesn't return items.
      const combinedPages = [...pagesFromMenus, ...staticPages].filter(
        (page, index, self) => index === self.findIndex((p) => p.path === page.path)
      );

      setAllPages(combinedPages);
      setLoading(false);
    }
    fetchPages();
  }, []);

  const filteredPages = allPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getEditPath = (path: string) => {
    if (path === '/profil/profil-desa') {
      return '/dashboard/pages/profil-desa';
    }
    // Add more special cases here if needed
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Halaman</h2>
          <p className="text-muted-foreground">
            Buat dan edit konten untuk setiap halaman publik
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
                Total halaman: {filteredPages.length}
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
                <TableHead>Menu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center">Memuat data halaman...</TableCell>
                  </TableRow>
              ) : (
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
                                  Edit Konten
                                </Link>
                              ) : (
                                <span>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Konten
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
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesPage;
