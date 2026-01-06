import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BiodataBadan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Biodata Badan Permusyawaratan Desa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Selamat datang di halaman Biodata Badan Permusyawaratan Desa Remau Bako Tuo. Halaman ini akan menampilkan biodata badan permusyawaratan desa kami.
            </p>
            {/* Add your content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiodataBadan; 