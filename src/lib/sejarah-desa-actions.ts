'use server';
import { db } from '@/firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const sejarahDesaDocRef = doc(db, 'sejarah', 'main');

export interface SejarahDesaData {
    judul: string;
    deskripsi: string;
    tahun: string;
    updatedAt?: string | null;
}

// Get sejarah desa data from Firestore
export const getSejarahDesa = async (): Promise<SejarahDesaData | null> => {
    try {
        const docSnap = await getDoc(sejarahDesaDocRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                judul: data.judul,
                deskripsi: data.deskripsi,
                tahun: data.tahun,
                updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
            };
        }
        // Return default content if document doesn't exist
        return {
            judul: "Asal Usul Desa Remau Bako Tuo",
            tahun: "1920",
            deskripsi: `Menurut cerita dari para tetua desa, nama Remau Bako Tuo memiliki makna yang mendalam. "Remau" dalam bahasa setempat berarti Harimau, yang melambangkan kekuatan dan keberanian. "Bako" berarti Pangkalan atau tempat berkumpul, dan "Tuo" berarti Tua. Jadi, secara harfiah, nama desa ini dapat diartikan sebagai "Pangkalan Harimau Tua".\n\nDesa ini didirikan sekitar tahun 1920 oleh sekelompok perantau yang mencari lahan baru untuk bertani. Mereka membuka hutan belantara yang konon menurut cerita dihuni oleh seekor harimau tua yang bijaksana. Alih-alih menjadi ancaman, harimau tersebut justru dianggap sebagai penjaga wilayah.\n\nSeiring berjalannya waktu, desa ini berkembang menjadi pusat kegiatan ekonomi dan sosial di wilayah sekitarnya. Tonggak-tonggak sejarah penting termasuk pembangunan masjid pertama pada tahun 1950, masuknya listrik pada tahun 1985, dan pembangunan jalan aspal pertama yang menghubungkan desa dengan ibu kota kecamatan pada awal tahun 2000-an.`
        };
    } catch (error) {
        console.error("Error getting sejarah desa: ", error);
        return null;
    }
};

// Update sejarah desa data in Firestore
export const updateSejarahDesa = async (data: Partial<SejarahDesaData>): Promise<boolean> => {
    try {
        const { updatedAt, ...restOfData } = data;
        await setDoc(sejarahDesaDocRef, {
            ...restOfData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating sejarah desa: ", error);
        return false;
    }
};
