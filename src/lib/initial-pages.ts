export interface InitialPage {
  title: string;
  slug: string;
  content: string;
}

export const initialPages: InitialPage[] = [
  // Profil
  { 
    title: "Profil Desa", 
    slug: "profil/profil-desa", 
    content: "<h1>Profil Desa</h1><p>Halaman ini berisi informasi umum mengenai profil Desa Remau Bako Tuo. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Sejarah Desa", 
    slug: "profil/sejarah-desa", 
    content: "<h1>Sejarah Desa</h1><p>Halaman ini akan menceritakan sejarah terbentuknya Desa Remau Bako Tuo. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Visi & Misi", 
    slug: "profil/visi-misi", 
    content: "<h1>Visi & Misi</h1><p>Berikut adalah visi dan misi Desa Remau Bako Tuo. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Struktur Pemerintahan", 
    slug: "profil/struktur-pemerintahan", 
    content: "<h1>Struktur Pemerintahan</h1><p>Struktur organisasi dan perangkat pemerintahan desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  
  // Pembangunan
  { 
    title: "RPJMDes", 
    slug: "pembangunan/rpjmdes", 
    content: "<h1>RPJMDes</h1><p>Informasi mengenai Rencana Pembangunan Jangka Menengah Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "RKPDes", 
    slug: "pembangunan/rkpdes", 
    content: "<h1>RKPDes</h1><p>Informasi mengenai Rencana Kerja Pemerintah Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },

  // Layanan
  { 
    title: "Layanan Persuratan", 
    slug: "layanan/persuratan", 
    content: "<h1>Layanan Persuratan</h1><p>Informasi mengenai prosedur dan jenis surat yang dapat diurus di kantor desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Penanganan Keluhan", 
    slug: "layanan/penanganan-keluhan", 
    content: "<h1>Penanganan Keluhan</h1><p>Sistem dan prosedur untuk menyampaikan keluhan atau aspirasi. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  
  // Kelembagaan
  { 
    title: "PKK", 
    slug: "kelembagaan/pkk", 
    content: "<h1>PKK</h1><p>Informasi mengenai kegiatan dan struktur organisasi PKK Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Lembaga Kemasyarakatan Desa (LKD)", 
    slug: "kelembagaan/lkd", 
    content: "<h1>LKD</h1><p>Daftar dan informasi mengenai Lembaga Kemasyarakatan Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Karang Taruna", 
    slug: "kelembagaan/karang-taruna", 
    content: "<h1>Karang Taruna</h1><p>Kegiatan dan informasi seputar Karang Taruna desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },

  // Ekonomi
  { 
    title: "BUMDes", 
    slug: "ekonomi/bumdes", 
    content: "<h1>BUMDes</h1><p>Profil dan unit usaha Badan Usaha Milik Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "UMKM Desa", 
    slug: "ekonomi/umkm", 
    content: "<h1>UMKM Desa</h1><p>Daftar dan promosi produk-produk UMKM yang ada di desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },

  // Dana Desa
  { 
    title: "Laporan Pendapatan Desa", 
    slug: "dana-desa/pendapatan", 
    content: "<h1>Pendapatan Desa</h1><p>Laporan Transparansi Pendapatan Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Laporan Belanja Desa", 
    slug: "dana-desa/belanja", 
    content: "<h1>Belanja Desa</h1><p>Laporan Transparansi Belanja Desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },

  // Aktivitas
  { 
    title: "Agenda Kegiatan", 
    slug: "aktivitas/agenda", 
    content: "<h1>Agenda Kegiatan Desa</h1><p>Jadwal dan agenda kegiatan yang akan datang di desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },

  // Pustaka
  { 
    title: "Pustaka Digital Desa", 
    slug: "pustaka/pustaka-desa", 
    content: "<h1>Pustaka Digital</h1><p>Arsip dan dokumen digital milik desa. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  
  // Indeks Desa Membangun
  { 
    title: "Ketahanan Sosial", 
    slug: "indeks/ketahanan-sosial", 
    content: "<h1>Indeks Ketahanan Sosial</h1><p>Informasi mengenai skor dan komponen Indeks Ketahanan Sosial. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Ketahanan Ekonomi", 
    slug: "indeks/ketahanan-ekonomi", 
    content: "<h1>Indeks Ketahanan Ekonomi</h1><p>Informasi mengenai skor dan komponen Indeks Ketahanan Ekonomi. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
  { 
    title: "Ketahanan Lingkungan", 
    slug: "indeks/ketahanan-lingkungan", 
    content: "<h1>Indeks Ketahanan Lingkungan</h1><p>Informasi mengenai skor dan komponen Indeks Ketahanan Lingkungan. Silakan edit konten ini melalui dasbor admin.</p>" 
  },
];
