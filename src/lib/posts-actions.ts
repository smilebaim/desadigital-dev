
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
    getDocs,
    orderBy,
    increment
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

// Get all published posts
export const getPublishedPosts = async () => {
    try {
        const q = query(
            collection(db, "posts"),
            where("status", "==", "Published"),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            } as PostData & { id: string };
        });
    } catch (error) {
        console.error("Error getting published posts:", error);
        return [];
    }
}

// Increment post view count
export const incrementPostView = async (postId: string) => {
    if (!postId) return;
    try {
        const postRef = doc(db, 'posts', postId);
        // We run this without await to not block the page render
        updateDoc(postRef, {
            views: increment(1)
        });
    } catch (error) {
        // It's okay if this fails, not critical for user experience
        console.error(`Error incrementing post view for ${postId}:`, error);
    }
}


// Add a new post
export const addPost = async (postData: Omit<PostData, 'createdAt' | 'updatedAt' | 'views'>) => {
    try {
        await addDoc(collection(db, "posts"), {
            ...postData,
            views: 0,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding post: ", error);
        return { success: false };
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
        return { success: true };
    } catch (error) {
        console.error("Error updating post: ", error);
        return { success: false };
    }
};

// Delete a post
export const deletePost = async (postId: string) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting post: ", error);
        return { success: false };
    }
};
