'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import { Sprout, Wheat, Wind, CloudRain, Sun } from "lucide-react";

const panganData = {
  padi: {
    name: "Padi",
    icon: Wheat,
    timeline: [
      { month: "Jan-Feb", activity: "Persiapan Lahan", color: "bg-yellow-100" },
      { month: "Mar", activity: "Penyemaian Bibit", color: "bg-lime-100" },
      { month: "Apr-Mei", activity: "Penanaman", color: "bg-green-100" },
      { month: "Jun-Jul", activity: "Pemeliharaan & Pemupukan", color: "bg-teal-100" },
      { month: "Agu", activity: "Panen Raya", color: "bg-amber-100" },
      { month: "Sep-Des", activity: "Masa Istirahat Lahan", color: "bg-gray-100" },
    ]
  },
  jagung: {
    name: "Jagung",
    icon: Sprout,
    timeline: [
      { month: "Apr-Mei", activity: "Penanaman Musim Kering", color: "bg-green-100" },
      { month: "Jun-Jul", activity: "Pemeliharaan & Irigasi", color: "bg-teal-100" },
      { month: "Agu", activity: "Panen", color: "bg-amber-100" },
      { month: "Okt-Nov", activity: "Penanaman Musim Hujan", color: "bg-green-100" },
      { month: "Des-Jan", activity: "Pemeliharaan", color: "bg-teal-100" },
      { month: "Feb", activity: "Panen", color: "bg-amber-100" },
    ]
  },
};

const musimData = [
    { name: "Musim Kemarau", months: "April - September", icon: Sun, color: "text-orange-500" },
    { name: "Musim Hujan", months: "Oktober - Maret", icon: CloudRain, color: "text-blue-500" },
    { name: "Pancaroba I", months: "Maret - April", icon: Wind, color: "text-gray-500" },
    { name: "Pancaroba II", months: "September - Oktober", icon: Wind, color: "text-gray-500" },
];

const KalenderPangan = () => {
  const renderTimeline = (data: { name: string; icon: React.ElementType; timeline: { month: string; activity: string; color: string }[] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <data.icon className="h-6 w-6 text-primary" />
            <CardTitle>{data.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 h-full w-0.5 bg-border -translate-x-1/2"></div>
          {data.timeline.map((item, index) => (
            <div key={index} className="mb-8 flex items-center">
              <div className="absolute left-6 h-4 w-4 rounded-full bg-primary -translate-x-1/2 border-4 border-background"></div>
              <div className="pl-6 w-full">
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <p className="font-semibold text-sm text-foreground/80">{item.month}</p>
                  <p className="text-foreground">{item.activity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Aktivitas", path: "/aktivitas" },
          { title: "Kalender Pangan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kalender Pangan Desa</h2>
          <p className="text-muted-foreground">
            Jadwal siklus tanam komoditas utama dan musim di desa.
          </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Informasi Musim</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {musimData.map((musim, index) => {
                    const Icon = musim.icon;
                    return (
                         <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Icon className={`h-8 w-8 flex-shrink-0 ${musim.color}`} />
                            <div>
                                <p className="font-semibold text-sm">{musim.name}</p>
                                <p className="text-xs text-muted-foreground">{musim.months}</p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          {renderTimeline(panganData.padi)}
          {renderTimeline(panganData.jagung)}
        </div>
      </div>
    </div>
  );
};

export default KalenderPangan;
