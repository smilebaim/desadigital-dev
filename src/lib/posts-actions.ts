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
    createdAt?: string | null;
    updatedAt?: string | null;
    views?: number;
}

// --- Post Actions ---

// Add a new post
export const addPost = async (postData: Omit<PostData, 'createdAt' | 'updatedAt' | 'views'>) => {
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
            const data = docSnap.data();
            const post: PostData & { id: string } = {
                id: docSnap.id,
                title: data.title,
                content: data.content,
                category: data.category,
                status: data.status,
                author: data.author,
                userId: data.userId,
                views: data.views || 0,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            };
            return post;
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
        const { createdAt, updatedAt, ...rest } = dataToUpdate;
        await updateDoc(docRef, {
            ...rest,
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
