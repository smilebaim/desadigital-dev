'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Sparkles, Copy, Info, Trash2, MoreVertical, Plus, Save } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getStatistikStream } from "@/lib/statistik-client-actions";
import { seedInitialStatistik, deleteStatistik, addStatistik, type StatistikData, deleteAllStatistik } from "@/lib/statistik-actions";
import { initialStatistikTemplates } from "@/lib/statistik-templates";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Statistik extends StatistikData {
  id: string;
  isAutomatic?: boolean;
  source?: string;
}

const automaticStats: Statistik[] = [
  {
    id: 'auto-penduduk',
    key: 'statistik_penduduk',
    title: 'Piramida Penduduk',
    group: 'Demografi',
    data: '',
    isAutomatic: true,
    source: 'Data Penduduk'
  },
  {
    id: 'auto-pendidikan',
    key: 'statistik_pendidikan',
    title: 'Diagram Tingkat Pendidikan',
    group: 'Demografi',
    data: '',
    isAutomatic: true,
    source: 'Data Penduduk'
  },
  {
    id: 'auto-pekerjaan',
    key: 'statistik_pekerjaan',
    title: 'Diagram Jenis Pekerjaan',
    group: 'Demografi',
    data: '',
    isAutomatic: true,
    source: 'Data Penduduk'
  },
  {
    id: 'auto-pengunjung',
    key: 'statistik_pengunjung',
    title: 'Grafik Pengunjung Situs',
    group: 'Lainnya',
    data: '',
    isAutomatic: true,
    source: 'Data Dummy'
  },
];


