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

export interface SuratPindahData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    alamatTujuan: string;
    alasanPindah: string;
    nomorSurat?: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratPindah = async (data: Omit<SuratPindahData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_pindah'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratPindah = async (id: string, data: Partial<SuratPindahData>) => {
    try {
        const suratDocRef = doc(db, 'surat_pindah', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratPindah = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_pindah', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
