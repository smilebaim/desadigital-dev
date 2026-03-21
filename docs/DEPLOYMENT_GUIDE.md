# Panduan Deployment (Peluncuran Web) ke Netlify/Vercel

Website Sistem Informasi Desa Anda menggunakan Next.js 15 (App Router). Mengudara ke ranah _production_ (seperti Netlify atau Vercel) sangatlah mudah tanpa perlu menulis kode apa-apa lagi!

## 🔐 Variabel Lingkungan (*Environment Variables*)
Ini adalah langkah paling krusial! Saat Anda membuat proyek baru di Netlify dan menyambungkan repositori GitHub/GitLab Anda, cari pengaturan **Environment Variables** sebelum Anda me-klik tombol *Deploy/Build*.

Tambahkan pasangan kunci dan nilainya dari file `.env.local` lokal Anda:

| Key (Nama Variabel) | Kegunaan |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Kunci Publik API Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domain Autentikasi |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID (Misal: desa-remau-bako) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Ruang Penyimpanan Gambar Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Identitas Pengirim Pesan |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ID Unik Aplikasi |
| `GOOGLE_GENAI_API_KEY` | **SANGAT PENTING**: Kunci AI Google Gemini agar Asisten Chatbot tidak error 500 |

### Langkah di Netlify:
1. Klik tombol **Add new site** -> **Import an existing project**.
2. Hubungkan akun GitHub Anda dan pilih repositori `Desa-Lengkap`.
3. Di bagian **Build settings**, biarkan apa adanya (Netlify otomatis mendeteksi konfigurasi `npm run build`).
4. Klik **Show advanced** -> lalu tekan tombol **New variable** (Masukkan tabel kunci di atas satu per satu).
5. Klik **Deploy site**.

### Update Proteksi Lanjutan
Aturan `firestore.rules` pada kodingan Anda baru saja diperbarui menjadi ketat (_Secure_). Penduduk luar tidak akan bisa melihat apalagi mengubah data administrasi dasbor.
**Penting:** Jika Anda belum memperbarui _rules_ ini di konsol Firebase (Web), maka segera pergi ke _[Firebase Console -> Firestore Database -> Rules]_, lalu salin kode yang ada di file `firestore.rules` kodingan Anda untuk merelai ke peladen Firebase Google!
