
'use server';
import { db } from '@/firebase/config';
import { 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import type { Menu, MenuItem } from './menu-data';
import { initialPages } from './initial-pages';

// Add a new menu
export const addMenu = async (menuData: Omit<Menu, 'id' | 'items' | 'createdAt'>) => {
    try {
        const docRef = await addDoc(collection(db, 'menus'), {
            ...menuData,
            createdAt: serverTimestamp()
        });
        return { success: true, id: docRef.id };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Update a menu's details (not its items)
export const updateMenu = async (menuId: string, data: Partial<Omit<Menu, 'id' | 'items' | 'createdAt'>>) => {
    try {
        const menuDocRef = doc(db, 'menus', menuId);
        await updateDoc(menuDocRef, data);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Delete a menu and all its items
export const deleteMenu = async (menuId: string) => {
    try {
        const menuDocRef = doc(db, 'menus', menuId);
        const menuDocSnap = await getDoc(menuDocRef);

        if (!menuDocSnap.exists()) {
            return { success: true, message: "Menu tidak ditemukan, mungkin sudah dihapus." };
        }

        const batch = writeBatch(db);

        const itemsCollectionRef = collection(db, 'menus', menuId, 'items');
        const itemsSnapshot = await getDocs(itemsCollectionRef);
        itemsSnapshot.forEach(itemDoc => {
            batch.delete(itemDoc.ref);
        });

        batch.delete(menuDocRef);

        await batch.commit();

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};


// Get all menus with their items
export const getMenusWithItems = async (): Promise<Menu[]> => {
  try {
    const menusCollectionRef = collection(db, 'menus');
    const menuSnapshot = await getDocs(query(menusCollectionRef, orderBy('createdAt')));
    
    const menus = await Promise.all(menuSnapshot.docs.map(async (menuDoc) => {
      const menuData = menuDoc.data();
      const menuId = menuDoc.id;

      const itemsCollectionRef = collection(db, 'menus', menuId, 'items');
      const itemsQuery = query(itemsCollectionRef, orderBy('order'));
      const itemsSnapshot = await getDocs(itemsQuery);
      
      const items = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<MenuItem, 'id'>)
      }));
      
      return {
        id: menuId,
        name: menuData.name,
        description: menuData.description,
        location: menuData.location,
        icon: menuData.icon,
        createdAt: menuData.createdAt?.toDate().toISOString() || new Date().toISOString(),
        items,
      };
    }));

    return menus as Menu[];
  } catch (error) {
    console.error("Error fetching menus with items: ", error);
    return [];
  }
};


// Get all menus (without items)
export const getMenus = async (): Promise<Menu[]> => {
  try {
    const menusCollection = collection(db, 'menus');
    const menuSnapshot = await getDocs(menusCollection);
    const menus = menuSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        location: data.location,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      }
    });
    return menus as Menu[];
  } catch (error) {
    console.error("Error fetching menus: ", error);
    return [];
  }
};

// Get a single menu with its items
export const getMenuDetails = async (menuId: string): Promise<Menu | null> => {
    try {
        const menuDocRef = doc(db, 'menus', menuId);
        const menuSnap = await getDoc(menuDocRef);

        if (!menuSnap.exists()) {
            return null;
        }

        const menuData = menuSnap.data();

        const itemsCollectionRef = collection(db, 'menus', menuId, 'items');
        const itemsQuery = query(itemsCollectionRef, orderBy('order'));
        const itemsSnapshot = await getDocs(itemsQuery);
        
        const items = itemsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<MenuItem, 'id'>)
        }));

        return {
          id: menuSnap.id,
          name: menuData.name,
          description: menuData.description,
          location: menuData.location,
          icon: menuData.icon,
          createdAt: menuData.createdAt?.toDate().toISOString() || new Date().toISOString(),
          items,
        } as Menu;
    } catch (error) {
        console.error("Error fetching menu details: ", error);
        return null;
    }
};

