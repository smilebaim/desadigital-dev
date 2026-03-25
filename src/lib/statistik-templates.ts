
export const initialStatistikTemplates = [
    {
        key: 'pendapatan_desa',
        title: 'Distribusi Pendapatan Desa',
        group: 'Anggaran',
        data: JSON.stringify({
            sumber: [
                { name: "Dana Desa", value: 1250000000 },
                { name: "Alokasi Dana Desa (ADD)", value: 850000000 },
                { name: "Bagi Hasil Pajak", value: 125000000 },
                { name: "Pendapatan Asli Desa", value: 75000000 }
            ]
        }, null, 2)
    },
    {
        key: 'belanja_desa',
        title: 'Distribusi Belanja Desa',
        group: 'Anggaran',
        data: JSON.stringify({
            bidang: [
                { name: "Penyelenggaraan Pemerintahan", value: 750000000 },
                { name: "Pembangunan", value: 950000000 },
                { name: "Pembinaan Masyarakat", value: 350000000 },
                { name: "Pemberdayaan Masyarakat", value: 250000000 }
            ]
        }, null, 2)
    },
    {
        key: 'indeks_sosial',
        title: 'Indeks Ketahanan Sosial (IKS)',
        group: 'IDM',
        data: JSON.stringify({
            score: 0.75,
            status: "Maju",
            components: [
                { name: 'Pendidikan', score: 0.8 },
                { name: 'Kesehatan', score: 0.75 },
                { name: 'Modal Sosial', score: 0.7 },
                { name: 'Permukiman', score: 0.8 },
                { name: 'Keamanan', score: 0.65 },
            ],
            trend: [
                { year: 2021, score: 0.68 },
                { year: 2022, score: 0.70 },
                { year: 2023, score: 0.72 },
                { year: 2024, score: 0.75 },
            ],
            recommendations: [
                "Peningkatan program beasiswa bagi siswa berprestasi dan kurang mampu.",
                "Penyuluhan kesehatan preventif secara berkala di Posyandu.",
                "Mengaktifkan kembali kegiatan gotong royong dan siskamling.",
                "Program bedah rumah untuk keluarga tidak mampu.",
                "Peningkatan kerjasama antara warga dengan Babinsa/Bhabinkamtibmas."
            ]
        }, null, 2)
    },
    {
        key: 'indeks_ekonomi',
        title: 'Indeks Ketahanan Ekonomi (IKE)',
        group: 'IDM',
        data: JSON.stringify({
            score: 0.72,
            status: "Maju",
            components: [
                { name: 'Keragaman Ekonomi', score: 0.8 },
                { name: 'Akses Permodalan', score: 0.65 },
                { name: 'Keterampilan Kerja', score: 0.7 },
                { name: 'Infrastruktur Ekonomi', score: 0.75 },
                { name: 'Stabilitas Harga', score: 0.6 },
            ],
            trend: [
                { year: 2021, score: 0.65 },
                { year: 2022, score: 0.68 },
                { year: 2023, score: 0.70 },
                { year: 2024, score: 0.72 },
            ],
            recommendations: [
                "Pengembangan produk unggulan desa untuk meningkatkan diversifikasi ekonomi.",
                "Memfasilitasi akses UMKM ke lembaga keuangan formal dan program KUR.",
                "Pelatihan keterampilan digital dan manajemen keuangan untuk pelaku usaha.",
                "Perbaikan jalan produksi dan pasar desa untuk melancarkan distribusi.",
                "Membentuk koperasi desa untuk menjaga stabilitas harga komoditas."
            ]
        }, null, 2)
    },
    {
        key: 'indeks_lingkungan',
        title: 'Indeks Ketahanan Lingkungan (IKL)',
        group: 'IDM',
        data: JSON.stringify({
            score: 0.68,
            status: "Berkembang",
            components: [
                { name: 'Kualitas Lingkungan', score: 0.7 },
                { name: 'Pengelolaan SDA', score: 0.6 },
                { name: 'Pengelolaan Sampah', score: 0.75 },
                { name: 'Adaptasi Iklim', score: 0.65 },
                { name: 'Edukasi Lingkungan', score: 0.7 },
            ],
            trend: [
                { year: 2021, score: 0.62 },
                { year: 2022, score: 0.65 },
                { year: 2023, score: 0.66 },
                { year: 2024, score: 0.68 },
            ],
            recommendations: [
                "Program reboisasi di lahan kritis sekitar desa.",
                "Peningkatan efisiensi bank sampah dan sosialisasi pemilahan sampah dari rumah.",
                "Pembangunan sumur resapan untuk konservasi air tanah.",
                "Kampanye hemat energi dan penggunaan sumber energi terbarukan.",
                "Pengawasan lebih ketat terhadap pencemaran sungai."
            ]
        }, null, 2)
    },
    {
        key: 'penduduk_desa',
        title: 'Statistik Penduduk Desa',
        group: 'Kependudukan',
        data: JSON.stringify({
            total: 1245,
            laki: 630,
            perempuan: 615,
            kepalaKeluarga: 312,
            perKelompokUsia: [
                { name: "0-15th", value: 210 },
                { name: "16-30th", value: 350 },
                { name: "31-45th", value: 420 },
                { name: "46-60th", value: 180 },
                { name: "60th+", value: 85 }
            ]
        }, null, 2)
    }
];
