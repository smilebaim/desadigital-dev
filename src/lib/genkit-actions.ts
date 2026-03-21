'use server';

import { ai } from './genkit';

export async function askAssistant(question: string) {
  try {
    const { text } = await ai.generate({
      prompt: `Anda adalah Asisten Virtual AI untuk Desa Remau Bako Tuo, Kabupaten Tanjung Jabung Timur. 
      Tugas Anda adalah membantu warga menjawab pertanyaan terkait layanan administrasi desa, profil desa, tata ruang, atau informasi umum pedesaan.
      - Gunakan bahasa Indonesia yang sopan, ramah, dan profesional.
      - Berikan jawaban yang ringkas, runtut, dan mudah dipahami.
      - Jika ditanya hal di luar konteks desa, arahkan kembali pembicaraan ke layanan desa.
      - Selalu tawarkan bantuan lebih lanjut di akhir jawaban Anda.
      
      Pertanyaan Warga: ${question}`,
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
