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
    writeBatch
} from 'firebase/firestore';

export interface TenantData {
  id?: string;
  name: string;
  subdomain: string;
  adminEmail: string;
  status: 'active' | 'suspended';
  createdAt?: any;
}

// Add a new tenant (village) — validates subdomain uniqueness first
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

        // Auto-create site_settings entry for the new tenant based on defaults
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

// Real-time stream of all tenants
export const getTenantsStream = (callback: (tenants: TenantData[]) => void) => {
    const q = query(collection(db, 'tenants'));
    return onSnapshot(q, (querySnapshot) => {
        const tenants: TenantData[] = [];
        querySnapshot.forEach((d) => {
            tenants.push({ id: d.id, ...d.data() } as TenantData);
        });
        // Sort by createdAt descending
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

// Toggle tenant status between active and suspended
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

// Cascade delete: removes tenant + its site_settings + associated workspaces
export const deleteTenant = async (tenantDocId: string, tenantSubdomain: string) => {
    try {
        const batch = writeBatch(db);

        // 1. Delete the tenant document itself
        batch.delete(doc(db, "tenants", tenantDocId));

        // 2. Delete tenant-specific site_settings
        batch.delete(doc(db, "site_settings", tenantSubdomain));

        // 3. Find and delete associated workspaces
        const workspacesQuery = query(
            collection(db, "workspaces"),
            where("tenantId", "==", tenantSubdomain)
        );
        const workspaceSnaps = await getDocs(workspacesQuery);
        workspaceSnaps.forEach((d) => {
            batch.delete(d.ref);
        });

        await batch.commit();
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting tenant:", error);
        return { success: false, error: error.message };
    }
};

// Check if Firestore is reachable
export const checkFirestoreConnection = async (): Promise<'online' | 'offline'> => {
    try {
        const q = query(collection(db, 'tenants'));
        await getDocs(q);
        return 'online';
    } catch {
        return 'offline';
    }
};
