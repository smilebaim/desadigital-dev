
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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
        where('ownerUid', '==', uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        // Sort on the client-side
        workspaces.sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return b.createdAt.toMillis() - a.createdAt.toMillis();
        });

        callback(workspaces);
    });

    return unsubscribe;
};

// Function to update a workspace
export const updateWorkspace = async (workspaceId: string, data: { name: string; description: string }) => {
    try {
        const workspaceRef = doc(db, 'workspaces', workspaceId);
        await updateDoc(workspaceRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error updating workspace: ", error);
        return false;
    }
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
