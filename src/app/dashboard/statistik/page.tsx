'use client';
import StatCard from "@/components/dashboard/StatCard";
import PopulationStatChart from "@/components/charts/PopulationStatChart";
import PendidikanChart from "@/components/charts/PendidikanChart";
import PekerjaanChart from "@/components/charts/PekerjaanChart";

const StatistikPage = () => {
  
  const visualizationTemplates = [
    {
      title: "Piramida Penduduk",
      description: "Menampilkan diagram piramida penduduk berdasarkan kelompok usia dan jenis kelamin.",
      placeholder: "[STATISTIK_PENDUDUK_CHART]",
      previewComponent: <PopulationStatChart />,
    },
    {
      title: "Diagram Tingkat Pendidikan",
      description: "Menampilkan diagram lingkaran komposisi penduduk berdasarkan tingkat pendidikan terakhir.",
      placeholder: "[STATISTIK_PENDIDIKAN_CHART]",
      previewComponent: <PendidikanChart />,
    },
    {
      title: "Diagram Sebaran Pekerjaan",
      description: "Menampilkan diagram batang 10 pekerjaan paling umum di kalangan penduduk.",
      placeholder: "[STATISTIK_PEKERJAAN_CHART]",
      previewComponent: <PekerjaanChart />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daftar Statistik & Visualisasi</h2>
        <p className="text-muted-foreground">
          Gunakan placeholder di bawah ini untuk menyisipkan tabel dan diagram ke dalam halaman kustom Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {visualizationTemplates.map((template, index) => (
          <StatCard
            key={index}
            title={template.title}
            description={template.description}
            placeholder={template.placeholder}
          >
            {template.previewComponent}
          </StatCard>
        ))}
      </div>

    </div>
  );
};

export default StatistikPage;
