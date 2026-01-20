'use client';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowLeft, Plus, MoreVertical, Edit, Trash2, Save } from 'lucide-react';
import Link from 'next/link';
import { getPemerintahan, addPemerintahan, updatePemerintahan, deletePemerintahan, type PemerintahanEntry, type PemerintahanData } from '@/lib/pemerintahan-actions';

const defaultValues: Omit<PemerintahanData, 'order'> = {
    jabatan: "",
    nama: "",
    periode: "",
};

const StrukturPemerintahControlPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<PemerintahanEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PemerintahanEntry | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getPemerintahan();
        setData(result);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedItem(null);
        setFormValues(defaultValues);
        setIsFormOpen(true);
    };

    const openEditForm = (item: PemerintahanEntry) => {
        setFormMode('edit');
        setSelectedItem(item);
        setFormValues({ jabatan: item.jabatan, nama: item.nama, periode: item.periode });
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (item: PemerintahanEntry) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        let result;

        if (formMode === 'add') {
            const newData: PemerintahanData = { ...formValues, order: data.length };
            result = await addPemerintahan(newData);
        } else if (selectedItem) {
            const updatedData: Partial<PemerintahanData> = { ...formValues };
            result = await updatePemerintahan(selectedItem.id, updatedData);
        }

        if (result?.success) {
            toast({ title: `Data berhasil ${formMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
            await fetchData();
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'menambahkan' : 'memperbarui'} data.`, description: result?.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    const handleDelete = async () => {
        if (!selectedItem) return;
        const result = await deletePemerintahan(selectedItem.id);
        if (result.success) {
            toast({ title: "Data berhasil dihapus." });
            await fetchData();
        } else {
            toast({ title: "Gagal menghapus data.", description: result.error, variant: "destructive" });
        }
        setIsDeleteOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Kontrol Halaman Struktur Pemerintahan</h2>
                        <p className="text-muted-foreground">
                            Kelola daftar aparat pemerintah desa yang ditampilkan di halaman publik.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/pages">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Daftar Halaman
                            </Link>
                        </Button>
                        <Button onClick={openAddForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Aparat
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Aparatur Desa</CardTitle>
                        <CardDescription>Total {data.length} aparat terdaftar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Jabatan</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Periode</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={4} className="text-center">Memuat data...</TableCell></TableRow>
                                ) : data.length > 0 ? (
                                    data.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.jabatan}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>{item.periode}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => openEditForm(item)}><Edit className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(item)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={4} className="text-center">Belum ada data.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Tambah Aparat Baru' : 'Edit Data Aparat'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
                        <div><Label htmlFor="jabatan">Jabatan</Label><Input id="jabatan" value={formValues.jabatan} onChange={e => setFormValues({...formValues, jabatan: e.target.value})} disabled={isSubmitting} /></div>
                        <div><Label htmlFor="nama">Nama Lengkap</Label><Input id="nama" value={formValues.nama} onChange={e => setFormValues({...formValues, nama: e.target.value})} disabled={isSubmitting} /></div>
                        <div><Label htmlFor="periode">Periode</Label><Input id="periode" value={formValues.periode} onChange={e => setFormValues({...formValues, periode: e.target.value})} placeholder="Contoh: 2020 - 2026" disabled={isSubmitting} /></div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={isSubmitting}><Save className="h-4 w-4 mr-2" />{isSubmitting ? 'Menyimpan...' : 'Simpan'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Anda yakin?</AlertDialogTitle><AlertDialogDescription>Tindakan ini akan menghapus data &quot;{selectedItem?.nama}&quot; secara permanen.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default StrukturPemerintahControlPage;
