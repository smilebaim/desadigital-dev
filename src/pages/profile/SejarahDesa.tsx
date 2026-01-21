'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { type SejarahDesaData } from "@/lib/sejarah-desa-actions";
import { useEffect, useState } from "react";

const SejarahDesa = ({ data }: { data: SejarahDesaData | null }) => {
  const [sejarahData, setSejarahData] = useState(data);

  useEffect(() => {
    setSejarahData(data);
  }, [data]);

  if (!sejarahData) {
    return <div>Memuat data sejarah desa...</div>;
  }

  const paragraphs = sejarahData.deskripsi.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sejarah Desa</h2>
          <p className="text-muted-foreground">
            Sejarah dan perkembangan Desa Remau Bako Tuo dari masa ke masa
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <History className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{sejarahData.judul}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Didirikan sekitar tahun {sejarahData.tahun}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SejarahDesa;
