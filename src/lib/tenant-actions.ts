import { db } from '@/firebase/config';
import { 
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc, 
    doc, 
    serverTimestamp,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot
} from 'firebase/firestore';

export interface TenantData {
  id?: string;
  name: string;
  subdomain: string;
  adminEmail: string;
  status: 'active' | 'suspended';
  createdAt?: any;
}

// Add a new tenant (village)
export const addTenant = async (tenantData: Omit<TenantData, 'id' | 'createdAt' | 'status'>) => {
    try {
        // Validation: enforce lowercase alphanumeric subdomain
        const cleanSubdomain = tenantData.subdomain.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Validation: check if subdomain already exists
        const q = query(collection(db, "tenants"), where("subdomain", "==", cleanSubdomain));
        const snapshots = await getDocs(q);
        if(!snapshots.empty) {
            return { success: false, error: 'Subdomain sudah digunakan. Silahkan pilih yang lain.' };
        }

        const docRef = await addDoc(collection(db, "tenants"), {
            name: tenantData.name,
            subdomain: cleanSubdomain,
            adminEmail: tenantData.adminEmail,
            status: 'active',
            createdAt: serverTimestamp()
        });
        
        // Also automatically create an entry in workspaces for backward compatibility if needed
        await addDoc(collection(db, "workspaces"), {
            name: tenantData.name,
            description: `Workspace otomatis untuk desa ${tenantData.name}`,
            ownerUid: 'system', // or the superadmin uid
            tenantId: cleanSubdomain,
            members: [],
            createdAt: serverTimestamp()
        });

        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Error adding tenant: ", error);
        return { success: false, error: error.message };
    }
};

// Stream tenants for dashboard
export const getTenantsStream = (callback: (tenants: TenantData[]) => void) => {
    const q = query(collection(db, 'tenants'));
    return onSnapshot(q, (querySnapshot) => {
        const tenants: TenantData[] = [];
        querySnapshot.forEach((doc) => {
            tenants.push({ id: doc.id, ...doc.data() } as TenantData);
        });
        callback(tenants);
    }, (error) => {
        console.error("Error streaming tenants:", error);
    });
};

export const deleteTenant = async (tenantId: string) => {
    try {
        await deleteDoc(doc(db, "tenants", tenantId));
        return true;
    } catch (error) {
        console.error("Error deleting tenant:", error);
        return false;
    }
}
