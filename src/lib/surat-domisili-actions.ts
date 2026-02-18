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

export interface SuratDomisiliData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    nomorSurat?: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratDomisili = async (data: Omit<SuratDomisiliData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_domisili'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratDomisili = async (id: string, data: Partial<SuratDomisiliData>) => {
    try {
        const suratDocRef = doc(db, 'surat_domisili', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratDomisili = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_domisili', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
