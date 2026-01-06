"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';

const MapComponent = dynamic(() => import('@/components/MapComponent').then((mod) => mod.MapComponent), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center w-full h-full bg-gray-200"><p>Loading map...</p></div>
});

const TataRuang: React.FC = () => {
  return (
    <div className="fixed inset-0">
      <MapComponent />
    </div>
  );
};

export default TataRuang;
