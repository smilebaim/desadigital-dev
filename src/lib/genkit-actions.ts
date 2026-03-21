'use server';

import { ai } from './genkit';

type ClientMessage = { role: 'user' | 'assistant'; content: string };

export async function askAssistant(question: string, history: ClientMessage[] = []) {
  try {
    const systemPrompt = `Anda adalah Asisten Virtual AI untuk Desa Remau Bako Tuo, Kabupaten Tanjung Jabung Timur. 
Tugas Anda adalah membantu warga menjawab pertanyaan terkait layanan administrasi desa, profil desa, tata ruang, atau informasi umum pedesaan.

INFORMASI PENTING DESA (Konteks Acuan Utama):
- Website ini terintegrasi fitur: Profil Desa, Berita, Tata Ruang (Peta Interaktif), dan Aplikasi Layanan Desa mandiri.
- Layanan Surat Menyurat Mandiri meliputi 8 urusan: Surat Keterangan Usaha, Surat Domisili, Surat Pindah, Pengantar, Keterangan, Nikah, Kelahiran, dan Kematian. Untuk buat surat, arahkan warga ke menu Dasbor -> Aplikasi Desa.
- Lokasi Desa: Kecamatan Dendang, Kabupaten Tanjung Jabung Timur, Provinsi Jambi.
- Jam Pelayanan Kantor: Senin - Jumat (08.00 - 15.00 WIB).

Aturan Menjawab:
- Gunakan bahasa Indonesia yang sopan, ramah, dan ringkas.
- Wajib menggunakan format Markdown (tambahkan titik bullet atau teks tebal) agar mudah dibaca.
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
    console.error("Genkit generation error:", error);
    return { 
      success: false, 
      error: 'Maaf, sistem asisten AI sedang sibuk atau konfigurasi API belum lengkap. Silakan coba lagi nanti.' 
    };
  }
}
