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
import { useState } from "react";

const Penduduk = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data untuk penduduk
  const penduduk = [
    {
      id: 1,
      nik: "1234567890123456",
      nama: "John Doe",
      jenisKelamin: "Laki-laki",
      tempatLahir: "Jakarta",
      tanggalLahir: "1990-01-01",
      alamat: "Jl. Contoh No. 123",
      rt: "001",
      rw: "002",
      agama: "Islam",
      status: "Menikah",
      pekerjaan: "Wiraswasta"
    },
    {
      id: 2,
      nik: "2345678901234567",
      nama: "Jane Smith",
      jenisKelamin: "Perempuan",
      tempatLahir: "Bandung",
      tanggalLahir: "1992-05-15",
      alamat: "Jl. Merdeka No. 45",
      rt: "002",
      rw: "003",
      agama: "Islam",
      status: "Menikah",
      pekerjaan: "Guru"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Penduduk</h2>
          <p className="text-muted-foreground">
            Kelola data penduduk desa dari sini
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Penduduk
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Penduduk</CardTitle>
              <CardDescription>
                Total penduduk: {penduduk.length} orang
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari penduduk..."
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
                  <DropdownMenuItem>Laki-laki</DropdownMenuItem>
                  <DropdownMenuItem>Perempuan</DropdownMenuItem>
                  <DropdownMenuItem>Menikah</DropdownMenuItem>
                  <DropdownMenuItem>Belum Menikah</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Tempat, Tanggal Lahir</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>RT/RW</TableHead>
                <TableHead>Agama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pekerjaan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {penduduk.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.nik}</TableCell>
                  <TableCell>{p.nama}</TableCell>
                  <TableCell>{p.jenisKelamin}</TableCell>
                  <TableCell>{p.tempatLahir}, {p.tanggalLahir}</TableCell>
                  <TableCell>{p.alamat}</TableCell>
                  <TableCell>{p.rt}/{p.rw}</TableCell>
                  <TableCell>{p.agama}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>{p.pekerjaan}</TableCell>
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
                          Detail
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

export default Penduduk; 