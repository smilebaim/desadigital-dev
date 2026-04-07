'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy,
    where
} from 'firebase/firestore';

export const getStatistikStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "statistik"), 
            where("tenantId", "==", tenantId),
            orderBy("group"), 
            orderBy("title")
        );
    } else {
        q = query(collection(db, "statistik"), orderBy("group"), orderBy("title"));
    }
    
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
