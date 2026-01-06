import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DanaDesa = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Dana Desa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Selamat datang di halaman Dana Desa. Halaman ini akan menampilkan informasi lengkap tentang pengelolaan dana desa kami.
            </p>
            {/* Add your content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DanaDesa; 