'use server';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const visiMisiDocRef = doc(db, 'visi_misi', 'main');

export interface VisiMisiData {
    visi: string;
    misi: string[];
    updatedAt?: string | null;
}

// Get visi misi data from Firestore
export const getVisiMisi = async (): Promise<VisiMisiData | null> => {
    try {
        const docSnap = await getDoc(visiMisiDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                visi: data.visi,
                misi: data.misi,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
            };
        }
        // Return default content if document doesn't exist
        return {
            visi: "Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa.",
            misi: [
                "Meningkatkan kualitas sumber daya manusia yang cerdas dan sehat.",
                "Mengembangkan perekonomian desa berbasis potensi lokal.",
                "Meningkatkan kualitas infrastruktur desa yang merata.",
                "Menciptakan tata kelola pemerintahan yang baik, bersih, dan transparan.",
                "Melestarikan dan mengembangkan nilai-nilai budaya dan kearifan lokal."
            ]
        };
    } catch (error) {
        console.error("Error getting visi & misi: ", error);
        return null;
    }
};

// Update visi misi data in Firestore
export const updateVisiMisi = async (data: Partial<VisiMisiData>): Promise<boolean> => {
    try {
        const { updatedAt, ...restOfData } = data;
        await setDoc(visiMisiDocRef, {
            ...restOfData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating visi & misi: ", error);
        return false;
    }
};
