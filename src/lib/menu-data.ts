
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

export const menus: Menu[] = [
  {
    id: 1,
    name: "TopNav",
    items: [
      { id: 1, title: 'Profil', path: '/profil/profil-desa', menuId: 1, parentId: null, icon: null },
      { id: 2, title: 'Sejarah Desa', path: '/profil/sejarah-desa', menuId: 1, parentId: 1, icon: 'History' },
      { id: 3, title: 'Perkembangan', path: '/profil/perkembangan', menuId: 1, parentId: 1, icon: 'ChevronUp' },
      { id: 4, title: 'Visi & Misi', path: '/profil/visi-misi', menuId: 1, parentId: 1, icon: 'Target' },
      { id: 5, title: 'Layanan', path: '/layanan', menuId: 1, parentId: null, icon: null },
      { id: 6, title: 'Persuratan', path: '/layanan/persuratan', menuId: 1, parentId: 5, icon: 'ScrollText' },
      { id: 7, title: 'Perlindungan Sosial', path: '/layanan/perlindungan-sosial', menuId: 1, parentId: 5, icon: 'HeartHandshake' },
      { id: 8, title: 'Penanganan Keluhan', path: '/layanan/penanganan-keluhan', menuId: 1, parentId: 5, icon: 'MessageSquareWarning' },
      { id: 9, title: 'Monografi Desa', path: '/layanan/monografi-desa', menuId: 1, parentId: 5, icon: 'BookOpen' },
      { id: 10, title: 'Peraturan Desa', path: '/layanan/peraturan-desa', menuId: 1, parentId: 5, icon: 'Scale' },
    ],
  },
  {
    id: 2,
    name: "BottomNav",
    items: [
        { id: 11, title: 'Profil', path: '/profil/profil-desa', menuId: 2, parentId: null, icon: 'User' },
        { id: 12, title: 'Profil Desa', path: '/profil/profil-desa', menuId: 2, parentId: 11, icon: 'Home' },
        { id: 13, title: 'Sejarah Desa', path: '/profil/sejarah-desa', menuId: 2, parentId: 11, icon: 'History' },
        { id: 14, title: 'Visi & Misi', path: '/profil/visi-misi', menuId: 2, parentId: 11, icon: 'Target' },
        { id: 15, title: 'Arah Kebijakan', path: '/profil/arah-kebijakan', menuId: 2, parentId: 11, icon: 'Compass' },
        { id: 16, title: 'Pembangunan', path: '/pembangunan/daftar-program', menuId: 2, parentId: null, icon: 'Building2' },
        { id: 17, title: 'Daftar Program', path: '/pembangunan/daftar-program', menuId: 2, parentId: 16, icon: 'ListTodo' },
        { id: 18, title: 'Indeks Desa Membangun', path: '/pembangunan/idm', menuId: 2, parentId: 16, icon: 'FileText' },
        { id: 19, title: 'Ketahanan Desa', path: '/pembangunan/ketahanan-desa', menuId: 2, parentId: 16, icon: 'FileText' },
        { id: 20, title: 'Dana Desa', path: '/dana-desa', menuId: 2, parentId: null, icon: 'Wallet' },
        { id: 21, title: 'Pendapatan', path: '/dana-desa/pendapatan', menuId: 2, parentId: 20, icon: 'FileText' },
        { id: 22, title: 'Belanja', path: '/dana-desa/belanja', menuId: 2, parentId: 20, icon: 'FileText' },
        { id: 23, title: 'Pembiayaan', path: '/dana-desa/pembiayaan', menuId: 2, parentId: 20, icon: 'FileText' },
    ],
  },
];
