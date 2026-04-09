/**
 * Mengekstrak tenant ID (subdomain) secara tahan banting (robust).
 * Mendukung URL dengan banyak titik seperti subdomain dari deployment Vercel.
 *
 * @param hostname String dari request.headers.get('host') atau window.location.hostname
 * @returns tenantId (string) jika ada, null jika merupakan domain utama/SaaS.
 */
export function extractSubdomain(hostname: string | undefined | null): string | null {
    if (!hostname) return null;
  
    // Bersihkan port jika ada (contoh: localhost:3000 -> localhost)
    let cleanHostname = hostname.split(':')[0].toLowerCase();
    
    // 1. Kasus khusus localhost untuk development lokal (Tiers Teraman)
    if (cleanHostname === 'localhost' || cleanHostname === '127.0.0.1') return null;
    if (cleanHostname.endsWith('.localhost')) {
      return cleanHostname.replace('.localhost', '');
    }
  
    // 2. Pendekatan Berbasis Konfigurasi Lingkungan (Tiers Akurasi Tertinggi)
    // Ambil APP_URL dari var environment (bisa berjalan di klien dengan NEXT_PUBLIC)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    let rootDomain = '';
    
    try {
      if (appUrl && appUrl.startsWith('http')) {
        // Amankan agar new URL tidak pecah
        const parsedUrl = new URL(appUrl);
        rootDomain = parsedUrl.hostname.toLowerCase();
      }
    } catch (e) {
      // Abaikan jika konfigurasi NEXT_PUBLIC_APP_URL bermasalah/kosong
    }
  
    if (rootDomain && rootDomain !== 'localhost' && rootDomain !== '127.0.0.1') {
      // Jika hostname yang diakses SAMA PERSIS dengan root domain -> Akses domain utama (SaaS)
      if (cleanHostname === rootDomain) return null;
      
      // Jika hostname berakhiran dengan .rootDomain
      // Contoh: rootDomain = develop.domainsaya.com 
      //         cleanHostname = sukamaju.develop.domainsaya.com
      if (cleanHostname.endsWith(`.${rootDomain}`)) {
        // Ambil prefix di depan rootDomain sebagai id tenant. (return 'sukamaju')
        return cleanHostname.replace(`.${rootDomain}`, '');
      }
    }
  
    // 3. Fallback Heuristik JIKA struktur root domain tidak masuk ke ENV (Tiers Darurat)
    const parts = cleanHostname.split('.');
    
    // Jika format hanya 1 bagian (intralokal) atau 2 bagian (domainsaya.com)
    // Secara otomatis dianggap domain utama tanpa tenant.
    if (parts.length <= 2) return null;
    
    // Daftar kata kunci yang sering dipakai sebagai prefix domain utama tapi bukan desa
    const excluded = new Set([
       'www', 'developer', 'app', 'api', 'dev', 'develop', 
       'staging', 'preview', 'test', 'admin', 'auth', 'dashboard', 'panel'
    ]);
    
    const sub = parts[0];
    
    // Jika kata pertama itu masuk dalam daftar larangan // atau berisi angka melulu (IP target)
    if (excluded.has(sub) || /^\d+$/.test(sub)) return null;
    
    // Asumsi darurat terakhir: bagian paling depan adalah tenant
    return sub;
  }
  