const StatistikPage = () => {
  const [stats, setStats] = useState<Statistik[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [statToDelete, setStatToDelete] = useState<Statistik | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newStat, setNewStat] = useState<Omit<StatistikData, 'createdAt' | 'updatedAt'> | null>(null);

  const [creationMode, setCreationMode] = useState<'template' | 'custom'>('template');
  const [customChartType, setCustomChartType] = useState<string>('bar');
  const [customKeyError, setCustomKeyError] = useState<string>('');

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

  const handleDeleteAll = async () => {
    setIsDeletingAll(true);
    const result = await deleteAllStatistik();
    if (result.success) {
      toast({ title: "Semua data statistik manual berhasil dihapus.", description: `${result.count} data dihapus.` });
    } else {
      toast({ title: "Gagal menghapus data.", variant: "destructive", description: result.error });
    }
    setIsDeletingAll(false);
    setIsDeleteAllOpen(false);
  }

  const handleCopy = (placeholder: string) => {
    navigator.clipboard.writeText(placeholder);
    toast({
        title: "Tersalin!",
        description: `Placeholder "${placeholder}" telah disalin ke clipboard.`,
    });
  };
  
  const handleTemplateSelect = (key: string) => {
    if (key === 'custom') {
        setCreationMode('custom');
        setNewStat({ key: '', title: '', group: 'Kustom', data: '' });
        setCustomKeyError('');
        return;
    }
    setCreationMode('template');
    if (!key || key === 'none') {
        setNewStat(null);
        return;
    }
    const template = initialStatistikTemplates.find(t => t.key === key);
    if (template) {
        setNewStat({
            key: template.key,
            title: template.title,
            group: template.group,
            data: template.data
        });
    }
  };

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStat || !newStat.title.trim() || !newStat.group.trim() || (creationMode === 'custom' && !newStat.key.trim())) {
      toast({ title: "Masih ada isian yang kosong.", variant: "destructive" });
      return;
    }

    if (creationMode === 'custom') {
        if (!/^[a-z0-9_]+$/.test(newStat.key)) {
            setCustomKeyError("Kunci hanya boleh berisi huruf kecil, angka, dan garis bawah (_).");
            return;
        }
        setCustomKeyError('');
        
        let initialData = "{}";
        if (customChartType !== 'json') {
             initialData = JSON.stringify({
                 chartType: customChartType,
                 labels: ["Kategori 1", "Kategori 2"],
                 datasets: [
                     {
                         label: "Dataset 1",
                         data: [10, 20]
                     }
                 ]
             }, null, 2);
        }
        newStat.data = initialData;
        newStat.key = newStat.key.toLowerCase();
    }

    setIsAdding(true);
    const result = await addStatistik(newStat);
    if (result.success) {
        toast({ title: "Data statistik berhasil ditambahkan." });
        setIsAddDialogOpen(false);
        setNewStat(null);
    } else {
        toast({ title: "Gagal menambahkan data.", description: result.error, variant: "destructive" });
    }
    setIsAdding(false);
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
    return keyMap[key] || `[STAT_${key.toUpperCase()}]`;
  };
  
  const allStats: Statistik[] = [...stats, ...automaticStats].sort((a, b) => {
    if (a.group < b.group) return -1;
    if (a.group > b.group) return 1;
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  const existingKeys = new Set(stats.map(s => s.key));
  const templatesToAdd = initialStatistikTemplates.filter(t => !existingKeys.has(t.key));

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
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4 mr-2" />
                        Opsi
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSeedData} disabled={isSeeding}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isSeeding ? 'Memulihkan...' : 'Pulihkan Data Bawaan'}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => setIsDeleteAllOpen(true)} disabled={isDeletingAll || stats.length === 0}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isDeletingAll ? 'Menghapus...' : 'Hapus Semua Data'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Data Manual
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Visualisasi Data</CardTitle>
          <CardDescription>
            Data "Manual" dapat diubah, sedangkan data "Otomatis" diperbarui dari sumber lain (misal: Data Penduduk).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Data</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Grup</TableHead>
                <TableHead>Placeholder</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Memuat data...</TableCell>
                </TableRow>
              ) : allStats.length > 0 ? (
                allStats.map((stat) => {
                    const placeholder = getPlaceholder(stat.key);
                    return (
                        <TableRow key={stat.id}>
                            <TableCell className="font-medium">{stat.title}</TableCell>
                             <TableCell>
                                <Badge variant={stat.isAutomatic ? "secondary" : "default"}>
                                    {stat.isAutomatic ? 'Otomatis' : 'Manual'}
                                </Badge>
                            </TableCell>
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
                                {stat.isAutomatic ? (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span tabIndex={0}>
                                            <Button variant="ghost" size="icon" disabled>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Data dihasilkan otomatis dari {stat.source}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                ) : (
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
                                )}
                            </TableCell>
                        </TableRow>
                    )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                      Belum ada data. Klik "Pulihkan Data Bawaan" atau "Tambah Data".
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
            Tindakan ini akan menghapus data &quot;{statToDelete?.title}&quot; secara permanen. Anda bisa memulihkannya lagi dengan tombol &quot;Pulihkan Data Bawaan&quot; atau menambahkannya kembali secara manual.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStatToDelete(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={isDeleteAllOpen} onOpenChange={setIsDeleteAllOpen}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Hapus Semua Data Statistik?</AlertDialogTitle>
            <AlertDialogDescription>
            Tindakan ini akan menghapus semua {stats.length} data statistik manual secara permanen. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAllOpen(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700">Ya, Hapus Semua</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        if (!open) setNewStat(null);
        setIsAddDialogOpen(open);
    }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Data Statistik Manual</DialogTitle>
            <DialogDescription>
              Pilih jenis data statistik, sesuaikan detailnya, lalu simpan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddData}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="data-type">Pilih Template Data</Label>
                <Select onValueChange={handleTemplateSelect} value={creationMode === 'custom' ? 'custom' : (newStat?.key || '')}>
                  <SelectTrigger id="data-type">
                    <SelectValue placeholder="Pilih jenis data..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom" className="font-bold text-primary">Buat Kustom (Baru)</SelectItem>
                    {templatesToAdd.length > 0 && <SelectItem value="none" disabled>--- Template Bawaan ---</SelectItem>}
                    {templatesToAdd.map(template => (
                         <SelectItem key={template.key} value={template.key}>{template.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newStat && (
                <>
                    <div className="space-y-2">
                        <Label>Kunci (Key)</Label>
                        <Input 
                            value={newStat.key} 
                            disabled={isAdding || creationMode === 'template'}
                            onChange={e => {
                                setNewStat(s => s ? {...s, key: e.target.value.toLowerCase()} : null);
                                setCustomKeyError('');
                            }}
                            placeholder="pendapatan_2026"
                        />
                        {customKeyError ? (
                            <p className="text-xs text-red-500">{customKeyError}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Kunci ini bersifat unik, hanya huruf kecil & garis bawah (_).</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stat-title">Judul Data</Label>
                        <Input 
                            id="stat-title" 
                            value={newStat.title} 
                            onChange={(e) => setNewStat(s => s ? {...s, title: e.target.value} : null)} 
                            disabled={isAdding}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stat-group">Grup</Label>
                        <Input 
                            id="stat-group" 
                            value={newStat.group} 
                            onChange={(e) => setNewStat(s => s ? {...s, group: e.target.value} : null)}
                            disabled={isAdding}
                        />
                    </div>
                    {creationMode === 'custom' && (
                        <div className="space-y-2">
                            <Label htmlFor="custom-type">Tipe Visualisasi</Label>
                            <Select value={customChartType} onValueChange={setCustomChartType}>
                                <SelectTrigger id="custom-type"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bar">Diagram Batang (Bar)</SelectItem>
                                    <SelectItem value="line">Diagram Garis (Line)</SelectItem>
                                    <SelectItem value="area">Diagram Area (Area)</SelectItem>
                                    <SelectItem value="pie">Diagram Lingkaran (Pie)</SelectItem>
                                    <SelectItem value="doughnut">Diagram Donat (Doughnut)</SelectItem>
                                    <SelectItem value="radar">Diagram Jaring (Radar)</SelectItem>
                                    <SelectItem value="json">JSON Bebas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isAdding || !newStat}>
                <Save className="h-4 w-4 mr-2" />
                {isAdding ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatistikPage;
