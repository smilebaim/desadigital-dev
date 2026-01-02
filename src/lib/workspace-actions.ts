
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, doc, updateDoc, deleteDoc, getDoc, orderBy } from 'firebase/firestore';

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

// Function to get a single workspace
export const getWorkspace = async (workspaceId: string) => {
    try {
        const docRef = doc(db, 'workspaces', workspaceId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting workspace: ", error);
        return null;
    }
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

// --- Workspace Items Actions ---

// Function to add a new item to a workspace
export const addItem = async (workspaceId: string, item: { text: string }) => {
    try {
        const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
        await addDoc(itemsCollectionRef, {
            ...item,
            completed: false,
            createdAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error adding item: ", error);
        return false;
    }
};

// Function to get items for a workspace in real-time
export const getItemsStream = (workspaceId: string, callback: (items: any[]) => void) => {
    const q = query(
        collection(db, 'workspaces', workspaceId, 'items'),
        orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(items);
    });

    return unsubscribe;
};

// Function to update an item's completion status
export const updateItem = async (workspaceId: string, itemId: string, completed: boolean) => {
    try {
        const itemRef = doc(db, 'workspaces', workspaceId, 'items', itemId);
        await updateDoc(itemRef, { completed });
        return true;
    } catch (error) {
        console.error("Error updating item: ", error);
        return false;
    }
};

// Function to delete an item
export const deleteItem = async (workspaceId: string, itemId: string) => {
    try {
        await deleteDoc(doc(db, 'workspaces', workspaceId, 'items', itemId));
        return true;
    } catch (error) {
        console.error("Error deleting item: ", error);
        return false;
    }
};
