
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

const MapControlPage = () => {
    return (
        <div className="space-y-6">
             <div>
                <h2 className="text-3xl font-bold tracking-tight">Kontrol Peta Interaktif</h2>
                <p className="text-muted-foreground">
                    Kelola layer, penanda (marker), dan pengaturan lainnya untuk peta tata ruang.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        Pengaturan Peta
                    </CardTitle>
                    <CardDescription>
                        Fitur untuk mengelola konten peta akan tersedia di sini.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Segera Hadir: Pengelolaan Layer dan Marker</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MapControlPage;
