import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pembangunan = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pembangunan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Selamat datang di halaman Pembangunan. Halaman ini akan menampilkan informasi lengkap tentang pembangunan desa kami.
            </p>
            {/* Add your content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pembangunan; 