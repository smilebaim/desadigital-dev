'use client';
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { visualizationTemplates, type VisualizationTemplate } from "@/lib/visualization-templates";

const StatistikPage = () => {

  const groupedTemplates = visualizationTemplates.reduce((acc, template) => {
    const group = template.group || 'Lainnya';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(template);
    return acc;
  }, {} as Record<string, VisualizationTemplate[]>);
  
  const groupOrder: (keyof typeof groupedTemplates)[] = ['Demografi', 'Anggaran', 'Indeks Desa Membangun', 'Lainnya'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Perpustakaan Visualisasi</h2>
        <p className="text-muted-foreground">
          Gunakan placeholder di bawah ini untuk menyisipkan tabel dan diagram ke dalam halaman kustom Anda.
        </p>
      </div>

      {groupOrder.map(groupName => (
        groupedTemplates[groupName] && (
          <div key={groupName} className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight border-b pb-2">{groupName}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {groupedTemplates[groupName].map((template, index) => (
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
        )
      ))}

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight border-b pb-2">Butuh Visualisasi Lain?</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="flex flex-col border-dashed border-2 bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Buat Visualisasi Kustom
                    </CardTitle>
                    <CardDescription>
                        Butuh diagram atau tabel yang belum tersedia? Anda dapat meminta untuk dibuatkan visualisasi data kustom.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-center items-center text-center">
                    <div className="p-4 border-2 border-dashed rounded-lg bg-background/50 w-full h-full flex flex-col justify-center items-center">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold">Contoh Permintaan:</p>
                            <p className="text-xs text-muted-foreground italic">
                                &quot;Buatkan saya diagram batang untuk perbandingan jumlah penduduk per RT.&quot;
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 px-4">
                        Sampaikan kebutuhan Anda, dan template baru akan dibuatkan untuk Anda gunakan di sini.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default StatistikPage;
