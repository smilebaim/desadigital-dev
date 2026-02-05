'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    doc, 
    serverTimestamp,
    getDoc,
    getDocs,
    arrayUnion,
    arrayRemove,
    query,
    where
} from 'firebase/firestore';

// Interface for a single workspace item
export interface WorkspaceItemData {
    title: string;
    description: string;
    label?: string;
    completed?: boolean;
    createdAt?: any;
}

// Interface for a workspace
export interface WorkspaceData {
  name: string;
  description: string;
  ownerUid: string;
  members: string[];
  createdAt?: any;
}

// --- Workspace Actions ---

// Add a new workspace
export const addWorkspace = async (workspaceData: Omit<WorkspaceData, 'members' | 'createdAt'>) => {
    try {
        await addDoc(collection(db, "workspaces"), {
            ...workspaceData,
            members: [], // Initialize with an empty members array
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding workspace: ", error);
        return false;
    }
};

// Get a single workspace with its owner and members' profiles
export const getWorkspace = async (workspaceId: string) => {
    try {
        const docRef = doc(db, 'workspaces', workspaceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const workspaceData = docSnap.data();

            // Fetch owner profile
            const ownerDoc = await getDoc(doc(db, 'users', workspaceData.ownerUid));
            const owner = ownerDoc.exists() 
                ? { id: ownerDoc.id, ...ownerDoc.data() } 
                : { id: workspaceData.ownerUid, displayName: 'Pemilik tidak dikenal', email: '' };
            
            // Fetch member profiles
            const memberIds = workspaceData.members || [];
            const memberPromises = memberIds.map(async (id: string) => {
                const userDoc = await getDoc(doc(db, 'users', id));
                if (userDoc.exists()) {
                    return { id: userDoc.id, ...userDoc.data() };
                }
                return null; // Return null for unfound members
            });
            
            const members = (await Promise.all(memberPromises)).filter(Boolean); // Filter out nulls

            return { id: docSnap.id, ...workspaceData, owner, members };
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

// --- Workspace Member Actions ---
export const addMemberToWorkspace = async (workspaceId: string, email: string) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, error: "Pengguna dengan email tersebut tidak ditemukan." };
        }

        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;

        const workspaceRef = doc(db, 'workspaces', workspaceId);
        await updateDoc(workspaceRef, {
            members: arrayUnion(userId)
        });

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const removeMemberFromWorkspace = async (workspaceId: string, memberId: string) => {
    try {
        const workspaceRef = doc(db, 'workspaces', workspaceId);
        await updateDoc(workspaceRef, {
            members: arrayRemove(memberId)
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


// --- Workspace Item Actions ---

// Add an item to a workspace
export const addItem = async (workspaceId: string, itemData: Omit<WorkspaceItemData, 'completed' | 'createdAt'>) => {
    try {
        const itemsCollectionRef = collection(db, 'workspaces', workspaceId, 'items');
        await addDoc(itemsCollectionRef, {
            ...itemData,
            completed: false,
            createdAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error adding item: ", error);
        return false;
    }
};

// Update an item
export const updateItem = async (workspaceId: string, itemId: string, data: Partial<WorkspaceItemData>) => {
    try {
        const itemDocRef = doc(db, 'workspaces', workspaceId, 'items', itemId);
        await updateDoc(itemDocRef, data);
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
