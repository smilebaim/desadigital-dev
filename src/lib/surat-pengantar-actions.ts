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

export interface SuratPengantarData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    keperluan: string;
    nomorSurat?: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratPengantar = async (data: Omit<SuratPengantarData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_pengantar'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratPengantar = async (id: string, data: Partial<SuratPengantarData>) => {
    try {
        const suratDocRef = doc(db, 'surat_pengantar', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratPengantar = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_pengantar', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
