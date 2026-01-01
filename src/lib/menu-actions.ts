'use server';
import { menus } from './menu-data';

export async function getMenus() {
  return menus;
}

export async function getMenuDetails(id: number) {
  if (isNaN(id)) {
    return null;
  }
  
  const menu = menus.find(m => m.id === id);
  
  if (!menu) {
    return null;
  }

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

  return menuWithItems;
}
