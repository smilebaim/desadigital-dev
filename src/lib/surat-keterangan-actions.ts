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

export interface SuratKeteranganData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    keterangan: string;
    nomorSurat?: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratKeterangan = async (data: Omit<SuratKeteranganData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_keterangan'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratKeterangan = async (id: string, data: Partial<SuratKeteranganData>) => {
    try {
        const suratDocRef = doc(db, 'surat_keterangan', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratKeterangan = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_keterangan', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
