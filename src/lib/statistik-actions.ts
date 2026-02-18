'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    serverTimestamp,
    getDoc,
    query,
    where,
    getDocs,
    writeBatch
} from 'firebase/firestore';

export interface StatistikData {
    key: string;
    title: string;
    group: string;
    data: string; // JSON String
    createdAt?: any;
    updatedAt?: any;
}

export const getStatistikByKey = async (key: string): Promise<(StatistikData & {id: string}) | null> => {
    try {
        const q = query(collection(db, 'statistik'), where("key", "==", key));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
            } as StatistikData & { id: string };
        }
        return null;
    } catch (error) {
        console.error(`Error getting statistic by key ${key}:`, error);
        return null;
    }
};

export const getStatistikById = async (id: string): Promise<(StatistikData & {id: string}) | null> => {
     try {
        const docRef = doc(db, 'statistik', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
            } as StatistikData & { id: string };
        }
        return null;
    } catch (error) {
        console.error(`Error getting statistic by id ${id}:`, error);
        return null;
    }
}

export const updateStatistik = async (id: string, data: { data: string }) => {
    try {
        const docRef = doc(db, 'statistik', id);
        await updateDoc(docRef, {
            data: data.data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


export const seedInitialStatistik = async () => {
    const statistikCollection = collection(db, 'statistik');
    const snapshot = await getDocs(statistikCollection);
    
    if (!snapshot.empty) {
        return { success: true, message: 'Data statistik sudah ada.' };
    }

    const initialData = [
        {
            key: 'pendapatan_desa',
            title: 'Distribusi Pendapatan Desa',
            group: 'Anggaran',
            data: JSON.stringify({
                sumber: [
                    { name: "Dana Desa", value: 1250000000 },
                    { name: "Alokasi Dana Desa (ADD)", value: 850000000 },
                    { name: "Bagi Hasil Pajak", value: 125000000 },
                    { name: "Pendapatan Asli Desa", value: 75000000 }
                ]
            }, null, 2)
        },
        {
            key: 'belanja_desa',
            title: 'Distribusi Belanja Desa',
            group: 'Anggaran',
            data: JSON.stringify({
                bidang: [
                    { name: "Penyelenggaraan Pemerintahan", value: 750000000 },
                    { name: "Pembangunan", value: 950000000 },
                    { name: "Pembinaan Masyarakat", value: 350000000 },
                    { name: "Pemberdayaan Masyarakat", value: 250000000 }
                ]
            }, null, 2)
        },
        {
            key: 'indeks_sosial',
            title: 'Indeks Ketahanan Sosial (IKS)',
            group: 'IDM',
            data: JSON.stringify({
                score: 0.75,
                status: "Maju",
                components: [
                    { name: 'Pendidikan', score: 0.8 },
                    { name: 'Kesehatan', score: 0.75 },
                    { name: 'Modal Sosial', score: 0.7 },
                    { name: 'Permukiman', score: 0.8 },
                    { name: 'Keamanan', score: 0.65 },
                ],
            }, null, 2)
        },
        {
            key: 'indeks_ekonomi',
            title: 'Indeks Ketahanan Ekonomi (IKE)',
            group: 'IDM',
            data: JSON.stringify({
                score: 0.72,
                status: "Maju",
                components: [
                    { name: 'Keragaman Ekonomi', score: 0.8 },
                    { name: 'Akses Permodalan', score: 0.65 },
                    { name: 'Keterampilan Kerja', score: 0.7 },
                    { name: 'Infrastruktur Ekonomi', score: 0.75 },
                    { name: 'Stabilitas Harga', score: 0.6 },
                ],
            }, null, 2)
        },
        {
            key: 'indeks_lingkungan',
            title: 'Indeks Ketahanan Lingkungan (IKL)',
            group: 'IDM',
            data: JSON.stringify({
                score: 0.68,
                status: "Berkembang",
                components: [
                    { name: 'Kualitas Lingkungan', score: 0.7 },
                    { name: 'Pengelolaan SDA', score: 0.6 },
                    { name: 'Pengelolaan Sampah', score: 0.75 },
                    { name: 'Adaptasi Iklim', score: 0.65 },
                    { name: 'Edukasi Lingkungan', score: 0.7 },
                ],
            }, null, 2)
        }
    ];

    const batch = writeBatch(db);
    try {
        initialData.forEach(stat => {
            const docRef = doc(statistikCollection);
            batch.set(docRef, { ...stat, createdAt: serverTimestamp() });
        });
        await batch.commit();
        return { success: true, message: 'Data statistik awal berhasil dibuat.' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
