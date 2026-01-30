
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
  Download,
  Save
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { addPenduduk, updatePenduduk, deletePenduduk, type PendudukData } from "@/lib/penduduk-actions";
import { getPendudukStream } from "@/lib/penduduk-client-actions";

interface Penduduk extends PendudukData {
  id: string;
}

const pendudukSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  kk: z.string().length(16, "No. KK harus 16 digit"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
  tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  agama: z.string().min(1, "Agama wajib diisi"),
  pendidikan: z.string().min(1, "Pendidikan wajib diisi"),
  pekerjaan: z.string().min(1, "Pekerjaan wajib diisi"),
  statusPerkawinan: z.enum(["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"]),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  rt: z.string().min(1, "RT wajib diisi"),
  rw: z.string().min(1, "RW wajib diisi"),
});

type PendudukFormValues = z.infer<typeof pendudukSchema>;

const PendudukPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState<Penduduk[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Penduduk | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const { control, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<PendudukFormValues>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      nama: "", nik: "", kk: "", jenisKelamin: "Laki-laki", tempatLahir: "", tanggalLahir: "",
      agama: "", pendidikan: "", pekerjaan: "", statusPerkawinan: "Belum Kawin",
      alamat: "", rt: "", rw: ""
    }
  });

  useEffect(() => {
    const unsubscribe = getPendudukStream((data) => {
      setData(data as Penduduk[]);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAddForm = () => {
    setFormMode('add');
    setSelectedItem(null);
    reset({
      nama: "", nik: "", kk: "", jenisKelamin: "Laki-laki", tempatLahir: "", tanggalLahir: "",
      agama: "", pendidikan: "", pekerjaan: "", statusPerkawinan: "Belum Kawin",
      alamat: "", rt: "", rw: ""
    });
    setIsFormOpen(true);
  };

  const openEditForm = (item: Penduduk) => {
    setFormMode('edit');
    setSelectedItem(item);
    reset(item);
    setIsFormOpen(true);
  };
  
  const openDeleteDialog = (item: Penduduk) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const onSubmit = async (values: PendudukFormValues) => {
    let result;
    if (formMode === 'add') {
      result = await addPenduduk(values);
    } else if (selectedItem) {
      result = await updatePenduduk(selectedItem.id, values);
    }

    if (result?.success) {
      toast({ title: `Data penduduk berhasil ${formMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
      setIsFormOpen(false);
    } else {
      toast({ title: `Gagal ${formMode === 'add' ? 'menambahkan' : 'memperbarui'} data.`, description: result?.error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const result = await deletePenduduk(selectedItem.id);
    if (result.success) {
      toast({ title: "Data penduduk berhasil dihapus." });
    } else {
      toast({ title: "Gagal menghapus data.", description: result.error, variant: "destructive" });
    }
    setIsDeleteOpen(false);
  };

  const filteredData = data.filter(item => 
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nik.includes(searchQuery) ||
    item.kk.includes(searchQuery)
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Data Kependudukan</h2>
            <p className="text-muted-foreground">Kelola semua data penduduk desa dari sini.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm" onClick={openAddForm}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Penduduk
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Daftar Penduduk</CardTitle>
                <CardDescription>Total penduduk: {data.length}</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari nama, NIK, atau No. KK..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>NIK</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Pekerjaan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center">Memuat data...</TableCell></TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>{item.nik}</TableCell>
                      <TableCell>{item.jenisKelamin}</TableCell>
                      <TableCell>Ds. {item.alamat}, RT {item.rt}/RW {item.rw}</TableCell>
                      <TableCell>{item.pekerjaan}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditForm(item)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(item)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="text-center">Belum ada data penduduk.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Tambah Data Penduduk' : 'Edit Data Penduduk'}</DialogTitle>
            <DialogDescription>Isi semua field yang diperlukan. Klik simpan jika sudah selesai.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Controller name="nama" control={control} render={({ field }) => <Input id="nama" {...field} />} />
                  {errors.nama && <p className="text-xs text-red-500">{errors.nama.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Controller name="nik" control={control} render={({ field }) => <Input id="nik" {...field} />} />
                  {errors.nik && <p className="text-xs text-red-500">{errors.nik.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="kk">No. Kartu Keluarga</Label>
                  <Controller name="kk" control={control} render={({ field }) => <Input id="kk" {...field} />} />
                  {errors.kk && <p className="text-xs text-red-500">{errors.kk.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                    <Controller name="jenisKelamin" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="jenisKelamin"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                  <Controller name="tempatLahir" control={control} render={({ field }) => <Input id="tempatLahir" {...field} />} />
                   {errors.tempatLahir && <p className="text-xs text-red-500">{errors.tempatLahir.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                  <Controller name="tanggalLahir" control={control} render={({ field }) => <Input id="tanggalLahir" type="date" {...field} />} />
                  {errors.tanggalLahir && <p className="text-xs text-red-500">{errors.tanggalLahir.message}</p>}
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="agama">Agama</Label>
                  <Controller name="agama" control={control} render={({ field }) => <Input id="agama" {...field} />} />
                  {errors.agama && <p className="text-xs text-red-500">{errors.agama.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="pendidikan">Pendidikan Terakhir</Label>
                  <Controller name="pendidikan" control={control} render={({ field }) => <Input id="pendidikan" {...field} />} />
                  {errors.pendidikan && <p className="text-xs text-red-500">{errors.pendidikan.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="pekerjaan">Pekerjaan</Label>
                  <Controller name="pekerjaan" control={control} render={({ field }) => <Input id="pekerjaan" {...field} />} />
                  {errors.pekerjaan && <p className="text-xs text-red-500">{errors.pekerjaan.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="statusPerkawinan">Status Perkawinan</Label>
                    <Controller name="statusPerkawinan" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="statusPerkawinan"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                                <SelectItem value="Kawin">Kawin</SelectItem>
                                <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                                <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat Lengkap</Label>
                  <Controller name="alamat" control={control} render={({ field }) => <Textarea id="alamat" {...field} />} />
                  {errors.alamat && <p className="text-xs text-red-500">{errors.alamat.message}</p>}
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="rt">RT</Label>
                  <Controller name="rt" control={control} render={({ field }) => <Input id="rt" {...field} />} />
                  {errors.rt && <p className="text-xs text-red-500">{errors.rt.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="rw">RW</Label>
                  <Controller name="rw" control={control} render={({ field }) => <Input id="rw" {...field} />} />
                  {errors.rw && <p className="text-xs text-red-500">{errors.rw.message}</p>}
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
            <AlertDialogDescription>Tindakan ini akan menghapus data penduduk &quot;{selectedItem?.nama}&quot; secara permanen.</AlertDialogDescription>
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

export default PendudukPage;
