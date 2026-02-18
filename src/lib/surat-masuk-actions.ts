'use server';
import { db, storage } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export interface SuratMasukData {
    nomorSurat: string;
    tanggalSurat: string;
    tanggalDiterima: string;
    pengirim: string;
    perihal: string;
    fileUrl?: string;
    filePath?: string;
    disposisi?: string;
    createdAt?: any;
}

export const addSuratMasuk = async (data: Omit<SuratMasukData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_masuk'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratMasuk = async (id: string, data: Partial<SuratMasukData>) => {
    try {
        const suratDocRef = doc(db, 'surat_masuk', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratMasuk = async (id: string) => {
    try {
        const suratDocRef = doc(db, 'surat_masuk', id);
        const docSnap = await getDoc(suratDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.filePath) {
                const fileRef = ref(storage, data.filePath);
                await deleteObject(fileRef).catch(err => console.warn("Gagal hapus file storage:", err));
            }
        }
        await deleteDoc(suratDocRef);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
