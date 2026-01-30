'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';

export const getPendudukStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "penduduk"), orderBy("nama", "asc"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error("Error fetching penduduk stream: ", error);
        callback([]);
    });
};
