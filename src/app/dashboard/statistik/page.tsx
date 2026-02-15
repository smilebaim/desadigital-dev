'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Copy } from 'lucide-react';
import { visualizationTemplates } from '@/lib/visualization-templates';
import type { VisualizationTemplate } from '@/lib/visualization-templates';
import { useToast } from "@/components/ui/use-toast";
import React from "react";

const StatCard = ({ template }: { template: VisualizationTemplate }) => {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(template.placeholder);
        toast({
            title: "Tersalin!",
            description: `Placeholder "${template.placeholder}" telah disalin ke clipboard.`,
        });
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
                <div className="h-48 w-full flex items-center justify-center bg-muted/50 rounded-md overflow-hidden mb-4 p-2">
                    {template.previewComponent}
                </div>
                 <div className="mt-auto">
                    <p className="text-xs text-muted-foreground mb-1">Sisipkan di halaman dengan placeholder ini:</p>
                    <div className="flex items-center gap-2">
                        <Input readOnly value={template.placeholder} className="text-xs" />
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const StatistikPage = () => {
    const groupedTemplates = visualizationTemplates.reduce((acc, template) => {
        (acc[template.group] = acc[template.group] || []).push(template);
        return acc;
    }, {} as Record<string, VisualizationTemplate[]>);

    const groupOrder: (keyof typeof groupedTemplates)[] = ['Demografi', 'Anggaran', 'Indeks Desa Membangun', 'Lainnya'];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Perpustakaan Visualisasi Data</h2>
                <p className="text-muted-foreground">
                    Gunakan template di bawah ini untuk menyisipkan diagram dan grafik ke dalam halaman kustom Anda.
                </p>
            </div>
            
            {groupOrder.map(groupName => (
                groupName in groupedTemplates && (
                    <div key={groupName}>
                        <h3 className="text-xl font-semibold tracking-tight mb-4 border-b pb-2">{groupName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedTemplates[groupName]?.map(template => (
                                 <StatCard key={template.placeholder} template={template} />
                            ))}
                             {groupName === "Lainnya" && (
                                 <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed">
                                    <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold">Butuh Visualisasi Lain?</h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Jika diagram yang Anda butuhkan tidak ada di sini, Anda bisa meminta untuk dibuatkan visualisasi data baru yang lebih spesifik.
                                    </p>
                                </Card>
                            )}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default StatistikPage;
