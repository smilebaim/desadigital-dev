
export type MenuItem = {
  id: number;
  title: string;
  path: string;
  menuId: number;
  parentId: number | null;
  icon: string | null;
};

export type Menu = {
  id: number;
  name: string;
  items: MenuItem[];
};
