"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gray-200 flex items-center justify-center"><p>Memuat Peta...</p></div>,
});

const TataRuangPage: React.FC = () => {
  return (
    <div className="fixed inset-0">
      <MapComponent />
    </div>
  );
};

export default TataRuangPage;
