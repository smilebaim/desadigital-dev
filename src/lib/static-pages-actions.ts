'use server';
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
    orderBy
} from 'firebase/firestore';

export interface CustomPageData {
    title: string;
    slug: string;
    content: string;
    createdAt?: any;
    updatedAt?: any;
}

export const addCustomPage = async (data: Omit<CustomPageData, 'createdAt' | 'updatedAt'>) => {
    const q = query(collection(db, "custom_pages"), where("slug", "==", data.slug));
    const existing = await getDocs(q);
    if (!existing.empty) {
        return { success: false, error: 'Slug ini sudah digunakan. Silakan gunakan slug lain.' };
    }

    try {
        await addDoc(collection(db, 'custom_pages'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getCustomPage = async (id: string) => {
    try {
        const docRef = doc(db, 'custom_pages', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data
            } as CustomPageData & { id: string };
        }
        return null;
    } catch (error) {
        console.error("Error getting custom page:", error);
        return null;
    }
};

export const getCustomPageBySlug = async (slug: string) => {
    try {
        const q = query(collection(db, 'custom_pages'), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
            } as CustomPageData & { id: string };
        }
        return null;
    } catch (error) {
        console.error("Error getting page by slug:", error);
        return null;
    }
};

export const updateCustomPage = async (id: string, data: Partial<CustomPageData>) => {
    if (data.slug) {
        const q = query(collection(db, "custom_pages"), where("slug", "==", data.slug));
        const existing = await getDocs(q);
        if (!existing.empty && existing.docs.some(d => d.id !== id)) {
            return { success: false, error: 'Slug ini sudah digunakan. Silakan gunakan slug lain.' };
        }
    }
    try {
        const docRef = doc(db, 'custom_pages', id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteCustomPage = async (id: string) => {
    try {
        await deleteDoc(doc(db, "custom_pages", id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
