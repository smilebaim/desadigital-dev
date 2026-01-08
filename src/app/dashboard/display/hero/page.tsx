import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kontrol Hero</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Latar Belakang</CardTitle>
          <CardDescription>
            Ubah gambar latar belakang untuk halaman utama di sini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Gambar Saat Ini</h3>
            <div className="rounded-lg overflow-hidden border">
              <img src="/lovable-uploads/a0278ce1-b82d-4ed6-a186-14a9503ef65c.png" alt="Hero background" className="w-full h-auto" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="hero-image" className="font-medium">Unggah Gambar Baru</label>
            <Input id="hero-image" type="file" />
            <p className="text-sm text-muted-foreground">
              Rekomendasi ukuran: 1920x1080px. Format: JPG, PNG.
            </p>
          </div>
          <Button>Simpan Perubahan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
