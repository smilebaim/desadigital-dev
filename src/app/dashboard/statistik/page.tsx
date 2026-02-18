'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Sparkles, Copy, Info, Trash2, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getStatistikStream } from "@/lib/statistik-client-actions";
import { seedInitialStatistik, deleteStatistik, type StatistikData } from "@/lib/statistik-actions";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Statistik extends StatistikData {
  id: string;
}

const StatistikPage = () => {
  const [stats, setStats] = useState<Statistik[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [statToDelete, setStatToDelete] = useState<Statistik | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = getStatistikStream((data) => {
      setStats(data as Statistik[]);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    const result = await seedInitialStatistik();
    if (result.success) {
      toast({ title: "Berhasil!", description: result.message });
    } else {
      toast({ title: 'Gagal', description: result.error, variant: 'destructive' });
    }
    setIsSeeding(false);
  }

  const handleDelete = async () => {
      if (!statToDelete) return;
      const result = await deleteStatistik(statToDelete.id);
      if (result.success) {
          toast({ title: "Data statistik berhasil dihapus." });
      } else {
          toast({ title: "Gagal menghapus data.", variant: "destructive", description: result.error });
      }
      setStatToDelete(null);
  }

  const handleCopy = (placeholder: string) => {
    navigator.clipboard.writeText(placeholder);
    toast({
        title: "Tersalin!",
        description: `Placeholder "${placeholder}" telah disalin ke clipboard.`,
    });
  };

  const getPlaceholder = (key: string) => {
    const keyMap: { [key: string]: string } = {
        'pendapatan_desa': '[DIAGRAM_PENDAPATAN_DESA]',
        'belanja_desa': '[DIAGRAM_BELANJA_DESA]',
        'indeks_sosial': '[INDEKS_KETAHANAN_SOSIAL]',
        'indeks_ekonomi': '[INDEKS_KETAHANAN_EKONOMI]',
        'indeks_lingkungan': '[INDEKS_KETAHANAN_LINGKUNGAN]',
        'statistik_penduduk': '[STATISTIK_PENDUDUK_CHART]',
        'statistik_pendidikan': '[STATISTIK_PENDIDIKAN_CHART]',
        'statistik_pekerjaan': '[STATISTIK_PEKERJAAN_CHART]',
        'statistik_pengunjung': '[STATISTIK_PENGUNJUNG_CHART]',
    };
    const upperKey = key.toUpperCase();
    return keyMap[key] || `[STAT_${upperKey}]`;
  };

  return (
    <>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Statistik & Visualisasi</h2>
          <p className="text-muted-foreground">
            Kelola data untuk semua diagram dan grafik yang ditampilkan di situs publik.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleSeedData} disabled={isSeeding}>
          <Sparkles className="h-4 w-4 mr-2" />
          {isSeeding ? 'Memulihkan...' : 'Pulihkan Data Bawaan'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Visualisasi Data</CardTitle>
          <CardDescription>
            Pilih item di bawah untuk mengedit datanya. Salin placeholder untuk menampilkannya di halaman kustom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Data</TableHead>
                <TableHead>Grup</TableHead>
                <TableHead>Placeholder</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Memuat data...</TableCell>
                </TableRow>
              ) : stats.length > 0 ? (
                stats.map((stat) => {
                    const placeholder = getPlaceholder(stat.key);
                    return (
                        <TableRow key={stat.id}>
                            <TableCell className="font-medium">{stat.title}</TableCell>
                            <TableCell>{stat.group}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{placeholder}</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(placeholder)}>
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Salin Placeholder</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/statistik/edit/${stat.id}`}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit Data
                                            </Link>
                                        </DropdownMenuItem>
                                         <DropdownMenuItem className="text-red-600" onClick={() => setStatToDelete(stat)}>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Hapus
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                      Belum ada data. Klik "Pulihkan Data Bawaan" untuk memulai.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {stats.length > 0 && (
         <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader className="flex flex-row items-start gap-4">
              <Info className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <CardTitle className="text-blue-900 dark:text-blue-200">Bagaimana Cara Menggunakannya?</CardTitle>
                <CardDescription className="text-blue-800 dark:text-blue-300">
                  Untuk menampilkan diagram di halaman publik:
                </CardDescription>
              </div>
          </CardHeader>
          <CardContent>
             <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Buka menu <Link href="/dashboard/pages" className="font-medium text-primary hover:underline">Kelola Halaman</Link>.</li>
                <li>Buat halaman baru atau edit halaman yang sudah ada.</li>
                <li>Salin teks `Placeholder` dari tabel di atas (contoh: `[DIAGRAM_PENDAPATAN_DESA]`).</li>
                <li>Tempelkan placeholder tersebut di dalam editor konten halaman di tempat Anda ingin diagram itu muncul.</li>
                <li>Simpan halaman, dan diagram akan otomatis ditampilkan di situs publik.</li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>

     <AlertDialog open={!!statToDelete} onOpenChange={(open) => !open && setStatToDelete(null)}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini akan menghapus data &quot;{statToDelete?.title}&quot; secara permanen. Anda bisa memulihkannya lagi dengan tombol "Pulihkan Data Bawaan".
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStatToDelete(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default StatistikPage;
