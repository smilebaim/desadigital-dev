'use server';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const profilDesaDocRef = doc(db, 'profil_desa', 'main');

export interface ProfilDesaData {
    nama: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    luas: string;
    penduduk: string;
    kepalaDesa: string;
    periode: string;
    updatedAt?: any;
}

// Get profil desa settings from Firestore
export const getProfilDesa = async (): Promise<ProfilDesaData | null> => {
    try {
        const docSnap = await getDoc(profilDesaDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as ProfilDesaData;
        }
        // Return default settings if document doesn't exist
        return {
            nama: "Remau Bako Tuo",
            kecamatan: "Sadu",
            kabupaten: "Tanjung Jabung Timur",
            provinsi: "Jambi",
            luas: "2,500 Ha",
            penduduk: "3.245 Jiwa",
            kepalaDesa: "Nama Kepala Desa",
            periode: "2020 - 2026",
        };
    } catch (error) {
        console.error("Error getting profil desa: ", error);
        return null;
    }
};

// Update profil desa settings in Firestore
export const updateProfilDesa = async (data: ProfilDesaData): Promise<boolean> => {
    try {
        await setDoc(profilDesaDocRef, {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating profil desa: ", error);
        return false;
    }
};
