import { db } from '@/firebase/config';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    getDoc,
} from 'firebase/firestore';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export type UserRole = 'superadmin' | 'admin' | 'staff' | 'pending';
export type UserStatus = 'active' | 'disabled' | 'pending';

export interface UserData {
    id?: string;
    displayName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    tenantId?: string;   // subdomain desa yang diasosiasikan (kosong = platform-level)
    tenantName?: string; // nama desa (denormalized for display)
    photoURL?: string;
    createdAt?: any;
    updatedAt?: any;
}

export interface InviteUserPayload {
    displayName: string;
    email: string;
    role: UserRole;
    tenantId?: string;
    tenantName?: string;
}

// ─── Real-time Stream ─────────────────────────────────────────────────────────

/**
 * Stream semua user dari koleksi `users` secara real-time.
 * Diurutkan berdasarkan createdAt descending.
 */
export const getUsersStream = (callback: (users: UserData[]) => void) => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    return onSnapshot(
        q,
        (snapshot) => {
            const users: UserData[] = [];
            snapshot.forEach((d) => {
                users.push({ id: d.id, ...d.data() } as UserData);
            });
            callback(users);
        },
        (error) => {
            console.error('User stream error:', error);
            callback([]);
        }
    );
};

// ─── Invite (Create Pending User) ────────────────────────────────────────────

/**
 * Membuat dokumen user baru di koleksi `users` dengan status `pending`.
 * Akun Firebase Auth akan dibuat saat user pertama kali login.
 */
export const inviteUser = async (payload: InviteUserPayload) => {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            displayName: payload.displayName,
            email: payload.email.toLowerCase().trim(),
            role: payload.role,
            status: 'pending',
            tenantId: payload.tenantId || '',
            tenantName: payload.tenantName || '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error('Error inviting user:', error);
        return { success: false, error: `Gagal menambahkan user: ${error.message}` };
    }
};

// ─── Update Role ──────────────────────────────────────────────────────────────

/**
 * Ubah role seorang user.
 */
export const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
        await updateDoc(doc(db, 'users', userId), {
            role: newRole,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error('Error updating user role:', error);
        return { success: false, error: error.message };
    }
};

// ─── Update Status ────────────────────────────────────────────────────────────

/**
 * Aktifkan atau nonaktifkan akun user.
 * Status 'disabled' memblokir akses tanpa menghapus data.
 */
export const updateUserStatus = async (userId: string, newStatus: UserStatus) => {
    try {
        await updateDoc(doc(db, 'users', userId), {
            status: newStatus,
            updatedAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error('Error updating user status:', error);
        return { success: false, error: error.message };
    }
};

// ─── Delete User ──────────────────────────────────────────────────────────────

/**
 * Hapus dokumen user dari Firestore.
 * CATATAN: Ini tidak menghapus akun Firebase Auth — hanya data Firestore-nya.
 */
export const deleteUserDoc = async (userId: string) => {
    try {
        await deleteDoc(doc(db, 'users', userId));
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return { success: false, error: error.message };
    }
};

// ─── Get Single User ──────────────────────────────────────────────────────────

export const getUserById = async (userId: string): Promise<UserData | null> => {
    try {
        const docSnap = await getDoc(doc(db, 'users', userId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as UserData;
        }
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};
