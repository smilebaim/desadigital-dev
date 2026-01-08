'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';

// Get a stream of posts
export const getPostsStream = (callback: (data: any[]) => void) => {
    const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (querySnapshot) => {
        const posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(posts);
    });
};
