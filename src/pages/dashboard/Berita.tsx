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

const Berita = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data untuk berita
  const berita = [
    {
      id: 1,
      judul: "Pembangunan Jalan Desa Selesai",
      kategori: "Infrastruktur",
      tanggal: "2024-03-15",
      penulis: "Admin Desa",
      status: "Published",
      views: 245,
      gambar: "https://example.com/jalan.jpg"
    },
    {
      id: 2,
      judul: "Pelatihan UMKM Desa",
      kategori: "Ekonomi",
      tanggal: "2024-03-14",
      penulis: "Tim Ekonomi",
      status: "Published",
      views: 189,
      gambar: "https://example.com/umkm.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Berita</h2>
          <p className="text-muted-foreground">
            Kelola berita dan informasi desa dari sini
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Berita
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Berita</CardTitle>
              <CardDescription>
                Total berita: {berita.length} artikel
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari berita..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Semua</DropdownMenuItem>
                  <DropdownMenuItem>Infrastruktur</DropdownMenuItem>
                  <DropdownMenuItem>Kesehatan</DropdownMenuItem>
                  <DropdownMenuItem>Pendidikan</DropdownMenuItem>
                  <DropdownMenuItem>Ekonomi</DropdownMenuItem>
                  <DropdownMenuItem>Published</DropdownMenuItem>
                  <DropdownMenuItem>Draft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {berita.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{b.judul}</TableCell>
                  <TableCell>{b.kategori}</TableCell>
                  <TableCell>{b.tanggal}</TableCell>
                  <TableCell>{b.penulis}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      b.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </TableCell>
                  <TableCell>{b.views}</TableCell>
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
                          Edit
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

export default Berita; 