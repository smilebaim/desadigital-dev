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
  Baby
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

import { addSuratKelahiran, updateSuratKelahiran, deleteSuratKelahiran, type SuratKelahiranData } from "@/lib/surat-kelahiran-actions";
import { getSuratKelahiranStream } from "@/lib/surat-kelahiran-client-actions";
import { getPendudukStream } from "@/lib/penduduk-client-actions";
import type { PendudukData } from "@/lib/penduduk-actions";
import { Badge } from "@/components/ui/badge";
import { generateSuratPDF } from "@/lib/pdf-utils";
import { useTenant } from "@/contexts/TenantContext";

interface Surat extends SuratKelahiranData {
  id: string;
  createdAt: any;
}
interface Penduduk extends PendudukData {
  id: string;
}

const suratKelahiranSchema = z.object({
  pendudukId_ibu: z.string().min(1, "Ibu wajib dipilih"),
  pendudukId_ayah: z.string().min(1, "Ayah wajib dipilih"),
  namaBayi: z.string().min(1, "Nama bayi wajib diisi"),
  jenisKelaminBayi: z.enum(["Laki-laki", "Perempuan"]),
  tempatLahirBayi: z.string().min(1, "Tempat lahir wajib diisi"),
  tanggalLahirBayi: z.string().min(1, "Tanggal lahir wajib diisi"),
  waktuLahirBayi: z.string().min(1, "Waktu lahir wajib diisi"),
  namaSaksi1: z.string().min(1, "Nama saksi 1 wajib diisi"),
  namaSaksi2: z.string().min(1, "Nama saksi 2 wajib diisi"),
});

type FormValues = z.infer<typeof suratKelahiranSchema>;

