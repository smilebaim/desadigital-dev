import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    deleteDoc,
    updateDoc, 
    doc, 
    serverTimestamp,
    getDocs,
    query,
    where,
    onSnapshot,
    writeBatch,
    DocumentData,
    Query,
    limit,
    startAfter,
    QueryDocumentSnapshot,
} from 'firebase/firestore';

export interface TenantData {
  id?: string;
  name: string;
  subdomain: string;
  adminEmail: string;
  status: 'active' | 'suspended';
  createdAt?: any;
}

// ─── Helper: Chunked Collection Delete ───────────────────────────────────────
/**
 * Menghapus semua dokumen dalam suatu Query secara aman, batch per 400 dokumen.
 * Menghindari batas 500 operasi per-batch Firestore.
 */
const deleteQueryBatch = async (baseQuery: Query<DocumentData>) => {
    const CHUNK_SIZE = 400;
    let lastDoc: QueryDocumentSnapshot<DocumentData> | undefined = undefined;
    let hasMore = true;

    while (hasMore) {
        const pageQuery: Query<DocumentData> = lastDoc
            ? query(baseQuery, limit(CHUNK_SIZE), startAfter(lastDoc))
            : query(baseQuery, limit(CHUNK_SIZE));

        const snapshot = await getDocs(pageQuery);
        if (snapshot.size === 0) break;

        const batch = writeBatch(db);
        snapshot.docs.forEach((d) => batch.delete(d.ref));
        await batch.commit();

        lastDoc = snapshot.docs[snapshot.docs.length - 1] as QueryDocumentSnapshot<DocumentData>;
        if (snapshot.size < CHUNK_SIZE) hasMore = false;
    }
};

// ─── Add Tenant ───────────────────────────────────────────────────────────────
export const addTenant = async (tenantData: Omit<TenantData, 'id' | 'createdAt' | 'status'>) => {
    try {
        const cleanSubdomain = tenantData.subdomain.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        if (!cleanSubdomain) {
            return { success: false, error: 'Subdomain tidak valid. Gunakan huruf dan angka saja.' };
        }
        
        // Check subdomain uniqueness
        const q = query(collection(db, "tenants"), where("subdomain", "==", cleanSubdomain));
        const snapshots = await getDocs(q);
        if (!snapshots.empty) {
            return { success: false, error: `Subdomain "${cleanSubdomain}" sudah digunakan. Pilih nama lain.` };
        }

        const docRef = await addDoc(collection(db, "tenants"), {
            name: tenantData.name,
            subdomain: cleanSubdomain,
            adminEmail: tenantData.adminEmail,
            status: 'active',
            createdAt: serverTimestamp()
        });

        // Auto-create workspace entry for the new tenant
        await addDoc(collection(db, "workspaces"), {
            name: tenantData.name,
            description: `Workspace otomatis untuk desa ${tenantData.name}`,
            ownerUid: 'system',
            tenantId: cleanSubdomain,
            members: [],
            createdAt: serverTimestamp()
        });

        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Error adding tenant:", error);
        return { success: false, error: `Gagal menyimpan ke database: ${error.message}` };
    }
};

// ─── Real-time Stream ─────────────────────────────────────────────────────────
export const getTenantsStream = (callback: (tenants: TenantData[]) => void) => {
    const q = query(collection(db, 'tenants'));
    return onSnapshot(q, (querySnapshot) => {
        const tenants: TenantData[] = [];
        querySnapshot.forEach((d) => {
            tenants.push({ id: d.id, ...d.data() } as TenantData);
        });
        tenants.sort((a, b) => {
            const aTime = a.createdAt?.seconds ?? 0;
            const bTime = b.createdAt?.seconds ?? 0;
            return bTime - aTime;
        });
        callback(tenants);
    }, (error) => {
        console.error("Firestore stream error:", error);
        callback([]);
    });
};

// ─── Update Status ────────────────────────────────────────────────────────────
export const updateTenantStatus = async (tenantId: string, newStatus: 'active' | 'suspended') => {
    try {
        await updateDoc(doc(db, "tenants", tenantId), {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating tenant status:", error);
        return { success: false, error: error.message };
    }
};

// ─── Cascade Delete ───────────────────────────────────────────────────────────
/**
 * Menghapus tenant beserta SEMUA data yang terkait secara aman:
 *   1. Dokumen tenant utama
 *   2. site_settings/{tenantSubdomain}
 *   3. workspaces WHERE tenantId == subdomain (+ sub-koleksi items)
 *   4. users WHERE tenantId == subdomain
 *
 * CATATAN: Data `penduduk` dan `surat_*` tidak memiliki tenantId pada arsitektur
 * lama (single-tenant), sehingga tidak dapat dihapus per-tenant secara selektif.
 */
export const deleteTenant = async (tenantDocId: string, tenantSubdomain: string) => {
    try {
        // ── 1. Delete main tenant document ──────────────────────────────────
        await deleteDoc(doc(db, "tenants", tenantDocId));

        // ── 2. Delete site_settings for this tenant ──────────────────────────
        try {
            await deleteDoc(doc(db, "site_settings", tenantSubdomain));
        } catch {
            // May not exist if never configured — safe to ignore
        }

        // ── 3. Delete associated workspaces (+ their items sub-collection) ───
        const workspacesQuery = query(
            collection(db, "workspaces") as Query<DocumentData>,
            where("tenantId", "==", tenantSubdomain)
        );
        const workspaceSnaps = await getDocs(workspacesQuery);
        for (const wsDoc of workspaceSnaps.docs) {
            // Delete the items sub-collection first
            const itemsBaseQuery = query(
                collection(db, 'workspaces', wsDoc.id, 'items') as Query<DocumentData>
            );
            await deleteQueryBatch(itemsBaseQuery);
            // Then delete the workspace document itself
            await deleteDoc(wsDoc.ref);
        }

        // ── 4. Delete users associated with this tenant ──────────────────────
        const usersQuery = query(
            collection(db, "users") as Query<DocumentData>,
            where("tenantId", "==", tenantSubdomain)
        );
        await deleteQueryBatch(usersQuery);

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting tenant:", error);
        return { success: false, error: `Gagal menghapus: ${error.message}` };
    }
};

// ─── Check Firestore Connection ───────────────────────────────────────────────
export const checkFirestoreConnection = async (): Promise<'online' | 'offline'> => {
    try {
        const q = query(collection(db, 'tenants'), limit(1));
        await getDocs(q);
        return 'online';
    } catch {
        return 'offline';
    }
};
