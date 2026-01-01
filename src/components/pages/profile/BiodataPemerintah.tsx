
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const BiodataPemerintah = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <Breadcrumb
                items={[
                    { title: "Profil Desa", path: "/profil/profil-desa" },
                    { title: "Biodata Pemerintah" }
                ]}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Biodata Pemerintah</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Informasi mengenai biodata pemerintah desa akan ditampilkan di sini.</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default BiodataPemerintah;

    