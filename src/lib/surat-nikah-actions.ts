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

export interface SuratNikahData {
    pria_pendudukId: string;
    pria_nama: string;
    pria_nik: string;
    wanita_pendudukId: string;
    wanita_nama: string;
    wanita_nik: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    nomorSurat?: string;
    createdAt: any;
}

export const addSuratNikah = async (data: Omit<SuratNikahData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_nikah'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratNikah = async (id: string, data: Partial<SuratNikahData>) => {
    try {
        const suratDocRef = doc(db, 'surat_nikah', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratNikah = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_nikah', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
