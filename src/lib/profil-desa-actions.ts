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
    updatedAt?: string | null;
}

// Get profil desa settings from Firestore
export const getProfilDesa = async (): Promise<ProfilDesaData | null> => {
    try {
        const docSnap = await getDoc(profilDesaDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                nama: data.nama,
                kecamatan: data.kecamatan,
                kabupaten: data.kabupaten,
                provinsi: data.provinsi,
                luas: data.luas,
                penduduk: data.penduduk,
                kepalaDesa: data.kepalaDesa,
                periode: data.periode,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
            };
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
        const { updatedAt, ...restOfData } = data;
        await setDoc(profilDesaDocRef, {
            ...restOfData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating profil desa: ", error);
        return false;
    }
};
