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
  }
];
