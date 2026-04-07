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

export interface SuratKelahiranData {
    pendudukId_ibu: string;
    namaIbu: string;
    nikIbu: string;
    pendudukId_ayah: string;
    namaAyah: string;
    nikAyah: string;
    namaBayi: string;
    jenisKelaminBayi: 'Laki-laki' | 'Perempuan';
    tempatLahirBayi: string;
    tanggalLahirBayi: string;
    waktuLahirBayi: string;
    namaSaksi1: string;
    namaSaksi2: string;
    nomorSurat?: string;
    trackingCode?: string;
    tenantId?: string;
    status: 'Diajukan' | 'Diproses' | 'Selesai' | 'Ditolak';
    createdAt: any;
}

export const addSuratKelahiran = async (data: Omit<SuratKelahiranData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'surat_kelahiran'), {
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

export const updateSuratKelahiran = async (id: string, data: Partial<SuratKelahiranData>) => {
    try {
        const suratDocRef = doc(db, 'surat_kelahiran', id);
        await updateDoc(suratDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteSuratKelahiran = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'surat_kelahiran', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getSuratKelahiranById = async (id: string) => {
    try {
        const docRef = doc(db, 'surat_kelahiran', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as SuratKelahiranData & { id: string };
        }
        return null;
    } catch (error) { return null; }
};

