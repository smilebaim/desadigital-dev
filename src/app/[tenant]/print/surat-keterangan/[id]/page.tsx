'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSuratKeteranganById, type SuratKeteranganData } from '@/lib/surat-keterangan-actions';
import { getSiteSettings, type SiteSettings } from '@/lib/site-settings-actions';
import { getPendudukById, type PendudukData } from '@/lib/penduduk-actions';
import { Loader2, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const PrintSuratKeterangan = () => {
  const { id } = useParams() as { id: string };
  const [surat, setSurat] = useState<(SuratKeteranganData & { id: string }) | null>(null);
  const [penduduk, setPenduduk] = useState<PendudukData | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [suratData, settingsData] = await Promise.all([getSuratKeteranganById(id), getSiteSettings()]);
      if (suratData) { setSurat(suratData); const p = await getPendudukById(suratData.pendudukId); if (p) setPenduduk(p); }
      if (settingsData) setSettings(settingsData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  if (!surat || !settings) return <div className="p-8 text-red-500">Data tidak ditemukan. <Link href="/dashboard/apps/surat-keterangan" className="underline">Kembali</Link></div>;

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-neutral-100 print:bg-white text-black font-sans pb-12">
      <div className="print:hidden sticky top-0 z-50 bg-white border-b shadow-sm w-full py-4 px-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild><Link href="/dashboard/apps/surat-keterangan"><ArrowLeft className="h-4 w-4 mr-2" /> Kembali</Link></Button>
          <div><h1 className="font-semibold">Pratinjau Cetak: Surat Keterangan</h1><p className="text-xs text-muted-foreground">a.n. {surat.namaPemohon}</p></div>
        </div>
        <Button onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Cetak Dokumen</Button>
      </div>
      <div className="mx-auto bg-white shadow-xl print:shadow-none w-[210mm] min-h-[297mm] px-[20mm] py-[25mm] relative box-border">
        <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-1">
          <div className="w-24 flex-shrink-0 flex items-center justify-center">
            {settings.logoUrl && <div className="relative w-20 h-24 grayscale"><Image src={settings.logoUrl} alt="Logo" fill className="object-contain" crossOrigin="anonymous"/></div>}
          </div>
          <div className="flex-1 text-center font-serif leading-tight">
            <h2 className="text-xl font-bold uppercase">PEMERINTAH KABUPATEN {settings.kabupaten || '...'}</h2>
            <h2 className="text-xl font-bold uppercase">KECAMATAN {settings.kecamatan || '...'}</h2>
            <h1 className="text-2xl font-black uppercase mt-1">DESA {settings.siteName || '...'}</h1>
            <p className="text-sm mt-2">{settings.contactAddress}</p>
          </div>
          <div className="w-24 flex-shrink-0"></div>
        </div>
        <div className="border-b border-black w-full mb-8"></div>
        <div className="text-center mb-10">
          <h3 className="text-lg font-bold uppercase underline underline-offset-4">SURAT KETERANGAN</h3>
          <p className="mt-1 text-sm">Nomor: {surat.nomorSurat || '......./......../.........'}</p>
        </div>
        <p className="text-[11pt] mb-6 text-justify">Yang bertanda tangan di bawah ini Kepala Desa {settings.siteName || '...'}, Kecamatan {settings.kecamatan || '...'}, Kabupaten {settings.kabupaten || '...'}, menerangkan bahwa:</p>
        <div className="ml-8 mb-6 text-[11pt]">
          <table className="w-full align-top border-0"><tbody>
            <tr><td className="w-44 py-1">Nama Lengkap</td><td className="w-4">:</td><td className="font-bold uppercase">{surat.namaPemohon}</td></tr>
            <tr><td className="w-44 py-1">NIK</td><td className="w-4">:</td><td>{surat.nikPemohon}</td></tr>
            {penduduk && <><tr><td className="w-44 py-1">Tempat, Tgl. Lahir</td><td className="w-4">:</td><td>{penduduk.tempatLahir || '-'}, {penduduk.tanggalLahir ? new Date(penduduk.tanggalLahir).toLocaleDateString('id-ID') : '-'}</td></tr>
            <tr><td className="w-44 py-1">Pekerjaan</td><td className="w-4">:</td><td>{penduduk.pekerjaan || '-'}</td></tr>
            <tr><td className="w-44 py-1">Alamat</td><td className="w-4">:</td><td>{penduduk.alamat || '-'}</td></tr></>}
          </tbody></table>
        </div>
        <p className="text-[11pt] mb-4 text-justify font-bold border py-3 px-4 bg-gray-50 print:bg-white print:border-black">Keterangan: {surat.keterangan}</p>
        <p className="text-[11pt] text-justify">Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
        <div className="flex justify-end mt-16 text-[11pt]">
          <div className="text-center w-[250px]">
            <p>{settings.siteName || '...'}, {today}</p>
            <p>Kepala Desa {settings.siteName || '...'}</p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{settings.kepalaDesaName || '...'}</p>
            {settings.kepalaDesaNip && <p>NIP. {settings.kepalaDesaNip}</p>}
          </div>
        </div>
        {surat.trackingCode && <div className="absolute bottom-[20mm] left-[20mm] text-[8pt] font-mono text-gray-500">ID: {surat.trackingCode}</div>}
      </div>
      <style dangerouslySetInnerHTML={{__html: `@media print { body { background: white !important; } @page { size: auto; margin: 0mm; } }`}} />
    </div>
  );
};

export default PrintSuratKeterangan;
