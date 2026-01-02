
'use client';
import { useState, useEffect } from 'react';
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
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  MapPin,
  Save
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
import { useToast } from '@/components/ui/use-toast';
import { getMarkersStream, addMarker, updateMarker, deleteMarker, type MapMarker } from '@/lib/map-actions';

interface Marker extends MapMarker {
    id: string;
}

const MapControlPage = () => {
    const { toast } = useToast();
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formValues, setFormValues] = useState({ name: '', description: '', latitude: '', longitude: '', category: 'Umum' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const unsubscribe = getMarkersStream((data) => {
            setMarkers(data as Marker[]);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openAddForm = () => {
        setFormMode('add');
        setSelectedMarker(null);
        setFormValues({ name: '', description: '', latitude: '', longitude: '', category: 'Umum' });
        setIsFormOpen(true);
    };

    const openEditForm = (marker: Marker) => {
        setFormMode('edit');
        setSelectedMarker(marker);
        setFormValues({
            name: marker.name,
            description: marker.description,
            latitude: marker.latitude.toString(),
            longitude: marker.longitude.toString(),
            category: marker.category || 'Umum',
        });
        setIsFormOpen(true);
    };

    const openDeleteDialog = (marker: Marker) => {
        setSelectedMarker(marker);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const lat = parseFloat(formValues.latitude);
        const lng = parseFloat(formValues.longitude);

        if (isNaN(lat) || isNaN(lng)) {
            toast({ title: 'Koordinat tidak valid.', variant: 'destructive' });
            setIsSubmitting(false);
            return;
        }

        const markerData: MapMarker = {
            name: formValues.name,
            description: formValues.description,
            latitude: lat,
            longitude: lng,
            category: formValues.category,
        };

        let result;
        if (formMode === 'add') {
            result = await addMarker(markerData);
        } else if (selectedMarker) {
            result = await updateMarker(selectedMarker.id, markerData);
        }

        if (result?.success) {
            toast({ title: `Penanda berhasil ${formMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
            setIsFormOpen(false);
        } else {
            toast({ title: `Gagal ${formMode === 'add' ? 'menambahkan' : 'memperbarui'} penanda.`, description: result?.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };
    
    const handleDelete = async () => {
        if (!selectedMarker) return;
        const result = await deleteMarker(selectedMarker.id);
        if (result.success) {
            toast({ title: 'Penanda berhasil dihapus.' });
        } else {
            toast({ title: 'Gagal menghapus penanda.', description: result.error, variant: 'destructive' });
        }
        setIsDeleteOpen(false);
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kontrol Peta Interaktif</h2>
                    <p className="text-muted-foreground">
                        Kelola penanda (marker) yang akan ditampilkan di peta tata ruang.
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Daftar Penanda Peta
                            </CardTitle>
                            <CardDescription>
                               Total penanda: {markers.length}
                            </CardDescription>
                        </div>
                        <Button size="sm" onClick={openAddForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Penanda Baru
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Penanda</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Koordinat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">Memuat data penanda...</TableCell>
                                    </TableRow>
                                ) : markers.length > 0 ? (
                                    markers.map((marker) => (
                                        <TableRow key={marker.id}>
                                            <TableCell className="font-medium">{marker.name}</TableCell>
                                            <TableCell>{marker.category}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate">{marker.description}</TableCell>
                                            <TableCell className="text-xs">{marker.latitude.toFixed(6)}, {marker.longitude.toFixed(6)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditForm(marker)}>
                                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(marker)}>
                                                            <Trash2 className="h-4 w-4 mr-2" /> Hapus
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">Belum ada penanda yang ditambahkan.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{formMode === 'add' ? 'Tambah Penanda Baru' : 'Edit Penanda'}</DialogTitle>
                        <DialogDescription>
                            Isi detail untuk penanda di peta. Koordinat bisa didapatkan dari Google Maps.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Penanda</Label>
                                <Input id="name" value={formValues.name} onChange={(e) => setFormValues({...formValues, name: e.target.value})} placeholder="Contoh: Kantor Desa" disabled={isSubmitting} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Input id="category" value={formValues.category} onChange={(e) => setFormValues({...formValues, category: e.target.value})} placeholder="Contoh: Pemerintahan" disabled={isSubmitting} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea id="description" value={formValues.description} onChange={(e) => setFormValues({...formValues, description: e.target.value})} placeholder="Deskripsi singkat mengenai lokasi" disabled={isSubmitting} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude (Garis Lintang)</Label>
                                    <Input id="latitude" value={formValues.latitude} onChange={(e) => setFormValues({...formValues, latitude: e.target.value})} placeholder="-1.222418" disabled={isSubmitting} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude (Garis Bujur)</Label>
                                    <Input id="longitude" value={formValues.longitude} onChange={(e) => setFormValues({...formValues, longitude: e.target.value})} placeholder="104.383073" disabled={isSubmitting} />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                <Save className="h-4 w-4 mr-2" />
                                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini akan menghapus penanda &quot;{selectedMarker?.name}&quot; secara permanen.
                        </AlertDialogDescription>
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

export default MapControlPage;
