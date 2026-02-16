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
    content: `<h1>Profil Desa Remau Bako Tuo</h1>
<p>Selamat datang di profil digital Desa Remau Bako Tuo, sebuah komunitas pesisir yang dinamis dengan sejarah yang kaya dan masa depan yang cerah. Terletak strategis di Kabupaten Tanjung Jabung Timur, desa kami diberkahi keindahan alam, tanah yang subur, dan potensi sumber daya kelautan yang melimpah.</p>
<p>Masyarakat kami yang beragam hidup berdampingan secara harmonis, menjunjung tinggi nilai-nilai gotong royong dan kebersamaan. Kami percaya bahwa kekuatan terbesar desa terletak pada warganya. Halaman ini memberikan gambaran umum tentang desa kami, mulai dari kondisi geografis, demografi, hingga potensi ekonomi yang terus kami kembangkan.</p>

<h3>Kondisi Geografis & Potensi</h3>
<p>Secara geografis, wilayah kami didominasi oleh dataran rendah dengan akses langsung ke perairan, menjadikannya ideal untuk sektor perikanan dan pertanian. Potensi utama kami meliputi hasil perikanan tangkap, budidaya tambak, serta perkebunan kelapa dan pinang.</p>

<h3>Demografi Desa</h3>
<p>Visualisasi data di bawah ini memberikan potret statistik desa kami secara real-time, menjadi landasan kami dalam merencanakan program-program pembangunan yang tepat sasaran, mulai dari sektor pendidikan, kesehatan, hingga pemberdayaan ekonomi.</p>

[STATISTIK_PENDUDUK_CHART]

[STATISTIK_PENDIDIKAN_CHART]

<p>Dengan memahami data ini, kami berupaya mewujudkan masyarakat yang lebih maju, sehat, dan sejahtera.</p>
`
  },
  { 
    title: "Sejarah Desa", 
    slug: "profil/sejarah-desa", 
    content: `<h1>Jejak Langkah: Sejarah Desa Remau Bako Tuo</h1>
<p>Setiap sudut desa ini menyimpan cerita. Halaman ini akan membawa Anda menelusuri jejak-jejak masa lalu, dari awal mula berdirinya desa hingga menjadi komunitas yang kita kenal sekarang. Kami percaya, dengan memahami sejarah, kita dapat membangun masa depan yang lebih kokoh.</p>

<h3>Era Permulaan: Legenda Sang Harimau dan Bakau Tua</h3>
<p>Menurut cerita turun-temurun yang diwariskan para tetua, nama Remau Bako Tuo memiliki makna mendalam. 'Remau' yang berarti Harimau, melambangkan keberanian dan semangat juang para perantau pemberani yang pertama kali membuka lahan di wilayah ini. 'Bako Tuo' merujuk pada sebatang pohon bakau tua yang menjulang tinggi dan menjadi penanda utama bagi para pelaut dan nelayan. Konon, di bawah pohon bakau itulah para pendiri pertama kali bermusyawarah, menyatukan tekad untuk mendirikan sebuah pemukiman yang aman dan makmur.</p>

<h3>Masa Pembangunan: Semangat Gotong Royong</h3>
<p>Seiring berjalannya waktu, desa kami berkembang dari sebuah pemukiman nelayan kecil menjadi pusat aktivitas masyarakat yang lebih kompleks. Pembangunan infrastruktur krusial seperti jalan setapak, jembatan kayu, dan sarana ibadah pertama kali dibangun murni dari semangat gotong royong. Semangat kebersamaan inilah yang menjadi fondasi sosial desa dan terus kami lestarikan hingga hari ini.</p>

<h3>Era Modern: Menuju Desa Digital</h3>
<p>Memasuki abad ke-21, Desa Remau Bako Tuo terus beradaptasi dengan tantangan zaman. Peluncuran Sistem Informasi Desa ini adalah salah satu tonggak sejarah baru kami dalam upaya menuju tata kelola pemerintahan yang transparan, partisipatif, dan modern, demi melayani masyarakat dengan lebih baik.</p>`
  },
  { 
    title: "Visi & Misi", 
    slug: "profil/visi-misi", 
    content: `<h1>Visi & Misi Pembangunan Desa</h1>
<p>Visi dan Misi ini adalah kompas yang memandu setiap langkah dan kebijakan Pemerintah Desa Remau Bako Tuo dalam menjalankan amanah untuk mewujudkan cita-cita bersama seluruh masyarakat.</p>
<br/>
<h2>Visi</h2>
<p><strong>“Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa”</strong></p>
<br/>
<h2>Misi</h2>
<ol>
  <li>Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan yang merata dan terjangkau.</li>
  <li>Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan dan berwawasan lingkungan.</li>
  <li>Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, profesional, dan partisipatif.</li>
  <li>Meningkatkan kuantitas dan kualitas infrastruktur dasar yang mendukung aktivitas sosial dan ekonomi masyarakat.</li>
  <li>Melestarikan dan mengembangkan nilai-nilai budaya, adat istiadat, serta kearifan lokal sebagai fondasi karakter masyarakat.</li>
  <li>Menciptakan lingkungan yang aman, tertib, dan harmonis melalui peningkatan kesadaran hukum dan partisipasi masyarakat.</li>
</ol>`
  },
  // Layanan
  { 
    title: "Layanan Persuratan", 
    slug: "layanan/persuratan", 
    content: `<h1>Layanan Administrasi & Persuratan</h1>
<p>Kantor Desa Remau Bako Tuo menyediakan berbagai layanan administrasi dan persuratan untuk kebutuhan warga. Untuk memperlancar proses, mohon pastikan Anda membawa dokumen pendukung yang diperlukan seperti Kartu Tanda Penduduk (KTP) dan Kartu Keluarga (KK).</p>
<h3>Jenis Layanan yang Tersedia:</h3>
<ul>
  <li>Surat Keterangan Usaha</li>
  <li>Surat Keterangan Domisili</li>
  <li>Surat Pengantar Nikah (N1, N2, N4)</li>
  <li>Surat Keterangan Kelahiran</li>
  <li>Surat Keterangan Kematian</li>
  <li>Surat Keterangan Pindah</li>
  <li>Surat Pengantar SKCK</li>
  <li>Dan berbagai surat keterangan lainnya sesuai kebutuhan.</li>
</ul>
<p>Pelayanan dibuka pada jam kerja: Senin - Jumat, pukul 08.00 - 15.00 WIB.</p>` 
  },
  { 
    title: "Penanganan Keluhan", 
    slug: "layanan/penanganan-keluhan", 
    content: `<h1>Layanan Penanganan Keluhan</h1>
<p>Kami berkomitmen untuk memberikan pelayanan terbaik dan terus melakukan perbaikan. Jika Anda memiliki keluhan, kritik, atau saran terkait pelayanan publik, kondisi infrastruktur, atau masalah sosial di lingkungan desa, jangan ragu untuk menyampaikannya.</p>
<p>Anda dapat menyampaikan masukan Anda melalui:</p>
<ul>
  <li><strong>Kotak Saran:</strong> Tersedia di Kantor Desa.</li>
  <li><strong>Langsung:</strong> Menemui Kepala Dusun atau Perangkat Desa terkait pada saat jam kerja.</li>
</ul>
<p>Setiap masukan dari Anda sangat berharga bagi kami untuk kemajuan Desa Remau Bako Tuo.</p>` 
  },
  
  // Dana Desa
  { 
    title: "Laporan Pendapatan Desa", 
    slug: "dana-desa/pendapatan", 
    content: `<h1>Transparansi Pendapatan Desa</h1>
<p>Sebagai bentuk transparansi dan akuntabilitas, Pemerintah Desa Remau Bako Tuo menyajikan rincian sumber-sumber pendapatan desa dalam Anggaran Pendapatan dan Belanja Desa (APBDes) tahun berjalan. Informasi ini diharapkan dapat meningkatkan kepercayaan dan partisipasi masyarakat dalam mengawasi pengelolaan keuangan desa.</p>

[DIAGRAM_PENDAPATAN_DESA]` 
  },
  { 
    title: "Laporan Belanja Desa", 
    slug: "dana-desa/belanja", 
    content: `<h1>Transparansi Belanja Desa</h1>
<p>Halaman ini menyajikan alokasi belanja desa yang diprioritaskan untuk berbagai bidang pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat sesuai dengan dokumen APBDes. Masyarakat dapat melihat bagaimana anggaran desa dimanfaatkan untuk program-program yang telah direncanakan bersama.</p>

[DIAGRAM_BELANJA_DESA]`
  },
  
  // Indeks Desa Membangun
  { 
    title: "Ketahanan Sosial", 
    slug: "indeks/ketahanan-sosial", 
    content: `<h1>Indeks Ketahanan Sosial (IKS)</h1>
<p>Indeks Ketahanan Sosial mengukur tingkat kesejahteraan, harmoni, dan keamanan dalam masyarakat desa. Indikator ini mencakup aspek-aspek penting seperti kualitas pendidikan, akses kesehatan, modal sosial (gotong royong & kepercayaan), serta kualitas permukiman yang layak. Skor IKS yang tinggi menunjukkan masyarakat yang sehat, terdidik, dan solid.</p>

[INDEKS_KETAHANAN_SOSIAL]` 
  },
  { 
    title: "Ketahanan Ekonomi", 
    slug: "indeks/ketahanan-ekonomi", 
    content: `<h1>Indeks Ketahanan Ekonomi (IKE)</h1>
<p>Indeks Ketahanan Ekonomi mengukur kemampuan ekonomi desa untuk tumbuh secara berkelanjutan, beradaptasi terhadap perubahan, dan menyejahterakan warganya melalui keragaman ekonomi dan akses terhadap lembaga keuangan dan pasar, serta ketersediaan infrastruktur penunjang ekonomi.</p>

[INDEKS_KETAHANAN_EKONOMI]`
  },
  { 
    title: "Ketahanan Lingkungan", 
    slug: "indeks/ketahanan-lingkungan", 
    content: `<h1>Indeks Ketahanan Lingkungan (IKL)</h1>
<p>Indeks Ketahanan Lingkungan menilai kapasitas desa dalam menjaga kelestarian alam, mengelola sumber daya secara bijak, serta kemampuannya dalam menghadapi tekanan dan bencana ekologis. Indikator ini mencakup kualitas lingkungan hidup (air, udara, tanah) dan upaya-upaya adaptasi serta mitigasi perubahan iklim.</p>

[INDEKS_KETAHANAN_LINGKUNGAN]`
  },
];
