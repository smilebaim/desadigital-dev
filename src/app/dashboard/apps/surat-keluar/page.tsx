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
  Send,
  Upload,
  Loader2,
  Download
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
import { addSuratKeluar, updateSuratKeluar, deleteSuratKeluar, type SuratKeluarData } from "@/lib/surat-keluar-actions";
import { getSuratKeluarStream } from "@/lib/surat-keluar-client-actions";

interface Surat extends SuratKeluarData {
  id: string;
  createdAt: any;
}

const suratKeluarSchema = z.object({
  nomorSurat: z.string().min(1, "Nomor surat wajib diisi"),
  tanggalSurat: z.string().min(1, "Tanggal surat wajib diisi"),
  tujuan: z.string().min(1, "Tujuan wajib diisi"),
  perihal: z.string().min(1, "Perihal wajib diisi"),
});

type FormValues = z.infer<typeof suratKeluarSchema>;

const SuratKeluarPage = () => {
    const { toast } = useToast();
    const storage = useStorage();
    const [suratList, setSuratList] = useState<Surat[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    const { control, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({
        resolver: zodResolver(suratKeluarSchema),
    });

    useEffect(() => {
        const unsubSurat = getSuratKeluarStream((data) => {
            setSuratList(data as Surat[]);
            setLoading(false);
        });
        return () => unsubSurat();
    }, []);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedSurat(null);
        reset({ nomorSurat: "", tanggalSurat: "", tujuan: "", perihal: "" });
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
                result = await addSuratKeluar(dataToSave);
            } else if (selectedSurat) {
                result = await updateSuratKeluar(selectedSurat.id, dataToSave);
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
            const storagePath = `surat_keluar/${Date.now()}-${file.name}`;
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
        const result = await deleteSuratKeluar(selectedSurat.id);
        toast({ title: result.success ? "Arsip berhasil dihapus." : "Gagal menghapus arsip.", variant: result.success ? 'default' : 'destructive' });
        setIsDeleteOpen(false);
    };

    const filteredSurat = suratList.filter(s => 
        s.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tujuan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Send className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Aplikasi Arsip Surat Keluar</CardTitle>
                                <CardDescription>Modul untuk mengelola dan mengarsipkan semua surat yang dikeluarkan oleh desa.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Cari nomor, perihal, atau tujuan..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <Button size="sm" onClick={openAddForm}>
                                <Plus className="h-4 w-4 mr-2" />
                                Arsipkan Surat
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nomor Surat</TableHead>
                                    <TableHead>Perihal</TableHead>
                                    <TableHead>Tujuan</TableHead>
                                    <TableHead>Tanggal Surat</TableHead>
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
                                            <TableCell>{surat.tujuan}</TableCell>
                                            <TableCell>{new Date(surat.tanggalSurat).toLocaleDateString('id-ID')}</TableCell>
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
                                    <TableRow><TableCell colSpan={5} className="text-center">Belum ada arsip surat keluar.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Arsipkan Surat Keluar Baru' : 'Edit Arsip Surat Keluar'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="nomorSurat">Nomor Surat</Label>
                                <Controller name="nomorSurat" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.nomorSurat && <p className="text-xs text-red-500">{errors.nomorSurat.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tanggalSurat">Tanggal Surat</Label>
                                <Controller name="tanggalSurat" control={control} render={({ field }) => <Input type="date" {...field} />} />
                                {errors.tanggalSurat && <p className="text-xs text-red-500">{errors.tanggalSurat.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tujuan">Tujuan</Label>
                                <Controller name="tujuan" control={control} render={({ field }) => <Input {...field} />} />
                                {errors.tujuan && <p className="text-xs text-red-500">{errors.tujuan.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="perihal">Perihal</Label>
                                <Controller name="perihal" control={control} render={({ field }) => <Textarea {...field} />} />
                                {errors.perihal && <p className="text-xs text-red-500">{errors.perihal.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file">Berkas Surat (PDF)</Label>
                                <Input type="file" id="file" accept=".pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
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
        </>
    );
};

export default SuratKeluarPage;
