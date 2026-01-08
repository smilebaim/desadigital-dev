'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    deleteDoc, 
    updateDoc, 
    doc, 
    query, 
    where, 
    orderBy,
    serverTimestamp,
    getDoc,
    getDocs
} from 'firebase/firestore';

// Interface for a single workspace item
export interface WorkspaceItemData {
    text: string;
    completed?: boolean;
}

// Interface for a workspace
export interface WorkspaceData {
  name: string;
  description: string;
  ownerUid: string;
  createdAt?: any;
}

// --- Workspace Actions ---

// Add a new workspace
export const addWorkspace = async (workspaceData: WorkspaceData) => {
    try {
        await addDoc(collection(db, "workspaces"), {
            ...workspaceData,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding workspace: ", error);
        return false;
    }
};

// Get a stream of workspaces for a user
export const getWorkspacesStream = (userId: string, callback: (data: any[]) => void) => {
    const q = query(
        collection(db, "workspaces"),
        where("ownerUid", "==", userId),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (querySnapshot) => {
        const workspaces = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(workspaces);
    });
};

// Get a single workspace
export const getWorkspace = async (workspaceId: string) => {
    try {
        const docRef = doc(db, 'workspaces', workspaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting workspace: ", error);
        return null;
    }
};


// Update a workspace
export const updateWorkspace = async (workspaceId: string, dataToUpdate: Partial<WorkspaceData>) => {
    try {
        const docRef = doc(db, "workspaces", workspaceId);
        await updateDoc(docRef, dataToUpdate);
        return true;
    } catch (error) {
        console.error("Error updating workspace: ", error);
        return false;
    }
};

// Delete a workspace and its items
export const deleteWorkspace = async (workspaceId: string) => {
    try {
        // First, delete all items within the workspace
        const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
        const itemsSnapshot = await getDocs(itemsCollectionRef);
        const deletePromises = itemsSnapshot.docs.map(itemDoc => deleteDoc(itemDoc.ref));
        await Promise.all(deletePromises);

        // Then, delete the workspace itself
        await deleteDoc(doc(db, "workspaces", workspaceId));
        return true;
    } catch (error) {
        console.error("Error deleting workspace: ", error);
        return false;
    }
};


// --- Workspace Item Actions ---

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

// Add an item to a workspace
export const addItem = async (workspaceId: string, itemData: WorkspaceItemData) => {
    try {
        const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
        await addDoc(itemsCollectionRef, {
            ...itemData,
            completed: false, // Default value
        });
        return true;
    } catch (error) {
        console.error("Error adding item: ", error);
        return false;
    }
};

// Update an item's completion status
export const updateItem = async (workspaceId: string, itemId: string, completed: boolean) => {
    try {
        const itemDocRef = doc(db, 'workspaces', workspaceId, 'items', itemId);
        await updateDoc(itemDocRef, { completed });
        return true;
    } catch (error) {
        console.error("Error updating item: ", error);
        return false;
    }
};

// Delete an item from a workspace
export const deleteItem = async (workspaceId: string, itemId: string) => {
    try {
        const itemDocRef = doc(db, 'workspaces', workspaceId, 'items', itemId);
        await deleteDoc(itemDocRef);
        return true;
    } catch (error) {
        console.error("Error deleting item: ", error);
        return false;
    }
};
