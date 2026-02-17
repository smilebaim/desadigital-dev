export interface InitialPage {
  title: string;
  slug: string;
  content: string;
}

export const initialPages: InitialPage[] = [
  // --- PROFIL ---
  {
    title: "Profil Wilayah Desa",
    slug: "profil/profil-desa",
    content: `<h2>Selamat Datang di Desa Remau Bako Tuo</h2>
<p>Desa Remau Bako Tuo adalah sebuah desa pesisir yang dinamis di Kabupaten Tanjung Jabung Timur, Provinsi Jambi. Berakar dari sejarah panjang sebagai pemukiman nelayan, desa kami kini bertransformasi menjadi komunitas yang maju dengan tetap memegang teguh nilai-nilai kebersamaan dan gotong royong.</p>
<br/>
<h3>Letak Geografis dan Potensi Alam</h3>
<p>Terletak di dataran rendah dengan akses langsung ke laut, desa kami memiliki potensi luar biasa di sektor perikanan tangkap, budidaya tambak udang dan ikan, serta perkebunan kelapa dan pinang. Kesuburan tanah kami juga mendukung pertanian subsisten yang menjadi penopang ketahanan pangan warga.</p>
<p>Luas Wilayah: <strong>4.500 Ha</strong></p>
<ul>
  <li>Lahan Perkebunan: 2.500 Ha</li>
  <li>Lahan Pertanian: 800 Ha</li>
  <li>Area Tambak: 500 Ha</li>
  <li>Pemukiman: 700 Ha</li>
</ul>
<br/>
<h3>Demografi dan Kependudukan</h3>
<p>Dengan populasi yang terus berkembang, Pemerintah Desa berkomitmen untuk merencanakan pembangunan yang inklusif dan berbasis data. Visualisasi di bawah ini memberikan gambaran komprehensif mengenai struktur kependudukan desa kami.</p>
<br/>
[STATISTIK_PENDUDUK_CHART]
<br/>
[STATISTIK_PENDIDIKAN_CHART]
<br/>
[STATISTIK_PEKERJAAN_CHART]`
  },
  {
    title: "Sejarah Desa",
    slug: "profil/sejarah-desa",
    content: `<h2>Jejak Langkah dan Asal-Usul Desa</h2>
<p>Nama "Remau Bako Tuo" menyimpan legenda para pendiri. <strong>'Remau'</strong> (Harimau) melambangkan keberanian para perantau pertama yang membuka lahan, sementara <strong>'Bako Tuo'</strong> merujuk pada sebatang pohon bakau tua yang agung, yang menjadi penanda daratan bagi para nelayan dan titik temu musyawarah para tetua.</p>
<br/>
<h3>Dari Pemukiman Nelayan ke Desa Mandiri</h3>
<p>Berawal dari sebuah pemukiman nelayan kecil di abad ke-19, semangat gotong royong telah membawa desa ini berkembang pesat. Pembangunan infrastruktur awal seperti jembatan kayu, jalan setapak, dan sarana ibadah adalah bukti nyata kekuatan kebersamaan yang menjadi DNA masyarakat kami.</p>
<p>Kini, Desa Remau Bako Tuo memasuki era baru sebagai desa digital, berkomitmen pada tata kelola yang transparan dan pelayanan yang modern untuk menjawab tantangan zaman.</p>`
  },
  {
    title: "Visi & Misi",
    slug: "profil/visi-misi",
    content: `<h2>Arah Pembangunan Desa Remau Bako Tuo</h2>
<p>Visi dan Misi ini adalah kompas yang memandu setiap langkah kebijakan Pemerintah Desa dalam mewujudkan cita-cita bersama seluruh masyarakat untuk periode 2021-2026.</p>
<br/>
<h3>Visi</h3>
<blockquote class="border-l-4 border-primary pl-4 italic">
  “Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa”
</blockquote>
<br/>
<h3>Misi</h3>
<ol class="list-decimal list-inside space-y-2">
  <li><strong>Sumber Daya Manusia:</strong> Meningkatkan kualitas SDM melalui program pendidikan formal dan non-formal serta layanan kesehatan yang terjangkau dan berkualitas.</li>
  <li><strong>Ekonomi Lokal:</strong> Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan dan berwawasan lingkungan.</li>
  <li><strong>Tata Kelola Pemerintahan:</strong> Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, profesional, dan partisipatif dengan memanfaatkan teknologi informasi.</li>
  <li><strong>Infrastruktur:</strong> Meningkatkan kuantitas dan kualitas infrastruktur dasar (jalan, air bersih, listrik, komunikasi) yang mendukung aktivitas sosial dan ekonomi masyarakat.</li>
  <li><strong>Sosial Budaya:</strong> Melestarikan dan mengembangkan nilai-nilai budaya, adat istiadat, serta kearifan lokal sebagai fondasi karakter dan jati diri masyarakat.</li>
</ol>`
  },

  // --- LAYANAN ---
  {
    title: "Layanan Administrasi & Persuratan",
    slug: "layanan/persuratan",
    content: `<h2>Pusat Layanan Administrasi Desa</h2>
<p>Pemerintah Desa Remau Bako Tuo menyediakan berbagai layanan administrasi kependudukan dan persuratan untuk seluruh warga. Untuk mempercepat proses, mohon pastikan Anda membawa dokumen pendukung yang diperlukan seperti KTP dan Kartu Keluarga (asli dan fotokopi).</p>
<br/>
<h3>Jenis Layanan yang Tersedia:</h3>
<ul class="list-disc list-inside space-y-1">
  <li>Surat Keterangan Usaha (SKU)</li>
  <li>Surat Keterangan Domisili</li>
  <li>Surat Pengantar Nikah (Model N1, N2, N4)</li>
  <li>Surat Keterangan Kelahiran</li>
  <li>Surat Keterangan Kematian</li>
  <li>Surat Keterangan Pindah Datang/Keluar</li>
  <li>Surat Pengantar SKCK</li>
  <li>Dan berbagai surat keterangan umum lainnya.</li>
</ul>
<br/>
<p><strong>Jam Pelayanan:</strong><br/>Senin - Kamis: 08.00 - 15.00 WIB<br/>Jumat: 08.00 - 11.00 WIB</p>`
  },
  {
    title: "Layanan Penanganan Keluhan dan Aspirasi",
    slug: "layanan/penanganan-keluhan",
    content: `<h2>Saluran Aspirasi dan Keluhan Warga</h2>
<p>Kami berkomitmen untuk terus meningkatkan kualitas pelayanan publik. Setiap masukan, kritik, dan saran dari Anda sangat berharga bagi kemajuan desa.</p>
<br/>
<h3>Bagaimana Cara Menyampaikan Keluhan?</h3>
<p>Anda dapat menyampaikan aspirasi atau keluhan Anda melalui beberapa saluran resmi:</p>
<ol class="list-decimal list-inside space-y-2">
  <li><strong>Langsung:</strong> Datang ke Kantor Desa pada jam kerja untuk bertemu dengan perangkat desa yang berwenang.</li>
  <li><strong>Kotak Saran:</strong> Isi formulir yang tersedia dan masukkan ke dalam kotak saran di lobi Kantor Desa.</li>
  <li><strong>Musyawarah Dusun:</strong> Sampaikan secara langsung saat kegiatan musyawarah rutin di tingkat dusun Anda.</li>
</ol>
<p>Setiap keluhan yang masuk akan kami catat, verifikasi, dan tindak lanjuti sesuai dengan prosedur yang berlaku.</p>`
  },

  // --- DANA DESA ---
  {
    title: "Transparansi Anggaran Pendapatan Desa",
    slug: "dana-desa/pendapatan",
    content: `<h2>Sumber Pendapatan Desa (APBDes TA 2024)</h2>
<p>Transparansi pengelolaan keuangan adalah pilar utama pemerintahan yang baik. Halaman ini menyajikan rincian sumber-sumber pendapatan desa sesuai Anggaran Pendapatan dan Belanja Desa (APBDes) tahun berjalan. Partisipasi Anda dalam mengawasi sangat kami harapkan.</p>
<br/>
[DIAGRAM_PENDAPATAN_DESA]`
  },
  {
    title: "Transparansi Anggaran Belanja Desa",
    slug: "dana-desa/belanja",
    content: `<h2>Alokasi Belanja Desa (APBDes TA 2024)</h2>
<p>Halaman ini menyajikan alokasi belanja desa yang diprioritaskan untuk empat bidang utama: penyelenggaraan pemerintahan, pelaksanaan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat. Lihat bagaimana anggaran desa dimanfaatkan untuk program-program yang telah direncanakan bersama.</p>
<br/>
[DIAGRAM_BELANJA_DESA]`
  },

  // --- INDEKS DESA MEMBANGUN ---
  {
    title: "Indeks Ketahanan Sosial (IKS)",
    slug: "indeks/ketahanan-sosial",
    content: `<h2>Potret Ketahanan Sosial Desa</h2>
<p>Indeks Ketahanan Sosial (IKS) mengukur dimensi sosial pembangunan desa, mencakup aspek kesehatan, pendidikan, modal sosial, dan kualitas permukiman. Skor IKS yang tinggi menandakan masyarakat yang sehat, terdidik, solid, dan hidup di lingkungan yang layak.</p>
<br/>
[INDEKS_KETAHANAN_SOSIAL]`
  },
  {
    title: "Indeks Ketahanan Ekonomi (IKE)",
    slug: "indeks/ketahanan-ekonomi",
    content: `<h2>Potret Ketahanan Ekonomi Desa</h2>
<p>Indeks Ketahanan Ekonomi (IKE) mengukur kemandirian ekonomi desa. Indikatornya meliputi keragaman produksi, akses terhadap pasar dan lembaga keuangan, serta ketersediaan infrastruktur penunjang ekonomi. Skor IKE yang tinggi menunjukkan roda perekonomian desa yang tangguh dan dinamis.</p>
<br/>
[INDEKS_KETAHANAN_EKONOMI]`
  },
  {
    title: "Indeks Ketahanan Lingkungan (IKL)",
    slug: "indeks/ketahanan-lingkungan",
    content: `<h2>Potret Ketahanan Lingkungan Desa</h2>
<p>Indeks Ketahanan Lingkungan (IKL) mengukur kualitas lingkungan hidup di desa serta upaya-upaya pelestariannya. Indikatornya mencakup kualitas air, udara, dan tanah, serta kesadaran masyarakat dalam mengelola sampah dan mengantisipasi bencana alam. Skor IKL yang tinggi menunjukkan desa yang asri dan berkelanjutan.</p>
<br/>
[INDEKS_KETAHANAN_LINGKUNGAN]`
  }
];
