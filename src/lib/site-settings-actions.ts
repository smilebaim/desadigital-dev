'use server';
import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const SETTINGS_DOC_ID = 'main'; // Use a consistent ID for the settings document

export interface SiteSettings {
    logoUrl?: string;
    heroUrl?: string;
}

// Function to get the current site settings
export const getSiteSettings = async (): Promise<SiteSettings | null> => {
    try {
        const docRef = doc(db, 'siteSettings', SETTINGS_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as SiteSettings;
        } else {
            // Return default or empty settings if not found
            return {
                logoUrl: "/logo-desa.png",
                heroUrl: "/Background utama.png",
            };
        }
    } catch (error) {
        console.error("Error getting site settings: ", error);
        return null;
    }
};

// Function to update the site settings
export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    try {
        const docRef = doc(db, 'siteSettings', SETTINGS_DOC_ID);
        await setDoc(docRef, {
            ...settings,
            updatedAt: serverTimestamp(),
        }, { merge: true }); // Use merge to avoid overwriting other fields
        return true;
    } catch (error) {
        console.error("Error updating site settings: ", error);
        return false;
    }
};
