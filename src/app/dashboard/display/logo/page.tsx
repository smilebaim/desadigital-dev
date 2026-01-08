import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kontrol Logo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Logo Situs</CardTitle>
          <CardDescription>
            Ubah ikon atau logo yang ditampilkan di header situs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Logo Saat Ini</h3>
            <div className="rounded-lg overflow-hidden border p-4 bg-gray-100 inline-block">
              <img src="/lovable-uploads/logo-desa.png" alt="Logo Desa" className="h-16 w-16 object-contain" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="logo-image" className="font-medium">Unggah Logo Baru</label>
            <Input id="logo-image" type="file" />
            <p className="text-sm text-muted-foreground">
              Rekomendasi ukuran: 256x256px. Format: PNG dengan latar belakang transparan.
            </p>
          </div>
          <Button>Simpan Perubahan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
