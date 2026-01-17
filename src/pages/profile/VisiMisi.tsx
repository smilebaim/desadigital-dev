
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const VisiMisi = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ title: "Profil", path: "/profil/profil-desa" }, { title: "Visi & Misi" }]} />
      <h1 className="text-3xl font-bold mb-6 mt-4">Visi dan Misi Desa</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Visi</CardTitle>
            <CardDescription>Arah dan tujuan jangka panjang desa.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic text-muted-foreground">
              "Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa."
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Misi</CardTitle>
            <CardDescription>Langkah-langkah strategis untuk mencapai visi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>1. Meningkatkan kualitas sumber daya manusia yang cerdas dan sehat.</p>
            <p>2. Mengembangkan perekonomian desa berbasis potensi lokal.</p>
            <p>3. Meningkatkan kualitas infrastruktur desa yang merata.</p>
            <p>4. Menciptakan tata kelola pemerintahan yang baik, bersih, dan transparan.</p>
            <p>5. Melestarikan dan mengembangkan nilai-nilai budaya dan kearifan lokal.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisiMisi;
