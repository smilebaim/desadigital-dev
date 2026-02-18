export interface InitialPage {
  title: string;
  slug: string;
  content: string;
}

export const initialPages: InitialPage[] = [
  {
    title: "Profil Desa",
    slug: "profil/profil-desa",
    content: `<h1>Profil Umum Desa Remau Bako Tuo</h1>
<p>Desa Remau Bako Tuo adalah sebuah desa yang terletak di Kecamatan Sadu, Kabupaten Tanjung Jabung Timur, Provinsi Jambi. Desa ini memiliki luas wilayah sekitar 150 km² dengan topografi yang didominasi oleh dataran rendah dan kawasan pesisir.</p>
<h2>Demografi</h2>
<p>Berdasarkan data terakhir, jumlah penduduk Desa Remau Bako Tuo adalah <strong>3,450 jiwa</strong> yang terdiri dari 1,780 laki-laki dan 1,670 perempuan, dengan total 950 Kepala Keluarga (KK).</p>
<p>Berikut adalah rincian statistik kependudukan:</p>
[STATISTIK_PENDUDUK_CHART]
<h2>Potensi Desa</h2>
<p>Potensi utama desa terletak pada sektor pertanian dan perikanan, dengan komoditas unggulan seperti padi, kelapa, dan hasil laut. Selain itu, desa ini juga memiliki potensi wisata bahari yang sedang dikembangkan.</p>
[STATISTIK_PEKERJAAN_CHART]`
  },
  {
    title: "Sejarah Desa",
    slug: "profil/sejarah-desa",
    content: `<h1>Sejarah Singkat Desa Remau Bako Tuo</h1>
<p>Desa Remau Bako Tuo memiliki sejarah panjang yang erat kaitannya dengan suku-suku pesisir Jambi. Nama 'Remau Bako Tuo' sendiri berasal dari bahasa lokal yang memiliki arti harfiah "Harimau Bakau Tua", merujuk pada legenda seekor harimau penjaga yang mendiami hutan bakau di sekitar wilayah desa pada masa lampau.</p>
<p>Desa ini didirikan secara resmi pada tahun 1950 oleh para tokoh masyarakat setempat yang berasal dari berbagai kelompok etnis, termasuk Melayu, Bugis, dan Jawa. Mereka bersatu padu membuka lahan untuk pemukiman dan pertanian.</p>
<h2>Perkembangan Desa</h2>
<p>Sejak berdirinya, Desa Remau Bako Tuo terus berkembang. Pembangunan infrastruktur seperti jalan, jembatan, dan sarana pendidikan mulai digalakkan pada era 1980-an. Kini, desa terus berbenah menuju desa digital yang maju dan mandiri.</p>`
  },
  {
    title: "Visi dan Misi",
    slug: "profil/visi-misi",
    content: `<h1>Visi & Misi Desa Remau Bako Tuo</h1>
<h2>Visi</h2>
<p><strong>"Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa"</strong></p>
<h2>Misi</h2>
<ol>
  <li>Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan yang merata dan terjangkau.</li>
  <li>Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan.</li>
  <li>Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, profesional, dan partisipatif.</li>
  <li>Meningkatkan kuantitas dan kualitas infrastruktur dasar yang mendukung aktivitas sosial dan ekonomi.</li>
  <li>Melestarikan dan mengembangkan nilai-nilai budaya, adat istiadat, serta kearifan lokal.</li>
</ol>`
  },
  {
    title: "Struktur Pemerintahan",
    slug: "profil/struktur-pemerintahan",
    content: `<h1>Struktur Pemerintahan Desa</h1>
<p>Berikut adalah jajaran aparatur Pemerintah Desa Remau Bako Tuo periode 2021-2027 yang berdedikasi untuk melayani masyarakat dan memajukan desa.</p>
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background-color: #f9fafb; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);">
    <img src="https://picsum.photos/seed/kades/200/200" alt="Kepala Desa" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto; border: 4px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="font-size: 1.5rem; font-weight: 700; margin-top: 1rem;">H. Abdullah</h2>
    <p style="color: #15803d; font-weight: 600;">Kepala Desa</p>
</div>
<h2 style="text-align: center; font-size: 1.5rem; font-weight: 700; margin-top: 3rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Perangkat Desa</h2>
<p style="text-align: center; color: #6b7280; margin-bottom: 2rem; margin-top: -0.5rem;">Tim yang mendukung operasional pemerintahan desa.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center;">
    <div><img src="https://picsum.photos/seed/sekdes/200/200" alt="Sekretaris Desa" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Muhammad Saleh, S.Kom</h3><p style="font-size: 0.875rem; color: #6b7280;">Sekretaris Desa</p></div>
    <div><img src="https://picsum.photos/seed/kaurkeu/200/200" alt="Kaur Keuangan" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Siti Aminah, A.Md</h3><p style="font-size: 0.875rem; color: #6b7280;">Kaur Keuangan</p></div>
    <div><img src="https://picsum.photos/seed/kaurplan/200/200" alt="Kaur Perencanaan" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Ahmad Yani</h3><p style="font-size: 0.875rem; color: #6b7280;">Kaur Perencanaan</p></div>
    <div><img src="https://picsum.photos/seed/kaurtu/200/200" alt="Kaur Tata Usaha & Umum" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Fatimah</h3><p style="font-size: 0.875rem; color: #6b7280;">Kaur Tata Usaha & Umum</p></div>
    <div><img src="https://picsum.photos/seed/kasipem/200/200" alt="Kasi Pemerintahan" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">La Ode Idrus</h3><p style="font-size: 0.875rem; color: #6b7280;">Kasi Pemerintahan</p></div>
    <div><img src="https://picsum.photos/seed/kasikesra/200/200" alt="Kasi Kesejahteraan" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Wa Ode Rahma</h3><p style="font-size: 0.875rem; color: #6b7280;">Kasi Kesejahteraan</p></div>
    <div><img src="https://picsum.photos/seed/kasipel/200/200" alt="Kasi Pelayanan" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Suparman</h3><p style="font-size: 0.875rem; color: #6b7280;">Kasi Pelayanan</p></div>
</div>
<h2 style="text-align: center; font-size: 1.5rem; font-weight: 700; margin-top: 3rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Kepala Dusun</h2>
<p style="text-align: center; color: #6b7280; margin-bottom: 2rem; margin-top: -0.5rem;">Perpanjangan tangan pemerintah desa di tingkat dusun.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; text-align: center;">
    <div><img src="https://picsum.photos/seed/kadus1/200/200" alt="Kepala Dusun I" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Sulaiman</h3><p style="font-size: 0.875rem; color: #6b7280;">Kepala Dusun I</p></div>
    <div><img src="https://picsum.photos/seed/kadus2/200/200" alt="Kepala Dusun II" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Junaidi</h3><p style="font-size: 0.875rem; color: #6b7280;">Kepala Dusun II</p></div>
    <div><img src="https://picsum.photos/seed/kadus3/200/200" alt="Kepala Dusun III" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #e5e7eb;"><h3 style="font-weight: 600; margin-top: 0.5rem;">Rahmat</h3><p style="font-size: 0.875rem; color: #6b7280;">Kepala Dusun III</p></div>
</div>`
  },
  {
    title: "Badan Permusyawaratan Desa",
    slug: "profil/struktur-badan",
    content: `<h1>Badan Permusyawaratan Desa (BPD)</h1>
<p>Struktur dan perangkat Badan Permusyawaratan Desa Remau Bakotuo.</p>
<div style="margin: 2rem 0; padding: 1.5rem; background-color: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
    <h2>Ketua BPD Periode 2021-2026</h2>
    <h3>H. La Ode Karim</h3>
    <p>Pendidikan: S1 Hukum</p>
    <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Telepon:</strong> +62 812-3456-7891</li>
        <li><strong>Email:</strong> bpd.remaubakotuo@gmail.com</li>
        <li><strong>Alamat:</strong> Jl. Desa No. 2, Dusun II</li>
    </ul>
</div>
<h2 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Anggota BPD</h2>
<div style="margin-top: 1.5rem;">
    <h3>Wa Ode Aminah - Wakil Ketua</h3>
    <ul style="list-style-type: disc; padding-left: 1.5rem;">
        <li>Membantu ketua dalam menjalankan tugas</li>
        <li>Menggantikan ketua saat berhalangan</li>
        <li>Mengkoordinasikan kegiatan komisi</li>
        <li>Melakukan pengawasan kinerja</li>
    </ul>
</div>
<div style="margin-top: 1.5rem;">
    <h3>La Ode Safar - Sekretaris</h3>
    <ul style="list-style-type: disc; padding-left: 1.5rem;">
        <li>Mengelola administrasi BPD</li>
        <li>Menyusun notulen rapat</li>
        <li>Mengelola arsip BPD</li>
        <li>Menyiapkan laporan kegiatan</li>
    </ul>
</div>
<div style="margin-top: 1.5rem;">
    <h3>La Ode Rusli - Anggota</h3>
    <ul style="list-style-type: disc; padding-left: 1.5rem;">
        <li>Melakukan pengawasan kinerja</li>
        <li>Menampung aspirasi masyarakat</li>
        <li>Menyusun peraturan desa</li>
        <li>Melakukan evaluasi program</li>
    </ul>
</div>
<div style="margin-top: 1.5rem;">
    <h3>Wa Ode Hasnia - Anggota</h3>
    <ul style="list-style-type: disc; padding-left: 1.5rem;">
        <li>Melakukan pengawasan kinerja</li>
        <li>Menampung aspirasi masyarakat</li>
        <li>Menyusun peraturan desa</li>
        <li>Melakukan evaluasi program</li>
    </ul>
</div>
<h2 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1rem;">Fungsi BPD</h2>
<p>Tugas dan wewenang Badan Permusyawaratan Desa</p>
<ul style="list-style-type: disc; padding-left: 1.5rem;">
    <li>Membahas dan menyepakati Rancangan Peraturan Desa</li>
    <li>Menampung dan menyalurkan aspirasi masyarakat</li>
    <li>Melakukan pengawasan kinerja Kepala Desa</li>
    <li>Menyelenggarakan musyawarah desa</li>
    <li>Membahas dan menyepakati Rancangan Anggaran Pendapatan dan Belanja Desa</li>
    <li>Membahas dan menyepakati Rancangan Peraturan Desa tentang APBDes</li>
    <li>Membahas dan menyepakati Rancangan Peraturan Desa tentang perubahan APBDes</li>
    <li>Membahas dan menyepakati Rancangan Peraturan Desa tentang pertanggungjawaban pelaksanaan APBDes</li>
</ul>`
  },
  {
    title: "Layanan Persuratan",
    slug: "layanan/persuratan",
    content: `<h1>Layanan Administrasi Persuratan</h1>
<p>Pemerintah Desa Remau Bako Tuo menyediakan berbagai layanan administrasi persuratan untuk keperluan warga. Untuk mengajukan permohonan, silakan datang langsung ke Kantor Desa pada jam kerja dengan membawa persyaratan yang diperlukan.</p>
<h2>Jenis Surat yang Dilayani</h2>
<ul>
  <li>Surat Keterangan Usaha (SKU)</li>
  <li>Surat Keterangan Tidak Mampu (SKTM)</li>
  <li>Surat Keterangan Domisili</li>
  <li>Surat Pengantar Nikah (N1, N2, N4)</li>
  <li>Surat Keterangan Kelahiran</li>
  <li>Surat Keterangan Kematian</li>
  <li>Surat Keterangan Pindah</li>
  <li>Dan surat keterangan lainnya.</li>
</ul>
<p>Beberapa layanan surat seperti <strong>Surat Keterangan Usaha</strong> dapat diajukan melalui modul aplikasi di Dasbor Admin.</p>`
  },
  {
    title: "Penanganan Keluhan",
    slug: "layanan/penanganan-keluhan",
    content: `<h1>Sistem Penanganan Keluhan dan Aspirasi</h1>
<p>Kami berkomitmen untuk memberikan pelayanan terbaik bagi seluruh warga Desa Remau Bako Tuo. Jika Anda memiliki keluhan, kritik, atau saran terkait pelayanan desa, pembangunan, atau masalah lainnya, silakan sampaikan melalui kanal yang telah kami sediakan.</p>
<h2>Mekanisme Penyampaian Keluhan</h2>
<ol>
  <li><strong>Datang Langsung:</strong> Sampaikan keluhan Anda secara langsung ke Kantor Desa pada jam kerja untuk mendapatkan penanganan segera.</li>
  <li><strong>Kotak Saran:</strong> Masukkan keluhan atau saran Anda secara tertulis ke dalam kotak saran yang tersedia di depan Kantor Desa.</li>
  <li><strong>Melalui Ketua RT/RW:</strong> Sampaikan aspirasi Anda melalui Ketua RT atau RW di lingkungan Anda untuk diteruskan kepada Pemerintah Desa.</li>
</ol>
<p>Setiap keluhan akan kami catat, tindak lanjuti, dan evaluasi untuk perbaikan pelayanan di masa mendatang.</p>`
  },
  {
    title: "PKK",
    slug: "kelembagaan/pkk",
    content: `<h1>PKK Desa</h1>
<p>Pemberdayaan dan Kesejahteraan Keluarga</p>

<h2>Informasi Umum PKK</h2>
<p>Pemberdayaan Kesejahteraan Keluarga (PKK) adalah gerakan nasional dalam pembangunan masyarakat yang tumbuh dari bawah yang pengelolaannya dari, oleh, dan untuk masyarakat menuju terwujudnya keluarga yang beriman dan bertaqwa kepada Tuhan Yang Maha Esa, berakhlak mulia dan berbudi luhur, sehat sejahtera, maju dan mandiri, kesetaraan dan keadilan gender serta kesadaran hukum dan lingkungan.</p>
<p><strong>Nama Organisasi:</strong> TP-PKK Desa Remau Bako Tuo</p>
<p><strong>Tahun Berdiri:</strong> 1998</p>
<p><strong>Jumlah Kader Aktif:</strong> 45 Orang</p>
<p><strong>Status:</strong> Aktif</p>

<h2>10 Program Pokok PKK</h2>
<h3>Pokja I</h3>
<ul>
  <li>Penghayatan dan Pengamalan Pancasila</li>
  <li>Gotong Royong</li>
</ul>
<h3>Pokja II</h3>
<ul>
  <li>Pendidikan dan Keterampilan</li>
  <li>Pengembangan Kehidupan Berkoperasi</li>
</ul>
<h3>Pokja III</h3>
<ul>
  <li>Pangan</li>
  <li>Sandang</li>
  <li>Perumahan dan Tata Laksana Rumah Tangga</li>
</ul>
<h3>Pokja IV</h3>
<ul>
  <li>Kesehatan</li>
  <li>Kelestarian Lingkungan Hidup</li>
  <li>Perencanaan Sehat</li>
</ul>

<h2>Kinerja & Kegiatan Unggulan</h2>
<h3>Tahun 2023 - Pelatihan Keterampilan Daur Ulang Sampah Plastik</h3>
<ul>
  <li>Jumlah Peserta: 50 orang</li>
  <li>Anggaran: Rp 15.000.000</li>
  <li>Manfaat: Terbentuknya 5 kelompok usaha kerajinan</li>
</ul>
<h3>Tahun 2022 - Penyuluhan Stunting & Pemberian Makanan Tambahan</h3>
<ul>
  <li>Jumlah Peserta: 150 orang</li>
  <li>Anggaran: Rp 30.000.000</li>
  <li>Manfaat: Penurunan angka stunting sebesar 5%</li>
</ul>

<h2>Struktur Kepengurusan</h2>
<h3>Ibu Kepala Desa (Ketua)</h3>
<p>Sebagai Ketua Tim Penggerak PKK Desa</p>
<h3>Wakil Ketua</h3>
<p>Membantu ketua dalam melaksanakan tugas dan fungsi organisasi</p>
<h3>Sekretaris</h3>
<p>Mengelola administrasi dan dokumentasi organisasi</p>
<h3>Bendahara</h3>
<p>Mengelola keuangan dan aset organisasi</p>
<h3>Ketua Pokja I, II, III, IV</h3>
<p>Mengkoordinasikan program kerja sesuai bidang masing-masing</p>`
  },
  {
    title: "Lembaga Kemasyarakatan Desa (LKD)",
    slug: "kelembagaan/lkd",
    content: `<h1>Lembaga Kemasyarakatan Desa (LKD)</h1>
<p>Mitra Pemerintah Desa dalam Pembangunan dan Pemberdayaan</p>

<h2>Lembaga Pemberdayaan Masyarakat (LPM)</h2>
<p>LPM adalah lembaga atau wadah yang dibentuk atas prakarsa masyarakat sebagai mitra Pemerintah Desa dalam menampung dan mewujudkan aspirasi serta kebutuhan masyarakat di bidang pembangunan.</p>
<h4>Tugas Pokok dan Fungsi:</h4>
<ul>
  <li>Menyusun rencana pembangunan secara partisipatif.</li>
  <li>Menggerakkan swadaya gotong royong masyarakat.</li>
  <li>Melaksanakan dan mengendalikan pembangunan.</li>
  <li>Melakukan evaluasi terhadap pelaksanaan pembangunan.</li>
</ul>

<h2>Rukun Tetangga (RT) & Rukun Warga (RW)</h2>
<p>RT dan RW adalah lembaga kemasyarakatan yang dibentuk melalui musyawarah masyarakat setempat dalam rangka pelayanan pemerintahan dan kemasyarakatan yang ditetapkan oleh Pemerintah Desa.</p>
<h4>Tugas Pokok dan Fungsi:</h4>
<ul>
  <li>Membantu menjalankan tugas pelayanan kepada masyarakat.</li>
  <li>Memelihara kerukunan hidup warga.</li>
  <li>Menampung dan menyalurkan aspirasi masyarakat.</li>
  <li>Menggerakkan swadaya gotong royong dalam pelaksanaan pembangunan.</li>
</ul>

<h2>Lembaga Adat Desa</h2>
<p>Lembaga Adat Desa adalah lembaga yang menyelenggarakan fungsi adat istiadat dan menjadi bagian dari susunan asli desa yang tumbuh dan berkembang atas prakarsa masyarakat desa.</p>
<h4>Tugas Pokok dan Fungsi:</h4>
<ul>
  <li>Membantu pemerintah desa dalam penyelenggaraan urusan adat.</li>
  <li>Melestarikan nilai sosial budaya dan adat istiadat.</li>
  <li>Menyelesaikan sengketa perdata/adat yang berkenaan dengan warga.</li>
  <li>Memberdayakan, melestarikan, dan mengembangkan kelembagaan adat.</li>
</ul>`
  },
  {
    title: "Karang Taruna",
    slug: "kelembagaan/karang-taruna",
    content: `<h1>Karang Taruna</h1>
<p>Organisasi Kepemudaan Desa</p>

<h2>Informasi Umum</h2>
<p>Karang Taruna adalah organisasi kepemudaan di tingkat desa yang berfungsi sebagai wadah pengembangan generasi muda nonpartisan, yang tumbuh atas dasar kesadaran dan rasa tanggung jawab sosial dari, oleh, dan untuk masyarakat khususnya generasi muda di wilayah desa/kelurahan atau komunitas adat sederajat.</p>
<p><strong>Nama Organisasi:</strong> Karang Taruna Remaubakotuo</p>
<p><strong>Tahun Berdiri:</strong> 2010</p>
<p><strong>Jumlah Anggota:</strong> 50 Orang</p>
<p><strong>Status:</strong> Aktif</p>

<h2>Program</h2>
<h3>Pendidikan</h3>
<ul>
  <li>Bimbingan Belajar</li>
  <li>Pelatihan Komputer</li>
  <li>Kursus Bahasa Inggris</li>
  <li>Literasi Digital</li>
</ul>
<h3>Kesehatan</h3>
<ul>
  <li>Posyandu Remaja</li>
  <li>Kampanye Anti Narkoba</li>
  <li>Donor Darah</li>
  <li>Kesehatan Reproduksi</li>
</ul>
<h3>Ekonomi</h3>
<ul>
  <li>Pelatihan Kewirausahaan</li>
  <li>Pengembangan UMKM</li>
  <li>Koperasi Pemuda</li>
  <li>Pemasaran Digital</li>
</ul>
<h3>Sosial Budaya</h3>
<ul>
  <li>Seni Budaya</li>
  <li>Olahraga</li>
  <li>Kegiatan Keagamaan</li>
  <li>Gotong Royong</li>
</ul>

<h2>Kinerja</h2>
<h3>Tahun 2023</h3>
<ul>
  <li>Jumlah Kegiatan: 20</li>
  <li>Jumlah Peserta: 250</li>
  <li>Anggaran: Rp 125.000.000</li>
  <li>Manfaat: Peningkatan Kesejahteraan Pemuda</li>
</ul>

<h2>Pengelolaan</h2>
<h3>Ketua</h3>
<p>Memimpin dan mengkoordinasikan seluruh kegiatan Karang Taruna</p>
<h3>Wakil Ketua</h3>
<p>Membantu ketua dalam melaksanakan tugas dan fungsi organisasi</p>
<h3>Sekretaris</h3>
<p>Mengelola administrasi dan dokumentasi organisasi</p>
<h3>Bendahara</h3>
<p>Mengelola keuangan dan aset organisasi</p>
<h3>Seksi-seksi</h3>
<p>Melaksanakan program sesuai bidang masing-masing</p>`
  },
  {
    title: "BUMDes",
    slug: "ekonomi/bumdes",
    content: `<h2>Informasi Umum</h2>
<p>BUMDes adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh desa melalui penyertaan secara langsung yang berasal dari kekayaan desa yang dipisahkan guna mengelola aset, jasa pelayanan, dan usaha lainnya untuk sebesar-besarnya kesejahteraan masyarakat desa.</p>
<p><strong>Nama BUMDes:</strong> BUMDes Remaubakotuo</p>
<p><strong>Berdiri:</strong> 2020</p>
<p><strong>Bentuk Badan Hukum:</strong> Peraturan Desa</p>
<p><strong>Modal Awal:</strong> Rp 500.000.000</p>
<h2>Unit Usaha</h2>
<h3>Jasa Keuangan</h3><ul><li>Simpan Pinjam</li><li>Pembayaran Pajak</li><li>Pembayaran Listrik</li><li>Pembayaran Air</li></ul>
<h3>Jasa Umum</h3><ul><li>Air Minum</li><li>Listrik Desa</li><li>Internet Desa</li><li>Pengelolaan Pasar</li></ul>
<h3>Perdagangan</h3><ul><li>Toko Desa</li><li>Warung Desa</li><li>Pasar Desa</li><li>Pengolahan Hasil Pertanian</li></ul>
<h3>Pariwisata</h3><ul><li>Homestay</li><li>Wisata Alam</li><li>Wisata Budaya</li><li>Kuliner</li></ul>
<h2>Kinerja</h2>
<h3>2020</h3><p>Pendapatan: Rp 100.000.000<br>Laba: Rp 20.000.000<br>SHU: Rp 10.000.000</p>
<h3>2021</h3><p>Pendapatan: Rp 150.000.000<br>Laba: Rp 30.000.000<br>SHU: Rp 15.000.000</p>
<h3>2022</h3><p>Pendapatan: Rp 200.000.000<br>Laba: Rp 40.000.000<br>SHU: Rp 20.000.000</p>
<h3>2023</h3><p>Pendapatan: Rp 250.000.000<br>Laba: Rp 50.000.000<br>SHU: Rp 25.000.000</p>
<h2>Pengelolaan</h2>
<h3>Direktur</h3><p>Memimpin dan mengelola BUMDes secara keseluruhan</p>
<h3>Manager Unit</h3><p>Mengelola unit usaha sesuai bidangnya</p>
<h3>Staff Operasional</h3><p>Melaksanakan operasional unit usaha</p>
<h3>Staff Keuangan</h3><p>Mengelola keuangan dan pembukuan</p>`
  },
  {
    title: "Koperasi",
    slug: "ekonomi/koperasi",
    content: `<h2>Informasi Umum</h2>
<p>Koperasi adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasarkan asas kekeluargaan.</p>
<p><strong>Nama Koperasi:</strong> Koperasi Remaubakotuo</p>
<p><strong>Berdiri:</strong> 2020</p>
<p><strong>Bentuk Badan Hukum:</strong> Koperasi Serba Usaha</p>
<p><strong>Modal Awal:</strong> Rp 100.000.000</p>
<h2>Layanan</h2>
<h3>Simpanan</h3><ul><li>Simpanan Pokok</li><li>Simpanan Wajib</li><li>Simpanan Sukarela</li><li>Deposito</li></ul>
<h3>Pinjaman</h3><ul><li>Pinjaman Modal Kerja</li><li>Pinjaman Investasi</li><li>Pinjaman Konsumtif</li><li>Pinjaman Mikro</li></ul>
<h3>Usaha</h3><ul><li>Toko Koperasi</li><li>Warung Koperasi</li><li>Pengolahan Hasil Pertanian</li><li>Jasa Keuangan</li></ul>
<h3>Pendidikan</h3><ul><li>Pelatihan Koperasi</li><li>Pendampingan Usaha</li><li>Konsultasi Keuangan</li><li>Workshop Kewirausahaan</li></ul>
<h2>Kinerja</h2>
<h3>2020</h3><p>Modal: Rp 100.000.000<br>Aset: Rp 150.000.000<br>Volume Usaha: Rp 200.000.000<br>SHU: Rp 20.000.000</p>
<h3>2021</h3><p>Modal: Rp 150.000.000<br>Aset: Rp 200.000.000<br>Volume Usaha: Rp 250.000.000<br>SHU: Rp 25.000.000</p>
<h3>2022</h3><p>Modal: Rp 200.000.000<br>Aset: Rp 250.000.000<br>Volume Usaha: Rp 300.000.000<br>SHU: Rp 30.000.000</p>
<h3>2023</h3><p>Modal: Rp 250.000.000<br>Aset: Rp 300.000.000<br>Volume Usaha: Rp 350.000.000<br>SHU: Rp 35.000.000</p>
<h2>Pengelolaan</h2>
<h3>Rapat Anggota</h3><p>Pemegang kekuasaan tertinggi dalam koperasi</p>
<h3>Pengurus</h3><p>Mengelola koperasi dan usahanya</p>
<h3>Pengawas</h3><p>Melakukan pengawasan terhadap pengelolaan koperasi</p>
<h3>Manajer</h3><p>Mengelola operasional koperasi</p>`
  },
  {
    title: "UMKM",
    slug: "ekonomi/umkm",
    content: `<h2>Informasi Umum</h2>
<p>UMKM (Usaha Mikro, Kecil, dan Menengah) adalah usaha produktif yang dimiliki perorangan maupun badan usaha sesuai dengan kriteria yang ditetapkan oleh Undang-Undang. UMKM memiliki peran penting dalam perekonomian desa.</p>
<p><strong>Total UMKM:</strong> 150 Unit</p>
<p><strong>Usaha Mikro:</strong> 100 Unit</p>
<p><strong>Usaha Kecil:</strong> 40 Unit</p>
<p><strong>Usaha Menengah:</strong> 10 Unit</p>
<h2>Sektor Usaha</h2>
<h3>Pertanian</h3><ul><li>Budidaya Tanaman</li><li>Peternakan</li><li>Perikanan</li><li>Perkebunan</li></ul>
<h3>Perdagangan</h3><ul><li>Warung Makan</li><li>Toko Kelontong</li><li>Pasar Tradisional</li><li>E-commerce</li></ul>
<h3>Industri</h3><ul><li>Makanan & Minuman</li><li>Kerajinan</li><li>Konveksi</li><li>Pengolahan Hasil Pertanian</li></ul>
<h3>Jasa</h3><ul><li>Warung Internet</li><li>Bengkel</li><li>Salon</li><li>Jasa Transportasi</li></ul>
<h2>Kinerja</h2>
<h3>2020</h3><p>Omzet: Rp 1.000.000.000<br>Tenaga Kerja: 300 Orang<br>Kontribusi: 15%</p>
<h3>2021</h3><p>Omzet: Rp 1.200.000.000<br>Tenaga Kerja: 350 Orang<br>Kontribusi: 18%</p>
<h3>2022</h3><p>Omzet: Rp 1.500.000.000<br>Tenaga Kerja: 400 Orang<br>Kontribusi: 20%</p>
<h3>2023</h3><p>Omzet: Rp 1.800.000.000<br>Tenaga Kerja: 450 Orang<br>Kontribusi: 22%</p>
<h2>Pengembangan</h2>
<h3>Pelatihan</h3><p>Program peningkatan kapasitas pelaku UMKM</p>
<h3>Pendampingan</h3><p>Pendampingan teknis dan manajemen usaha</p>
<h3>Pembiayaan</h3><p>Akses modal usaha dan pembiayaan</p>
<h3>Pemasaran</h3><p>Pengembangan pasar dan pemasaran produk</p>`
  },
    {
    title: "Rencana Kerja Pemerintah Desa (RKPDes)",
    slug: "pembangunan/rkpdes",
    content: `<h1>Rencana Kerja Pemerintah Desa (RKPDes)</h1>
<p>Rencana Kerja Pemerintah Desa (RKPDes) adalah penjabaran dari RPJMDes untuk jangka waktu satu tahun. Dokumen ini lebih operasional dan menjadi dasar penyusunan Anggaran Pendapatan dan Belanja Desa (APBDes) setiap tahunnya.</p>
<p><strong>Tahun:</strong> 2024</p>
<p><strong>Dasar Hukum:</strong> Peraturan Desa No. 5 Tahun 2023</p>
<h2>Prioritas Pembangunan 2024</h2>
<ul>
    <li>Peningkatan Kualitas Infrastruktur Jalan dan Drainase</li>
    <li>Pengembangan Kapasitas UMKM Lokal dan Ekonomi Kreatif</li>
    <li>Peningkatan Kualitas Layanan Kesehatan Primer di Poskesdes</li>
    <li>Program Digitalisasi Administrasi Desa dan Pelayanan Publik</li>
    <li>Penguatan Ketahanan Pangan Melalui Kelompok Tani</li>
</ul>
<h2>Matriks Rencana Kegiatan</h2>
<table>
    <thead>
        <tr>
            <th>Nama Kegiatan</th>
            <th>Lokasi</th>
            <th>Anggaran</th>
            <th>Jadwal</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Pembangunan Jalan Usaha Tani</td>
            <td>Dusun Tani Makmur</td>
            <td>Rp 250.000.000</td>
            <td>April - Juni 2024</td>
        </tr>
        <tr>
            <td>Pelatihan Pemasaran Digital untuk UMKM</td>
            <td>Aula Desa</td>
            <td>Rp 50.000.000</td>
            <td>Mei 2024</td>
        </tr>
        <tr>
            <td>Pengadaan Alat Kesehatan Poskesdes</td>
            <td>Poskesdes</td>
            <td>Rp 75.000.000</td>
            <td>Juli 2024</td>
        </tr>
        <tr>
            <td>Normalisasi Saluran Drainase</td>
            <td>Dusun Jaya & Dusun Makmur</td>
            <td>Rp 150.000.000</td>
            <td>Agustus - September 2024</td>
        </tr>
    </tbody>
</table>`
  },
  {
    title: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes)",
    slug: "pembangunan/rpjmdes",
    content: `<h1>Rencana Pembangunan Jangka Menengah Desa (RPJMDes)</h1>
<p>Rencana Pembangunan Jangka Menengah Desa (RPJMDes) adalah dokumen perencanaan strategis untuk periode enam tahunan yang menjadi acuan utama dalam pembangunan desa. Dokumen ini disusun secara partisipatif dengan melibatkan seluruh elemen masyarakat untuk menggali potensi, mengidentifikasi masalah, dan merumuskan program prioritas.</p>
<p><strong>Periode:</strong> 2021-2026</p>
<p><strong>Dasar Hukum:</strong> Peraturan Desa No. 1 Tahun 2021</p>
<h2>Visi</h2>
<p>"Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa"</p>
<h2>Misi</h2>
<ol>
    <li>Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan yang merata dan terjangkau.</li>
    <li>Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan.</li>
    <li>Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, profesional, dan partisipatif.</li>
    <li>Meningkatkan kuantitas dan kualitas infrastruktur dasar yang mendukung aktivitas sosial dan ekonomi.</li>
    <li>Melestarikan dan mengembangkan nilai-nilai budaya, adat istiadat, serta kearifan lokal.</li>
</ol>
<h2>Program Strategis Berdasarkan Bidang</h2>
<h3>Penyelenggaraan Pemerintahan Desa</h3>
<p>Contoh Program: Peningkatan kapasitas perangkat desa, digitalisasi layanan administrasi.</p>
<h3>Pelaksanaan Pembangunan Desa</h3>
<p>Contoh Program: Pembangunan jalan usaha tani, normalisasi drainase, pembangunan sarana air bersih.</p>
<h3>Pembinaan Kemasyarakatan Desa</h3>
<p>Contoh Program: Pembinaan Karang Taruna, PKK, dan lembaga adat.</p>
<h3>Pemberdayaan Masyarakat Desa</h3>
<p>Contoh Program: Pelatihan UMKM, pengembangan BUMDes, program ketahanan pangan.</p>
[DIAGRAM_BELANJA_DESA]`
  },
  {
    title: "Agenda Desa",
    slug: "aktivitas/agenda",
    content: `<h1>Agenda Desa</h1>
<p>Jadwal kegiatan dan acara yang akan datang di Desa Remau Bako Tuo.</p>
<br/>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <h3 style="font-size: 1.25rem; font-weight: 600;">Musyawarah Desa (Musdes) Rencana Pembangunan</h3>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">📅 Senin, 25 Juli 2024 | 🕒 09:00 - Selesai | 📍 Aula Kantor Desa</p>
    <p style="margin-top: 1rem;">Pembahasan dan penetapan prioritas pembangunan desa untuk tahun anggaran berikutnya. Diharapkan kehadiran perwakilan dari setiap RT.</p>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;"><strong>Penyelenggara:</strong> Pemerintah Desa & BPD</p>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <h3 style="font-size: 1.25rem; font-weight: 600;">Pelatihan Pembuatan Pupuk Kompos</h3>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">📅 Rabu, 27 Juli 2024 | 🕒 13:00 - 16:00 | 📍 Kelompok Tani Maju Jaya</p>
    <p style="margin-top: 1rem;">Pelatihan praktis bagi para petani dan warga untuk mengelola sampah organik menjadi pupuk yang bernilai ekonomis.</p>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;"><strong>Penyelenggara:</strong> Dinas Pertanian & Karang Taruna</p>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <h3 style="font-size: 1.25rem; font-weight: 600;">Posyandu Balita dan Lansia</h3>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">📅 Jumat, 29 Juli 2024 | 🕒 08:00 - 11:00 | 📍 Poskesdes Remau Bako Tuo</p>
    <p style="margin-top: 1rem;">Pemeriksaan kesehatan rutin, imunisasi, dan pemberian vitamin untuk balita. Serta pemeriksaan tensi dan gula darah untuk lansia.</p>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;"><strong>Penyelenggara:</strong> Kader PKK & Bidan Desa</p>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <h3 style="font-size: 1.25rem; font-weight: 600;">Kerja Bakti Membersihkan Saluran Irigasi</h3>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">📅 Minggu, 31 Juli 2024 | 🕒 07:00 - 10:00 | 📍 Area Persawahan Desa</p>
    <p style="margin-top: 1rem;">Gotong royong membersihkan saluran irigasi primer dan sekunder untuk persiapan musim tanam. Alat-alat diharapkan membawa dari rumah masing-masing.</p>
    <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1rem;"><strong>Penyelenggara:</strong> Seluruh Warga Desa</p>
</div>`
  },
  {
    title: "Publikasi Desa",
    slug: "pustaka/publikasi",
    content: `<h1>Publikasi Desa</h1>
<p>Dokumen, laporan, dan produk hukum resmi yang dipublikasikan oleh Pemerintah Desa.</p>
<br/>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <p style="font-size: 0.875rem; font-weight: 600; color: hsl(var(--primary));">Laporan Keuangan</p>
    <h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">Laporan Pertanggungjawaban (LPJ) APBDes 2023</h3>
    <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; margin-bottom: 0.5rem;">Dipublikasikan pada: 15 Januari 2024</p>
    <p style="font-size: 0.875rem; color: #6b7280;">Dokumen resmi LPJ Anggaran Pendapatan dan Belanja Desa tahun 2023 yang telah disahkan.</p>
    <a href="#" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); text-decoration: none; border-radius: 0.375rem;">Unduh</a>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <p style="font-size: 0.875rem; font-weight: 600; color: hsl(var(--primary));">Perencanaan</p>
    <h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">Rencana Pembangunan Jangka Menengah Desa (RPJMDes) 2021-2026</h3>
    <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; margin-bottom: 0.5rem;">Dipublikasikan pada: 10 Februari 2021</p>
    <p style="font-size: 0.875rem; color: #6b7280;">Dokumen perencanaan strategis pembangunan desa untuk periode enam tahun.</p>
    <a href="#" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); text-decoration: none; border-radius: 0.375rem;">Unduh</a>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <p style="font-size: 0.875rem; font-weight: 600; color: hsl(var(--primary));">Profil Desa</p>
    <h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">Profil Desa Remau Bako Tuo Tahun 2024</h3>
    <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; margin-bottom: 0.5rem;">Dipublikasikan pada: 01 Maret 2024</p>
    <p style="font-size: 0.875rem; color: #6b7280;">Buku profil desa yang berisi data demografi, geografis, dan potensi desa terbaru.</p>
    <a href="#" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); text-decoration: none; border-radius: 0.375rem;">Unduh</a>
</div>
<div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1rem;">
    <p style="font-size: 0.875rem; font-weight: 600; color: hsl(var(--primary));">Produk Hukum</p>
    <h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">Peraturan Desa (Perdes) No. 3 Tahun 2023 tentang Pengelolaan Sampah</h3>
    <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; margin-bottom: 0.5rem;">Dipublikasikan pada: 20 September 2023</p>
    <p style="font-size: 0.875rem; color: #6b7280;">Peraturan desa yang mengatur tentang mekanisme pengelolaan sampah di lingkungan desa.</p>
    <a href="#" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); text-decoration: none; border-radius: 0.375rem;">Unduh</a>
</div>`
  }
];
