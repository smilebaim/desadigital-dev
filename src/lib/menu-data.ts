export interface MenuItem {
  id: number;
  title: string;
  path: string;
  icon?: string;
  parentId?: number | null;
  menuId: number;
}

export interface Menu {
  id: number;
  name: string;
  items: MenuItem[];
}

export const MENUS: Menu[] = [
  {
    id: 1,
    name: "TopNav",
    items: [
      { id: 1, title: 'Beranda', path: '/', menuId: 1, parentId: null },
      { id: 2, title: 'Profil Desa', path: '/profil/profil-desa', menuId: 1, parentId: null },
      { id: 3, title: 'Sejarah Desa', path: '/profil/sejarah-desa', menuId: 1, parentId: 2 },
      { id: 4, title: 'Visi & Misi', path: '/profil/visi-misi', menuId: 1, parentId: 2 },
      { id: 5, title: 'Pemerintahan', path: '/profil/struktur-pemerintah', menuId: 1, parentId: 2 },
      { id: 6, title: 'Pembangunan', path: '/pembangunan/daftar-program', menuId: 1, parentId: null },
      { id: 7, title: 'Layanan', path: '/layanan/persuratan', menuId: 1, parentId: null },
    ],
  },
  {
    id: 2,
    name: "BottomNav",
    items: [
        { id: 8, title: 'Profil', path: '/profil/profil-desa', menuId: 2, parentId: null },
        { id: 9, title: 'Tata Ruang', path: '/tata-ruang', menuId: 2, parentId: null },
        { id: 10, title: 'Pembangunan', path: '/pembangunan/daftar-program', menuId: 2, parentId: null },
        { id: 11, title: 'Dana Desa', path: '/dana-desa/pendapatan', menuId: 2, parentId: null },
        { id: 12, title: 'Indeks', path: '/indeks/ketahanan-sosial', menuId: 2, parentId: null },
    ],
  },
];
