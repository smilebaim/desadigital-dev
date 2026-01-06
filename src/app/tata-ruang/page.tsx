"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import PublicLayout from "@/layouts/PublicLayout";

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center w-full h-full bg-gray-200"><p>Loading map...</p></div>
});

export default function Page() {
  return (
    <PublicLayout>
        <MapComponent />
    </PublicLayout>
  );
}
