'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Wrench } from "lucide-react";

const SuratNikahPage = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-4">
                        <HeartPulse className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Aplikasi Pengantar Nikah</CardTitle>
                            <CardDescription>Modul untuk mengelola permintaan surat pengantar nikah (N1, N2, N4).</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="text-center py-12">
                    <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Modul Dalam Pengembangan</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                        Fitur untuk mengelola surat pengantar nikah sedang dalam tahap pengembangan.
                    </p>
                    <Button variant="outline" className="mt-6" disabled>
                        Tambah Permohonan Baru
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuratNikahPage;
