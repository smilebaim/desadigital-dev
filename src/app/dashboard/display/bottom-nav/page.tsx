import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kontrol BottomNav</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan BottomNav</CardTitle>
          <CardDescription>
            Sesuaikan menu dan tampilan BottomNav di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Kontrol untuk BottomNav akan tersedia di sini.</p>
        </CardContent>
      </Card>
    </div>
  );
}
