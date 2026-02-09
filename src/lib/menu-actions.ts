
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

// Swap the order of two menu items
export const swapMenuItemOrder = async (menuId: string, itemId1: string, order1: number, itemId2: string, order2: number) => {
    try {
        const batch = writeBatch(db);
        const item1Ref = doc(db, 'menus', menuId, 'items', itemId1);
        const item2Ref = doc(db, 'menus', menuId, 'items', itemId2);

        batch.update(item1Ref, { order: order2 });
        batch.update(item2Ref, { order: order1 });

        await batch.commit();
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
