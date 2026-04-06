# Panduan Deployment Terpadu (Netlify / Vercel / Firebase Hosting)

Website Sistem Informasi Desa Anda (DesaHub) dibangun menggunakan Next.js 15 (App Router). Anda bisa me-deploy baik ke platform standard seperti Netlify/Vercel maupun secara otomatis ke **Firebase Hosting** menggunakan GitHub Actions.

## 🔐 Variabel Lingkungan (*Environment Variables*)
Variabel ini wajib ada di platform manapun (Netlify, Vercel, maupun GitHub Secrets). Silakan lihat contoh pada file `.env.example`.

| Key (Nama Variabel) | Kegunaan |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Kunci Publik API Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domain Autentikasi |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID (Misal: desa-lengkap-15157263-d704f) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Ruang Penyimpanan Gambar Firebase |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Identitas Pengirim Pesan |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ID Unik Aplikasi |
| `GOOGLE_GENAI_API_KEY` | Kunci AI Google Gemini untuk fitur AI lokal |

---

## 🚀 Opsi 1: Otomatisasi CI/CD via GitHub Actions (Ke Firebase Hosting)

Kode sekarang sudah sepenuhnya terintegrasi dengan Firebase App Hosting dan GitHub Actions CI/CD (`.github/workflows/deploy-firebase.yml`).

### Langkah untuk Auto-Deploy:
1. Buka repositori GitHub Anda.
2. Pergi ke menu **Settings** > **Secrets and variables** > **Actions**.
3. Klik **New repository secret** lalu tambahkan semua 7 Variabel Lingkungan di atas satu persatu.
4. **PENTING:** Untuk integrasi auth ke Firebase Hosting, Anda memerlukan `FIREBASE_SERVICE_ACCOUNT` (Akun Layanan). Buat ini melalui Firebase Console > Project Settings > Service Accounts > Generate new private key, lalu simpan JSON tersebut sebagai Secret `FIREBASE_SERVICE_ACCOUNT`.
5. Setiap Anda meng-push atau menerima pull request (Merge) ke branch `main`, GitHub akan otomatis mendeploy situs Anda ke Firebase Hosting.

---

## 🚀 Opsi 2: Deployment via Netlify (Manual/Platform Based)

1. Di Dasbor Netlify Anda: klik **Add new site** -> **Import an existing project**.
2. Hubungkan akun GitHub Anda dan pilih repositori `Desa-Lengkap`.
3. Di bagian **Build settings**, biarkan default (`npm run build`).
4. Klik **Show advanced** -> lalu tekan tombol **New variable** (Masukkan tabel atribut Firebase / Google di atas satu per satu).
5. Klik **Deploy site**.

---

## 🛡️ Update Proteksi Lanjutan (Firestore Rules)
Aturan keamanan pada `firestore.rules` sudah sangat diperketat. 
Karena Anda mendeploy menggunakan Firebase (via opsi 1), aturan ini akan otomatis di-publish oleh CLI. Namun, jika menggunakan opsi Netlify, segera pergi ke _[Firebase Console -> Firestore Database -> Rules]_, lalu salin isi file `firestore.rules` untuk melindungi sistem Anda dari kebocoran data.
