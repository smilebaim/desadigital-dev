# Sistem Informasi Desa - Next.js, Firebase & Shadcn/UI

Selamat datang di proyek Sistem Informasi Desa (SID) Digital! Aplikasi web modern ini dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Firebase**, serta ditenagai oleh komponen **Shadcn/UI** dan **Tailwind CSS** untuk tampilan yang bersih dan responsif.

Proyek ini dirancang untuk menjadi platform digital yang komprehensif untuk administrasi dan informasi desa, dilengkapi dengan dasbor admin yang kuat untuk mengelola semua aspek situs.

![Pratinjau Dasbor](https://placehold.co/800x400/png?text=Pratinjau+Dasbor+Aplikasi)

## ✨ Fitur Utama

- **Manajemen Konten Dinamis**: Buat dan kelola halaman statis dengan mudah melalui editor di dasbor. Sisipkan komponen visualisasi data (seperti diagram) langsung ke dalam konten menggunakan *placeholder*.
- **Berita & Pengumuman**: Publikasikan artikel, berita, dan pengumuman untuk warga desa dengan status *Published* atau *Draft*.
- **Manajemen Data Kependudukan**: Kelola data demografi penduduk dengan fitur CRUD (Create, Read, Update, Delete) dan impor data massal dari file CSV.
- **Aplikasi Surat Terintegrasi**: Aplikasi khusus untuk mengelola permintaan dan pembuatan "Surat Keterangan Usaha" secara digital.
- **Kontrol Peta Interaktif**: Kelola penanda (marker), area (poligon), dan kategori lapisan untuk ditampilkan pada peta desa berbasis Leaflet.
- **Manajemen Menu Fleksibel**: Atur struktur menu navigasi utama (atas dan bawah) dan menu sidebar melalui antarmuka dasbor yang intuitif.
- **Dasbor Analitik**: Halaman dasbor utama menampilkan ringkasan data penting secara *real-time* seperti jumlah penduduk, berita, dan statistik pengunjung.
- **Autentikasi & Keamanan**: Sistem login yang aman menggunakan Firebase Authentication dan aturan keamanan Firestore yang ketat dan siap produksi.
- **Inisialisasi Otomatis**: Proyek dilengkapi dengan mekanisme *seeding* untuk membuat halaman dan menu awal secara otomatis, mempercepat proses setup.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://reactjs.org/), [Shadcn/UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **Manajemen Form**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Peta**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Diagram**: [Recharts](https://recharts.org/)
- **Manajemen File CSV**: [PapaParse](https://www.papaparse.com/)

## 🛠️ Memulai Proyek

Proyek ini dirancang untuk di-deploy dengan mudah di platform seperti Vercel.

### Prasyarat

- Node.js (v18 atau lebih baru)
- Akun Firebase

### Konfigurasi Firebase

1.  Buat sebuah proyek baru di [Firebase Console](https://console.firebase.google.com/).
2.  Aktifkan layanan **Firestore Database** dan **Authentication** (dengan provider Email/Password).
3.  Buka **Pengaturan Proyek** (`Project Settings`) > **Aplikasi Anda** (`Your apps`).
4.  Buat sebuah "Aplikasi Web" baru.
5.  Salin konfigurasi Firebase (objek `firebaseConfig`).
6.  Tempel konfigurasi tersebut ke dalam file `src/firebase/config.ts`.
7.  Pastikan untuk mengaktifkan **App Check** di Firebase Console untuk keamanan tambahan.

### Instalasi Lokal

1.  Clone repositori ini:
    ```bash
    git clone https://github.com/NAMA_PENGGUNA/NAMA_REPO.git
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd NAMA_REPO
    ```
3.  Install dependensi:
    ```bash
    npm install
    ```
4.  Jalankan server pengembangan:
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

### Inisialisasi Konten Awal

Saat pertama kali menjalankan dasbor, beberapa menu dan halaman mungkin kosong. Gunakan fitur berikut untuk inisialisasi:
- Masuk ke **Kelola Menu** di dasbor dan klik tombol **"Buat Menu Default"**.
- Masuk ke **Kelola Halaman** di dasbor. Halaman awal akan dibuat secara otomatis saat Anda pertama kali membukanya.

## 📁 Struktur Proyek

- `src/app`: Direktori utama untuk halaman dan layout (menggunakan App Router Next.js).
  - `(public)`: Grup rute untuk halaman yang dapat diakses publik.
  - `dashboard`: Grup rute untuk semua halaman dasbor admin.
- `src/components`: Komponen React yang dapat digunakan kembali.
  - `ui`: Komponen dari Shadcn/UI.
  - `charts`: Komponen diagram kustom menggunakan Recharts.
- `src/lib`: Berisi logika sisi server (actions), konfigurasi, dan utilitas.
- `src/firebase`: Konfigurasi dan hooks kustom untuk Firebase.
- `src/pages`: Komponen halaman yang digunakan oleh App Router.
- `src/layouts`: Komponen layout untuk halaman publik dan dasbor.
- `docs/backend.json`: Skema data yang digunakan oleh aplikasi.
- `firestore.rules`: Aturan keamanan untuk Firestore Database.

## 🚀 Deployment

Proyek ini siap untuk di-deploy di [Vercel](https://vercel.com/). Hubungkan repositori GitHub Anda ke Vercel untuk deployment otomatis pada setiap `git push`. Vercel akan secara otomatis mendeteksi bahwa ini adalah proyek Next.js dan mengkonfigurasinya dengan benar. Jangan lupa untuk mengatur *environment variables* jika diperlukan.
