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
    content: `<h1>Profil Lengkap Desa</h1>
<p>Desa Remau Bako Tuo adalah sebuah komunitas yang dinamis dengan sejarah yang kaya dan masa depan yang cerah. Terletak di wilayah pesisir, desa kami dianugerahi keindahan alam dan potensi sumber daya yang melimpah. Masyarakat kami terdiri dari beragam latar belakang yang hidup berdampingan secara harmonis, menjunjung tinggi nilai-nilai gotong royong dan kebersamaan.</p>
<p>Di halaman ini, Anda akan menemukan gambaran umum tentang desa kami, mulai dari kondisi geografis, demografi penduduk, hingga potensi ekonomi yang sedang kami kembangkan bersama.</p>

[STATISTIK_PENDUDUK_CHART]

[STATISTIK_PENDIDIKAN_CHART]`
  },
  { 
    title: "Sejarah Desa", 
    slug: "profil/sejarah-desa", 
    content: `<h1>Sejarah Desa Remau Bako Tuo</h1>
<p>Setiap sudut desa ini menyimpan cerita. Halaman ini akan membawa Anda menelusuri jejak-jejak masa lalu, dari awal mula berdirinya desa, kisah para tetua, hingga peristiwa-peristiwa penting yang membentuk identitas kami hari ini. Kami percaya, dengan memahami sejarah, kita dapat membangun masa depan yang lebih baik.</p>
<p>Konten sejarah lengkap sedang dalam proses pengumpulan dari berbagai narasumber dan catatan yang ada. Kami akan segera memperbaruinya.</p>`
  },
  { 
    title: "Visi & Misi", 
    slug: "profil/visi-misi", 
    content: `<h1>Visi & Misi Desa</h1>
<h2>Visi</h2>
<p>“Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa”</p>
<br/>
<h2>Misi</h2>
<ol>
  <li>Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan yang merata.</li>
  <li>Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan.</li>
  <li>Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan partisipatif.</li>
  <li>Meningkatkan infrastruktur dasar yang mendukung aktivitas sosial dan ekonomi masyarakat.</li>
  <li>Melestarikan dan mengembangkan nilai-nilai budaya serta kearifan lokal sebagai identitas desa.</li>
</ol>`
  },
  { 
    title: "Struktur Pemerintahan", 
    slug: "profil/struktur-pemerintahan", 
    content: `<h1>Struktur Pemerintahan Desa</h1>
<p>Pemerintahan Desa Remau Bako Tuo dijalankan oleh Kepala Desa beserta jajaran perangkat desa yang berdedikasi untuk melayani masyarakat. Halaman ini akan menampilkan bagan struktur organisasi serta profil singkat dari setiap perangkat desa yang bertugas.</p>
<p><i>(Konten visual bagan struktur organisasi akan segera ditambahkan)</i></p>`
  },
  
  // Pembangunan
  { 
    title: "RPJMDes", 
    slug: "pembangunan/rpjmdes", 
    content: `<h1>RPJMDes</h1>
<p>Rencana Pembangunan Jangka Menengah Desa (RPJMDes) adalah dokumen perencanaan strategis untuk periode enam tahunan yang menjadi acuan utama dalam pembangunan desa. Dokumen ini disusun secara partisipatif dengan melibatkan seluruh elemen masyarakat.</p>

[DIAGRAM_BELANJA_DESA]` 
  },
  { 
    title: "RKPDes", 
    slug: "pembangunan/rkpdes", 
    content: `<h1>RKPDes</h1>
<p>Rencana Kerja Pemerintah Desa (RKPDes) adalah penjabaran dari RPJMDes untuk jangka waktu satu tahun. Dokumen ini menjadi dasar penyusunan Anggaran Pendapatan dan Belanja Desa (APBDes).</p>

[DIAGRAM_PENDAPATAN_DESA]`
  },

  // Layanan
  { 
    title: "Layanan Persuratan", 
    slug: "layanan/persuratan", 
    content: `<h1>Layanan Persuratan</h1>
<p>Kantor Desa Remau Bako Tuo menyediakan berbagai layanan administrasi dan persuratan untuk kebutuhan warga. Pastikan Anda membawa dokumen pendukung yang diperlukan seperti KTP dan Kartu Keluarga untuk memperlancar proses.</p>
<p>Jenis layanan yang tersedia antara lain:</p>
<ul>
  <li>Surat Keterangan Usaha</li>
  <li>Surat Keterangan Domisili</li>
  <li>Surat Pengantar Nikah</li>
  <li>Surat Keterangan Kelahiran/Kematian</li>
  <li>Dan surat keterangan lainnya.</li>
</ul>`
  },
  { 
    title: "Penanganan Keluhan", 
    slug: "layanan/penanganan-keluhan", 
    content: `<h1>Penanganan Keluhan</h1><p>Kami berkomitmen untuk memberikan pelayanan terbaik. Jika Anda memiliki keluhan, kritik, atau saran terkait pelayanan atau kondisi desa, silakan sampaikan melalui kanal yang telah kami sediakan di kantor desa. Setiap masukan dari Anda sangat berharga bagi kami.</p>` 
  },
  
  // Kelembagaan
  { 
    title: "PKK", 
    slug: "kelembagaan/pkk", 
    content: `<h1>PKK</h1><p>Pemberdayaan dan Kesejahteraan Keluarga (PKK) Desa Remau Bako Tuo aktif dalam berbagai program yang berfokus pada peningkatan kesejahteraan keluarga, mulai dari kesehatan, pendidikan, hingga keterampilan ekonomi.</p>`
  },
  { 
    title: "Lembaga Kemasyarakatan Desa (LKD)", 
    slug: "kelembagaan/lkd", 
    content: `<h1>LKD</h1><p>Lembaga Kemasyarakatan Desa (LKD) merupakan mitra pemerintah desa dalam perencanaan dan pelaksanaan pembangunan. Di sini akan ditampilkan daftar LKD yang aktif di desa kami beserta program kerjanya.</p>` 
  },
  { 
    title: "Karang Taruna", 
    slug: "kelembagaan/karang-taruna", 
    content: `<h1>Karang Taruna</h1><p>Sebagai wadah generasi muda, Karang Taruna Desa Remau Bako Tuo aktif dalam berbagai kegiatan positif di bidang sosial, olahraga, dan keagamaan untuk membangun karakter pemuda yang tangguh dan kreatif.</p>` 
  },

  // Ekonomi
  { 
    title: "BUMDes", 
    slug: "ekonomi/bumdes", 
    content: `<h1>BUMDes</h1><p>Badan Usaha Milik Desa (BUMDes) menjadi motor penggerak ekonomi desa melalui berbagai unit usaha yang dikelola secara profesional untuk meningkatkan Pendapatan Asli Desa (PADes) dan membuka lapangan kerja.</p>` 
  },
  { 
    title: "UMKM Desa", 
    slug: "ekonomi/umkm", 
    content: `<h1>UMKM Desa</h1>
<p>Desa kami memiliki banyak potensi Usaha Mikro, Kecil, dan Menengah (UMKM) yang menjadi tulang punggung perekonomian warga. Temukan berbagai produk unggulan dari para pelaku usaha lokal di sini.</p>

[STATISTIK_PEKERJAAN_CHART]` 
  },

  // Dana Desa
  { 
    title: "Laporan Pendapatan Desa", 
    slug: "dana-desa/pendapatan", 
    content: `<h1>Transparansi Pendapatan Desa</h1>
<p>Sebagai bentuk transparansi dan akuntabilitas, kami menyajikan rincian sumber-sumber pendapatan desa dalam Anggaran Pendapatan dan Belanja Desa (APBDes) tahun berjalan.</p>

[DIAGRAM_PENDAPATAN_DESA]` 
  },
  { 
    title: "Laporan Belanja Desa", 
    slug: "dana-desa/belanja", 
    content: `<h1>Transparansi Belanja Desa</h1>
<p>Halaman ini menyajikan alokasi belanja desa yang diprioritaskan untuk berbagai bidang pembangunan, pembinaan, dan pemberdayaan masyarakat sesuai dengan APBDes.</p>

[DIAGRAM_BELANJA_DESA]`
  },

  // Aktivitas
  { 
    title: "Agenda Kegiatan", 
    slug: "aktivitas/agenda", 
    content: `<h1>Agenda Kegiatan Desa</h1><p>Jangan sampai ketinggalan! Halaman ini berisi jadwal lengkap berbagai kegiatan dan acara yang akan diselenggarakan di Desa Remau Bako Tuo, mulai dari musyawarah, pelatihan, hingga perayaan hari besar.</p>` 
  },

  // Pustaka
  { 
    title: "Pustaka Digital Desa", 
    slug: "pustaka/pustaka-desa", 
    content: `<h1>Pustaka Digital</h1><p>Temukan berbagai dokumen penting, laporan, serta karya tulis yang berkaitan dengan Desa Remau Bako Tuo. Pustaka digital ini adalah pusat pengetahuan desa kami.</p>`
  },
  
  // Indeks Desa Membangun
  { 
    title: "Ketahanan Sosial", 
    slug: "indeks/ketahanan-sosial", 
    content: `<h1>Indeks Ketahanan Sosial (IKS)</h1>
<p>Indeks Ketahanan Sosial mengukur tingkat kesejahteraan, harmoni, dan keamanan dalam masyarakat desa. Indikator ini mencakup aspek pendidikan, kesehatan, modal sosial, dan permukiman.</p>

[INDEKS_KETAHANAN_SOSIAL]` 
  },
  { 
    title: "Ketahanan Ekonomi", 
    slug: "indeks/ketahanan-ekonomi", 
    content: `<h1>Indeks Ketahanan Ekonomi (IKE)</h1>
<p>Indeks Ketahanan Ekonomi mengukur kemampuan ekonomi desa untuk tumbuh secara berkelanjutan, beradaptasi terhadap perubahan, dan menyejahterakan warganya melalui keragaman ekonomi dan akses sumber daya.</p>

[INDEKS_KETAHANAN_EKONOMI]`
  },
  { 
    title: "Ketahanan Lingkungan", 
    slug: "indeks/ketahanan-lingkungan", 
    content: `<h1>Indeks Ketahanan Lingkungan (IKL)</h1>
<p>Indeks Ketahanan Lingkungan menilai kapasitas desa dalam menjaga kelestarian alam, mengelola sumber daya, serta menghadapi tekanan dan bencana ekologis demi keberlanjutan lingkungan hidup.</p>

[INDEKS_KETAHANAN_LINGKUNGAN]`
  },
];
