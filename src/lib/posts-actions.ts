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
    increment,
    writeBatch,
    limit
} from 'firebase/firestore';

// Interface for a single post
export interface PostData {
    title: string;
    content: string;
    category: 'Berita' | 'Pengumuman';
    status: 'Published' | 'Draft';
    author: string;
    userId: string;
    tenantId?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    views?: number;
}

// --- Post Actions ---

// Get all published posts
export const getPublishedPosts = async (tenantId?: string) => {
    try {
        let q;
        if (tenantId) {
            q = query(
                collection(db, "posts"),
                where("status", "==", "Published"),
                where("tenantId", "==", tenantId)
            );
        } else {
            q = query(
                collection(db, "posts"),
                where("status", "==", "Published")
            );
        }
        
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            };
        });

        // Sort in memory to avoid Firestore Index requirement
        return posts
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map(p => ({
                ...p,
                createdAt: p.createdAt.toISOString()
            })) as (PostData & { id: string })[];
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
            tenantId: postData.tenantId || 'main',
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

export const seedDummyPosts = async (userId: string, author: string, tenantId?: string) => {
    if (!userId || !author) {
        return { success: false, error: "User ID dan nama author dibutuhkan." };
    }

    const postsCollection = collection(db, 'posts');
    const q = query(
        postsCollection, 
        where("tenantId", "==", tenantId || 'main'),
        limit(1)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return { success: false, error: 'Koleksi Info & Berita sudah berisi data. Data dummy tidak ditambahkan.' };
    }

    const dummyPosts: Omit<PostData, 'createdAt' | 'updatedAt' | 'views' | 'userId' | 'author' | 'tenantId'>[] = [
        {
            title: "Pembangunan Jalan Usaha Tani di Dusun Harapan",
            content: "Pemerintah Desa Remau Bako Tuo telah menyelesaikan pembangunan jalan usaha tani sepanjang 500 meter di Dusun Harapan. Pembangunan ini diharapkan dapat mempermudah akses petani dalam mengangkut hasil panen dan meningkatkan perekonomian warga. Jalan yang sebelumnya berupa tanah kini telah diperkeras dengan beton, sehingga dapat dilalui kendaraan roda empat.",
            category: 'Berita',
            status: 'Published',
        },
        {
            title: "Jadwal Posyandu Balita Bulan Mei 2024",
            content: "Diberitahukan kepada seluruh warga yang memiliki balita, jadwal Posyandu untuk bulan Mei akan dilaksanakan pada:\n\nHari/Tanggal: Sabtu, 18 Mei 2024\nWaktu: 09:00 WIB - Selesai\nTempat: Balai Desa\n\nKegiatan meliputi penimbangan berat badan, pengukuran tinggi badan, dan pemberian vitamin A. Diharapkan para ibu dapat membawa balitanya sesuai jadwal. Atas perhatiannya, kami ucapkan terima kasih.",
            category: 'Pengumuman',
            status: 'Published',
        },
        {
            title: "Pelatihan Pembuatan Kompos untuk Kelompok Tani",
            content: "Dalam rangka mendukung pertanian berkelanjutan, akan diadakan pelatihan pembuatan kompos dari limbah organik. Pelatihan ini masih dalam tahap perencanaan dan akan diumumkan lebih lanjut. Warga yang berminat dapat mendaftarkan diri ke kantor desa.",
            category: 'Berita',
            status: 'Draft',
        },
    ];

    const batch = writeBatch(db);
    try {
        dummyPosts.forEach(post => {
            const docRef = doc(postsCollection);
            batch.set(docRef, { 
                ...post, 
                userId,
                author,
                tenantId: tenantId || 'main',
                views: 0,
                createdAt: serverTimestamp() 
            });
        });
        await batch.commit();
        return { success: true, count: dummyPosts.length };
    } catch (error: any) {
        console.error("Error seeding dummy posts:", error);
        return { success: false, error: error.message };
    }
};
