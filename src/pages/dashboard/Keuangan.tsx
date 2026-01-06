import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText
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

const Keuangan = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data untuk transaksi keuangan
  const transaksi = [
    {
      id: 1,
      tanggal: "2024-03-15",
      jenis: "Pemasukan",
      kategori: "Pajak Bumi dan Bangunan",
      deskripsi: "Pembayaran PBB Tahap 1",
      jumlah: 25000000,
      saldo: 25000000,
      status: "Selesai"
    },
    {
      id: 2,
      tanggal: "2024-03-14",
      jenis: "Pengeluaran",
      kategori: "Infrastruktur",
      deskripsi: "Pembangunan Jalan Desa",
      jumlah: 15000000,
      saldo: 10000000,
      status: "Selesai"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Keuangan Desa</h2>
          <p className="text-muted-foreground">
            Kelola keuangan dan anggaran desa dari sini
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Laporan
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Transaksi
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 150.000.000</div>
            <p className="text-xs text-muted-foreground">
              +20% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 75.000.000</div>
            <p className="text-xs text-muted-foreground">
              +10% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 75.000.000</div>
            <p className="text-xs text-muted-foreground">
              Saldo akhir bulan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggaran Terserap</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Transaksi Keuangan</CardTitle>
              <CardDescription>
                Riwayat transaksi keuangan desa
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari transaksi..."
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
                  <DropdownMenuItem>Pemasukan</DropdownMenuItem>
                  <DropdownMenuItem>Pengeluaran</DropdownMenuItem>
                  <DropdownMenuItem>Pajak</DropdownMenuItem>
                  <DropdownMenuItem>Program</DropdownMenuItem>
                  <DropdownMenuItem>Operasional</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksi.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.tanggal}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      t.jenis === 'Pemasukan' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t.jenis}
                    </span>
                  </TableCell>
                  <TableCell>{t.kategori}</TableCell>
                  <TableCell>{t.deskripsi}</TableCell>
                  <TableCell className={t.jenis === 'Pemasukan' ? 'text-green-600' : 'text-red-600'}>
                    Rp {t.jumlah.toLocaleString()}
                  </TableCell>
                  <TableCell>Rp {t.saldo.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      t.status === 'Selesai' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t.status}
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

export default Keuangan; 