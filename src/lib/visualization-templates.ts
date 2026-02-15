import React from 'react';
import PopulationStatChart from '@/components/charts/PopulationStatChart';
import PendidikanChart from '@/components/charts/PendidikanChart';
import PekerjaanChart from '@/components/charts/PekerjaanChart';
import IndeksSosial from '@/components/charts/IndeksSosial';
import IndeksEkonomi from '@/components/charts/IndeksEkonomi';
import IndeksLingkungan from '@/components/charts/IndeksLingkungan';
import VisitorStatChart from '@/components/charts/VisitorStatChart';
import PendapatanDesaChart from '@/components/charts/PendapatanDesaChart';
import BelanjaDesaChart from '@/components/charts/BelanjaDesaChart';

export interface VisualizationTemplate {
  title: string;
  description: string;
  placeholder: string;
  group: 'Demografi' | 'Anggaran' | 'Indeks Desa Membangun' | 'Lainnya';
  previewComponent: React.ReactElement;
}

export const visualizationTemplates: VisualizationTemplate[] = [
  // Demografi
  {
    title: "Piramida Penduduk",
    description: "Menampilkan diagram piramida penduduk berdasarkan kelompok usia dan jenis kelamin.",
    placeholder: "[STATISTIK_PENDUDUK_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PopulationStatChart),
  },
  {
    title: "Diagram Tingkat Pendidikan",
    description: "Diagram lingkaran yang menunjukkan persentase penduduk berdasarkan tingkat pendidikan terakhir.",
    placeholder: "[STATISTIK_PENDIDIKAN_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PendidikanChart),
  },
  {
    title: "Diagram Jenis Pekerjaan",
    description: "Diagram batang yang menampilkan 10 jenis pekerjaan paling umum di kalangan penduduk desa.",
    placeholder: "[STATISTIK_PEKERJAAN_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PekerjaanChart),
  },
  // Anggaran
  {
    title: "Diagram Pendapatan Desa",
    description: "Diagram lingkaran yang merinci komposisi sumber pendapatan desa sesuai APBDes.",
    placeholder: "[DIAGRAM_PENDAPATAN_DESA]",
    group: "Anggaran",
    previewComponent: React.createElement(PendapatanDesaChart),
  },
  {
    title: "Diagram Belanja Desa",
    description: "Diagram lingkaran yang merinci alokasi belanja desa berdasarkan bidang kegiatan.",
    placeholder: "[DIAGRAM_BELANJA_DESA]",
    group: "Anggaran",
    previewComponent: React.createElement(BelanjaDesaChart),
  },
  // Indeks Desa Membangun
  {
    title: "Indeks Ketahanan Sosial (IKS)",
    description: "Menampilkan skor dan komponen penilaian Indeks Ketahanan Sosial desa.",
    placeholder: "[INDEKS_KETAHANAN_SOSIAL]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksSosial, { isPreview: true }),
  },
  {
    title: "Indeks Ketahanan Ekonomi (IKE)",
    description: "Menampilkan skor dan komponen penilaian Indeks Ketahanan Ekonomi desa.",
    placeholder: "[INDEKS_KETAHANAN_EKONOMI]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksEkonomi, { isPreview: true }),
  },
  {
    title: "Indeks Ketahanan Lingkungan (IKL)",
    description: "Menampilkan skor dan komponen penilaian Indeks Ketahanan Lingkungan desa.",
    placeholder: "[INDEKS_KETAHANAN_LINGKUNGAN]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksLingkungan, { isPreview: true }),
  },
  // Lainnya
  {
    title: "Grafik Pengunjung Situs",
    description: "Grafik garis yang menunjukkan data analitik pengunjung situs dalam beberapa waktu terakhir.",
    placeholder: "[STATISTIK_PENGUNJUNG_CHART]",
    group: "Lainnya",
    previewComponent: React.createElement(VisitorStatChart),
  },
];
