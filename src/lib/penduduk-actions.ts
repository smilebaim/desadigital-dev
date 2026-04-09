import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    getDoc,
    serverTimestamp,
    writeBatch,
    getDocs,
    query,
    limit,
    where
} from 'firebase/firestore';

export interface PendudukData {
    nik: string;
    kk: string;
    nama: string;
    jenisKelamin: 'Laki-laki' | 'Perempuan';
    tempatLahir: string;
    tanggalLahir: string; // Should be in YYYY-MM-DD format
    agama: string;
    pendidikan: string;
    pekerjaan: string;
    statusPerkawinan: 'Belum Kawin' | 'Kawin' | 'Cerai Hidup' | 'Cerai Mati';
    alamat: string;
    rt: string;
    rw: string;
    tenantId?: string;
    // Additional biodata fields (flexible sub-object)
    biodata?: {
        tempatLahir?: string;
        tanggalLahir?: string;
        jenisKelamin?: string;
        agama?: string;
        pekerjaan?: string;
        pendidikan?: string;
        statusPerkawinan?: string;
    };
    createdAt?: any;
}

export const getPendudukById = async (id: string): Promise<(PendudukData & { id: string }) | null> => {
    try {
        const docRef = doc(db, 'penduduk', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as PendudukData & { id: string };
        }
        return null;
    } catch (error) {
        console.error("Error getting penduduk:", error);
        return null;
    }
};

