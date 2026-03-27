import { db, storage } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    getDoc,
    getDocs,
    writeBatch
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

export const seedDummySuratMasuk = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'surat_masuk'));
        if (!snapshot.empty) return { success: false, error: 'Data sudah ada.' };

        const batch = writeBatch(db);
        const dummyData: Omit<SuratMasukData, 'createdAt'>[] = [
            {
                nomorSurat: '001/ADM/2024',
                tanggalSurat: '2024-05-01',
                tanggalDiterima: '2024-05-02',
                pengirim: 'Kecamatan Remau',
                perihal: 'Undangan Rapat Koordinasi Bulanan',
                disposisi: 'Kasi Pemerintahan'
            },
            {
                nomorSurat: '400/123/PMD/2024',
                tanggalSurat: '2024-05-10',
                tanggalDiterima: '2024-05-12',
                pengirim: 'Dinas PMD Kabupaten',
                perihal: 'Penyaluran Dana Desa Tahap I',
                disposisi: 'Bendahara Desa'
            }
        ];

        dummyData.forEach(item => {
            const docRef = doc(collection(db, 'surat_masuk'));
            batch.set(docRef, { ...item, createdAt: serverTimestamp() });
        });

        await batch.commit();
        return { success: true, count: dummyData.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteAllSuratMasuk = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'surat_masuk'));
        if (snapshot.empty) return { success: true, count: 0 };

        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        return { success: true, count: snapshot.size };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
