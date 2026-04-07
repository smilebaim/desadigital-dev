'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy,
    where
} from 'firebase/firestore';

export const getPendudukStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "penduduk"), 
            where("tenantId", "==", tenantId),
            orderBy("nama", "asc")
        );
    } else {
        q = query(collection(db, "penduduk"), orderBy("nama", "asc"));
    }
    
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
