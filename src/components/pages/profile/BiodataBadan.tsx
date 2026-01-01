
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const BiodataBadan = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <Breadcrumb
                items={[
                    { title: "Profil Desa", path: "/profil/profil-desa" },
                    { title: "Biodata Badan" }
                ]}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Biodata Badan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Informasi mengenai biodata badan permusyawaratan desa akan ditampilkan di sini.</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default BiodataBadan;

    