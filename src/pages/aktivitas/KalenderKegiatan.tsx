'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getKegiatanStream, type KegiatanData } from '@/lib/kegiatan-client-actions';
import { useTenant } from '@/contexts/TenantContext';

interface Kegiatan extends KegiatanData {
  id: string;
}

const KalenderKegiatan = () => {
  const { tenantId, isLoading: isTenantLoading } = useTenant();
  const [date, setDate] = useState<Date | undefined>(new Date());
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
  
  const selectedDateString = date ? format(date, "yyyy-MM-dd") : "";
  const eventsForSelectedDay = kegiatan.filter(event => event.date === selectedDateString);

  const eventDates = kegiatan.map(k => new Date(k.date));

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
      <Breadcrumb
        items={[
          { title: "Aktivitas", path: "/aktivitas" },
          { title: "Kalender Kegiatan" }
        ]}
      />
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kalender Kegiatan</h2>
          <p className="text-muted-foreground">
            Lihat jadwal kegiatan desa dalam tampilan kalender.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
             <Card>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                    locale={id}
                    modifiers={{ events: eventDates }}
                    modifiersClassNames={{
                      events: 'bg-primary/20 rounded-full',
                    }}
                  />
                </CardContent>
              </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Kegiatan pada {date ? format(date, "d MMMM yyyy", { locale: id }) : 'Pilih Tanggal'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                    <p className="text-center text-muted-foreground py-8">Memuat kegiatan...</p>
                ) : eventsForSelectedDay.length > 0 ? (
                  <ul className="space-y-4">
                    {eventsForSelectedDay.map((event) => (
                      <li key={event.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                           {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Tidak ada kegiatan pada tanggal ini.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KalenderKegiatan;
