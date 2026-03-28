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

export interface SuratUsahaData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    namaUsaha: string;
    jenisUsaha: string;
    alamatUsaha: string;
    nomorSurat?: string;
    keperluan?: string;
    keterangan?: string;
    trackingCode?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratUsaha = async (data: Omit<SuratUsahaData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_usaha'), {
            ...data,
            trackingCode: generateTrackingCode(),
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

export const getSuratUsahaById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_usaha', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratUsahaData & { id: string };
        }
        return null;
    } catch (error) {
        console.error("Error getting surat:", error);
        return null;
    }
};
