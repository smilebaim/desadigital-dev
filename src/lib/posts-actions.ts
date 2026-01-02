import { db } from './firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface PostData {
    title: string;
    category: string;
    content: string;
    author: string;
    status: 'Published' | 'Draft';
    userId: string;
}

// Function to add a new post
export const addPost = async (postData: PostData) => {
    try {
        await addDoc(collection(db, 'posts'), {
            ...postData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            views: 0,
        });
        return true;
    } catch (error) {
        console.error("Error adding post: ", error);
        return false;
    }
};

// Function to get posts in real-time
export const getPostsStream = (callback: (posts: any[]) => void) => {
    const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(posts);
    });

    return unsubscribe;
};

// Function to get a single post
export const getPost = async (postId: string) => {
    try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting post: ", error);
        return null;
    }
};

// Function to update a post
export const updatePost = async (postId: string, data: Partial<PostData>) => {
    try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error updating post: ", error);
        return false;
    }
};

// Function to delete a post
export const deletePost = async (postId: string) => {
    try {
        await deleteDoc(doc(db, 'posts', postId));
        return true;
    } catch (error) {
        console.error("Error deleting post: ", error);
        return false;
    }
};
