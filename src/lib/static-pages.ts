export interface StaticPage {
  id: string;
  title: string;
  path: string;
  menuName?: string;
}

export const staticPages: StaticPage[] = [
  // Profil
  { id: 'profil-1', title: "Profil Desa", path: "/profil/profil-desa", menuName: "Statis" },
  { id: 'profil-2', title: "Sejarah Desa", path: "/profil/sejarah-desa", menuName: "Statis" },
  { id: 'profil-3', title: "Visi & Misi", path: "/profil/visi-misi", menuName: "Statis" },
  { id: 'profil-4', title: "Struktur Pemerintahan", path: "/profil/struktur-pemerintah", menuName: "Statis" },
  { id: 'profil-5', title: "Arah Kebijakan", path: "/profil/arah-kebijakan", menuName: "Statis" },
  { id: 'profil-6', title: "Perkembangan", path: "/profil/perkembangan", menuName: "Statis" },
  
  // Pembangunan
  { id: 'pembangunan-1', title: "RPJMDes", path: "/pembangunan/rpjmdes", menuName: "Statis" },
  { id: 'pembangunan-2', title: "RKPDes", path: "/pembangunan/rkpdes", menuName: "Statis" },
  { id: 'pembangunan-3', title: "Daftar Program", path: "/pembangunan/daftar-program", menuName: "Statis" },

  // Layanan
  { id: 'layanan-1', title: "Persuratan", path: "/layanan/persuratan", menuName: "Statis" },
  { id: 'layanan-2', title: "Penanganan Keluhan", path: "/layanan/penanganan-keluhan", menuName: "Statis" },
  { id: 'layanan-3', title: "Peraturan Desa", path: "/layanan/peraturan-desa", menuName: "Statis" },
  { id: 'layanan-4', title: "Monografi Desa", path: "/layanan/monografi-desa", menuName: "Statis" },
  { id: 'layanan-5', title: "Posyandu", path: "/layanan/posyandu", menuName: "Statis" },
  { id: 'layanan-6', title: "Perlindungan Sosial", path: "/layanan/perlindungan-sosial", menuName: "Statis" },
  { id: 'layanan-7', title: "Mitra Pembangunan Desa (MPG)", path: "/layanan/mpg", menuName: "Statis" },
  
  // Kelembagaan
  { id: 'kelembagaan-1', title: "PKK", path: "/kelembagaan/pkk", menuName: "Statis" },
  { id: 'kelembagaan-2', title: "LKMD", path: "/kelembagaan/lkmd", menuName: "Statis" },

  // Ekonomi
  { id: 'ekonomi-1', title: "BUMDes", path: "/ekonomi/bumdes", menuName: "Statis" },
  { id: 'ekonomi-2', title: "UMKM", path: "/ekonomi/umkm", menuName: "Statis" },
  { id: 'ekonomi-3', title: "Koperasi", path: "/ekonomi/koperasi", menuName: "Statis" },

  // Dana Desa
  { id: 'dana-1', title: "Pendapatan", path: "/dana-desa/pendapatan", menuName: "Statis" },
  { id: 'dana-2', title: "Belanja", path: "/dana-desa/belanja", menuName: "Statis" },
  { id: 'dana-3', title: "Pembiayaan", path: "/dana-desa/pembiayaan", menuName: "Statis" },
  
  // Aktivitas
  { id: 'aktivitas-1', title: "Agenda", path: "/aktivitas/agenda", menuName: "Statis" },
  { id: 'aktivitas-2', title: "Kalender Kegiatan", path: "/aktivitas/kalender-kegiatan", menuName: "Statis" },
  { id: 'aktivitas-3', title: "Kalender Pangan", path: "/aktivitas/kalender-pangan", menuName: "Statis" },

  // Pustaka
  { id: 'pustaka-1', title: "Pustaka Desa", path: "/pustaka/pustaka-desa", menuName: "Statis" },
  { id: 'pustaka-2', title: "Publikasi", path: "/pustaka/publikasi", menuName: "Statis" },
  
  // Indeks
  { id: 'indeks-1', title: "Ketahanan Sosial", path: "/indeks/ketahanan-sosial", menuName: "Statis" },
  { id: 'indeks-2', title: "Ketahanan Ekonomi", path: "/indeks/ketahanan-ekonomi", menuName: "Statis" },
  { id: 'indeks-3', title: "Ketahanan Lingkungan", path: "/indeks/ketahanan-lingkungan", menuName: "Statis" },

  // Other
  { id: 'other-1', title: "Berita", path: "/berita", menuName: "Statis" },
  { id: 'other-2', title: "Peta Tata Ruang", path: "/tata-ruang", menuName: "Statis" },
  { id: 'other-3', title: "Pencarian", path: "/search", menuName: "Statis" },
];
