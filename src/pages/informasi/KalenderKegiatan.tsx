'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from 'react';

const KalenderKegiatan = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = {
    "2024-07-20": "Gotong Royong Membersihkan Saluran Irigasi",
    "2024-07-28": "Musyawarah Desa Perencanaan Pembangunan 2025",
    "2024-08-17": "Lomba-lomba dalam rangka HUT Kemerdekaan RI",
  };

  const selectedDateString = date ? date.toISOString().split('T')[0] : '';
  const eventForSelectedDate = events[selectedDateString as keyof typeof events];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kalender Kegiatan</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                Kegiatan pada {date ? date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {eventForSelectedDate ? (
                <p>{eventForSelectedDate}</p>
              ) : (
                <p className="text-muted-foreground">Tidak ada kegiatan yang dijadwalkan.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KalenderKegiatan;
