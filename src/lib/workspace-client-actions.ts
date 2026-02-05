'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    where, 
    orderBy
} from 'firebase/firestore';

// Get a stream of workspaces for a user
export const getWorkspacesStream = (userId: string, callback: (data: any[]) => void) => {
    const q = query(
        collection(db, "workspaces"),
        where("ownerUid", "==", userId)
    );
    return onSnapshot(q, (querySnapshot) => {
        const workspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Sort on the client to avoid needing a composite index
        workspaces.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return b.createdAt.seconds - a.createdAt.seconds;
            }
            // Handle cases where createdAt might be null
            if (a.createdAt) return -1;
            if (b.createdAt) return 1;
            return 0;
        });

        callback(workspaces);
    });
};

// Get a stream of items for a workspace
export const getItemsStream = (workspaceId: string, callback: (data: any[]) => void) => {
    const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
    const q = query(itemsCollectionRef, orderBy("createdAt", "desc")); // Sort by creation time, newest first
    
    return onSnapshot(q, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(items);
    });
};
