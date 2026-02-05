'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    where, 
    orderBy
} from 'firebase/firestore';

// Get a stream of workspaces for a user, including those they own and are a member of.
export const getWorkspacesStream = (userId: string, callback: (data: any[]) => void) => {
    if (!userId) {
        callback([]);
        return () => {};
    }

    let ownedWorkspaces: any[] = [];
    let memberWorkspaces: any[] = [];
    let combinedUnsub: (() => void) | null = null;

    const combineAndCallback = () => {
        const allWorkspacesMap = new Map();
        
        // Add owned and member workspaces to a map to avoid duplicates
        [...ownedWorkspaces, ...memberWorkspaces].forEach(ws => {
            if (!allWorkspacesMap.has(ws.id)) {
                allWorkspacesMap.set(ws.id, ws);
            }
        });

        const combined = Array.from(allWorkspacesMap.values());
        
        // Sort the combined list by creation date
        combined.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return b.createdAt.seconds - a.createdAt.seconds;
            }
            if (a.createdAt) return -1;
            if (b.createdAt) return 1;
            return 0;
        });

        callback(combined);
    };

    // Query for workspaces owned by the user
    const q1 = query(collection(db, "workspaces"), where("ownerUid", "==", userId));
    const unsub1 = onSnapshot(q1, (querySnapshot) => {
        ownedWorkspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        combineAndCallback();
    }, (error) => {
        console.error("Error fetching owned workspaces:", error);
    });

    // Query for workspaces where the user is a member
    const q2 = query(collection(db, "workspaces"), where("members", "array-contains", userId));
    const unsub2 = onSnapshot(q2, (querySnapshot) => {
        memberWorkspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        combineAndCallback();
    }, (error) => {
        console.error("Error fetching member workspaces:", error);
    });
    
    // Return a function that unsubscribes from both listeners
    return () => {
        unsub1();
        unsub2();
    };
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
    }, (error) => {
        console.error(`Error fetching items for workspace ${workspaceId}:`, error);
        callback([]);
    });
};

    