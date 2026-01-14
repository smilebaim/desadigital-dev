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
import { getMenus } from "@/lib/menu-actions";
import type { Menu } from "@/lib/menu-data";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      const data = await getMenus();
      setMenus(data);
      setLoading(false);
    };
    fetchMenus();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Menu</h2>
          <p className="text-muted-foreground">
            Atur menu navigasi publik dari sini
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Menu
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Menu</CardTitle>
              <CardDescription>
                Total menu: {menus.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari menu..."
                  className="pl-8"
                  disabled
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Menu</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Memuat data menu...</TableCell>
                </TableRow>
              ) : menus.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Belum ada menu, hubungi developer untuk setup awal.</TableCell>
                </TableRow>
              ) : (
                menus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell className="font-medium">{menu.name}</TableCell>
                    <TableCell>{menu.description}</TableCell>
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
                            <Link href={`/dashboard/menu/${menu.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Kelola Item
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Menu
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" disabled>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus Menu
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuPage;