const SuratKelahiranPage = () => {
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
        resolver: zodResolver(suratKelahiranSchema)
    });

    useEffect(() => {
        const unsubSurat = getSuratKelahiranStream((data) => {
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
        reset({
            pendudukId_ibu: "", pendudukId_ayah: "", namaBayi: "", jenisKelaminBayi: "Laki-laki",
            tempatLahirBayi: "", tanggalLahirBayi: "", waktuLahirBayi: "", namaSaksi1: "", namaSaksi2: ""
        });
        setIsFormOpen(true);
    };

    const openEditForm = (surat: Surat) => {
        setFormMode('edit');
        setSelectedSurat(surat);
        reset(surat);
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (surat: Surat) => {
        setSelectedSurat(surat);
        setIsDeleteOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        const ibu = pendudukList.find(p => p.id === values.pendudukId_ibu);
        const ayah = pendudukList.find(p => p.id === values.pendudukId_ayah);
        if (!ibu || !ayah) {
            toast({ title: "Data orang tua tidak ditemukan.", variant: 'destructive' });
            return;
        }

        const data: Omit<SuratKelahiranData, 'createdAt'> = {
            ...values,
            namaIbu: ibu.nama,
            nikIbu: ibu.nik,
            namaAyah: ayah.nama,
            nikAyah: ayah.nik,
            status: (formMode === 'edit' && selectedSurat) ? selectedSurat.status : 'Diproses',
            tenantId: tenantId || 'main'
        };

        let result;
        if (formMode === 'add') {
            result = await addSuratKelahiran(data);
        } else if (selectedSurat) {
            result = await updateSuratKelahiran(selectedSurat.id, data);
        }

        if (result?.success) {
            toast({ title: `Surat berhasil ${formMode === 'add' ? 'dibuat' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'membuat' : 'memperbarui'} surat.`, description: result?.error, variant: 'destructive' });
        }
    };
    
    const handleStatusChange = async (suratId: string, status: 'Selesai' | 'Ditolak') => {
        const result = await updateSuratKelahiran(suratId, { status });
        if (result.success) {
            toast({ title: `Status surat berhasil diubah menjadi ${status}.` });
        } else {
            toast({ title: "Gagal mengubah status.", variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!selectedSurat) return;
        const result = await deleteSuratKelahiran(selectedSurat.id);
        toast({ title: result.success ? "Surat berhasil dihapus." : "Gagal menghapus surat.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const filteredSurat = suratList.filter(s => 
        s.namaBayi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.namaAyah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.namaIbu.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Baby className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Surat Keterangan Kelahiran</CardTitle>
                                <CardDescription>Modul untuk mengelola permintaan dan pembuatan surat keterangan kelahiran.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari nama bayi atau orang tua..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <Button size="sm" onClick={openAddForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Buat Surat Baru
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Bayi</TableHead>
                                    <TableHead>Orang Tua</TableHead>
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
                                                <div className="font-medium">{surat.namaBayi}</div>
                                                <div className="text-sm text-muted-foreground">{new Date(surat.tanggalLahirBayi).toLocaleDateString('id-ID')}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">Ayah: {surat.namaAyah}</div>
                                                <div className="text-sm text-muted-foreground">Ibu: {surat.namaIbu}</div>
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
                                                            <DropdownMenuItem onClick={() => window.open(`/print/surat-kelahiran/${surat.id}`, '_blank')}>
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
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Buat Surat Keterangan Kelahiran' : 'Edit Surat'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                            <div className="space-y-2">
                                <Label>Nama Bayi</Label>
                                <Controller name="namaBayi" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.namaBayi && <p className="text-xs text-red-500">{errors.namaBayi.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tempat Lahir</Label>
                                    <Controller name="tempatLahirBayi" control={control} render={({ field }) => <Input {...field} />} />
                                    {errors.tempatLahirBayi && <p className="text-xs text-red-500">{errors.tempatLahirBayi.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Jenis Kelamin</Label>
                                    <Controller name="jenisKelaminBayi" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Laki-laki">Laki-laki</SelectItem><SelectItem value="Perempuan">Perempuan</SelectItem></SelectContent></Select>
                                    )} />
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tanggal Lahir</Label>
                                    <Controller name="tanggalLahirBayi" control={control} render={({ field }) => <Input type="date" {...field} />} />
                                    {errors.tanggalLahirBayi && <p className="text-xs text-red-500">{errors.tanggalLahirBayi.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Waktu Lahir</Label>
                                    <Controller name="waktuLahirBayi" control={control} render={({ field }) => <Input type="time" {...field} />} />
                                    {errors.waktuLahirBayi && <p className="text-xs text-red-500">{errors.waktuLahirBayi.message}</p>}
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Ayah</Label>
                                    <Controller name="pendudukId_ayah" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue placeholder="Pilih Ayah..." /></SelectTrigger><SelectContent>{pendudukList.filter(p=>p.jenisKelamin === "Laki-laki").map(p=><SelectItem key={p.id} value={p.id}>{p.nama}</SelectItem>)}</SelectContent></Select>
                                    )} />
                                    {errors.pendudukId_ayah && <p className="text-xs text-red-500">{errors.pendudukId_ayah.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Ibu</Label>
                                    <Controller name="pendudukId_ibu" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue placeholder="Pilih Ibu..." /></SelectTrigger><SelectContent>{pendudukList.filter(p=>p.jenisKelamin === "Perempuan").map(p=><SelectItem key={p.id} value={p.id}>{p.nama}</SelectItem>)}</SelectContent></Select>
                                    )} />
                                    {errors.pendudukId_ibu && <p className="text-xs text-red-500">{errors.pendudukId_ibu.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Saksi 1</Label>
                                    <Controller name="namaSaksi1" control={control} render={({ field }) => <Input {...field} />} />
                                    {errors.namaSaksi1 && <p className="text-xs text-red-500">{errors.namaSaksi1.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Saksi 2</Label>
                                    <Controller name="namaSaksi2" control={control} render={({ field }) => <Input {...field} />} />
                                    {errors.namaSaksi2 && <p className="text-xs text-red-500">{errors.namaSaksi2.message}</p>}
                                </div>
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

export default SuratKelahiranPage;
