"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import { LatLngTuple, LatLngBounds, Icon } from 'leaflet';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Clock, Phone, Mail, Globe, Users, Home, Building2, TreePine, Warehouse, Ruler, MapPin } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
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
