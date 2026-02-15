import PopulationStatChart from "@/components/charts/PopulationStatChart";
import PendidikanChart from "@/components/charts/PendidikanChart";
import PekerjaanChart from "@/components/charts/PekerjaanChart";
import IndeksSosial from "@/components/charts/IndeksSosial";
import IndeksEkonomi from "@/components/charts/IndeksEkonomi";
import IndeksLingkungan from "@/components/charts/IndeksLingkungan";
import VisitorStatChart from "@/components/charts/VisitorStatChart";
import PendapatanDesaChart from "@/components/charts/PendapatanDesaChart";
import BelanjaDesaChart from "@/components/charts/BelanjaDesaChart";
import React from "react";

export interface VisualizationTemplate {
  title: string;
  description: string;
  placeholder: string;
  group: 'Demografi' | 'Anggaran' | 'Indeks Desa Membangun' | 'Lainnya';
  previewComponent: React.ReactNode;
}

export const visualizationTemplates: VisualizationTemplate[] = [
  {
    title: "Piramida Penduduk",
    description: "Menampilkan diagram piramida penduduk berdasarkan kelompok usia dan jenis kelamin.",
    placeholder: "[STATISTIK_PENDUDUK_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PopulationStatChart),
  },
  {
    title: "Diagram Tingkat Pendidikan",
    description: "Menampilkan diagram lingkaran komposisi penduduk berdasarkan tingkat pendidikan terakhir.",
    placeholder: "[STATISTIK_PENDIDIKAN_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PendidikanChart),
  },
  {
    title: "Diagram Sebaran Pekerjaan",
    description: "Menampilkan diagram batang 10 pekerjaan paling umum di kalangan penduduk.",
    placeholder: "[STATISTIK_PEKERJAAN_CHART]",
    group: "Demografi",
    previewComponent: React.createElement(PekerjaanChart),
  },
  {
    title: "Diagram Pendapatan Desa",
    description: "Diagram lingkaran yang menampilkan distribusi sumber pendapatan desa.",
    placeholder: "[DIAGRAM_PENDAPATAN_DESA]",
    group: "Anggaran",
    previewComponent: React.createElement(PendapatanDesaChart),
  },
  {
    title: "Diagram Belanja Desa",
    description: "Diagram lingkaran yang menampilkan distribusi belanja desa per bidang.",
    placeholder: "[DIAGRAM_BELANJA_DESA]",
    group: "Anggaran",
    previewComponent: React.createElement(BelanjaDesaChart),
  },
  {
    title: "Indeks Ketahanan Sosial (IKS)",
    description: "Menampilkan ringkasan skor Indeks Ketahanan Sosial desa.",
    placeholder: "[INDEKS_KETAHANAN_SOSIAL]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksSosial, { isPreview: true }),
  },
  {
    title: "Indeks Ketahanan Ekonomi (IKE)",
    description: "Menampilkan ringkasan skor Indeks Ketahanan Ekonomi desa.",
    placeholder: "[INDEKS_KETAHANAN_EKONOMI]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksEkonomi, { isPreview: true }),
  },
  {
    title: "Indeks Ketahanan Lingkungan (IKL)",
    description: "Menampilkan ringkasan skor Indeks Ketahanan Lingkungan desa.",
    placeholder: "[INDEKS_KETAHANAN_LINGKUNGAN]",
    group: "Indeks Desa Membangun",
    previewComponent: React.createElement(IndeksLingkungan, { isPreview: true }),
  },
  {
    title: "Diagram Pengunjung Situs",
    description: "Menampilkan grafik garis tren pengunjung situs selama beberapa waktu terakhir.",
    placeholder: "[STATISTIK_PENGUNJUNG_CHART]",
    group: "Lainnya",
    previewComponent: React.createElement(VisitorStatChart),
  },
];
