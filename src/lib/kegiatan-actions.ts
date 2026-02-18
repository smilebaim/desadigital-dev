'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp
} from 'firebase/firestore';

export interface KegiatanData {
    title: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    location: string;
    description: string;
    createdAt?: any;
}

export const addKegiatan = async (data: Omit<KegiatanData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'kegiatan'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateKegiatan = async (id: string, data: Partial<KegiatanData>) => {
    try {
        const kegiatanDocRef = doc(db, 'kegiatan', id);
        await updateDoc(kegiatanDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteKegiatan = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'kegiatan', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
