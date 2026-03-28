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

export interface SuratPengantarData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    keperluan: string;
    nomorSurat?: string;
    trackingCode?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratPengantar = async (data: Omit<SuratPengantarData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_pengantar'), {
            ...data,
            trackingCode: generateTrackingCode(),
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

export const getSuratPengantarById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_pengantar', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratPengantarData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

