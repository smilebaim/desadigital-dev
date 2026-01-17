
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

// Define a type for static pages for better type checking
interface StaticPage {
  id: string;
  title: string;
  path: string;
  menuName?: string;
}

// Manually add static pages that are not in the dynamic menu system
const staticPages: StaticPage[] = [
  // Profil
  { id: 'profil-1', title: "Profil Desa", path: "/profil/profil-desa", menuName: "Statis" },
  { id: 'profil-2', title: "Sejarah Desa", path: "/profil/sejarah-desa", menuName: "Statis" },
  { id: 'profil-3', title: "Visi & Misi", path: "/profil/visi-misi", menuName: "Statis" },
  { id: 'profil-4', title: "Struktur Pemerintahan", path: "/profil/struktur-pemerintah", menuName: "Statis" },
  { id: 'profil-5', title: "Arah Kebijakan", path: "/profil/arah-kebijakan", menuName: "Statis" },
  { id: 'profil-6', title: "Perkembangan", path: "/profil/perkembangan", menuName: "Statis" },
  
  // Pembangunan
  { id: 'pembangunan-1', title: "RPJMDes", path: "/pembangunan/rpjmdes", menuName: "Statis" },
  { id: 'pembangunan-2', title: "RKPDes", path: "/pembangunan/rkpdes", menuName: "Statis" },
  { id: 'pembangunan-3', title: "Daftar Program", path: "/pembangunan/daftar-program", menuName: "Statis" },

  // Layanan
  { id: 'layanan-1', title: "Persuratan", path: "/layanan/persuratan", menuName: "Statis" },
  { id: 'layanan-2', title: "Penanganan Keluhan", path: "/layanan/penanganan-keluhan", menuName: "Statis" },
  { id: 'layanan-3', title: "Peraturan Desa", path: "/layanan/peraturan-desa", menuName: "Statis" },
  { id: 'layanan-4', title: "Monografi Desa", path: "/layanan/monografi-desa", menuName: "Statis" },
  { id: 'layanan-5', title: "Posyandu", path: "/layanan/posyandu", menuName: "Statis" },
  { id: 'layanan-6', title: "Perlindungan Sosial", path: "/layanan/perlindungan-sosial", menuName: "Statis" },
  { id: 'layanan-7', title: "Mitra Pembangunan Desa (MPG)", path: "/layanan/mpg", menuName: "Statis" },
  
  // Kelembagaan
  { id: 'kelembagaan-1', title: "PKK", path: "/kelembagaan/pkk", menuName: "Statis" },
  { id: 'kelembagaan-2', title: "LKMD", path: "/kelembagaan/lkmd", menuName: "Statis" },

  // Ekonomi
  { id: 'ekonomi-1', title: "BUMDes", path: "/ekonomi/bumdes", menuName: "Statis" },
  { id: 'ekonomi-2', title: "UMKM", path: "/ekonomi/umkm", menuName: "Statis" },
  { id: 'ekonomi-3', title: "Koperasi", path: "/ekonomi/koperasi", menuName: "Statis" },

  // Dana Desa
  { id: 'dana-1', title: "Pendapatan", path: "/dana-desa/pendapatan", menuName: "Statis" },
  { id: 'dana-2', title: "Belanja", path: "/dana-desa/belanja", menuName: "Statis" },
  { id: 'dana-3', title: "Pembiayaan", path: "/dana-desa/pembiayaan", menuName: "Statis" },
  
  // Aktivitas
  { id: 'aktivitas-1', title: "Agenda", path: "/aktivitas/agenda", menuName: "Statis" },
  { id: 'aktivitas-2', title: "Kalender Kegiatan", path: "/aktivitas/kalender-kegiatan", menuName: "Statis" },
  { id: 'aktivitas-3', title: "Kalender Pangan", path: "/aktivitas/kalender-pangan", menuName: "Statis" },

  // Pustaka
  { id: 'pustaka-1', title: "Pustaka Desa", path: "/pustaka/pustaka-desa", menuName: "Statis" },
  { id: 'pustaka-2', title: "Publikasi", path: "/pustaka/publikasi", menuName: "Statis" },
  
  // Indeks
  { id: 'indeks-1', title: "Ketahanan Sosial", path: "/indeks/ketahanan-sosial", menuName: "Statis" },
  { id: 'indeks-2', title: "Ketahanan Ekonomi", path: "/indeks/ketahanan-ekonomi", menuName: "Statis" },
  { id: 'indeks-3', title: "Ketahanan Lingkungan", path: "/indeks/ketahanan-lingkungan", menuName: "Statis" },

  // Other
  { id: 'other-1', title: "Berita", path: "/berita", menuName: "Statis" },
  { id: 'other-2', title: "Peta Tata Ruang", path: "/tata-ruang", menuName: "Statis" },
  { id: 'other-3', title: "Pencarian", path: "/search", menuName: "Statis" },
];


const PagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPages, setAllPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we only have static content pages.
    setAllPages(staticPages);
    setLoading(false);
  }, []);

  const filteredPages = allPages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.path.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getEditPath = (path: string) => {
    // This function maps a public path to its corresponding editor page in the dashboard
    if (path === '/profil/profil-desa') {
      return '/dashboard/pages/profil-desa';
    }
    // Add more special cases here if other static pages become editable
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Halaman</h2>
          <p className="text-muted-foreground">
            Edit konten untuk halaman statis yang ada di situs.
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
                Total halaman statis: {filteredPages.length}
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
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center">Memuat data halaman...</TableCell>
                  </TableRow>
              ) : filteredPages.length > 0 ? (
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
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Tidak ada halaman yang dapat diedit.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesPage;
