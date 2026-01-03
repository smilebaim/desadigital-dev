'use server';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, getDocs, where, query, writeBatch } from 'firebase/firestore';

export interface MapMarker {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: string;
}

export interface MapPolygon {
    name: string;
    description: string;
    category: string;
    coordinates: string; // JSON string of LatLngTuple[]
}

export interface MapLayerCategory {
    id?: string;
    name: string;
    layers: string[];
    order: number;
}

// --- Marker Actions ---

export const addMarker = async (markerData: MapMarker) => {
    try {
        await addDoc(collection(db, 'mapMarkers'), {
            ...markerData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error adding marker: ", error);
        return { success: false, error: error.message };
    }
};

export const updateMarker = async (markerId: string, data: Partial<MapMarker>) => {
    try {
        const markerRef = doc(db, 'mapMarkers', markerId);
        await updateDoc(markerRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating marker: ", error);
        return { success: false, error: error.message };
    }
};

export const deleteMarker = async (markerId: string) => {
    try {
        await deleteDoc(doc(db, 'mapMarkers', markerId));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting marker: ", error);
        return { success: false, error: error.message };
    }
};


// --- Polygon Actions ---

export const addPolygon = async (polygonData: MapPolygon) => {
    try {
        await addDoc(collection(db, 'mapPolygons'), {
            ...polygonData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error adding polygon: ", error);
        return { success: false, error: error.message };
    }
};

export const updatePolygon = async (polygonId: string, data: Partial<MapPolygon>) => {
    try {
        const polygonRef = doc(db, 'mapPolygons', polygonId);
        await updateDoc(polygonRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating polygon: ", error);
        return { success: false, error: error.message };
    }
};

export const deletePolygon = async (polygonId: string) => {
    try {
        await deleteDoc(doc(db, 'mapPolygons', polygonId));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting polygon: ", error);
        return { success: false, error: error.message };
    }
};


// --- Layer Category Actions ---
export const addLayerCategory = async (categoryData: Omit<MapLayerCategory, 'id'>) => {
    try {
        const q = query(collection(db, 'mapLayerCategories'), where('name', '==', categoryData.name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return { success: false, error: "Kategori dengan nama tersebut sudah ada." };
        }

        await addDoc(collection(db, 'mapLayerCategories'), {
            ...categoryData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error adding layer category: ", error);
        return { success: false, error: error.message };
    }
};

export const updateLayerCategory = async (categoryId: string, data: Partial<MapLayerCategory>) => {
    try {
        const categoryRef = doc(db, 'mapLayerCategories', categoryId);
        await updateDoc(categoryRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating layer category: ", error);
        return { success: false, error: error.message };
    }
};

export const deleteLayerCategory = async (categoryId: string) => {
    try {
        await deleteDoc(doc(db, 'mapLayerCategories', categoryId));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting layer category: ", error);
        return { success: false, error: error.message };
    }
};

export const seedDefaultCategories = async () => {
    const defaultCategories: Omit<MapLayerCategory, 'id'>[] = [
        { name: 'Batas Wilayah', layers: ['Batas Desa', 'Batas Dusun'], order: 1 },
        { name: 'Penggunaan Lahan', layers: ['Bidang Tanah', 'Area Pertanian', 'Kawasan Lindung'], order: 2 },
        { name: 'Infrastruktur', layers: ['Jalan', 'Jembatan'], order: 3 },
        { name: 'Fasilitas Umum', layers: ['Kantor Desa', 'Sekolah', 'Masjid'], order: 4 },
    ];

    try {
        const categoriesCollection = collection(db, 'mapLayerCategories');
        const existingCategoriesSnapshot = await getDocs(query(categoriesCollection));
        const existingCategoryNames = existingCategoriesSnapshot.docs.map(doc => doc.data().name);

        const batch = writeBatch(db);

        for (const category of defaultCategories) {
            if (!existingCategoryNames.includes(category.name)) {
                const newCategoryRef = doc(categoriesCollection);
                batch.set(newCategoryRef, { ...category, createdAt: serverTimestamp() });
            }
        }

        await batch.commit();
        return { success: true, message: 'Kategori default berhasil ditambahkan/diperbarui.' };
    } catch (error: any) {
        console.error("Error seeding default categories:", error);
        return { success: false, error: error.message };
    }
};
