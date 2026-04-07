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
  HomeIcon
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

import { addSuratDomisili, updateSuratDomisili, deleteSuratDomisili, type SuratDomisiliData } from "@/lib/surat-domisili-actions";
import { getSuratDomisiliStream } from "@/lib/surat-domisili-client-actions";
import { getPendudukStream } from "@/lib/penduduk-client-actions";
import type { PendudukData } from "@/lib/penduduk-actions";
import { Badge } from "@/components/ui/badge";
import { generateSuratPDF } from "@/lib/pdf-utils";
import { useTenant } from "@/contexts/TenantContext";

interface Surat extends SuratDomisiliData {
  id: string;
  createdAt: any;
}
interface Penduduk extends PendudukData {
  id: string;
}

const suratDomisiliSchema = z.object({
  pendudukId: z.string().min(1, "Pemohon wajib dipilih"),
  nomorSurat: z.string().optional(),
  keperluan: z.string().optional(),
  keterangan: z.string().optional(),
});

type FormValues = z.infer<typeof suratDomisiliSchema>;

const SuratDomisiliPage = () => {
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
        resolver: zodResolver(suratDomisiliSchema),
        defaultValues: { pendudukId: "", nomorSurat: "", keperluan: "", keterangan: "" }
    });

    useEffect(() => {
        const unsubSurat = getSuratDomisiliStream((data) => {
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
        reset({ pendudukId: "", nomorSurat: "", keperluan: "", keterangan: "" });
        setIsFormOpen(true);
    };

    const openEditForm = (surat: Surat) => {
        setFormMode('edit');
        setSelectedSurat(surat);
        reset({ 
            pendudukId: surat.pendudukId,
            nomorSurat: surat.nomorSurat || "",
            keperluan: surat.keperluan || "",
            keterangan: surat.keterangan || ""
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

        const data: Omit<SuratDomisiliData, 'createdAt'> = {
            ...values,
            namaPemohon: selectedPenduduk.nama,
            nikPemohon: selectedPenduduk.nik,
            status: (formMode === 'edit' && selectedSurat) ? selectedSurat.status : 'Diproses',
            tenantId: tenantId || 'main'
        };

        let result;
        if (formMode === 'add') {
            result = await addSuratDomisili(data);
        } else if (selectedSurat) {
            result = await updateSuratDomisili(selectedSurat.id, { 
                pendudukId: values.pendudukId, 
                namaPemohon: selectedPenduduk.nama, 
                nikPemohon: selectedPenduduk.nik,
                nomorSurat: values.nomorSurat,
                keperluan: values.keperluan,
                keterangan: values.keterangan
            });
        }

        if (result?.success) {
            toast({ title: `Surat berhasil ${formMode === 'add' ? 'dibuat' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'membuat' : 'memperbarui'} surat.`, description: result?.error, variant: 'destructive' });
        }
    };
    
    const handleStatusChange = async (suratId: string, status: 'Selesai' | 'Ditolak') => {
        const result = await updateSuratDomisili(suratId, { status });
        if (result.success) {
            toast({ title: `Status surat berhasil diubah menjadi ${status}.` });
        } else {
            toast({ title: "Gagal mengubah status.", variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!selectedSurat) return;
        const result = await deleteSuratDomisili(selectedSurat.id);
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
                            <HomeIcon className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Surat Keterangan Domisili</CardTitle>
                                <CardDescription>Modul untuk mengelola permintaan dan pembuatan surat keterangan domisili penduduk.</CardDescription>
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
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Memuat data...</TableCell></TableRow>
                                ) : filteredSurat.length > 0 ? (
                                    filteredSurat.map((surat) => (
                                        <TableRow key={surat.id}>
                                            <TableCell>
                                                <div className="font-medium">{surat.namaPemohon}</div>
                                                <div className="text-sm text-muted-foreground">{surat.nikPemohon}</div>
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
                                                            <DropdownMenuItem onClick={() => window.open(`/print/surat-domisili/${surat.id}`, '_blank')}>
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
                                    <TableRow><TableCell colSpan={4} className="text-center">Belum ada surat yang dibuat.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Buat Surat Keterangan Domisili' : 'Edit Permohonan'}</DialogTitle>
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
                                <Label htmlFor="nomorSurat">Nomor Surat Hukum/Registrasi (Jika sudah siap disahkan)</Label>
                                <Controller name="nomorSurat" control={control} render={({ field }) => <Input {...field} placeholder="Contoh: 140/01/DS/2026" />} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="keperluan">Keperluan Pembuatan Surat</Label>
                                <Controller name="keperluan" control={control} render={({ field }) => <Input {...field} placeholder="Cth: Mengurus Pembukaan Rekening Bank" />} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="keterangan">Keterangan Tambahan (Opsional)</Label>
                                <Controller name="keterangan" control={control} render={({ field }) => <Input {...field} placeholder="Cth: Berlaku selama 3 bulan sejak diterbitkan" />} />
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

export default SuratDomisiliPage;
