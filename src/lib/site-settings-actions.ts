import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// ─── IMPORTANT ────────────────────────────────────────────────────────────────
// Do NOT create doc refs at module level — Firebase may not be initialized yet.
// Always create refs inside the function body.
// ──────────────────────────────────────────────────────────────────────────────

export interface SiteSettings {
    // Hero Content
    logoUrl: string;
    heroUrl: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    heroBadge?: string;
    // Hero Colors
    heroBadgeColor?: string;
    heroTitleColor?: string;
    heroSubtitleColor?: string;
    heroDescriptionColor?: string;
    // Hero Appearance
    heroOverlayOpacity?: number;
    heroOverlayColor?: string;
    heroHeight?: string;
    heroFontFamily?: string;
    // SEO & Identity
    siteName?: string;
    siteDescription?: string;
    siteKeywords?: string;
    ogImageUrl?: string;
    // Contact
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: string;
    // Government Identity
    kabupaten?: string;
    kecamatan?: string;
    kodePos?: string;
    kepalaDesaName?: string;
    kepalaDesaNip?: string;
    updatedAt?: string | null;
}

export const DEFAULT_SETTINGS: SiteSettings = {
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

/**
 * Get site settings from Firestore.
 * Uses tenantId as the document ID; falls back to 'main' (global default).
 */
export const getSiteSettings = async (tenantId?: string): Promise<SiteSettings | null> => {
    try {
        const docId = tenantId || 'main';
        const docRef = doc(db, 'site_settings', docId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                ...DEFAULT_SETTINGS,
                ...data,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            } as SiteSettings;
        }

        // Tenant-specific doc not found — try falling back to 'main'
        if (tenantId && docId !== 'main') {
            const mainRef = doc(db, 'site_settings', 'main');
            const mainSnap = await getDoc(mainRef);
            if (mainSnap.exists()) {
                const mainData = mainSnap.data();
                return {
                    ...DEFAULT_SETTINGS,
                    ...mainData,
                    updatedAt: mainData.updatedAt ? mainData.updatedAt.toDate().toISOString() : null,
                } as SiteSettings;
            }
        }

        return DEFAULT_SETTINGS;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return DEFAULT_SETTINGS; // Return defaults on error instead of null
    }
};

/**
 * Save site settings to Firestore.
 * Uses tenantId as the document ID; defaults to 'main'.
 */
export const updateSiteSettings = async (settings: Partial<SiteSettings>, tenantId?: string): Promise<boolean> => {
    try {
        const docId = tenantId || 'main';
        const docRef = doc(db, 'site_settings', docId);
        await setDoc(docRef, {
            ...settings,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error saving site settings:", error);
        return false;
    }
};

/**
 * Reset site settings to defaults for a given tenant (or 'main').
 */
export const resetSiteSettings = async (tenantId?: string): Promise<boolean> => {
    try {
        const docId = tenantId || 'main';
        const docRef = doc(db, 'site_settings', docId);
        await setDoc(docRef, {
            ...DEFAULT_SETTINGS,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error resetting site settings:", error);
        return false;
    }
};
