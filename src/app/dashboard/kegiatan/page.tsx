'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Save,
  Calendar as CalendarIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { addKegiatan, updateKegiatan, deleteKegiatan, type KegiatanData } from "@/lib/kegiatan-actions";
import { getKegiatanStream } from "@/lib/kegiatan-client-actions";

interface Kegiatan extends KegiatanData {
  id: string;
  createdAt: any;
}

const kegiatanSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof kegiatanSchema>;

const KegiatanPage = () => {
    const { toast } = useToast();
    const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedKegiatan, setSelectedKegiatan] = useState<Kegiatan | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

    const { control, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({
        resolver: zodResolver(kegiatanSchema),
        defaultValues: { title: "", date: "", time: "", location: "", description: "" }
    });

    useEffect(() => {
        const unsub = getKegiatanStream((data) => {
            setKegiatanList(data as Kegiatan[]);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedKegiatan(null);
        reset({ title: "", date: "", time: "", location: "", description: "" });
        setIsFormOpen(true);
    };

    const openEditForm = (kegiatan: Kegiatan) => {
        setFormMode('edit');
        setSelectedKegiatan(kegiatan);
        reset(kegiatan);
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (kegiatan: Kegiatan) => {
        setSelectedKegiatan(kegiatan);
        setIsDeleteOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        let result;
        if (formMode === 'add') {
            result = await addKegiatan(values);
        } else if (selectedKegiatan) {
            result = await updateKegiatan(selectedKegiatan.id, values);
        }

        if (result?.success) {
            toast({ title: `Kegiatan berhasil ${formMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'menambahkan' : 'memperbarui'} kegiatan.`, description: result?.error, variant: 'destructive' });
        }
    };
    
    const handleDelete = async () => {
        if (!selectedKegiatan) return;
        const result = await deleteKegiatan(selectedKegiatan.id);
        toast({ title: result.success ? "Kegiatan berhasil dihapus." : "Gagal menghapus kegiatan.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const filteredKegiatan = kegiatanList.filter(k => 
        k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-4">
                                <CalendarIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <CardTitle>Agenda Kegiatan Desa</CardTitle>
                                    <CardDescription>Kelola semua jadwal acara, musyawarah, dan kegiatan desa.</CardDescription>
                                </div>
                            </div>
                          </div>
                          <Button size="sm" onClick={openAddForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Kegiatan
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari kegiatan..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Judul Kegiatan</TableHead>
                                    <TableHead>Jadwal</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Memuat data...</TableCell></TableRow>
                                ) : filteredKegiatan.length > 0 ? (
                                    filteredKegiatan.map((kegiatan) => (
                                        <TableRow key={kegiatan.id}>
                                            <TableCell className="font-medium">{kegiatan.title}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">{new Date(kegiatan.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                <div className="text-sm text-muted-foreground">{kegiatan.time} WIB</div>
                                            </TableCell>
                                            <TableCell>{kegiatan.location}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditForm(kegiatan)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(kegiatan)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={4} className="text-center">Belum ada kegiatan yang ditambahkan.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Tambah Kegiatan Baru' : 'Edit Kegiatan'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Kegiatan</Label>
                                <Controller name="title" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="date">Tanggal</Label>
                                  <Controller name="date" control={control} render={({ field }) => <Input type="date" {...field} />} />
                                  {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="time">Waktu</Label>
                                  <Controller name="time" control={control} render={({ field }) => <Input type="time" {...field} />} />
                                  {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                              </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi</Label>
                                <Controller name="location" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi (Opsional)</Label>
                                <Controller name="description" control={control} render={({ field }) => <Textarea {...field} />} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={isSubmitting}><Save className="h-4 w-4 mr-2" />{isSubmitting ? 'Menyimpan...' : 'Simpan'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
      
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini akan menghapus kegiatan secara permanen.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default KegiatanPage;
