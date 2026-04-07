'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy,
    where
} from 'firebase/firestore';
import type { KegiatanData } from './kegiatan-actions';

export const getKegiatanStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "kegiatan"), 
            where("tenantId", "==", tenantId),
            orderBy("date", "desc")
        );
    } else {
        q = query(collection(db, "kegiatan"), orderBy("date", "desc"));
    }
    
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error("Error fetching kegiatan stream: ", error);
        callback([]);
    });
};

export type { KegiatanData };
