
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";

const initialMenuItems = [
  { id: 1, name: "Layanan", order: 1, subItems: 5 },
  { id: 2, name: "Ekonomi", order: 2, subItems: 3 },
  { id: 3, name: "Kelembagaan", order: 3, subItems: 4 },
  { id: 4, name: "Aktivitas", order: 4, subItems: 3 },
  { id: 5, name: "Literasi", order: 5, subItems: 2 },
];

export default function Page() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kontrol TopNav</h1>
          <p className="text-muted-foreground">Sesuaikan menu dan tampilan TopNav di sini.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Menu Baru
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Menu Utama TopNav</CardTitle>
          <CardDescription>
            Atur urutan dan kelola item menu utama yang muncul di navigasi atas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Nama Menu</TableHead>
                <TableHead>Jumlah Sub-menu</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.subItems} item</TableCell>
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
