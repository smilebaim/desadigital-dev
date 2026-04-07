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

export interface SuratKeteranganData {
    pendudukId: string;
    namaPemohon: string;
    nikPemohon: string;
    keterangan: string;
    nomorSurat?: string;
    trackingCode?: string;
    tenantId?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratKeterangan = async (data: Omit<SuratKeteranganData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_keterangan'), {
            ...data,
            tenantId: data.tenantId || 'main',
            trackingCode: generateTrackingCode(),
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateSuratKeterangan = async (id: string, data: Partial<SuratKeteranganData>) => {
    try {
        const suratDocRef = doc(db, 'surat_keterangan', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratKeterangan = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_keterangan', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getSuratKeteranganById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_keterangan', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratKeteranganData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

