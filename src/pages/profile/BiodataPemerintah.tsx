import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BiodataPemerintah = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Biodata Pemerintah Desa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Selamat datang di halaman Biodata Pemerintah Desa Remau Bako Tuo. Halaman ini akan menampilkan biodata pemerintahan desa kami.
            </p>
            {/* Add your content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiodataPemerintah; 