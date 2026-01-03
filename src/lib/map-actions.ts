'use server';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

export interface MapMarker {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: string;
}

export interface MapLayerCategory {
    name: string;
    layers: string[];
    order: number;
}

// --- Marker Actions ---

// Function to add a new map marker
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

// Function to update a map marker
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

// Function to delete a map marker
export const deleteMarker = async (markerId: string) => {
    try {
        await deleteDoc(doc(db, 'mapMarkers', markerId));
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting marker: ", error);
        return { success: false, error: error.message };
    }
};


// --- Layer Category Actions ---

// No client-side stream functions here.
// You can add async server actions for categories later if needed, e.g.:
// export async function getLayerCategories() { ... }
