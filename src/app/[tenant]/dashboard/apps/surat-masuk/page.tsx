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
  File as FileIcon,
  Save,
  Mail,
  Upload,
  Loader2,
  Download,
  Sparkles
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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useStorage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addSuratMasuk, updateSuratMasuk, deleteSuratMasuk, type SuratMasukData, seedDummySuratMasuk, deleteAllSuratMasuk } from "@/lib/surat-masuk-actions";
import { getSuratMasukStream } from "@/lib/surat-masuk-client-actions";

interface Surat extends SuratMasukData {
  id: string;
  createdAt: any;
}

const suratMasukSchema = z.object({
  nomorSurat: z.string().min(1, "Nomor surat wajib diisi"),
  tanggalSurat: z.string().min(1, "Tanggal surat wajib diisi"),
  tanggalDiterima: z.string().min(1, "Tanggal diterima wajib diisi"),
  pengirim: z.string().min(1, "Pengirim wajib diisi"),
  perihal: z.string().min(1, "Perihal wajib diisi"),
  disposisi: z.string().optional(),
});

type FormValues = z.infer<typeof suratMasukSchema>;

const SuratMasukPage = () => {
    const { toast } = useToast();
    const storage = useStorage();
    const [suratList, setSuratList] = useState<Surat[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [isSeeding, setIsSeeding] = useState(false);
    const [isDeletingAll, setIsDeletingAll] = useState(false);
    const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
    
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const { control, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({
        resolver: zodResolver(suratMasukSchema),
    });

    useEffect(() => {
        const unsubSurat = getSuratMasukStream((data) => {
            setSuratList(data as Surat[]);
            setLoading(false);
        });
        return () => unsubSurat();
    }, []);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedSurat(null);
        reset({ nomorSurat: "", tanggalSurat: "", tanggalDiterima: "", pengirim: "", perihal: "", disposisi: "" });
        setFile(null);
        setUploadProgress(null);
        setIsFormOpen(true);
    };

    const openEditForm = (surat: Surat) => {
        setFormMode('edit');
        setSelectedSurat(surat);
        reset(surat);
        setFile(null);
        setUploadProgress(null);
        setIsFormOpen(true);
    };
    
    const openDeleteDialog = (surat: Surat) => {
        setSelectedSurat(surat);
        setIsDeleteOpen(true);
    };

    const onSubmit = async (values: FormValues) => {
        if (formMode === 'add' && !file) {
            toast({ title: "File surat wajib diunggah.", variant: 'destructive' });
            return;
        }

        const handleDatabaseOp = async (fileData?: { fileUrl: string; filePath: string }) => {
            const dataToSave = { ...values, ...fileData };
            
            let result;
            if (formMode === 'add') {
                result = await addSuratMasuk(dataToSave);
            } else if (selectedSurat) {
                result = await updateSuratMasuk(selectedSurat.id, dataToSave);
            }

            if (result?.success) {
                toast({ title: `Arsip surat berhasil ${formMode === 'add' ? 'disimpan' : 'diperbarui'}.` });
                setIsFormOpen(false);
            } else {
                toast({ title: `Gagal ${formMode === 'add' ? 'menyimpan' : 'memperbarui'} arsip.`, description: result?.error, variant: 'destructive' });
            }
        };

        if (file) {
            setUploadProgress(0);
            const storagePath = `surat_masuk/${Date.now()}-${file.name}`;
            const storageRef = ref(storage, storagePath);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                (error) => {
                    console.error("Upload failed:", error);
                    toast({ title: 'Gagal mengunggah file.', variant: 'destructive' });
                    setUploadProgress(null);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await handleDatabaseOp({ fileUrl: downloadURL, filePath: storagePath });
                }
            );
        } else {
            await handleDatabaseOp();
        }
    };

    const handleDelete = async () => {
        if (!selectedSurat) return;
        const result = await deleteSuratMasuk(selectedSurat.id);
        toast({ title: result.success ? "Arsip berhasil dihapus." : "Gagal menghapus arsip.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const handleSeedData = async () => {
        setIsSeeding(true);
        const result = await seedDummySuratMasuk();
        if (result.success) {
            toast({ title: "Berhasil!", description: `${result.count} data dummy ditambahkan.` });
        } else {
            toast({ title: "Gagal", description: result.error, variant: 'destructive' });
        }
        setIsSeeding(false);
    };

    const handleDeleteAll = async () => {
        setIsDeletingAll(true);
        const result = await deleteAllSuratMasuk();
        if (result.success) {
            toast({ title: "Berhasil!", description: `Semua data arsip berhasil dihapus.` });
        } else {
            toast({ title: "Gagal", description: result.error, variant: 'destructive' });
        }
        setIsDeletingAll(false);
        setIsDeleteAllOpen(false);
    };

    const filteredSurat = suratList.filter(s => 
        s.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.pengirim.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Mail className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Arsip Surat Masuk</CardTitle>
                                <CardDescription>Modul untuk mengelola dan mengarsipkan semua surat yang diterima oleh desa.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari nomor, perihal, atau pengirim..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                                        <DropdownMenuItem onClick={handleSeedData} disabled={isSeeding || suratList.length > 0}>
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            {isSeeding ? 'Menambahkan...' : 'Input Data Dummy'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600" onClick={() => setIsDeleteAllOpen(true)} disabled={isDeletingAll || suratList.length === 0}>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            {isDeletingAll ? 'Menghapus...' : 'Hapus Semua Data'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button size="sm" onClick={openAddForm}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Arsipkan Surat
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nomor Surat</TableHead>
                                    <TableHead>Perihal</TableHead>
                                    <TableHead>Pengirim</TableHead>
                                    <TableHead>Tanggal Diterima</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={5} className="text-center">Memuat data...</TableCell></TableRow>
                                ) : filteredSurat.length > 0 ? (
                                    filteredSurat.map((surat) => (
                                        <TableRow key={surat.id}>
                                            <TableCell className="font-medium">{surat.nomorSurat}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{surat.perihal}</TableCell>
                                            <TableCell>{surat.pengirim}</TableCell>
                                            <TableCell>{new Date(surat.tanggalDiterima).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {surat.fileUrl && (
                                                            <DropdownMenuItem asChild>
                                                                <a href={surat.fileUrl} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4 mr-2" />Lihat Berkas</a>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem onClick={() => openEditForm(surat)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(surat)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={5} className="text-center">Belum ada arsip surat masuk.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Arsipkan Surat Masuk Baru' : 'Edit Arsip Surat Masuk'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
                            <div className="space-y-2">
                                <Label htmlFor="nomorSurat">Nomor Surat</Label>
                                <Controller name="nomorSurat" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.nomorSurat && <p className="text-xs text-red-500">{errors.nomorSurat.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tanggalSurat">Tanggal Surat</Label>
                                    <Controller name="tanggalSurat" control={control} render={({ field }) => <Input type="date" {...field} />} />
                                    {errors.tanggalSurat && <p className="text-xs text-red-500">{errors.tanggalSurat.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tanggalDiterima">Tanggal Diterima</Label>
                                    <Controller name="tanggalDiterima" control={control} render={({ field }) => <Input type="date" {...field} />} />
                                    {errors.tanggalDiterima && <p className="text-xs text-red-500">{errors.tanggalDiterima.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pengirim">Pengirim</Label>
                                <Controller name="pengirim" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.pengirim && <p className="text-xs text-red-500">{errors.pengirim.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="perihal">Perihal</Label>
                                <Controller name="perihal" control={control} render={({ field }) => <Textarea {...field} />} />
                                {errors.perihal && <p className="text-xs text-red-500">{errors.perihal.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="disposisi">Disposisi (Opsional)</Label>
                                <Controller name="disposisi" control={control} render={({ field }) => <Textarea {...field} placeholder="Contoh: Kasi Pemerintahan untuk ditindaklanjuti"/>} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file">Berkas Surat (PDF)</Label>
                                <Input type="file" id="file" accept=".pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                {formMode === 'add' && <p className="text-xs text-muted-foreground">Berkas wajib diunggah saat pertama kali mengarsipkan.</p>}
                                {formMode === 'edit' && selectedSurat?.fileUrl && (
                                    <p className="text-xs text-muted-foreground">Kosongkan jika tidak ingin mengganti berkas yang ada.</p>
                                )}
                            </div>
                            {uploadProgress !== null && <Progress value={uploadProgress} />}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={isSubmitting || uploadProgress !== null}><Save className="h-4 w-4 mr-2" />
                                {isSubmitting || uploadProgress !== null ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
      
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini akan menghapus arsip surat secara permanen, termasuk berkas yang diunggah.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isDeleteAllOpen} onOpenChange={setIsDeleteAllOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Semua Arsip Surat Masuk?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini akan menghapus semua {suratList.length} data arsip secara permanen. Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAll} className="bg-red-600 hover:bg-red-700">Ya, Hapus Semua</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default SuratMasukPage;
