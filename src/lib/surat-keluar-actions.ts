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

export interface SuratKeluarData {
    nomorSurat: string;
    tanggalSurat: string;
    tujuan: string;
    perihal: string;
    fileUrl?: string;
    filePath?: string;
    createdAt?: any;
}

export const addSuratKeluar = async (data: Omit<SuratKeluarData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_keluar'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratKeluar = async (id: string, data: Partial<SuratKeluarData>) => {
    try {
        const suratDocRef = doc(db, 'surat_keluar', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratKeluar = async (id: string) => {
    try {
        const suratDocRef = doc(db, 'surat_keluar', id);
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
