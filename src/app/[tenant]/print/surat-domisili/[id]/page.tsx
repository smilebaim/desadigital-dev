'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSuratDomisiliById, type SuratDomisiliData } from '@/lib/surat-domisili-actions';
import { getSiteSettings, type SiteSettings } from '@/lib/site-settings-actions';
import { getPendudukById, type PendudukData } from '@/lib/penduduk-actions';
import { Loader2, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Surat extends SuratDomisiliData {
  id: string;
}

const PrintSuratDomisili = () => {
  const params = useParams();
  const id = params?.id as string;
  const tenantId = (Array.isArray(params?.tenant) ? params.tenant[0] : params?.tenant) as string | undefined;
  
  const [surat, setSurat] = useState<Surat | null>(null);
  const [penduduk, setPenduduk] = useState<PendudukData | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!id) return;
      
      const [suratData, settingsData] = await Promise.all([
        getSuratDomisiliById(id),
        getSiteSettings(tenantId)
      ]);

      if (suratData) {
        setSurat(suratData as Surat);
        const pendudukData = await getPendudukById(suratData.pendudukId);
        if (pendudukData) setPenduduk(pendudukData);
      }
      
      if (settingsData) {
        setSettings(settingsData);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Menyiapkan dokumen arsip cetak...</p>
      </div>
    );
  }

  if (!surat || !settings || !penduduk) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100 space-y-4">
        <p className="text-red-500 font-medium">Gagal memuat data surat atau penduduk.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/apps/surat-domisili">Kembali ke Dashboard</Link>
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const tempatLahir = penduduk.biodata?.tempatLahir || '-';
  const tanggalLahir = penduduk.biodata?.tanggalLahir ? new Date(penduduk.biodata.tanggalLahir).toLocaleDateString('id-ID') : '-';

  return (
    <div className="min-h-screen bg-neutral-100 print:bg-white text-black font-sans pb-12">
      {/* 
        Aksi Header (Sembunyi saat Print) 
      */}
      <div className="print:hidden sticky top-0 z-50 bg-white border-b shadow-sm w-full py-4 px-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/apps/surat-domisili"><ArrowLeft className="h-4 w-4 mr-2" /> Kembali</Link>
          </Button>
          <div>
            <h1 className="font-semibold">Pratinjau Kertas A4</h1>
            <p className="text-xs text-muted-foreground">Surat Keterangan Domisili a.n. {surat.namaPemohon}</p>
          </div>
        </div>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Cetak Dokumen (Ctrl+P)
        </Button>
      </div>

      {/* 
        Kertas A4 Simulasi
      */}
      <div className="mx-auto bg-white shadow-xl print:shadow-none w-[210mm] min-h-[297mm] px-[20mm] py-[25mm] relative box-border">
        
        {/* Kop Surat */}
        <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-1">
          {/* Logo Kiri (Opsional/Garuda/Desa) */}
          <div className="w-24 flex-shrink-0 flex items-center justify-center">
            {/* Menggunakan Image placeholder untuk logo wilayah */}
             {settings.logoUrl && (
                <div className="relative w-20 h-24 grayscale print:grayscale-0">
                  <Image src={settings.logoUrl} alt="Logo" fill className="object-contain" crossOrigin="anonymous"/>
                </div>
             )}
          </div>

          <div className="flex-1 text-center font-serif leading-tight">
             <h2 className="text-xl font-bold uppercase tracking-wider">PEMERINTAH KABUPATEN {settings.kabupaten || 'KABUPATEN ...'}</h2>
             <h2 className="text-xl font-bold uppercase tracking-wider">KECAMATAN {settings.kecamatan || 'KECAMATAN ...'}</h2>
             <h1 className="text-2xl font-black uppercase tracking-widest mt-1">DESA {settings.siteName || 'NAMA DESA'}</h1>
             <p className="text-sm mt-2">{settings.contactAddress || 'Alamat Desa'}</p>
             <p className="text-sm">Email: {settings.contactEmail || '-'} | Kodepos: {settings.kodePos || '-'}</p>
          </div>
          
          {/* Ruang kosong kanan penyeimbang */}
           <div className="w-24 flex-shrink-0"></div>
        </div>
        <div className="border-b-[1px] border-black w-full mb-8"></div> {/* Garis ganda Kop Surat */}
        
        {/* Judul Surat */}
        <div className="text-center mb-10">
          <h3 className="text-lg font-bold uppercase underline underline-offset-4 tracking-wider">SURAT KETERANGAN DOMISILI</h3>
          <p className="mt-1 text-sm">Nomor: {surat.nomorSurat || '......./......../........./........'}</p>
        </div>

        {/* Isi Surat */}
        <div className="text-justify text-[11pt] leading-relaxed mb-6">
          <p>
            Yang bertanda tangan di bawah ini Kepala Desa {settings.siteName || '...'}, Kecamatan {settings.kecamatan || '...'}, Kabupaten {settings.kabupaten || '...'}, menerangkan dengan sebenarnya bahwa:
          </p>
        </div>

        {/* Tabel Biodata */}
        <div className="ml-8 mb-6 text-[11pt]">
          <table className="w-full align-top border-collapse border-0">
             <tbody>
                <tr>
                   <td className="w-[180px] py-1 border-0">Nama Lengkap</td>
                   <td className="w-4 border-0">:</td>
                   <td className="font-bold uppercase border-0">{penduduk.nama}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0">NIK</td>
                   <td className="w-4 border-0">:</td>
                   <td className="border-0">{penduduk.nik}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0">Tempat, Tanggal Lahir</td>
                   <td className="w-4 border-0">:</td>
                   <td className="border-0">{tempatLahir}, {tanggalLahir}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0">Jenis Kelamin</td>
                   <td className="w-4 border-0">:</td>
                   <td className="border-0">{penduduk.biodata?.jenisKelamin || '-'}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0">Agama</td>
                   <td className="w-4 border-0">:</td>
                   <td className="border-0">{penduduk.biodata?.agama || '-'}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0">Pekerjaan</td>
                   <td className="w-4 border-0">:</td>
                   <td className="border-0">{penduduk.biodata?.pekerjaan || '-'}</td>
                </tr>
                <tr>
                   <td className="w-[180px] py-1 border-0 align-top">Alamat Domisili</td>
                   <td className="w-4 border-0 align-top">:</td>
                   <td className="border-0">{penduduk.alamat || '-'}</td>
                </tr>
             </tbody>
          </table>
        </div>

        {/* Paragraf Penutup & Keterangan Tambahan */}
        <div className="text-justify text-[11pt] leading-relaxed">
          <p className="mb-4">
             Orang tersebut di atas adalah benar-benar warga dan penduduk yang berdomisili di Desa {settings.siteName || '...'}, dan tercatat dalam register kependudukan desa kami. Surat keterangan domisili ini diberikan untuk keperluan:
          </p>
          <p className="mb-4 font-bold text-center border py-2 bg-gray-50 uppercase print:bg-white print:border-black">
             "{surat.keperluan || 'TIDAK DISEBUTKAN'}"
          </p>
          {surat.keterangan && (
             <p className="mb-4">
               <strong>Catatan Tambahan:</strong> {surat.keterangan}
             </p>
          )}
          <p>
            Demikian surat keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
          </p>
        </div>

        {/* Tanda Tangan */}
        <div className="flex justify-end mt-16 text-[11pt]">
           <div className="text-center w-[250px]">
              <p>{settings.siteName || 'Nama Desa'}, {today}</p>
              <p>Kepala Desa {settings.siteName || 'Nama Desa'}</p>
              <div className="h-24"></div> {/* Ruang Stempel & TTD */}
              <p className="font-bold underline underline-offset-4 uppercase">{settings.kepalaDesaName || 'H. ABDULLAH'}</p>
              {settings.kepalaDesaNip && (
                  <p>NIP. {settings.kepalaDesaNip}</p>
              )}
           </div>
        </div>

        {/* Footer Tracking / Barcode (Opsional) */}
        {surat.trackingCode && (
           <div className="absolute bottom-[20mm] left-[20mm] text-[8pt] font-mono text-gray-500">
              ID Dokumen: {surat.trackingCode} | Diunduh sistem
           </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
          }
          @page {
            size: auto;
            margin: 0mm;
          }
        }
      `}} />
    </div>
  );
};

export default PrintSuratDomisili;
