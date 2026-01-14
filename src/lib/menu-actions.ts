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
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import type { Menu, MenuItem } from './menu-data';

// Add a new menu
export const addMenu = async (menuData: Omit<Menu, 'id' | 'items' | 'createdAt'>) => {
    try {
        await addDoc(collection(db, 'menus'), {
            ...menuData,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

// Get all menus with their items
export const getMenusWithItems = async (): Promise<Menu[]> => {
  try {
    const menusCollectionRef = collection(db, 'menus');
    const menuSnapshot = await getDocs(menusCollectionRef);
    
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
        createdAt: menuData.createdAt?.toDate().toISOString() || null,
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
        createdAt: data.createdAt?.toDate().toISOString() || null,
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
          createdAt: menuData.createdAt?.toDate().toISOString() || null,
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

// Delete a menu item
export const deleteMenuItem = async (menuId: string, itemId: string) => {
    try {
        const itemDocRef = doc(db, 'menus', menuId, 'items', itemId);
        await deleteDoc(itemDocRef);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
