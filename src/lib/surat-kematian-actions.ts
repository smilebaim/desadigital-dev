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

export interface SuratKematianData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    tanggalKematian: string;
    penyebabKematian: string;
    nomorSurat?: string;
    trackingCode?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratKematian = async (data: Omit<SuratKematianData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_kematian'), {
            ...data,
            trackingCode: generateTrackingCode(),
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratKematian = async (id: string, data: Partial<SuratKematianData>) => {
    try {
        const suratDocRef = doc(db, 'surat_kematian', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratKematian = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_kematian', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getSuratKematianById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_kematian', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratKematianData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

