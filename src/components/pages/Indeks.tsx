import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Indeks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Indeks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Selamat datang di halaman Indeks. Halaman ini akan menampilkan informasi lengkap tentang indeks dan statistik desa kami.
            </p>
            {/* Add your content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Indeks; 
