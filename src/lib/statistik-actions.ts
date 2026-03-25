import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    getDoc,
    query,
    where,
    getDocs,
    writeBatch
} from 'firebase/firestore';
import { initialStatistikTemplates } from './statistik-templates';

export interface StatistikData {
    key: string;
    title: string;
    group: string;
    data: string; // JSON String
    createdAt?: any;
    updatedAt?: any;
}

export const addStatistikByKey = async (key: string) => {
    // Check if key exists already
    const q = query(collection(db, 'statistik'), where("key", "==", key));
    const existing = await getDocs(q);
    if (!existing.empty) {
        return { success: false, error: 'Data statistik dengan kunci ini sudah ada.' };
    }

    const template = initialStatistikTemplates.find(t => t.key === key);
    if (!template) {
        return { success: false, error: 'Template data tidak ditemukan.' };
    }

    try {
        await addDoc(collection(db, 'statistik'), {
            ...template,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const addStatistik = async (data: Omit<StatistikData, 'createdAt' | 'updatedAt'>) => {
    try {
        // Check for duplicate key
        const q = query(collection(db, 'statistik'), where("key", "==", data.key));
        const existing = await getDocs(q);
        if (!existing.empty) {
            return { success: false, error: 'Kunci (key) ini sudah digunakan. Harap gunakan kunci unik.' };
        }

        await addDoc(collection(db, 'statistik'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteStatistik = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'statistik', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getStatistikByKey = async (key: string): Promise<(StatistikData & {id: string}) | null> => {
    try {
        const q = query(collection(db, 'statistik'), where("key", "==", key));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            } as StatistikData & { id: string };
        }
        return null;
    } catch (error) {
        console.error(`Error getting statistic by key ${key}:`, error);
        return null;
    }
};

export const getStatistikById = async (id: string): Promise<(StatistikData & {id: string}) | null> => {
     try {
        const docRef = doc(db, 'statistik', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            } as StatistikData & { id: string };
        }
        return null;
    } catch (error) {
        console.error(`Error getting statistic by id ${id}:`, error);
        return null;
    }
}

export const updateStatistik = async (id: string, data: { data: string }) => {
    try {
        const docRef = doc(db, 'statistik', id);
        await updateDoc(docRef, {
            data: data.data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


export const seedInitialStatistik = async () => {
    const statistikCollection = collection(db, 'statistik');
    const snapshot = await getDocs(statistikCollection);
    const existingKeys = new Set(snapshot.docs.map(doc => doc.data().key));

    const batch = writeBatch(db);
    let addedCount = 0;

    initialStatistikTemplates.forEach(stat => {
        if (!existingKeys.has(stat.key)) {
            const docRef = doc(statistikCollection);
            batch.set(docRef, { ...stat, createdAt: serverTimestamp() });
            addedCount++;
        }
    });

    if (addedCount === 0) {
        return { success: true, message: 'Semua data statistik awal sudah ada.' };
    }

    try {
        await batch.commit();
        return { success: true, message: `${addedCount} data statistik baru berhasil dibuat.` };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
