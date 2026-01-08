
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Trash2, Link as LinkIcon, Eye, Copy } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const initialPages = [
  { id: 1, title: "Beranda", path: "/", status: "Published", lastModified: "2024-07-28" },
  { id: 2, title: "Profil Desa", path: "/profil/profil-desa", status: "Published", lastModified: "2024-07-28" },
  { id: 3, title: "Visi & Misi", path: "/profil/visi-misi", status: "Published", lastModified: "2024-07-27" },
  { id: 4, title: "Sejarah Desa", path: "/profil/sejarah-desa", status: "Published", lastModified: "2024-07-26" },
  { id: 5, title: "Berita", path: "/berita", status: "Published", lastModified: "2024-07-28" },
  { id: 6, title: "Tata Ruang", path: "/tata-ruang", status: "Published", lastModified: "2024-07-25" },
  { id: 7, title: "Layanan Persuratan", path: "/layanan/persuratan", status: "Published", lastModified: "2024-07-24" },
  { id: 8, title: "Kontak", path: "/kontak", status: "Draft", lastModified: "2024-07-20" },
];

export default function Page() {
  const [pages, setPages] = useState(initialPages);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Published":
        return "default";
      case "Draft":
        return "secondary";
      case "Archived":
        return "outline";
      default:
        return "destructive";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kontrol Halaman</h1>
          <p className="text-muted-foreground">Kelola semua halaman pada situs web Anda di sini.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Halaman Baru
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Semua Halaman</CardTitle>
          <CardDescription>
            Lihat, edit, atau hapus halaman yang sudah ada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Halaman</TableHead>
                <TableHead>Path URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diubah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>
                    <Link href={page.path} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
                      {page.path} <LinkIcon className="h-3 w-3" />
                    </Link>
                  </TableCell>
                  <TableCell>
                     <Badge variant={getStatusVariant(page.status) as "default" | "secondary" | "outline" | "destructive" | null | undefined}>{page.status}</Badge>
                  </TableCell>
                  <TableCell>{page.lastModified}</TableCell>
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
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Lihat Halaman</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Konten</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplikat</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
