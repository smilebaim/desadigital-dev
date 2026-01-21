'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, ListChecks } from "lucide-react";
import { type VisiMisiData } from "@/lib/visi-misi-actions";
import { useEffect, useState } from "react";


const VisiMisi = ({ data }: { data: VisiMisiData | null }) => {
  const [visiMisiData, setVisiMisiData] = useState(data);

  useEffect(() => {
    setVisiMisiData(data);
  }, [data]);

  if (!visiMisiData) {
    return <div>Memuat data...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visi dan Misi Desa</h2>
          <p className="text-muted-foreground">
            Visi dan Misi Desa Remau Bako Tuo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Target className="h-8 w-8 text-primary" />
                        <CardTitle>Visi</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium text-muted-foreground">
                        &quot;{visiMisiData.visi}&quot;
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-4">
                        <ListChecks className="h-8 w-8 text-primary" />
                        <CardTitle>Misi</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {visiMisiData.misi.map((item, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">{index + 1}</span>
                                <span className="flex-1 text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
