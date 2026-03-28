import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';
import { generateTrackingCode } from './pdf-utils';

export interface SuratPindahData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    alamatTujuan: string;
    alasanPindah: string;
    nomorSurat?: string;
    trackingCode?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratPindah = async (data: Omit<SuratPindahData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_pindah'), {
            ...data,
            trackingCode: generateTrackingCode(),
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

export const getSuratPindahById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_pindah', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratPindahData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

