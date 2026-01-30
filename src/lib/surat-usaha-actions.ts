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

export interface SuratUsahaData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    namaUsaha: string;
    jenisUsaha: string;
    alamatUsaha: string;
    nomorSurat?: string;
    status: 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratUsaha = async (data: Omit<SuratUsahaData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_usaha'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratUsaha = async (id: string, data: Partial<SuratUsahaData>) => {
    try {
        const suratDocRef = doc(db, 'surat_usaha', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratUsaha = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_usaha', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
