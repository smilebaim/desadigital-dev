'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    getDocs,
    query,
    orderBy
} from 'firebase/firestore';

const collectionRef = collection(db, 'pemerintahan');

export interface PemerintahanData {
    jabatan: string;
    nama: string;
    periode: string;
    order: number;
}

export interface PemerintahanEntry extends PemerintahanData {
    id: string;
}

// Get all entries
export const getPemerintahan = async (): Promise<PemerintahanEntry[]> => {
    try {
        const q = query(collectionRef, orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            // Seed data if the collection is empty
            const defaultData = [
                { no: 1, jabatan: "Kepala Desa", nama: "Ahmad Subarjo", periode: "2020-2026", order: 0 },
                { no: 2, jabatan: "Sekretaris Desa", nama: "Siti Aminah", periode: "2020-2026", order: 1 },
                { no: 3, jabatan: "Kaur Keuangan", nama: "Budi Santoso", periode: "2020-2026", order: 2 },
                { no: 4, jabatan: "Kaur Perencanaan", nama: "Dewi Lestari", periode: "2020-2026", order: 3 },
                { no: 5, jabatan: "Kasi Pemerintahan", nama: "Eko Prasetyo", periode: "2020-2026", order: 4 },
            ];
            for (const item of defaultData) {
                await addDoc(collectionRef, item);
            }
            const newSnapshot = await getDocs(q);
            return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PemerintahanEntry));
        }
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PemerintahanEntry));
    } catch (error) {
        console.error("Error getting pemerintahan data: ", error);
        return [];
    }
};

// Add a new entry
export const addPemerintahan = async (data: PemerintahanData) => {
    try {
        await addDoc(collectionRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Update an entry
export const updatePemerintahan = async (id: string, data: Partial<PemerintahanData>) => {
    try {
        await updateDoc(doc(db, 'pemerintahan', id), data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Delete an entry
export const deletePemerintahan = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'pemerintahan', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
