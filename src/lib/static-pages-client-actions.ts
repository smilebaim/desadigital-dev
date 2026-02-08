'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';

export const getCustomPagesStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "custom_pages"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    }, (error) => {
        console.error("Error fetching custom pages stream: ", error);
        callback([]);
    });
};
