import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    getDocs,
    writeBatch
} from 'firebase/firestore';

// --- Marker Types and Actions ---
export interface MapMarker {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: string;
}

export const addMarker = async (data: MapMarker) => {
    try {
        await addDoc(collection(db, 'map_markers'), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateMarker = async (id: string, data: Partial<MapMarker>) => {
    try {
        await updateDoc(doc(db, 'map_markers', id), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteMarker = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'map_markers', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Seed dummy markers
export const seedDummyMarkers = async () => {
    const markersCollection = collection(db, 'map_markers');
    const snapshot = await getDocs(markersCollection);
    
    if (!snapshot.empty) {
        return { success: true, message: 'Data penanda sudah ada.' };
    }

    const batch = writeBatch(db);
    const dummyMarkers: MapMarker[] = [
        { name: 'Kantor Desa Remau Bako Tuo', description: 'Pusat pemerintahan dan pelayanan administrasi desa.', latitude: -1.222418, longitude: 104.383073, category: 'Fasilitas Umum' },
        { name: 'SD Negeri 01 Remau Bako Tuo', description: 'Sekolah Dasar Negeri utama di desa.', latitude: -1.223500, longitude: 104.384000, category: 'Pendidikan' },
        { name: 'Puskesmas Pembantu', description: 'Layanan kesehatan primer untuk warga desa.', latitude: -1.221500, longitude: 104.382000, category: 'Kesehatan' },
        { name: 'Masjid Jami Al-Ikhlas', description: 'Masjid utama desa.', latitude: -1.224000, longitude: 104.385000, category: 'Ibadah' },
        { name: 'Pasar Tradisional Desa', description: 'Pusat kegiatan ekonomi warga.', latitude: -1.220500, longitude: 104.381000, category: 'Umum' },
    ];

    dummyMarkers.forEach(marker => {
        const docRef = doc(markersCollection);
        batch.set(docRef, marker);
    });

    try {
        await batch.commit();
        return { success: true, message: 'Penanda dummy berhasil ditambahkan.' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteAllMarkers = async () => {
    try {
        const markersCollection = collection(db, 'map_markers');
        const snapshot = await getDocs(markersCollection);
        
        if (snapshot.empty) {
            return { success: true, message: 'Tidak ada data untuk dihapus.' };
        }

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        return { success: true, count: snapshot.size };
    } catch (error: any) {
        console.error("Error deleting all markers:", error);
        return { success: false, error: error.message };
    }
};


// --- Polygon Types and Actions ---
export interface MapPolygon {
    name: string;
    description: string;
    category: string;
    coordinates: string; // JSON string of LatLngTuple[]
}

export const addPolygon = async (data: MapPolygon) => {
    try {
        await addDoc(collection(db, 'map_polygons'), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updatePolygon = async (id: string, data: Partial<MapPolygon>) => {
    try {
        await updateDoc(doc(db, 'map_polygons', id), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deletePolygon = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'map_polygons', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


// --- Layer Category Types and Actions ---
export interface MapLayerCategory {
    name: string;
    layers: string[];
    order: number;
}

export const addLayerCategory = async (data: MapLayerCategory) => {
    try {
        await addDoc(collection(db, 'map_layer_categories'), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateLayerCategory = async (id: string, data: Partial<MapLayerCategory>) => {
    try {
        await updateDoc(doc(db, 'map_layer_categories', id), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteLayerCategory = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'map_layer_categories', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Seed default categories
export const seedDefaultCategories = async () => {
    const categoriesCollection = collection(db, 'map_layer_categories');
    const snapshot = await getDocs(categoriesCollection);
    
    if (!snapshot.empty) {
        return { success: true, message: 'Kategori sudah ada.' };
    }

    const batch = writeBatch(db);
    const defaultCategories: MapLayerCategory[] = [
        { name: 'Batas Wilayah', layers: ['Batas Desa', 'Batas Dusun'], order: 1 },
        { name: 'Penggunaan Lahan', layers: ['Sawah', 'Perkebunan', 'Pemukiman'], order: 2 },
        { name: 'Fasilitas Umum', layers: ['Pendidikan', 'Kesehatan', 'Ibadah'], order: 3 },
        { name: 'Infrastruktur', layers: ['Jalan', 'Jembatan', 'Irigasi'], order: 4 },
    ];

    defaultCategories.forEach(category => {
        const docRef = doc(categoriesCollection);
        batch.set(docRef, category);
    });

    try {
        await batch.commit();
        return { success: true, message: 'Kategori default berhasil ditambahkan.' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
