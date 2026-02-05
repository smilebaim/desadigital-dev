'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';

export interface PendudukData {
    nik: string;
    kk: string;
    nama: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    tempatLahir: string;
    tanggalLahir: string; // Should be in YYYY-MM-DD format
    agama: string;
    pendidikan: string;
    pekerjaan: string;
    statusPerkawinan: 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati';
    alamat: string;
    rt: string;
    rw: string;
    createdAt?: any;
}

export const addPenduduk = async (data: Omit<PendudukData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'penduduk'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const addPendudukBatch = async (data: PendudukData[]) => {
    const batch = writeBatch(db);
    try {
        data.forEach(penduduk => {
            // Basic validation to ensure required fields are present
            if (penduduk.nama && penduduk.nik) {
                const docRef = doc(collection(db, 'penduduk'));
                batch.set(docRef, { ...penduduk, createdAt: serverTimestamp() });
            }
        });
        await batch.commit();
        return { success: true, count: data.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updatePenduduk = async (id: string, data: Partial<Omit<PendudukData, 'createdAt'>>) => {
    try {
        const pendudukDocRef = doc(db, 'penduduk', id);
        await updateDoc(pendudukDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deletePenduduk = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'penduduk', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
