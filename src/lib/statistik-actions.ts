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

const initialStatistikTemplates = [
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
            trend: [
                { year: 2021, score: 0.68 },
                { year: 2022, score: 0.70 },
                { year: 2023, score: 0.72 },
                { year: 2024, score: 0.75 },
            ],
            recommendations: [
                "Peningkatan program beasiswa bagi siswa berprestasi dan kurang mampu.",
                "Penyuluhan kesehatan preventif secara berkala di Posyandu.",
                "Mengaktifkan kembali kegiatan gotong royong dan siskamling.",
                "Program bedah rumah untuk keluarga tidak mampu.",
                "Peningkatan kerjasama antara warga dengan Babinsa/Bhabinkamtibmas."
            ]
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
            trend: [
                { year: 2021, score: 0.65 },
                { year: 2022, score: 0.68 },
                { year: 2023, score: 0.70 },
                { year: 2024, score: 0.72 },
            ],
            recommendations: [
                "Pengembangan produk unggulan desa untuk meningkatkan diversifikasi ekonomi.",
                "Memfasilitasi akses UMKM ke lembaga keuangan formal dan program KUR.",
                "Pelatihan keterampilan digital dan manajemen keuangan untuk pelaku usaha.",
                "Perbaikan jalan produksi dan pasar desa untuk melancarkan distribusi.",
                "Membentuk koperasi desa untuk menjaga stabilitas harga komoditas."
            ]
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
            trend: [
                { year: 2021, score: 0.62 },
                { year: 2022, score: 0.65 },
                { year: 2023, score: 0.66 },
                { year: 2024, score: 0.68 },
            ],
            recommendations: [
                "Program reboisasi di lahan kritis sekitar desa.",
                "Peningkatan efisiensi bank sampah dan sosialisasi pemilahan sampah dari rumah.",
                "Pembangunan sumur resapan untuk konservasi air tanah.",
                "Kampanye hemat energi dan penggunaan sumber energi terbarukan.",
                "Pengawasan lebih ketat terhadap pencemaran sungai."
            ]
        }, null, 2)
    }
];

export const addStatistikByKey = async (key: string) => {
    // Check if key exists already
    const q = query(collection(db, 'statistik'), where("key", "==", key));
    const existing = await getDocs(q);
    if (!existing.empty) {
        return { success: false, error: 'Data statistik dengan kunci ini sudah ada.' };
    }

    const template = initialStatistikTemplates.find(t => t.key === key);
    if (!template) {
        return { success: false, error: 'Template data tidak ditemukan.' };
    }

    try {
        await addDoc(collection(db, 'statistik'), {
            ...template,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const addStatistik = async (data: Omit<StatistikData, 'createdAt' | 'updatedAt'>) => {
    try {
        // Check for duplicate key
        const q = query(collection(db, 'statistik'), where("key", "==", data.key));
        const existing = await getDocs(q);
        if (!existing.empty) {
            return { success: false, error: 'Kunci (key) ini sudah digunakan. Harap gunakan kunci unik.' };
        }

        await addDoc(collection(db, 'statistik'), {
            ...data,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteStatistik = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'statistik', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

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
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
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
                createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
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
    const existingKeys = new Set(snapshot.docs.map(doc => doc.data().key));

    const batch = writeBatch(db);
    let addedCount = 0;

    initialStatistikTemplates.forEach(stat => {
        if (!existingKeys.has(stat.key)) {
            const docRef = doc(statistikCollection);
            batch.set(docRef, { ...stat, createdAt: serverTimestamp() });
            addedCount++;
        }
    });

    if (addedCount === 0) {
        return { success: true, message: 'Semua data statistik awal sudah ada.' };
    }

    try {
        await batch.commit();
        return { success: true, message: `${addedCount} data statistik baru berhasil dibuat.` };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
