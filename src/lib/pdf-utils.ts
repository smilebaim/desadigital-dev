import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateTrackingCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const generateSuratPDF = async (type: string, data: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Kop Surat
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PEMERINTAH KABUPATEN TANJUNG JABUNG TIMUR', pageWidth / 2, 20, { align: 'center' });
    doc.text('KECAMATAN SADU', pageWidth / 2, 27, { align: 'center' });
    doc.setFontSize(16);
    doc.text('DESA REMAU BAKO TUO', pageWidth / 2, 35, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Alamat: Jl. Raya Desa No. 1, Desa Remau Bako Tuo, Kec. Sadu, Kab. Tanjung Jabung Timur', pageWidth / 2, 42, { align: 'center' });
    
    // Garis Kop
    doc.setLineWidth(1);
    doc.line(20, 45, pageWidth - 20, 45);
    doc.setLineWidth(0.5);
    doc.line(20, 47, pageWidth - 20, 47);

    // Judul Surat
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(type.toUpperCase(), pageWidth / 2, 60, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const nomorSurat = data.nomorSurat || '.../..../..../....';
    doc.text(`Nomor: ${nomorSurat}`, pageWidth / 2, 67, { align: 'center' });

    // Isi Surat
    doc.setFontSize(11);
    doc.text('Yang bertanda tangan di bawah ini, Kepala Desa Remau Bako Tuo, Kecamatan Sadu, Kabupaten Tanjung Jabung Timur, dengan ini menerangkan bahwa:', 20, 80, { maxWidth: pageWidth - 40 });

    // Data Penduduk
    const tableData = [
        ['Nama Lengkap', `: ${data.namaPemohon || data.namaBayi || data.pria_nama || '...'}`],
        ['NIK', `: ${data.nikPemohon || data.nikIbu || data.pria_nik || '...'}`],
    ];

    if (data.namaUsaha) {
        tableData.push(['Nama Usaha', `: ${data.namaUsaha}`]);
        tableData.push(['Jenis Usaha', `: ${data.jenisUsaha}`]);
        tableData.push(['Alamat Usaha', `: ${data.alamatUsaha}`]);
    }

    if (data.tanggalLahirBayi) {
        tableData.push(['Nama Bayi', `: ${data.namaBayi}`]);
        tableData.push(['Tempat/Tgl Lahir', `: ${data.tempatLahirBayi}, ${new Date(data.tanggalLahirBayi).toLocaleDateString('id-ID')}`]);
    }

    if (data.alamatTujuan) {
        tableData.push(['Alamat Tujuan', `: ${data.alamatTujuan}`]);
        tableData.push(['Alasan Pindah', `: ${data.alasanPindah}`]);
    }

    if (data.keterangan) {
        tableData.push(['Keterangan', `: ${data.keterangan}`]);
    }

    if (data.keperluan) {
        tableData.push(['Keperluan', `: ${data.keperluan}`]);
    }

    autoTable(doc, {
        body: tableData,
        startY: 90,
        theme: 'plain',
        margin: { left: 25 },
        styles: { fontSize: 11, cellPadding: 1 },
        columnStyles: { 0: { cellWidth: 40 } }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    doc.text('Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.', 20, finalY + 15, { maxWidth: pageWidth - 40 });

    // Tanda Tangan
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.text(`Remau Bako Tuo, ${today}`, pageWidth - 80, finalY + 40);
    doc.text('Kepala Desa Remau Bako Tuo', pageWidth - 80, finalY + 47);
    
    doc.setFont('helvetica', 'bold');
    doc.text('H. ABDULLAH', pageWidth - 80, finalY + 75);

    // Footer Tracking
    if (data.trackingCode) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(`Tracking Code: ${data.trackingCode}`, 20, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save(`${type.replace(/\s+/g, '_')}_${data.nikPemohon || data.namaPemohon}.pdf`);
};
