'use server';

import { ai } from './genkit';
import { getSiteSettings } from './site-settings-actions';
import { getStatistikByKey } from './statistik-actions';
import { getPublishedPosts } from './posts-actions';

type ClientMessage = { role: 'user' | 'assistant'; content: string };

export async function askAssistant(question: string, history: ClientMessage[] = []) {
  try {
    // 🔍 Fetch Dynamic Context
    const [settings, statsAnggaran, statsPenduduk, recentPosts] = await Promise.all([
      getSiteSettings(),
      getStatistikByKey('belanja_desa'),
      getStatistikByKey('penduduk_desa'), // Assuming this key exists or will be added
      getPublishedPosts().then(posts => posts.slice(0, 3))
    ]);

    const siteName = settings?.siteName || "Desa Remau Bako Tuo";
    const contact = `Email: ${settings?.contactEmail || '-'}, Telp: ${settings?.contactPhone || '-'}, Alamat: ${settings?.contactAddress || '-'}`;
    
    // Parse stats if available
    let budgetInfo = "Data anggaran belum tersedia.";
    if (statsAnggaran?.data) {
        try {
            const data = JSON.parse(statsAnggaran.data);
            const total = data.bidang?.reduce((acc: number, curr: any) => acc + (curr.nominal || 0), 0);
            budgetInfo = `Total Belanja APBDes: Rp ${total?.toLocaleString('id-ID') || '0'}. Terdiri dari bidang: ${data.bidang?.map((b: any) => b.nama).join(', ')}.`;
        } catch (e) { /* ignore parse error */ }
    }

    // Parse population stats
    let populationInfo = "Data penduduk belum tersedia.";
    if (statsPenduduk?.data) {
        try {
            const data = JSON.parse(statsPenduduk.data);
            populationInfo = `Total: ${data.total || '0'} jiwa (${data.laki || '0'} Laki-laki, ${data.perempuan || '0'} Perempuan). Terdiri dari ${data.kepalaKeluarga || '0'} Kepala Keluarga.`;
        } catch (e) { /* ignore */ }
    }

    const newsList = recentPosts.length > 0 
        ? recentPosts.map(p => `- ${p.title}`).join('\n') 
        : "Belum ada berita terbaru.";

    const systemPrompt = `Anda adalah Asisten Virtual AI untuk ${siteName}, Kabupaten Tanjung Jabung Timur. 
Tugas Anda adalah membantu warga menjawab pertanyaan terkait layanan administrasi desa, profil desa, tata ruang, atau informasi umum pedesaan.

KONTEKS DESA SAAT INI (Data Real-time):
- Nama Desa: ${siteName}
- Kontak Desa: ${contact}
- Statistik Penduduk: ${populationInfo}
- Informasi Anggaran (APBDes): ${budgetInfo}
- Berita/Kegiatan Terakhir: 
${newsList}

FITUR WEBSITE:
- Profil Desa, Berita, Tata Ruang (Peta Interaktif), dan Aplikasi Layanan Desa mandiri.
- Layanan Surat Menyurat Mandiri meliputi 8 urusan: Surat Keterangan Usaha, Surat Domisili, Surat Pindah, Pengantar, Keterangan, Nikah, Kelahiran, dan Kematian. Untuk buat surat, arahkan warga ke menu Dasbor -> Aplikasi Desa.
- Lokasi Desa: Kecamatan Dendang, Kabupaten Tanjung Jabung Timur, Provinsi Jambi.
- Jam Pelayanan Kantor: Senin - Jumat (08.00 - 15.00 WIB).

Aturan Menjawab:
- Gunakan bahasa Indonesia yang sopan, ramah, dan ramah lingkungan (human-like).
- Wajib menggunakan format Markdown (titik bullet, teks tebal, atau tabel singkat) agar sangat mudah dibaca.
- Jawablah berdasarkan konteks desa yang diberikan di atas. Jika data spesifik tidak ada, jawab secara umum tentang prosedur desa.
- Jika ditanya tentang layanan khusus, beri tahu cara mengakses fitur mandirinya di Web ini.
- Tolak halus pertanyaan yang melenceng jauh dari urusan administrasi desa atau urusan umum pedesaan.`;

    const formattedMessages = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      content: [{ text: msg.content }]
    })) as any[];

    // Include the new question
    formattedMessages.push({ role: 'user', content: [{ text: question }] });

    const { text } = await ai.generate({
      system: systemPrompt,
      messages: formattedMessages,
      config: {
        temperature: 0.7,
      }
    });

    return { success: true, text };
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    if (error.stack) console.error(error.stack);
    
    // If it's an API Key error, be specific (helpful for the user/admin)
    const errorMessage = (error.message?.includes('API key') || error.message?.includes('403'))
        ? 'Konfigurasi API AI belum valid. Harap cek file .env.local Anda.' 
        : 'Maaf, sistem asisten AI sedang sibuk. Silakan coba lagi nanti.';
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}
