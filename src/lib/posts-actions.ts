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
    query,
    where,
    getDocs
} from 'firebase/firestore';

// Interface for a single post
export interface PostData {
    title: string;
    content: string;
    category: 'Berita' | 'Pengumuman';
    status: 'Published' | 'Draft';
    author: string;
    userId: string;
    createdAt?: any;
    views?: number;
}

// --- Post Actions ---

// Add a new post
export const addPost = async (postData: PostData) => {
    try {
        await addDoc(collection(db, "posts"), {
            ...postData,
            views: 0,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding post: ", error);
        return false;
    }
};

// Get a single post
export const getPost = async (postId: string) => {
    try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as PostData & { id: string };
        }
        return null;
    } catch (error) {
        console.error("Error getting post: ", error);
        return null;
    }
};

// Update a post
export const updatePost = async (postId: string, dataToUpdate: Partial<PostData>) => {
    try {
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
            ...dataToUpdate,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error updating post: ", error);
        return false;
    }
};

// Delete a post
export const deletePost = async (postId: string) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
        return true;
    } catch (error) {
        console.error("Error deleting post: ", error);
        return false;
    }
};
