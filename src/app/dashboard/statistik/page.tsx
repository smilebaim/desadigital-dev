'use client';
import StatCard from "@/components/dashboard/StatCard";
import PopulationStatChart from "@/components/charts/PopulationStatChart";

const StatistikPage = () => {
  
  const visualizationTemplates = [
    {
      title: "Piramida Penduduk",
      description: "Menampilkan diagram piramida penduduk berdasarkan kelompok usia dan jenis kelamin.",
      placeholder: "[STATISTIK_PENDUDUK_CHART]",
      previewComponent: <PopulationStatChart />,
    },
    // Future templates can be added here
    // {
    //   title: "Tabel Sebaran Penduduk",
    //   description: "Menampilkan tabel jumlah penduduk per wilayah/dusun.",
    //   placeholder: "[TABEL_SEBARAN_PENDUDUK]",
    //   previewComponent: <div>Preview Tabel Sebaran</div>,
    // },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daftar Statistik & Visualisasi</h2>
        <p className="text-muted-foreground">
          Gunakan placeholder di bawah ini untuk menyisipkan tabel dan diagram ke dalam halaman kustom Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
