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
  Printer,
  Save,
  ArrowRightLeft
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { addSuratPindah, updateSuratPindah, deleteSuratPindah, type SuratPindahData } from "@/lib/surat-pindah-actions";
import { getSuratPindahStream } from "@/lib/surat-pindah-client-actions";
import { getPendudukStream } from "@/lib/penduduk-client-actions";
import type { PendudukData } from "@/lib/penduduk-actions";
import { Badge } from "@/components/ui/badge";
import { generateSuratPDF } from "@/lib/pdf-utils";

interface Surat extends SuratPindahData {
  id: string;
  createdAt: any;
}
interface Penduduk extends PendudukData {
  id: string;
}

const suratPindahSchema = z.object({
  pendudukId: z.string().min(1, "Pemohon wajib dipilih"),
  alamatTujuan: z.string().min(1, "Alamat tujuan wajib diisi"),
  alasanPindah: z.string().min(1, "Alasan pindah wajib diisi"),
});

type FormValues = z.infer<typeof suratPindahSchema>;

const SuratPindahPage = () => {
    const { toast } = useToast();
    const [suratList, setSuratList] = useState<Surat[]>([]);
    const [pendudukList, setPendudukList] = useState<Penduduk[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

    const { control, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({
        resolver: zodResolver(suratPindahSchema),
        defaultValues: { pendudukId: "", alamatTujuan: "", alasanPindah: "" }
    });

    useEffect(() => {
        const unsubSurat = getSuratPindahStream((data) => {
            setSuratList(data as Surat[]);
            setLoading(false);
        });
        const unsubPenduduk = getPendudukStream((data) => {
            setPendudukList(data as Penduduk[]);
        });
        return () => {
            unsubSurat();
            unsubPenduduk();
        };
    }, []);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedSurat(null);
        reset({ pendudukId: "", alamatTujuan: "", alasanPindah: "" });
        setIsFormOpen(true);
    };

    const openEditForm = (surat: Surat) => {
        setFormMode('edit');
        setSelectedSurat(surat);
        reset({
            pendudukId: surat.pendudukId,
            alamatTujuan: surat.alamatTujuan,
            alasanPindah: surat.alasanPindah,
        });
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (surat: Surat) => {
        setSelectedSurat(surat);
        setIsDeleteOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        const selectedPenduduk = pendudukList.find(p => p.id === values.pendudukId);
        if (!selectedPenduduk) {
            toast({ title: "Data penduduk tidak ditemukan.", variant: 'destructive' });
            return;
        }

        const data: Omit<SuratPindahData, 'createdAt'> = {
            ...values,
            namaPemohon: selectedPenduduk.nama,
            nikPemohon: selectedPenduduk.nik,
            status: 'Diproses'
        };

        let result;
        if (formMode === 'add') {
            result = await addSuratPindah(data);
        } else if (selectedSurat) {
            result = await updateSuratPindah(selectedSurat.id, data);
        }

        if (result?.success) {
            toast({ title: `Surat berhasil ${formMode === 'add' ? 'dibuat' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'membuat' : 'memperbarui'} surat.`, description: result?.error, variant: 'destructive' });
        }
    };
    
    const handleStatusChange = async (suratId: string, status: 'Selesai' | 'Ditolak') => {
        const result = await updateSuratPindah(suratId, { status });
        if (result.success) {
            toast({ title: `Status surat berhasil diubah menjadi ${status}.` });
        } else {
            toast({ title: "Gagal mengubah status.", variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!selectedSurat) return;
        const result = await deleteSuratPindah(selectedSurat.id);
        toast({ title: result.success ? "Surat berhasil dihapus." : "Gagal menghapus surat.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const filteredSurat = suratList.filter(s => 
        s.namaPemohon.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nikPemohon.includes(searchQuery)
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <ArrowRightLeft className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Surat Keterangan Pindah</CardTitle>
                                <CardDescription>Modul untuk mengelola permintaan surat keterangan pindah datang atau keluar.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari pemohon atau NIK..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <Button size="sm" onClick={openAddForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Buat Surat Baru
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Pemohon</TableHead>
                                    <TableHead>Alamat Tujuan</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center">Memuat data...</TableCell></TableRow>
                                ) : filteredSurat.length > 0 ? (
                                    filteredSurat.map((surat) => (
                                        <TableRow key={surat.id}>
                                            <TableCell>
                                                <div className="font-medium">{surat.namaPemohon}</div>
                                                <div className="text-sm text-muted-foreground">{surat.nikPemohon}</div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate">{surat.alamatTujuan}</TableCell>
                                            <TableCell>{surat.createdAt ? new Date(surat.createdAt.seconds * 1000).toLocaleDateString('id-ID') : '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={surat.status === 'Selesai' ? 'default' : surat.status === 'Ditolak' ? 'destructive' : 'secondary'}>
                                                    {surat.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {surat.status === 'Diproses' && (
                                                            <>
                                                                <DropdownMenuItem onClick={() => handleStatusChange(surat.id, 'Selesai')}>Tandai Selesai</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => handleStatusChange(surat.id, 'Ditolak')}>Tolak</DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => openEditForm(surat)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                                            </>
                                                        )}
                                                        {surat.status === 'Selesai' && (
                                                            <DropdownMenuItem onClick={() => generateSuratPDF('Surat Keterangan Pindah', surat)}>
                                                                <Printer className="h-4 w-4 mr-2" />Cetak
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(surat)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={5} className="text-center">Belum ada surat yang dibuat.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Buat Surat Keterangan Pindah' : 'Edit Permohonan'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="pendudukId">Pemohon</Label>
                                <Controller name="pendudukId" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                        <SelectTrigger id="pendudukId"><SelectValue placeholder="Pilih penduduk..." /></SelectTrigger>
                                        <SelectContent>
                                            {pendudukList.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.nama} - {p.nik}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )} />
                                {errors.pendudukId && <p className="text-xs text-red-500">{errors.pendudukId.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="alamatTujuan">Alamat Tujuan</Label>
                                <Controller name="alamatTujuan" control={control} render={({ field }) => <Textarea id="alamatTujuan" {...field} />} />
                                {errors.alamatTujuan && <p className="text-xs text-red-500">{errors.alamatTujuan.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="alasanPindah">Alasan Pindah</Label>
                                <Controller name="alasanPindah" control={control} render={({ field }) => <Textarea id="alasanPindah" {...field} />} />
                                {errors.alasanPindah && <p className="text-xs text-red-500">{errors.alasanPindah.message}</p>}
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
                        <AlertDialogDescription>Tindakan ini akan menghapus surat secara permanen.</AlertDialogDescription>
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

export default SuratPindahPage;
