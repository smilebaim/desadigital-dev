'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';
import type { KegiatanData } from './kegiatan-actions';

export const getKegiatanStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "kegiatan"), orderBy("date", "desc"));
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
