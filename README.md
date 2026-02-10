# Sistem Informasi Desa - Next.js & Firebase

Selamat datang di proyek Sistem Informasi Desa (SID)! Aplikasi web ini dibangun menggunakan Next.js, TypeScript, dan Firebase, yang dirancang untuk menyediakan platform digital yang komprehensif untuk administrasi dan informasi desa.

Proyek ini dilengkapi dengan dasbor admin yang kuat untuk mengelola semua aspek situs, mulai dari konten halaman, berita, data kependudukan, hingga pengaturan peta interaktif.

## Fitur Utama

- **Manajemen Konten Dinamis**: Buat, edit, dan kelola halaman statis dengan mudah melalui editor di dasbor.
- **Sistem Berita & Pengumuman**: Publikasikan artikel, berita, dan pengumuman untuk warga desa.
- **Manajemen Data Kependudukan**: Kelola data demografi penduduk dengan fitur CRUD (Create, Read, Update, Delete) dan impor data dari file CSV.
- **Manajemen Surat**: Aplikasi khusus untuk mengelola permintaan dan pembuatan "Surat Keterangan Usaha".
- **Kontrol Peta Interaktif**: Kelola penanda (marker), area (poligon), dan lapisan kategori untuk ditampilkan pada peta desa berbasis Leaflet.
- **Manajemen Menu Fleksibel**: Atur struktur menu navigasi utama (atas dan bawah) dan menu sidebar melalui antarmuka dasbor.
- **Dasbor Analitik**: Halaman dasbor utama menampilkan ringkasan data penting seperti jumlah penduduk, berita, dan statistik lainnya.
- **Autentikasi Firebase**: Sistem login yang aman untuk admin dan staf desa.
- **Keamanan Siap Produksi**: Aturan Keamanan Firestore yang ketat untuk melindungi data desa.

## Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://reactjs.org/), [Shadcn/UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **Manajemen Form**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Peta**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Diagram**: [Recharts](https://recharts.org/)

## Memulai Proyek

Proyek ini dirancang untuk di-deploy dengan mudah di platform seperti Vercel.

### Prasyarat

- Node.js (v18 atau lebih baru)
- Akun Firebase

### Konfigurasi Firebase

1.  Buat sebuah proyek baru di [Firebase Console](https://console.firebase.google.com/).
2.  Aktifkan layanan **Firestore Database** dan **Authentication** (dengan provider Email/Password).
3.  Buka Pengaturan Proyek (`Project Settings`) > **Aplikasi Anda** (`Your apps`).
4.  Buat sebuah "Aplikasi Web" baru.
5.  Salin konfigurasi Firebase (objek `firebaseConfig`).
6.  Tempel konfigurasi tersebut ke dalam file `src/firebase/config.ts`.

### Instalasi Lokal

1.  Clone repositori ini:
    ```bash
    git clone https://github.com/USERNAME/NAMA-REPO.git
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd NAMA-REPO
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

## Struktur Proyek

- `src/app`: Direktori utama untuk halaman dan layout (menggunakan App Router Next.js).
  - `(public)`: Grup rute untuk halaman yang dapat diakses publik.
  - `dashboard`: Grup rute untuk semua halaman dasbor admin.
- `src/components`: Komponen React yang dapat digunakan kembali.
  - `ui`: Komponen dari Shadcn/UI.
- `src/lib`: Berisi logika server-side (actions), konfigurasi, dan utilitas.
- `src/firebase`: Konfigurasi dan hooks kustom untuk Firebase.
- `src/pages`: Komponen halaman yang digunakan oleh App Router.
- `src/layouts`: Komponen layout untuk halaman publik dan dasbor.
- `docs/backend.json`: Skema data yang digunakan oleh aplikasi.
- `firestore.rules`: Aturan keamanan untuk Firestore Database.

## Deployment

Proyek ini siap untuk di-deploy di [Vercel](https://vercel.com/). Hubungkan repositori GitHub Anda ke Vercel untuk deployment otomatis pada setiap `git push`. Vercel akan secara otomatis mendeteksi bahwa ini adalah proyek Next.js dan mengkonfigurasinya dengan benar.
