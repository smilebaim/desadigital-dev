'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumb from "@/components/Breadcrumb";
import { Sprout, Apple, Fish, Milk } from "lucide-react";

const mpgData = {
  "6-8 Bulan": [
    { name: "Bubur Susu", ingredients: "Tepung beras, ASI/susu formula.", category: "Karbohidrat", icon: Sprout },
    { name: "Puree Alpukat", ingredients: "Alpukat matang, ASI/susu formula.", category: "Lemak Baik", icon: Apple },
    { name: "Puree Hati Ayam", ingredients: "Hati ayam, kaldu ayam.", category: "Protein Hewani", icon: Fish },
  ],
  "9-11 Bulan": [
    { name: "Nasi Tim Saring", ingredients: "Beras, daging giling, wortel, buncis.", category: "Lengkap", icon: Sprout },
    { name: "Kentang Tumbuk Ikan", ingredients: "Kentang, ikan kembung, brokoli.", category: "Lengkap", icon: Fish },
    { name: "Bubur Kacang Hijau", ingredients: "Kacang hijau, santan, gula merah.", category: "Protein Nabati", icon: Apple },
  ],
  "12-23 Bulan": [
    { name: "Nasi Sop Ayam", ingredients: "Nasi, ayam suwir, aneka sayuran (wortel, kentang, buncis).", category: "Lengkap", icon: Sprout },
    { name: "Telur Dadar Sayur", ingredients: "Telur, bayam, tahu, daun bawang.", category: "Protein & Serat", icon: Fish },
    { name: "Bola-bola Daging", ingredients: "Daging sapi giling, tepung roti, telur.", category: "Protein Hewani", icon: Fish },
  ],
  "Ibu Hamil & Menyusui": [
    { name: "Sayur Bening Daun Katuk", ingredients: "Daun katuk, jagung, temu kunci.", category: "Pelancar ASI", icon: Sprout },
    { name: "Ikan Bakar Bumbu Kuning", ingredients: "Ikan (kembung/salmon), bumbu kuning, kemangi.", category: "Omega-3", icon: Fish },
    { name: "Susu Kedelai", ingredients: "Kacang kedelai, air.", category: "Protein Nabati", icon: Milk },
  ],
};

const MPG = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Layanan", path: "/layanan" },
          { title: "Gizi & Kesehatan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Pendamping Gizi (MPG)</h2>
          <p className="text-muted-foreground">
            Contoh menu sehat dan bergizi seimbang untuk balita, ibu hamil, dan menyusui.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="6-8 Bulan" className="w-full space-y-4">
          {Object.entries(mpgData).map(([ageGroup, menus]) => (
            <AccordionItem key={ageGroup} value={ageGroup} className="border rounded-lg bg-background">
              <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                {ageGroup}
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menus.map((menu, index) => {
                    const Icon = menu.icon;
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-muted rounded-full">
                                      <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-md">{menu.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs font-semibold text-primary">{menu.category}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Bahan: {menu.ingredients}
                                </p>
                            </CardContent>
                        </Card>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MPG;
