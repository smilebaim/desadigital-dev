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
        where("ownerUid", "==", userId),
        orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (querySnapshot) => {
        const workspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(workspaces);
    });
};

// Get a stream of items for a workspace
export const getItemsStream = (workspaceId: string, callback: (data: any[]) => void) => {
    const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
    const q = query(itemsCollectionRef); // You can add orderBy here if needed
    
    return onSnapshot(q, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(items);
    });
};
