
'use server';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
