import { db } from '@/firebase/config';
import { 
    collection, 
    doc,
    serverTimestamp,
    getDoc,
    getDocs,
    writeBatch,
    setDoc
} from 'firebase/firestore';

export interface LandingPageLink {
    title: string;
    href: string;
    description: string;
    icon: string; // lucide-react icon name
}

export interface LandingPageData {
    id: string;
    title: string;
    subtitle: string;
    links: LandingPageLink[];
    updatedAt?: any;
}

const defaultLandingPages: Record<string, LandingPageData> = {
    'profil': {
        id: 'profil',
        title: 'Profil Desa',
        subtitle: 'Kenali lebih dalam tentang Desa Remau Bako Tuo.',
        links: [
            { title: "Profil Desa", href: "/profil/profil-desa", description: "Gambaran umum, geografis, dan demografi desa.", icon: "Users" },
            { title: "Sejarah Desa", href: "/profil/sejarah-desa", description: "Jejak langkah dan asal-usul berdirinya desa.", icon: "BookOpen" },
            { title: "Visi & Misi", href: "/profil/visi-misi", description: "Arah dan tujuan pembangunan desa ke depan.", icon: "Target" },
            { title: "Struktur Pemerintahan", href: "/profil/struktur-pemerintahan", description: "Susunan perangkat desa yang bertugas.", icon: "Network" },
            { title: "Struktur BPD", href: "/profil/struktur-badan", description: "Badan Permusyawaratan Desa sebagai mitra pemerintah.", icon: "Users" },
        ]
    },
    'layanan': {
        id: 'layanan',
        title: 'Layanan Desa',
        subtitle: 'Jelajahi berbagai layanan publik yang tersedia untuk warga Desa Remau Bako Tuo.',
        links: [
            { title: "Layanan Persuratan", href: "/layanan/persuratan", description: "Pengurusan berbagai surat keterangan untuk warga.", icon: "FileSignature" },
            { title: "Pos Kesehatan Desa (Poskesdes)", href: "/layanan/poskesdes", description: "Layanan kesehatan primer untuk masyarakat desa.", icon: "HeartPulse" },
            { title: "Menu Pendamping Gizi (MPG)", href: "/layanan/mpg", description: "Contoh menu sehat untuk balita dan ibu hamil/menyusui.", icon: "Apple" },
            { title: "Pos Keamanan Lingkungan (Poskamling)", href: "/layanan/poskamling", description: "Sistem keamanan swadaya untuk menjaga ketertiban.", icon: "Shield" },
            { title: "Bank Sampah", href: "/layanan/bank-sampah", description: "Pengelolaan sampah kering kolektif dengan insentif.", icon: "Trash2" },
            { title: "Penanganan Keluhan", href: "/layanan/penanganan-keluhan", description: "Sampaikan aspirasi dan keluhan Anda terkait pelayanan.", icon: "MessageSquareWarning" },
        ]
    },
    'kelembagaan': {
        id: 'kelembagaan',
        title: 'Kelembagaan Desa',
        subtitle: 'Lembaga-lembaga yang menjadi mitra pemerintah desa.',
        links: [
            { title: "PKK", href: "/kelembagaan/pkk", description: "Pemberdayaan dan Kesejahteraan Keluarga.", icon: "Users" },
            { title: "LKD", href: "/kelembagaan/lkd", description: "Lembaga Kemasyarakatan Desa.", icon: "Library" },
            { title: "Karang Taruna", href: "/kelembagaan/karang-taruna", description: "Organisasi kepemudaan desa.", icon: "Shield" },
        ]
    },
    'pembangunan': {
        id: 'pembangunan',
        title: 'Perencanaan Pembangunan',
        subtitle: 'Dokumen perencanaan pembangunan Desa Remau Bako Tuo.',
        links: [
            { title: "RPJMDes", href: "/pembangunan/rpjmdes", description: "Rencana Pembangunan Jangka Menengah Desa (6 tahun).", icon: "FileText" },
            { title: "RKPDes", href: "/pembangunan/rkpdes", description: "Rencana Kerja Pemerintah Desa tahunan.", icon: "Construction" },
        ]
    },
    'dana-desa': {
        id: 'dana-desa',
        title: 'Transparansi Dana Desa',
        subtitle: 'Informasi terkait Anggaran Pendapatan dan Belanja Desa (APBDes).',
        links: [
            { title: "Pendapatan Desa", href: "/dana-desa/pendapatan", description: "Rincian sumber-sumber pendapatan desa.", icon: "TrendingUp" },
            { title: "Belanja Desa", href: "/dana-desa/belanja", description: "Alokasi dan realisasi belanja desa.", icon: "TrendingDown" },
        ]
    },
    'ekonomi': {
        id: 'ekonomi',
        title: 'Potensi Ekonomi Desa',
        subtitle: 'Jelajahi potensi ekonomi yang ada di Desa Remau Bako Tuo.',
        links: [
            { title: "BUMDes", href: "/ekonomi/bumdes", description: "Informasi dan unit usaha Badan Usaha Milik Desa.", icon: "Building" },
            { title: "Koperasi", href: "/ekonomi/koperasi", description: "Layanan dan kinerja Koperasi Desa.", icon: "Users" },
            { title: "UMKM", href: "/ekonomi/umkm", description: "Potensi dan produk Usaha Mikro, Kecil, dan Menengah.", icon: "ShoppingCart" },
        ]
    }
};

export const getLandingPage = async (id: string): Promise<LandingPageData> => {
    try {
        const docRef = doc(db, 'landing_pages', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as LandingPageData;
        }
        // Return default if not exists in DB yet
        return defaultLandingPages[id] || { id, title: 'Halaman ' + id, subtitle: '', links: [] };
    } catch (error) {
        console.error("Error getting landing page:", error);
        return defaultLandingPages[id] || { id, title: 'Halaman ' + id, subtitle: '', links: [] };
    }
};

export const getAllLandingPages = async (): Promise<LandingPageData[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'landing_pages'));
        const dbPages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LandingPageData));
        
        // Merge with defaults to ensure all expected pages are listed even if not in DB yet
        const result: LandingPageData[] = [];
        for (const [key, defaultData] of Object.entries(defaultLandingPages)) {
            const dbPage = dbPages.find(p => p.id === key);
            result.push(dbPage || defaultData);
        }
        return result;
    } catch (error) {
        console.error("Error getting all landing pages:", error);
        return Object.values(defaultLandingPages);
    }
};

export const updateLandingPage = async (id: string, data: Partial<LandingPageData>) => {
    try {
        const docRef = doc(db, 'landing_pages', id);
        await setDoc(docRef, {
            ...data,
            id,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const seedLandingPages = async () => {
    try {
        const batch = writeBatch(db);
        let count = 0;
        
        const existingPagesSnap = await getDocs(collection(db, 'landing_pages'));
        const existingIds = new Set(existingPagesSnap.docs.map(doc => doc.id));

        for (const [id, data] of Object.entries(defaultLandingPages)) {
             if (!existingIds.has(id)) {
                const docRef = doc(db, 'landing_pages', id);
                batch.set(docRef, { ...data, updatedAt: serverTimestamp() });
                count++;
             }
        }

        if (count > 0) {
            await batch.commit();
        }
        return { success: true, count, message: `${count} landing pages seeded.` };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
