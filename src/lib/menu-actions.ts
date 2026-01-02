'use server';
import { menus } from './menu-data';

export async function getMenus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menus);
    }, 500); // Simulate network delay
  });
}

export async function getMenuDetails(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isNaN(id)) {
        resolve(null);
      }
      
      const menu = menus.find(m => m.id === id);
      
      if (!menu) {
        resolve(null);
      } else {
        // Simulate include items with ordering
        const menuWithItems = {
          ...menu,
          items: menu.items.sort((a, b) => {
            if (a.parentId === b.parentId) {
              return a.id - b.id;
            }
            if (a.parentId === null) return -1;
            if (b.parentId === null) return 1;
            return a.parentId - b.parentId;
          })
        };
        resolve(menuWithItems);
      }
    }, 500); // Simulate network delay
  });
}
