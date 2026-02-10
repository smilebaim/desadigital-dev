'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import PopulationStatChart from "@/components/charts/PopulationStatChart";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const StatistikPage = () => {
  const { toast } = useToast();
  const placeholder = "[STATISTIK_PENDUDUK_CHART]";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(placeholder).then(() => {
      toast({
        title: "Disalin!",
        description: "Placeholder telah disalin ke clipboard.",
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daftar Statistik & Visualisasi</h2>
        <p className="text-muted-foreground">
          Gunakan placeholder di bawah ini untuk menyisipkan tabel dan diagram ke dalam halaman kustom Anda.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Piramida Penduduk</CardTitle>
          <CardDescription>
            Menampilkan diagram piramida penduduk berdasarkan kelompok usia dan jenis kelamin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-4 text-center">Preview</h4>
                <div className="h-[250px]">
                    <PopulationStatChart />
                </div>
            </div>
            <div>
                <Label htmlFor="placeholder-code">Placeholder</Label>
                <div className="flex items-center gap-2 mt-1">
                    <Input id="placeholder-code" readOnly value={placeholder} />
                    <Button variant="outline" size="icon" onClick={copyToClipboard}>
                        <span className="sr-only">Salin Placeholder</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Salin dan tempel kode di atas ke dalam konten halaman mana pun untuk menampilkan diagram ini.
                </p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default StatistikPage;
