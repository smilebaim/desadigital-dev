'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getKegiatanStream, type KegiatanData } from '@/lib/kegiatan-client-actions';
import { useTenant } from '@/contexts/TenantContext';

interface Kegiatan extends KegiatanData {
  id: string;
}

const AgendaList = () => {
  const { tenantId, isLoading: isTenantLoading } = useTenant();
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isTenantLoading) return;
    setLoading(true);
    const unsub = getKegiatanStream((data) => {
      setKegiatan(data as Kegiatan[]);
      setLoading(false);
    }, tenantId);
    return () => unsub();
  }, [tenantId, isTenantLoading]);

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Aktivitas", path: "/aktivitas" },
          { title: "Agenda Kegiatan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agenda Kegiatan Desa</h2>
          <p className="text-muted-foreground">
            Jadwal kegiatan dan acara yang akan datang di Desa Remau Bako Tuo.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Memuat agenda kegiatan...</p>
          </div>
        ) : kegiatan.length > 0 ? (
          <div className="space-y-4">
            {kegiatan.map(event => (
              <Card key={event.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                       <h3 className="text-lg font-semibold">{event.title}</h3>
                       {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{format(new Date(event.date), "EEEE, d MMMM yyyy", { locale: id })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Pukul {event.time} WIB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
             <p className="text-muted-foreground">Tidak ada agenda kegiatan yang dijadwalkan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaList;
