'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    writeBatch,
    getDocs,
    query,
    limit
} from 'firebase/firestore';

export interface KegiatanData {
    title: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    location: string;
    description: string;
    createdAt?: any;
}

export const addKegiatan = async (data: Omit<KegiatanData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'kegiatan'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateKegiatan = async (id: string, data: Partial<KegiatanData>) => {
    try {
        const kegiatanDocRef = doc(db, 'kegiatan', id);
        await updateDoc(kegiatanDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteKegiatan = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'kegiatan', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const seedDummyKegiatan = async () => {
    const kegiatanCollection = collection(db, 'kegiatan');
    const q = query(kegiatanCollection, limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return { success: false, error: 'Koleksi kegiatan sudah berisi data. Data dummy tidak ditambahkan.' };
    }
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];


    const dummyData: Omit<KegiatanData, 'createdAt'>[] = [
        {
            title: "Rapat Koordinasi Perangkat Desa",
            date: formatDate(today),
            time: "09:00",
            location: "Kantor Desa",
            description: "Membahas progres program kerja bulanan dan persiapan acara desa."
        },
        {
            title: "Musyawarah Dusun I (Satu)",
            date: formatDate(tomorrow),
            time: "19:30",
            location: "Rumah Ketua RW 01",
            description: "Pembahasan rencana gotong royong dan keamanan lingkungan."
        },
        {
            title: "Kerja Bakti (Gotong Royong)",
            date: formatDate(nextWeek),
            time: "07:30",
            location: "Lingkungan RT 01 - RT 05",
            description: "Membersihkan saluran air dan lingkungan sekitar menjelang musim hujan."
        },
    ];

    const batch = writeBatch(db);
    try {
        dummyData.forEach(kegiatan => {
            const docRef = doc(kegiatanCollection);
            batch.set(docRef, { ...kegiatan, createdAt: serverTimestamp() });
        });
        await batch.commit();
        return { success: true, count: dummyData.length };
    } catch (error: any) {
        console.error("Error seeding dummy kegiatan:", error);
        return { success: false, error: error.message };
    }
};
