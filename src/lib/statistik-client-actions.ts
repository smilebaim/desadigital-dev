'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';

export const getStatistikStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "statistik"), orderBy("group"), orderBy("title"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error("Error fetching statistik stream: ", error);
        callback([]);
    });
};