// Add a new menu item
export const addMenuItem = async (menuId: string, itemData: Omit<MenuItem, 'id'>) => {
    try {
        const itemsCollectionRef = collection(db, 'menus', menuId, 'items');
        await addDoc(itemsCollectionRef, itemData);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Update a menu item
export const updateMenuItem = async (menuId: string, itemId: string, itemData: Partial<Omit<MenuItem, 'id'>>) => {
    try {
        const itemDocRef = doc(db, 'menus', menuId, 'items', itemId);
        await updateDoc(itemDocRef, itemData);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Delete a menu item and its children
export const deleteMenuItem = async (menuId: string, itemId: string) => {
    try {
        const batch = writeBatch(db);
        const itemsCollectionRef = collection(db, 'menus', menuId, 'items');
        
        const itemToDeleteRef = doc(itemsCollectionRef, itemId);
        batch.delete(itemToDeleteRef);

        const qChildren = query(itemsCollectionRef, where("parentId", "==", itemId));
        const childrenSnapshot = await getDocs(qChildren);
        childrenSnapshot.forEach(childDoc => {
            batch.delete(childDoc.ref);
        });

        await batch.commit();
        
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting menu item and its children:", error);
        return { success: false, error: error.message };
    }
};

// Updates the order of a list of menu items
export const updateMenuItemsOrder = async (menuId: string, items: { id: string, order: number }[]) => {
    try {
        const batch = writeBatch(db);
        const itemsCollectionRef = collection(db, 'menus', menuId, 'items');

        items.forEach(item => {
            const itemRef = doc(itemsCollectionRef, item.id);
            batch.update(itemRef, { order: item.order });
        });

        await batch.commit();
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Seed default menus and items
export const seedDefaultMenus = async () => {
    const menusCollection = collection(db, 'menus');
    const snapshot = await getDocs(menusCollection);
    
    if (!snapshot.empty) {
        return { success: true, message: 'Menu sudah ada.' };
    }
    
    const batch = writeBatch(db);

    try {
        const bottomNavMenuStructure = [
            { title: 'Profil Desa', path: '/profil', icon: 'Landmark', order: 0, children: initialPages.filter(p => p.slug.startsWith('profil/')) },
            { title: 'Pembangunan', path: '/pembangunan', icon: 'Construction', order: 1, children: [{title: 'RPJMDes', slug: 'pembangunan/rpjmdes'}, {title: 'RKPDes', slug: 'pembangunan/rkpdes'}] },
            { title: 'Dana Desa', path: '/dana-desa', icon: 'Wallet', order: 2, children: [{title: 'Pendapatan', slug: 'dana-desa/pendapatan'}, {title: 'Belanja', slug: 'dana-desa/belanja'}] },
            { title: 'Peta', path: '/tata-ruang', icon: 'Map', order: 3, children: [] },
        ];

        const topNavMenuStructure = [
            { title: 'Layanan Publik', path: '/layanan', icon: 'Briefcase', order: 0, children: [
                ...initialPages.filter(p => p.slug.startsWith('layanan/')),
                { title: "Pos Kesehatan Desa", slug: "layanan/poskesdes" },
                { title: "Menu Pendamping Gizi", slug: "layanan/mpg" },
                { title: "Bank Sampah", slug: "layanan/bank-sampah" },
                { title: "Pos Keamanan Lingkungan", slug: "layanan/poskamling" },
            ]},
            { title: 'Kelembagaan', path: '/kelembagaan', icon: 'Library', order: 1, children: initialPages.filter(p => p.slug.startsWith('kelembagaan/')) },
            { title: 'Ekonomi', path: '/ekonomi', icon: 'TrendingUp', order: 2, children: [{title: 'BUMDes', slug: 'ekonomi/bumdes'}, {title: 'Koperasi', slug: 'ekonomi/koperasi'}, {title: 'UMKM', slug: 'ekonomi/umkm'}] },
            { title: 'Pustaka', path: '/pustaka', icon: 'BookOpen', order: 3, children: [{title: 'Publikasi', slug: 'pustaka/publikasi'}, {title: 'Pustaka Desa', slug: 'pustaka/pustaka-desa'}] },
        ];

        // --- BOTTOM NAV ---
        const bottomNavRef = doc(menusCollection);
        batch.set(bottomNavRef, { name: 'Navigasi Bawah', description: 'Menu utama di bagian bawah layar.', location: 'bottomnav', createdAt: serverTimestamp() });

        for (const parent of bottomNavMenuStructure) {
            const parentItemRef = doc(collection(db, bottomNavRef.path, 'items'));
            batch.set(parentItemRef, { title: parent.title, path: parent.path, icon: parent.icon, order: parent.order, parentId: null });
            
            if (parent.children.length > 0) {
                parent.children.forEach((child, index) => {
                    const childItemRef = doc(collection(db, bottomNavRef.path, 'items'));
                    batch.set(childItemRef, { title: child.title, path: `/${child.slug}`, icon: 'FileText', order: index, parentId: parentItemRef.id });
                });
            }
        }
        
        // --- TOP NAV (for sub-menus) ---
        const topNavRef = doc(menusCollection);
        batch.set(topNavRef, { name: 'Menu Utama', description: 'Menu utama di dalam menu geser (sheet).', location: 'topnav', createdAt: serverTimestamp() });
        
        for (const parent of topNavMenuStructure) {
            const parentItemRef = doc(collection(db, topNavRef.path, 'items'));
            batch.set(parentItemRef, { title: parent.title, path: parent.path, icon: parent.icon, order: parent.order, parentId: null });
            
            parent.children.forEach((child, index) => {
                const childItemRef = doc(collection(db, topNavRef.path, 'items'));
                batch.set(childItemRef, { title: child.title, path: `/${child.slug}`, icon: 'FileText', order: index, parentId: parentItemRef.id });
            });
        }
        
        await batch.commit();
        return { success: true, message: 'Menu default berhasil dibuat.' };
    } catch (error: any) {
        console.error("Error seeding default menus:", error);
        return { success: false, error: error.message };
    }
};
