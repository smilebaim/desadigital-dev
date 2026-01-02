
'use server';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy, deleteDoc, doc, getDocs } from 'firebase/firestore';

interface WorkspaceData {
    name: string;
    description: string;
    ownerUid: string;
}

// Function to add a new workspace
export const addWorkspace = async (workspaceData: WorkspaceData) => {
    try {
        await addDoc(collection(db, 'workspaces'), {
            ...workspaceData,
            createdAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error adding workspace: ", error);
        return false;
    }
};

// Function to get workspaces for a user in real-time
export const getWorkspacesStream = (uid: string, callback: (workspaces: any[]) => void) => {
    const q = query(
        collection(db, 'workspaces'),
        where('ownerUid', '==', uid),
        orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(workspaces);
    });

    return unsubscribe;
};


// Function to delete a workspace
export const deleteWorkspace = async (workspaceId: string) => {
    try {
        await deleteDoc(doc(db, 'workspaces', workspaceId));
        return true;
    } catch (error) {
        console.error("Error deleting workspace: ", error);
        return false;
    }
};
