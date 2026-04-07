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

export interface SuratNikahData {
    pria_pendudukId: string;
    pria_nama: string;
    pria_nik: string;
    wanita_pendudukId: string;
    wanita_nama: string;
    wanita_nik: string;
    nomorSurat?: string;
    trackingCode?: string;
    tenantId?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratNikah = async (data: Omit<SuratNikahData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_nikah'), {
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

export const updateSuratNikah = async (id: string, data: Partial<SuratNikahData>) => {
    try {
        const suratDocRef = doc(db, 'surat_nikah', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratNikah = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_nikah', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getSuratNikahById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_nikah', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratNikahData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

