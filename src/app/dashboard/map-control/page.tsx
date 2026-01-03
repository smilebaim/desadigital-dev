
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  MapPin,
  Save,
  Shapes
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
import { addMarker, updateMarker, deleteMarker, type MapMarker, addPolygon, updatePolygon, deletePolygon, type MapPolygon } from '@/lib/map-actions';
import { getMarkersStream, getPolygonsStream } from '@/lib/map-client-actions';

interface Marker extends MapMarker {
    id: string;
}

interface Polygon extends MapPolygon {
    id: string;
}

const MapControlPage = () => {
    const { toast } = useToast();
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [loading, setLoading] = useState(true);

    // Marker states
    const [isMarkerFormOpen, setIsMarkerFormOpen] = useState(false);
    const [isMarkerDeleteOpen, setIsMarkerDeleteOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [markerFormMode, setMarkerFormMode] = useState<'add' | 'edit'>('add');
    const [markerFormValues, setMarkerFormValues] = useState({ name: '', description: '', latitude: '', longitude: '', category: 'Umum' });
    
    // Polygon states
    const [isPolygonFormOpen, setIsPolygonFormOpen] = useState(false);
    const [isPolygonDeleteOpen, setIsPolygonDeleteOpen] = useState(false);
    const [selectedPolygon, setSelectedPolygon] = useState<Polygon | null>(null);
    const [polygonFormMode, setPolygonFormMode] = useState<'add' | 'edit'>('add');
    const [polygonFormValues, setPolygonFormValues] = useState({ name: '', description: '', category: 'Area', coordinates: '' });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const unsubMarkers = getMarkersStream((data) => {
            setMarkers(data as Marker[]);
            setLoading(false);
        });
        const unsubPolygons = getPolygonsStream((data) => {
            setPolygons(data as Polygon[]);
        });

        return () => {
            unsubMarkers();
            unsubPolygons();
        }
    }, []);

    // --- Marker Handlers ---
    const openAddMarkerForm = () => {
        setMarkerFormMode('add');
        setSelectedMarker(null);
        setMarkerFormValues({ name: '', description: '', latitude: '', longitude: '', category: 'Umum' });
        setIsMarkerFormOpen(true);
    };

    const openEditMarkerForm = (marker: Marker) => {
        setMarkerFormMode('edit');
        setSelectedMarker(marker);
        setMarkerFormValues({
            name: marker.name,
            description: marker.description,
            latitude: marker.latitude.toString(),
            longitude: marker.longitude.toString(),
            category: marker.category || 'Umum',
        });
        setIsMarkerFormOpen(true);
    };

    const openDeleteMarkerDialog = (marker: Marker) => {
        setSelectedMarker(marker);
        setIsMarkerDeleteOpen(true);
    };
    
    const handleMarkerFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const lat = parseFloat(markerFormValues.latitude);
        const lng = parseFloat(markerFormValues.longitude);
        if (isNaN(lat) || isNaN(lng)) {
            toast({ title: 'Koordinat tidak valid.', variant: 'destructive' });
            setIsSubmitting(false); return;
        }
        const markerData: MapMarker = { name: markerFormValues.name, description: markerFormValues.description, latitude: lat, longitude: lng, category: markerFormValues.category };
        let result;
        if (markerFormMode === 'add') result = await addMarker(markerData);
        else if (selectedMarker) result = await updateMarker(selectedMarker.id, markerData);
        if (result?.success) {
            toast({ title: `Penanda berhasil ${markerFormMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
            setIsMarkerFormOpen(false);
        } else {
            toast({ title: `Gagal ${markerFormMode === 'add' ? 'menambahkan' : 'memperbarui'} penanda.`, description: result?.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };
    
    const handleDeleteMarker = async () => {
        if (!selectedMarker) return;
        const result = await deleteMarker(selectedMarker.id);
        toast({ title: result.success ? 'Penanda berhasil dihapus.' : 'Gagal menghapus penanda.', variant: result.success ? 'default' : 'destructive' });
        setIsMarkerDeleteOpen(false);
    };

    // --- Polygon Handlers ---
    const openAddPolygonForm = () => {
        setPolygonFormMode('add');
        setSelectedPolygon(null);
        setPolygonFormValues({ name: '', description: '', category: 'Area', coordinates: '[]' });
        setIsPolygonFormOpen(true);
    };

    const openEditPolygonForm = (polygon: Polygon) => {
        setPolygonFormMode('edit');
        setSelectedPolygon(polygon);
        setPolygonFormValues({ name: polygon.name, description: polygon.description, category: polygon.category, coordinates: polygon.coordinates });
        setIsPolygonFormOpen(true);
    };

    const openDeletePolygonDialog = (polygon: Polygon) => {
        setSelectedPolygon(polygon);
        setIsPolygonDeleteOpen(true);
    };
    
    const handlePolygonFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            JSON.parse(polygonFormValues.coordinates);
        } catch (error) {
            toast({ title: 'Format JSON koordinat tidak valid.', variant: 'destructive' }); return;
        }
        setIsSubmitting(true);
        const polygonData: MapPolygon = { ...polygonFormValues };
        let result;
        if (polygonFormMode === 'add') result = await addPolygon(polygonData);
        else if (selectedPolygon) result = await updatePolygon(selectedPolygon.id, polygonData);
        if (result?.success) {
            toast({ title: `Poligon berhasil ${polygonFormMode === 'add' ? 'ditambahkan' : 'diperbarui'}.` });
            setIsPolygonFormOpen(false);
        } else {
            toast({ title: `Gagal ${polygonFormMode === 'add' ? 'menambahkan' : 'memperbarui'} poligon.`, description: result?.error, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    const handleDeletePolygon = async () => {
        if (!selectedPolygon) return;
        const result = await deletePolygon(selectedPolygon.id);
        toast({ title: result.success ? 'Poligon berhasil dihapus.' : 'Gagal menghapus poligon.', variant: result.success ? 'default' : 'destructive' });
        setIsPolygonDeleteOpen(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Kontrol Peta Interaktif</h2>
                <p className="text-muted-foreground">
                    Kelola penanda (marker) dan area (poligon) yang akan ditampilkan di peta tata ruang.
                </p>
            </div>
            <Tabs defaultValue="markers">
                <TabsList>
                    <TabsTrigger value="markers">
                        <MapPin className="h-4 w-4 mr-2"/>Penanda (Titik)
                    </TabsTrigger>
                    <TabsTrigger value="polygons">
                        <Shapes className="h-4 w-4 mr-2"/>Poligon (Area)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="markers">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>Daftar Penanda Peta</CardTitle>
                                <CardDescription>Total penanda: {markers.length}</CardDescription>
                            </div>
                            <Button size="sm" onClick={openAddMarkerForm}><Plus className="h-4 w-4 mr-2" />Tambah Penanda</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Kategori</TableHead><TableHead>Deskripsi</TableHead><TableHead>Koordinat</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {loading ? (<TableRow><TableCell colSpan={5} className="text-center">Memuat data...</TableCell></TableRow>)
                                    : markers.length > 0 ? (markers.map((marker) => (
                                        <TableRow key={marker.id}>
                                            <TableCell className="font-medium">{marker.name}</TableCell>
                                            <TableCell>{marker.category}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate">{marker.description}</TableCell>
                                            <TableCell className="text-xs">{marker.latitude.toFixed(6)}, {marker.longitude.toFixed(6)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditMarkerForm(marker)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeleteMarkerDialog(marker)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (<TableRow><TableCell colSpan={5} className="text-center">Belum ada penanda.</TableCell></TableRow>)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="polygons">
                     <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>Daftar Poligon Peta</CardTitle>
                                <CardDescription>Total poligon: {polygons.length}</CardDescription>
                            </div>
                            <Button size="sm" onClick={openAddPolygonForm}><Plus className="h-4 w-4 mr-2" />Tambah Poligon</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Kategori</TableHead><TableHead>Deskripsi</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {loading ? (<TableRow><TableCell colSpan={4} className="text-center">Memuat data...</TableCell></TableRow>)
                                    : polygons.length > 0 ? (polygons.map((polygon) => (
                                        <TableRow key={polygon.id}>
                                            <TableCell className="font-medium">{polygon.name}</TableCell>
                                            <TableCell>{polygon.category}</TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs truncate">{polygon.description}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditPolygonForm(polygon)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600" onClick={() => openDeletePolygonDialog(polygon)}><Trash2 className="h-4 w-4 mr-2" />Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (<TableRow><TableCell colSpan={4} className="text-center">Belum ada poligon.</TableCell></TableRow>)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Marker Modals */}
            <Dialog open={isMarkerFormOpen} onOpenChange={setIsMarkerFormOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{markerFormMode === 'add' ? 'Tambah Penanda Baru' : 'Edit Penanda'}</DialogTitle><DialogDescription>Isi detail untuk penanda di peta. Koordinat bisa didapatkan dari Google Maps.</DialogDescription></DialogHeader>
                    <form onSubmit={handleMarkerFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2"><Label htmlFor="name">Nama Penanda</Label><Input id="name" value={markerFormValues.name} onChange={(e) => setMarkerFormValues({...markerFormValues, name: e.target.value})} placeholder="Contoh: Kantor Desa" disabled={isSubmitting} /></div>
                            <div className="space-y-2"><Label htmlFor="category">Kategori</Label><Input id="category" value={markerFormValues.category} onChange={(e) => setMarkerFormValues({...markerFormValues, category: e.target.value})} placeholder="Contoh: Pemerintahan" disabled={isSubmitting} /></div>
                            <div className="space-y-2"><Label htmlFor="description">Deskripsi</Label><Textarea id="description" value={markerFormValues.description} onChange={(e) => setMarkerFormValues({...markerFormValues, description: e.target.value})} placeholder="Deskripsi singkat mengenai lokasi" disabled={isSubmitting} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="latitude">Latitude</Label><Input id="latitude" value={markerFormValues.latitude} onChange={(e) => setMarkerFormValues({...markerFormValues, latitude: e.target.value})} placeholder="-1.222418" disabled={isSubmitting} /></div>
                                <div className="space-y-2"><Label htmlFor="longitude">Longitude</Label><Input id="longitude" value={markerFormValues.longitude} onChange={(e) => setMarkerFormValues({...markerFormValues, longitude: e.target.value})} placeholder="104.383073" disabled={isSubmitting} /></div>
                            </div>
                        </div>
                        <DialogFooter><Button type="button" variant="outline" onClick={() => setIsMarkerFormOpen(false)}>Batal</Button><Button type="submit" disabled={isSubmitting}><Save className="h-4 w-4 mr-2" />{isSubmitting ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={isMarkerDeleteOpen} onOpenChange={setIsMarkerDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle><AlertDialogDescription>Tindakan ini akan menghapus penanda &quot;{selectedMarker?.name}&quot; secara permanen.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={handleDeleteMarker}>Hapus</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Polygon Modals */}
             <Dialog open={isPolygonFormOpen} onOpenChange={setIsPolygonFormOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader><DialogTitle>{polygonFormMode === 'add' ? 'Tambah Poligon Baru' : 'Edit Poligon'}</DialogTitle><DialogDescription>Isi detail poligon. Salin-tempel (paste) array koordinat dari Google Earth atau alat GIS lainnya.</DialogDescription></DialogHeader>
                    <form onSubmit={handlePolygonFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="polygon-name">Nama Poligon</Label><Input id="polygon-name" value={polygonFormValues.name} onChange={(e) => setPolygonFormValues({...polygonFormValues, name: e.target.value})} placeholder="Contoh: Zona Tambak" disabled={isSubmitting} /></div>
                                <div className="space-y-2"><Label htmlFor="polygon-category">Kategori</Label><Input id="polygon-category" value={polygonFormValues.category} onChange={(e) => setPolygonFormValues({...polygonFormValues, category: e.target.value})} placeholder="Contoh: Perikanan" disabled={isSubmitting} /></div>
                            </div>
                            <div className="space-y-2"><Label htmlFor="polygon-description">Deskripsi</Label><Textarea id="polygon-description" value={polygonFormValues.description} onChange={(e) => setPolygonFormValues({...polygonFormValues, description: e.target.value})} placeholder="Deskripsi singkat area" disabled={isSubmitting} /></div>
                            <div className="space-y-2"><Label htmlFor="polygon-coordinates">Koordinat Poligon (JSON)</Label><Textarea id="polygon-coordinates" value={polygonFormValues.coordinates} onChange={(e) => setPolygonFormValues({...polygonFormValues, coordinates: e.target.value})} placeholder='Contoh: [[-1.22, 104.38], [-1.23, 104.39], [-1.22, 104.39]]' disabled={isSubmitting} rows={6} /><p className="text-xs text-muted-foreground">Format: Array dari array `[latitude, longitude]`.</p></div>
                        </div>
                        <DialogFooter><Button type="button" variant="outline" onClick={() => setIsPolygonFormOpen(false)}>Batal</Button><Button type="submit" disabled={isSubmitting}><Save className="h-4 w-4 mr-2" />{isSubmitting ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
             <AlertDialog open={isPolygonDeleteOpen} onOpenChange={setIsPolygonDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle><AlertDialogDescription>Tindakan ini akan menghapus poligon &quot;{selectedPolygon?.name}&quot; secara permanen.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={handleDeletePolygon}>Hapus</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default MapControlPage;
