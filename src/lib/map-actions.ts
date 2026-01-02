'use server';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export interface MapMarker {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    category: string;
}

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

// Function to get map markers in real-time
export const getMarkersStream = (callback: (markers: any[]) => void) => {
    const q = query(
        collection(db, 'mapMarkers'),
        orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const markers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(markers);
    }, (error) => {
        console.error("Error getting markers stream: ", error);
    });

    return unsubscribe;
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
