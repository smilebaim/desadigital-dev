'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  HeartPulse
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

import { addSuratNikah, updateSuratNikah, deleteSuratNikah, type SuratNikahData } from "@/lib/surat-nikah-actions";
import { getSuratNikahStream } from "@/lib/surat-nikah-client-actions";
import { getPendudukStream } from "@/lib/penduduk-client-actions";
import type { PendudukData } from "@/lib/penduduk-actions";
import { Badge } from "@/components/ui/badge";
import { generateSuratPDF } from "@/lib/pdf-utils";
import { useTenant } from "@/contexts/TenantContext";

interface Surat extends SuratNikahData {
  id: string;
  createdAt: any;
}
interface Penduduk extends PendudukData {
  id: string;
}

const suratNikahSchema = z.object({
  pria_pendudukId: z.string().min(1, "Calon mempelai pria wajib dipilih"),
  wanita_pendudukId: z.string().min(1, "Calon mempelai wanita wajib dipilih"),
});

type FormValues = z.infer<typeof suratNikahSchema>;

const SuratNikahPage = () => {
    const { tenantId } = useTenant();
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
        resolver: zodResolver(suratNikahSchema),
        defaultValues: { pria_pendudukId: "", wanita_pendudukId: "" }
    });

    useEffect(() => {
        const unsubSurat = getSuratNikahStream((data) => {
            setSuratList(data as Surat[]);
            setLoading(false);
        }, tenantId);
        const unsubPenduduk = getPendudukStream((data) => {
            setPendudukList(data as Penduduk[]);
        }, tenantId);
        return () => {
            unsubSurat();
            unsubPenduduk();
        };
    }, [tenantId]);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedSurat(null);
        reset({ pria_pendudukId: "", wanita_pendudukId: "" });
        setIsFormOpen(true);
    };

    const openEditForm = (surat: Surat) => {
        setFormMode('edit');
        setSelectedSurat(surat);
        reset({
            pria_pendudukId: surat.pria_pendudukId,
            wanita_pendudukId: surat.wanita_pendudukId,
        });
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (surat: Surat) => {
        setSelectedSurat(surat);
        setIsDeleteOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        const pria = pendudukList.find(p => p.id === values.pria_pendudukId);
        const wanita = pendudukList.find(p => p.id === values.wanita_pendudukId);
        
        if (!pria || !wanita) {
            toast({ title: "Data calon mempelai tidak ditemukan.", variant: 'destructive' });
            return;
        }

        const data: Omit<SuratNikahData, 'createdAt'> = {
            ...values,
            pria_nama: pria.nama,
            pria_nik: pria.nik,
            wanita_nama: wanita.nama,
            wanita_nik: wanita.nik,
            status: (formMode === 'edit' && selectedSurat) ? selectedSurat.status : 'Diproses',
            tenantId: tenantId || 'main'
        };

        let result;
        if (formMode === 'add') {
            result = await addSuratNikah(data);
        } else if (selectedSurat) {
            result = await updateSuratNikah(selectedSurat.id, data);
        }

        if (result?.success) {
            toast({ title: `Surat berhasil ${formMode === 'add' ? 'dibuat' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'membuat' : 'memperbarui'} surat.`, description: result?.error, variant: 'destructive' });
        }
    };
    
    const handleStatusChange = async (suratId: string, status: 'Selesai' | 'Ditolak') => {
        const result = await updateSuratNikah(suratId, { status });
        if (result.success) {
            toast({ title: `Status surat berhasil diubah menjadi ${status}.` });
        } else {
            toast({ title: "Gagal mengubah status.", variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!selectedSurat) return;
        const result = await deleteSuratNikah(selectedSurat.id);
        toast({ title: result.success ? "Surat berhasil dihapus." : "Gagal menghapus surat.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const filteredSurat = suratList.filter(s => 
        s.pria_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.wanita_nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <HeartPulse className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Surat Pengantar Nikah</CardTitle>
                                <CardDescription>Modul untuk mengelola permintaan surat pengantar nikah (N1, N2, N4).</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari nama mempelai..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <Button size="sm" onClick={openAddForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Buat Surat Baru
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mempelai Pria</TableHead>
                                    <TableHead>Mempelai Wanita</TableHead>
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
                                                <div className="font-medium">{surat.pria_nama}</div>
                                                <div className="text-sm text-muted-foreground">{surat.pria_nik}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{surat.wanita_nama}</div>
                                                <div className="text-sm text-muted-foreground">{surat.wanita_nik}</div>
                                            </TableCell>
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
                                                            <DropdownMenuItem onClick={() => window.open(`/print/surat-nikah/${surat.id}`, '_blank')}>
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
                        <DialogTitle>{formMode === 'add' ? 'Buat Surat Pengantar Nikah' : 'Edit Permohonan'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Calon Mempelai Pria</Label>
                                <Controller name="pria_pendudukId" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                        <SelectTrigger><SelectValue placeholder="Pilih penduduk..." /></SelectTrigger>
                                        <SelectContent>
                                            {pendudukList.filter(p => p.jenisKelamin === 'Laki-laki').map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.nama} - {p.nik}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )} />
                                {errors.pria_pendudukId && <p className="text-xs text-red-500">{errors.pria_pendudukId.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Calon Mempelai Wanita</Label>
                                <Controller name="wanita_pendudukId" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                        <SelectTrigger><SelectValue placeholder="Pilih penduduk..." /></SelectTrigger>
                                        <SelectContent>
                                            {pendudukList.filter(p => p.jenisKelamin === 'Perempuan').map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.nama} - {p.nik}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )} />
                                {errors.wanita_pendudukId && <p className="text-xs text-red-500">{errors.wanita_pendudukId.message}</p>}
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

export default SuratNikahPage;
