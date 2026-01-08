
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";

const initialMenuItems = [
  { id: 1, name: "Profil", type: "Sheet", order: 1, subItems: 6 },
  { id: 2, name: "Tata Ruang", type: "Link", order: 2, subItems: 0 },
  { id: 3, name: "Pembangunan", type: "Sheet", order: 3, subItems: 3 },
  { id: 4, name: "Dana Desa", type: "Sheet", order: 4, subItems: 3 },
  { id: 5, name: "Indeks", type: "Sheet", order: 5, subItems: 3 },
];

export default function Page() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kontrol BottomNav</h1>
          <p className="text-muted-foreground">Sesuaikan menu dan tampilan BottomNav di sini.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Menu Baru
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Menu Utama BottomNav</CardTitle>
          <CardDescription>
            Atur urutan dan kelola item menu utama yang muncul di navigasi bawah.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Nama Menu</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Jumlah Sub-menu</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.subItems > 0 ? `${item.subItems} item` : "-"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
