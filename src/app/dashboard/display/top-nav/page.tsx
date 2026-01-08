import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kontrol TopNav</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan TopNav</CardTitle>
          <CardDescription>
            Sesuaikan menu dan tampilan TopNav di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Kontrol untuk TopNav akan tersedia di sini.</p>
        </CardContent>
      </Card>
    </div>
  );
}
