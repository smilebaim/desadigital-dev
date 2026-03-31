import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const settingsDocRef = doc(db, 'site_settings', 'main');

export interface SiteSettings {
    // Halaman Utama - Konten
    logoUrl: string;
    heroUrl: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroBadge?: string;
    // Halaman Utama - Warna Font
    heroBadgeColor?: string;
    heroTitleColor?: string;
    heroSubtitleColor?: string;
    heroDescriptionColor?: string;
    // Halaman Utama - Tampilan
    heroOverlayOpacity?: number;
    heroOverlayColor?: string;
    heroHeight?: string;
    heroFontFamily?: string;
    // SEO & Identitas
    siteName?: string;
    siteDescription?: string;
    siteKeywords?: string;
    ogImageUrl?: string;
    // Kontak Desa
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: string;
    // Identitas Persuratan & Pemerintah
    kabupaten?: string;
    kecamatan?: string;
    kodePos?: string;
    kepalaDesaName?: string;
    kepalaDesaNip?: string;
    updatedAt?: string | null;
}

const DEFAULT_SETTINGS: SiteSettings = {
    logoUrl: "/logo-desa.png",
    heroUrl: "/Background utama.png",
    heroTitle: "SELAMAT DATANG DI LAMAN INFORMASI",
    heroSubtitle: "DESA REMAU BAKO TUO",
    heroDescription: "Laman ini merupakan pengembangan Sistem Informasi Desa untuk menampilkan layanan publik dan meningkatkan peran masyarakat dalam mendukung program pembangunan desa yang lebih partisipatif dan berkelanjutan",
    heroBadge: "",
    heroBadgeColor: "#34d399",
    heroTitleColor: "#34d399",
    heroSubtitleColor: "#ffffff",
    heroDescriptionColor: "#ffffffcc",
    heroOverlayOpacity: 20,
    heroOverlayColor: "#000000",
    heroHeight: "full",
    heroFontFamily: "Poppins",
    siteName: "Desa Remau Bako Tuo",
    siteDescription: "Sistem Informasi Desa Remau Bako Tuo – Portal resmi layanan publik, berita, dan transparansi anggaran desa.",
    siteKeywords: "desa, remau bako tuo, sistem informasi desa, layanan desa, APBDes",
    ogImageUrl: "/Background utama.png",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "Desa Remau Bako Tuo, Kecamatan Sadu, Kabupaten Tanjung Jabung Timur",
    kabupaten: "Tanjung Jabung Timur",
    kecamatan: "Sadu",
    kodePos: "36773",
    kepalaDesaName: "H. Abdullah",
    kepalaDesaNip: "",
};

// Get site settings from Firestore
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                ...DEFAULT_SETTINGS,
                ...data,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            };
        }
        return DEFAULT_SETTINGS;
    } catch (error) {
        console.error("Error getting site settings: ", error);
        return null;
    }
};

// Update site settings in Firestore
export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    try {
        await setDoc(settingsDocRef, {
            ...settings,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating site settings: ", error);
        return false;
    }
};
