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
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Image as ImageIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";

const BeritaDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const berita = [
    {
      id: 1,
      judul: "Peringatan HUT RI ke-79: Rangkaian Acara dan Lomba",
      kategori: "Pengumuman",
      tanggal: "2024-08-01",
      penulis: "Panitia Desa",
      status: "Published",
      views: 150,
    },
    {
      id: 2,
      judul: "Rehabilitasi Mangrove Tahap II Dimulai",
      kategori: "Berita",
      tanggal: "2024-07-28",
      penulis: "Tim Lingkungan",
      status: "Published",
      views: 98,
    },
    {
        id: 3,
        judul: "Jadwal Penyaluran Bantuan Pangan Bulan Agustus 2024",
        kategori: "Pengumuman",
        tanggal: "2024-07-25",
        penulis: "Seksi Kesra",
        status: "Published",
        views: 210,
    },
    {
        id: 4,
        judul: "BUMDes Bahari Sejahtera Luncurkan Produk Olahan Ikan Baru",
        kategori: "Berita",
        tanggal: "2024-07-20",
        penulis: "Admin",
        status: "Draft",
        views: 0,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Info & Berita</h2>
          <p className="text-muted-foreground">
            Buat dan kelola semua pengumuman dan berita desa dari sini.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Artikel Baru
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Artikel</CardTitle>
              <CardDescription>
                Total artikel: {berita.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari artikel..."
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
                <TableHead>Judul Artikel</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal Publikasi</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dilihat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {berita.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.judul}</TableCell>
                  <TableCell>
                     <span className={`px-2 py-1 rounded-full text-xs ${
                      item.kategori === 'Berita' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.kategori}
                    </span>
                  </TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.penulis}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.views}</TableCell>
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Konten
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
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
};

export default BeritaDashboardPage;
