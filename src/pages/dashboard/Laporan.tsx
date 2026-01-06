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
  Download, 
  Filter, 
  MoreVertical, 
  Eye,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Building2,
  Wallet,
  Calendar
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

const Laporan = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data untuk laporan
  const laporan = [
    {
      id: 1,
      judul: "Laporan Keuangan Bulanan",
      jenis: "Keuangan",
      periode: "Maret 2024",
      tanggal: "2024-03-31",
      pembuat: "Bendahara Desa",
      status: "Selesai",
      file: "laporan-keuangan-maret-2024.pdf"
    },
    {
      id: 2,
      judul: "Laporan Kependudukan",
      jenis: "Kependudukan",
      periode: "Triwulan 1 2024",
      tanggal: "2024-03-31",
      pembuat: "Kepala Seksi Pemerintahan",
      status: "Selesai",
      file: "laporan-kependudukan-q1-2024.pdf"
    }
  ];

  // Mock data untuk jadwal laporan
  const jadwalLaporan = [
    {
      id: 1,
      judul: "Laporan Keuangan Bulanan",
      jenis: "Keuangan",
      periode: "April 2024",
      deadline: "2024-04-30",
      pembuat: "Bendahara Desa",
      status: "Menunggu"
    },
    {
      id: 2,
      judul: "Laporan Kependudukan",
      jenis: "Kependudukan",
      periode: "Triwulan 2 2024",
      deadline: "2024-06-30",
      pembuat: "Kepala Seksi Pemerintahan",
      status: "Menunggu"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laporan Desa</h2>
          <p className="text-muted-foreground">
            Kelola dan akses laporan desa dari sini
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Semua
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              Laporan tahun 2024
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laporan Keuangan</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Laporan bulanan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laporan Kependudukan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Laporan triwulan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laporan Pembangunan</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Laporan semesteran
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Statistik Laporan</CardTitle>
            <CardDescription>
              Grafik distribusi laporan per kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Grafik akan ditampilkan di sini</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Laporan</CardTitle>
            <CardDescription>
              Laporan yang akan datang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Laporan Keuangan</p>
                  <p className="text-xs text-muted-foreground">30 April 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Laporan Kependudukan</p>
                  <p className="text-xs text-muted-foreground">15 April 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Laporan Pembangunan</p>
                  <p className="text-xs text-muted-foreground">1 Juli 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar Laporan</CardTitle>
              <CardDescription>
                Total laporan: {laporan.length} dokumen
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari laporan..."
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
                  <DropdownMenuItem>Keuangan</DropdownMenuItem>
                  <DropdownMenuItem>Kependudukan</DropdownMenuItem>
                  <DropdownMenuItem>Pembangunan</DropdownMenuItem>
                  <DropdownMenuItem>Kesehatan</DropdownMenuItem>
                  <DropdownMenuItem>Pendidikan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pembuat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laporan.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.judul}</TableCell>
                  <TableCell>{l.jenis}</TableCell>
                  <TableCell>{l.periode}</TableCell>
                  <TableCell>{l.tanggal}</TableCell>
                  <TableCell>{l.pembuat}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      l.status === 'Selesai' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {l.status}
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
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
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

export default Laporan; 