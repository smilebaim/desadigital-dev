'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Save, Plus, Trash2, Edit } from 'lucide-react';
import { getMapFeatures, addMapFeature, updateMapFeature, deleteMapFeature } from '@/lib/map-actions';
import type { MapFeature } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

export default function MapControlPage() {
  const { toast } = useToast();
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFeature, setCurrentFeature] = useState<Partial<MapFeature> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = getMapFeatures((data) => {
      setFeatures(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddNew = () => {
    setCurrentFeature({
      title: '',
      description: '',
      type: 'marker',
      coordinates: '',
      color: '#3388ff'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (feature: MapFeature) => {
    setCurrentFeature(feature);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus fitur ini?')) {
      try {
        await deleteMapFeature(id);
        toast({ title: 'Berhasil', description: 'Fitur peta telah dihapus.' });
      } catch (error) {
        toast({ title: 'Gagal', description: 'Gagal menghapus fitur peta.', variant: 'destructive' });
      }
    }
  };
  
  const handleSave = async () => {
    if (!currentFeature) return;

    try {
      if (currentFeature.id) {
        await updateMapFeature(currentFeature.id, currentFeature);
        toast({ title: 'Berhasil', description: 'Fitur peta telah diperbarui.' });
      } else {
        await addMapFeature(currentFeature as Omit<MapFeature, 'id'>);
        toast({ title: 'Berhasil', description: 'Fitur peta baru telah ditambahkan.' });
      }
      setIsDialogOpen(false);
      setCurrentFeature(null);
    } catch (e: any) {
      toast({
        title: 'Gagal Menyimpan',
        description: e.message || 'Terjadi kesalahan saat menyimpan.',
        variant: 'destructive',
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentFeature(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Kontrol Peta</CardTitle>
              <CardDescription>Kelola penanda dan area pada halaman Tata Ruang.</CardDescription>
            </div>
            <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Tambah Fitur</Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Memuat data peta...</p>
          ) : (
            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(feature)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(feature.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentFeature?.id ? 'Edit Fitur Peta' : 'Tambah Fitur Peta Baru'}</DialogTitle>
          </DialogHeader>
          {currentFeature && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input id="title" name="title" value={currentFeature.title || ''} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" name="description" value={currentFeature.description || ''} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="type">Tipe</Label>
                <select id="type" name="type" value={currentFeature.type || 'marker'} onChange={handleInputChange} className="w-full p-2 border rounded">
                  <option value="marker">Penanda (Marker)</option>
                  <option value="polygon">Area (Polygon)</option>
                </select>
              </div>
               <div>
                <Label htmlFor="coordinates">
                  Koordinat (Format: `lat,lng` untuk marker, `lat1,lng1;lat2,lng2;...` untuk polygon)
                </Label>
                <Textarea id="coordinates" name="coordinates" value={currentFeature.coordinates || ''} onChange={handleInputChange} rows={5}/>
              </div>
              <div>
                <Label htmlFor="color">Warna (contoh: #ff0000)</Label>
                <Input id="color" name="color" type="color" value={currentFeature.color || '#3388ff'} onChange={handleInputChange} />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
            <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
