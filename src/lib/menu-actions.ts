'use server';

import { MENUS } from './menu-data';
import type { Menu, MenuItem } from './menu-data';

// Simulate fetching all menus
export const getMenus = async (): Promise<Menu[]> => {
  // In a real app, this would fetch from a database
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(MENUS)));
    }, 500);
  });
};

// Simulate fetching details for a single menu, including its items
export const getMenuDetails = async (menuId: number): Promise<(Menu & { items: MenuItem[] }) | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const menu = MENUS.find(m => m.id === menuId);
      if (menu) {
        // In a real app, you might fetch items separately and join them.
        // Here, the items are already part of the menu object.
        resolve(JSON.parse(JSON.stringify(menu)));
      } else {
        resolve(null);
      }
    }, 500);
  });
};
