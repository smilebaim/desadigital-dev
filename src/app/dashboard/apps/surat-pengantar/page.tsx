'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookUser, Wrench } from "lucide-react";

const SuratPengantarPage = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-4">
                        <BookUser className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Aplikasi Surat Pengantar</CardTitle>
                            <CardDescription>Modul untuk membuat surat pengantar umum (misal: pengantar SKCK, dll).</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="text-center py-12">
                    <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Modul Dalam Pengembangan</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                        Fitur untuk mengelola surat pengantar umum sedang dalam tahap pengembangan.
                    </p>
                    <Button variant="outline" className="mt-6" disabled>
                        Buat Surat Pengantar
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuratPengantarPage;