export const addPenduduk = async (data: Omit<PendudukData, 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'penduduk'), {
            ...data,
            tenantId: data.tenantId || 'main',
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const addPendudukBatch = async (data: PendudukData[], tenantId?: string) => {
    const batch = writeBatch(db);
    try {
        data.forEach(penduduk => {
            // Basic validation to ensure required fields are present
            if (penduduk.nama && penduduk.nik) {
                const docRef = doc(collection(db, 'penduduk'));
                batch.set(docRef, { 
                    ...penduduk, 
                    tenantId: tenantId || penduduk.tenantId || 'main',
                    createdAt: serverTimestamp() 
                });
            }
        });
        await batch.commit();
        return { success: true, count: data.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updatePenduduk = async (id: string, data: Partial<Omit<PendudukData, 'createdAt'>>) => {
    try {
        const pendudukDocRef = doc(db, 'penduduk', id);
        await updateDoc(pendudukDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deletePenduduk = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'penduduk', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const seedDummyPenduduk = async (tenantId?: string) => {
    const pendudukCollection = collection(db, 'penduduk');
    const q = query(
        pendudukCollection, 
        where("tenantId", "==", tenantId || 'main'),
        limit(1)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return { success: false, error: 'Data penduduk sudah ada. Tidak ada data dummy yang ditambahkan.' };
    }

    const dummyData: Omit<PendudukData, 'createdAt' | 'tenantId'>[] = [
        { nama: "Budi Santoso", nik: "3601010101800001", kk: "3601010101800001", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1980-01-01", agama: "Islam", pendidikan: "S1", pekerjaan: "Petani", statusPerkawinan: "Kawin", alamat: "Dusun Harapan", rt: "001", rw: "001" },
        { nama: "Siti Aminah", nik: "3601014102820002", kk: "3601010101800001", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1982-02-14", agama: "Islam", pendidikan: "SMA", pekerjaan: "Ibu Rumah Tangga", statusPerkawinan: "Kawin", alamat: "Dusun Harapan", rt: "001", rw: "001" },
        { nama: "Agus Wijaya", nik: "3601021203750003", kk: "3601021203750003", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1975-03-12", agama: "Islam", pendidikan: "SMP", pekerjaan: "Nelayan", statusPerkawinan: "Kawin", alamat: "Dusun Bahari", rt: "002", rw: "001" },
        { nama: "Dewi Lestari", nik: "3601025204780004", kk: "3601021203750003", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1978-04-22", agama: "Islam", pendidikan: "SMA", pekerjaan: "Pedagang", statusPerkawinan: "Kawin", alamat: "Dusun Bahari", rt: "002", rw: "001" },
        { nama: "Eko Prasetyo", nik: "3601032505900005", kk: "3601032505900005", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1990-05-25", agama: "Islam", pendidikan: "S1", pekerjaan: "Guru", statusPerkawinan: "Belum Kawin", alamat: "Dusun Cendekia", rt: "003", rw: "002" },
        { nama: "Fitri Handayani", nik: "3601036506920006", kk: "3601036506920006", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1992-06-30", agama: "Islam", pendidikan: "D3", pekerjaan: "Bidan", statusPerkawinan: "Belum Kawin", alamat: "Dusun Sehat", rt: "004", rw: "002" },
        { nama: "Gunawan", nik: "3601041507680007", kk: "3601041507680007", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1968-07-15", agama: "Islam", pendidikan: "SD", pekerjaan: "Petani", statusPerkawinan: "Kawin", alamat: "Dusun Tani Jaya", rt: "005", rw: "003" },
        { nama: "Herlina", nik: "3601045508700008", kk: "3601041507680007", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1970-08-18", agama: "Islam", pendidikan: "SD", pekerjaan: "Ibu Rumah Tangga", statusPerkawinan: "Kawin", alamat: "Dusun Tani Jaya", rt: "005", rw: "003" },
        { nama: "Irfan Hakim", nik: "3601050909950009", kk: "3601050909950009", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1995-09-09", agama: "Islam", pendidikan: "SMA", pekerjaan: "Karyawan Swasta", statusPerkawinan: "Belum Kawin", alamat: "Dusun Harapan", rt: "001", rw: "001" },
        { nama: "Joko Susilo", nik: "3601061010850010", kk: "3601061010850010", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1985-10-10", agama: "Islam", pendidikan: "S2", pekerjaan: "Dosen", statusPerkawinan: "Kawin", alamat: "Dusun Cendekia", rt: "003", rw: "002" },
        { nama: "Kartika Sari", nik: "3601065111880011", kk: "3601061010850010", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1988-11-11", agama: "Islam", pendidikan: "S1", pekerjaan: "Guru", statusPerkawinan: "Kawin", alamat: "Dusun Cendekia", rt: "003", rw: "002" },
        { nama: "Lia Puspita", nik: "3601076212980012", kk: "3601076212980012", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1998-12-01", agama: "Islam", pendidikan: "SMA", pekerjaan: "Mahasiswa", statusPerkawinan: "Belum Kawin", alamat: "Dusun Harapan", rt: "001", rw: "001" },
        { nama: "Muhammad Zaki", nik: "3601080101020013", kk: "3601080101020013", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "2002-01-20", agama: "Islam", pendidikan: "Tidak/Belum Sekolah", pekerjaan: "Pelajar", statusPerkawinan: "Belum Kawin", alamat: "Dusun Tani Jaya", rt: "005", rw: "003" },
        { nama: "Nurul Aini", nik: "3601094202890014", kk: "3601094202890014", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1989-02-28", agama: "Islam", pendidikan: "D3", pekerjaan: "Perawat", statusPerkawinan: "Kawin", alamat: "Dusun Sehat", rt: "004", rw: "002" },
        { nama: "Putra Sanjaya", nik: "3601100303910015", kk: "3601100303910015", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1991-03-03", agama: "Islam", pendidikan: "S1", pekerjaan: "Wiraswasta", statusPerkawinan: "Kawin", alamat: "Dusun Bahari", rt: "002", rw: "001" },
        { nama: "Rina Amelia", nik: "3601114404930016", kk: "3601100303910015", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1993-04-14", agama: "Islam", pendidikan: "S1", pekerjaan: "Karyawan Swasta", statusPerkawinan: "Kawin", alamat: "Dusun Bahari", rt: "002", rw: "001" },
        { nama: "Teguh Santoso", nik: "3601121505770017", kk: "3601121505770017", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1977-05-16", agama: "Kristen", pendidikan: "SMA", pekerjaan: "Nelayan", statusPerkawinan: "Kawin", alamat: "Dusun Bahari", rt: "002", rw: "001" },
        { nama: "Umar Faruq", nik: "3601132606830018", kk: "3601132606830018", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1983-06-26", agama: "Islam", pendidikan: "S1", pekerjaan: "PNS", statusPerkawinan: "Kawin", alamat: "Dusun Cendekia", rt: "003", rw: "002" },
        { nama: "Vera Wati", nik: "3601146707850019", kk: "3601132606830018", jenisKelamin: "Perempuan", tempatLahir: "Jambi", tanggalLahir: "1985-07-27", agama: "Islam", pendidikan: "S1", pekerjaan: "Ibu Rumah Tangga", statusPerkawinan: "Kawin", alamat: "Dusun Cendekia", rt: "003", rw: "002" },
        { nama: "Yoga Pratama", nik: "3601150808990020", kk: "3601150808990020", jenisKelamin: "Laki-laki", tempatLahir: "Jambi", tanggalLahir: "1999-08-08", agama: "Islam", pendidikan: "SMA", pekerjaan: "Mahasiswa", statusPerkawinan: "Belum Kawin", alamat: "Dusun Harapan", rt: "001", rw: "001" },
    ];

    const batch = writeBatch(db);
    try {
        dummyData.forEach(penduduk => {
            const docRef = doc(pendudukCollection);
            batch.set(docRef, { 
                ...penduduk, 
                tenantId: tenantId || 'main',
                createdAt: serverTimestamp() 
            });
        });
        await batch.commit();
        return { success: true, count: dummyData.length };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
