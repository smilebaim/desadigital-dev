'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy,
    where
} from 'firebase/firestore';

export const getSuratPengantarStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "surat_pengantar"), 
            where("tenantId", "==", tenantId),
            orderBy("createdAt", "desc")
        );
    } else {
        q = query(collection(db, "surat_pengantar"), orderBy("createdAt", "desc"));
    }
    
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error("Error fetching surat pengantar stream: ", error);
        callback([]);
    });
};
