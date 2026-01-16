'use server';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const settingsDocRef = doc(db, 'site_settings', 'main');

interface SiteSettings {
    logoUrl: string;
    heroUrl: string;
    updatedAt?: string | null;
}

// Get site settings from Firestore
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
    try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                logoUrl: data.logoUrl,
                heroUrl: data.heroUrl,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
            };
        }
        // Return default settings if document doesn't exist
        return {
            logoUrl: "/logo-desa.png",
            heroUrl: "/Background utama.png"
        };
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
