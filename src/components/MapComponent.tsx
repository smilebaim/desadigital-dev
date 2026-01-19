'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import type { LatLngTuple, LatLngBounds, Map as LeafletMap, Polygon } from 'leaflet';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Clock, Phone, Mail, Globe, Users, Home, Building2, TreePine, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Fix Leaflet default marker issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// This is required to make marker icons work with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});


const DESA_CENTER: LatLngTuple = [-1.2224187831143103, 104.38307336564955];
const DEFAULT_ZOOM = 16;

const DESA_BOUNDS: LatLngBounds = L.latLngBounds(
  [-1.2324187831143103, 104.37307336564955],
  [-1.2124187831143103, 104.39307336564955]
);

const BASE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    name: 'Street',
    icon: Map
  },
  satellite: {
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Satellite',
    name: 'Satellite',
    icon: Satellite
  },
  terrain: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
    name: 'Terrain',
    icon: Mountain
  }
};

const LAYER_CATEGORIES = {
  wilayah: {
    name: 'Peta Wilayah',
    layers: [
      'Peta Administrasi',
      'Penggunaan Lahan',
      'Bidang Tanah',
      'Infrastruktur Publik',
      'Prasarana Umum'
    ]
  },
  sosial: {
    name: 'Peta Sosial',
    layers: [
      'Demografi',
      'Pendidikan',
      'Kesehatan',
      'Sosial dan Budaya',
      'Partisipasi Publik'
    ]
  },
  ekonomi: {
    name: 'Peta Ekonomi',
    layers: [
      'Tingkat Pendapatan',
      'Seltor Pangan',
      'Perkebunan',
      'Peternakan',
      'Perikanan',
      'Kehutanan',
      'Pertambangan',
      'Pengolahan',
      'Energi'
    ]
  },
  lingkungan: {
    name: 'Peta Lingkungan',
    layers: [
      'Geomorfologi Tanah',
      'Iklim Dan Cuaca',
      'Daerah Aliran Sungai',
      'Keragaman Hayati',
      'Limbah-Sampah',
      'Karateristik Lahan',
      'Lokasi Lahan Bencana'
    ]
  },
  aset: {
    name: 'Peta Aset',
    layers: [
      'Aset Desa',
      'Aset Masyarakat'
    ]
  }
};

interface LayerPanelProps {
  expanded: boolean;
  onToggle: () => void;
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({ expanded, onToggle, activeLayers, onLayerToggle }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <Sheet open={expanded} onOpenChange={onToggle}>
      <SheetContent 
        side="left" 
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-white/20 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300"
      >
        <SheetHeader>
            <SheetTitle>Layer Controls</SheetTitle>
            <SheetDescription className="sr-only">
            Control visibility of different map layers and categories
            </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(LAYER_CATEGORIES).map(([key, category]) => (
              <div key={key} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(key)}
                  className={`w-full flex items-center justify-between transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-black/90 hover:bg-white/20 ${
                    expandedCategory === key ? 'bg-white/10' : ''
                  }`}
                  aria-expanded={expandedCategory === key}
                  aria-controls={`category-${key}-layers`}
                >
                  {category.name}
                  {expandedCategory === key ? (
                    <ChevronDown className="h-4 w-4 text-black/90" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-black/90" />
                  )}
                </button>
                <div 
                  id={`category-${key}-layers`}
                  className={`transition-all duration-200 ${
                    expandedCategory === key 
                      ? 'max-h-[500px] opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="py-1">
                    {category.layers.map(layer => (
                      <label
                        key={layer}
                        className="flex items-center space-x-2 py-1.5 px-4 hover:bg-white/10 transition-colors cursor-pointer text-black/80"
                      >
                        <input
                          type="checkbox"
                          checked={activeLayers.includes(layer)}
                          onChange={() => onLayerToggle(layer)}
                          className="rounded border-black/30 text-emerald-500 focus:ring-emerald-500 bg-white/20"
                        />
                        <span className="text-xs sm:text-sm">{layer}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface LayerInfoProps {
  isOpen: boolean;
  onClose: () => void;
  markerInfo: {
    title: string;
    coordinates?: LatLngTuple;
    description: string;
    type?: 'marker' | 'boundary' | 'bidang';
  } | null;
}

const LayerInfo: React.FC<LayerInfoProps> = ({ isOpen, onClose, markerInfo }) => {
  if (!markerInfo) return null;

  const stats = [
    {
      icon: Users,
      label: 'Jumlah Penduduk',
      value: '3,245',
      change: '+125 dari tahun lalu',
      trend: 'up'
    },
    {
      icon: Home,
      label: 'Jumlah KK',
      value: '856',
      change: '+45 dari tahun lalu',
      trend: 'up'
    },
    {
      icon: Building2,
      label: 'Luas Wilayah',
      value: '2,500 Ha',
      subtext: '25 km²'
    },
    {
      icon: TreePine,
      label: 'Luas Hutan',
      value: '850 Ha',
      percentage: '34%'
    }
  ];

  const landUse = [
    { type: 'Pemukiman', percentage: 25 },
    { type: 'Pertanian', percentage: 30 },
    { type: 'Hutan', percentage: 34 },
    { type: 'Lainnya', percentage: 11 }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-l border-white/20 rounded-l-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300"
      >
        <SheetHeader>
            <SheetTitle>{markerInfo.title}</SheetTitle>
            <SheetDescription className="sr-only">
            Detailed information about {markerInfo.title}
            </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {markerInfo.coordinates && (
                <div className="flex items-center space-x-2 text-black/80">
                  <MapPin className="h-4 w-4" />
                  <p className="text-xs sm:text-sm">
                    {markerInfo.coordinates[0]}, {markerInfo.coordinates[1]}
                  </p>
                </div>
              )}
              <p className="text-xs sm:text-sm text-black/80">
                {markerInfo.description}
              </p>
            </div>

            {markerInfo.type === 'boundary' ? (
              <>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-medium text-base mb-2 text-black/90">Informasi Batas Wilayah</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-black/90 mb-1">Batas Utara</h5>
                      <p className="text-xs sm:text-sm text-black/80">Berbatasan dengan Desa Teluk</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-black/90 mb-1">Batas Selatan</h5>
                      <p className="text-xs sm:text-sm text-black/80">Berbatasan dengan Desa Sungai Rengit</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-black/90 mb-1">Batas Timur</h5>
                      <p className="text-xs sm:text-sm text-black/80">Berbatasan dengan Selat Berhala</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-black/90 mb-1">Batas Barat</h5>
                      <p className="text-xs sm:text-sm text-black/80">Berbatasan dengan Desa Sungai Rambut</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-medium text-base mb-2 text-black/90">Data Wilayah</h4>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Luas Wilayah:</span><br/>
                      ± 2.500 hektar
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Jumlah Dusun:</span><br/>
                      4 Dusun
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Jumlah RT:</span><br/>
                      12 RT
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-medium text-base mb-2 text-black/90">Status Administratif</h4>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Kecamatan:</span><br/>
                      Tanjung Jabung Timur
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Kabupaten:</span><br/>
                      Tanjung Jabung Timur
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Provinsi:</span><br/>
                      Jambi
                    </p>
                  </div>
                </div>
              </>
            ) : markerInfo.type === 'bidang' ? (
              <>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-medium text-base mb-2 text-black/90">Informasi Bidang Tanah</h4>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Nomor Hak Milik:</span><br/>
                      12.34.56.78.9.01234
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Pemilik:</span><br/>
                      Bapak Fulan
                    </p>
                    <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Luas:</span><br/>
                      1.2 Hektar
                    </p>
                     <p className="text-xs sm:text-sm text-black/80">
                      <span className="font-medium text-black/90">Penggunaan:</span><br/>
                      Pertanian/Perkebunan
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white/30 backdrop-blur-sm rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <StatIcon className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-medium text-black/90">{stat.label}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-black/90">{stat.value}</div>
                          {stat.change && (
                            <div className={`text-xs ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                              {stat.change}
                            </div>
                          )}
                          {stat.percentage && (
                            <div className="text-xs text-black/60">
                              {stat.percentage} dari total
                            </div>
                          )}
                          {stat.subtext && (
                            <div className="text-xs text-black/60">
                              {stat.subtext}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Land Use Chart */}
                <div className="space-y-4">
                  <h4 className="font-medium text-base text-black/90">Penggunaan Lahan</h4>
                  <div className="space-y-2">
                    {landUse.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-black/80">{item.type}</span>
                          <span className="text-black/90 font-medium">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500/60 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-black/80" />
                    <h4 className="font-medium text-base text-black/90">Jam Operasional</h4>
                  </div>
                  <div className="ml-6 space-y-1">
                    <p className="text-xs sm:text-sm text-black/80">
                      Senin - Jumat: 08.00 - 16.00 WIB<br/>
                      Sabtu - Minggu: Tutup
                    </p>
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-3">
                  <h4 className="font-medium text-base text-black/90">Fasilitas</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Ruang pelayanan publik',
                      'Ruang rapat',
                      'Area parkir',
                      'Toilet umum',
                      'Musholla'
                    ].map((facility, index) => (
                      <div 
                        key={index}
                        className="bg-white/20 rounded-lg px-3 py-2 text-xs text-black/80"
                      >
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h4 className="font-medium text-base text-black/90">Kontak</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-black/80">
                      <Phone className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">(0741) 123456</span>
                    </div>
                    <div className="flex items-center space-x-2 text-black/80">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">info@remaubakotuo.desa.id</span>
                    </div>
                    <div className="flex items-center space-x-2 text-black/80">
                      <Globe className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">www.remaubakotuo.desa.id</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface MapControlsProps {
  mapRef: React.RefObject<LeafletMap | null>;
  activeLayer: keyof typeof BASE_LAYERS;
  setActiveLayer: (layer: keyof typeof BASE_LAYERS) => void;
  layerPanelExpanded: boolean;
  setLayerPanelExpanded: (expanded: boolean) => void;
}

const MapControls: React.FC<MapControlsProps> = ({ 
  mapRef,
  activeLayer, 
  setActiveLayer,
  layerPanelExpanded,
  setLayerPanelExpanded
}) => {

  const handleShowAll = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(DESA_BOUNDS);
    }
  };

  return (
    <div className="absolute left-2 top-20 z-[999]">
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-150 rounded-lg shadow-2xl overflow-hidden border border-white/40">
          <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLayerPanelExpanded(!layerPanelExpanded)}
                    className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${
                      layerPanelExpanded
                      ? 'bg-white/30 text-black hover:bg-white/40'
                      : 'text-black hover:bg-white/20'
                    }`}
                  >
                    <Layers className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl">
                  <p>Toggle Layer Panel</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {(Object.keys(BASE_LAYERS) as Array<keyof typeof BASE_LAYERS>).map((layer) => {
              const Icon = BASE_LAYERS[layer].icon;
              return (
                <TooltipProvider key={layer} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setActiveLayer(layer)}
                        className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${
                          activeLayer === layer
                          ? 'bg-white/30 text-black hover:bg-white/40'
                          : 'text-black hover:bg-white/20'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl">
                      <p>{BASE_LAYERS[layer].name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-150 rounded-lg shadow-2xl overflow-hidden border border-white/40">
          <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => mapRef.current?.zoomIn()}
                    className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl">
                  <p>Zoom In</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => mapRef.current?.zoomOut()}
                    className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl">
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleShowAll}
                    className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl">
                  <p>Show All</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};


const ADMINISTRATIVE_BOUNDARY: [number, number][] = [
  [-1.19066, 104.394354],[-1.190292, 104.392146],[-1.190158, 104.39068],[-1.190254, 104.387615],[-1.190234, 104.386759],[-1.190596, 104.386264],[-1.191624, 104.385274],[-1.193102, 104.383846],[-1.198456, 104.383289],[-1.201169, 104.382903],[-1.203091, 104.382385],[-1.204668, 104.379232],[-1.207582, 104.375544],[-1.208891, 104.374265],[-1.212728, 104.369209],[-1.214483, 104.367692],[-1.215302, 104.333421],[-1.216666, 104.327944],[-1.216666, 104.323756],[-1.215904, 104.315761],[-1.214572, 104.309099],[-1.21362, 104.301104],[-1.215523, 104.291586],[-1.219331, 104.287969],[-1.221044, 104.282259],[-1.220282, 104.275596],[-1.21895, 104.270647],[-1.217808, 104.264175],[-1.214952, 104.257322],[-1.212858, 104.252944],[-1.211716, 104.247804],[-1.210193, 104.244949],[-1.207355, 104.240891],[-1.209233, 104.234249],[-1.208903, 104.228119],[-1.208854, 104.227201],[-1.208183, 104.214739],[-1.20942, 104.208641],[-1.210426, 104.203686],[-1.223677, 104.195429],[-1.225255, 104.194446],[-1.235852, 104.188874],[-1.235959, 104.188995],[-1.235965, 104.188993],[-1.243688, 104.186813],[-1.245032, 104.185539],[-1.246932, 104.190887],[-1.249597, 104.195266],[-1.252643, 104.197359],[-1.255689, 104.202118],[-1.25645, 104.205735],[-1.260067, 104.212398],[-1.258925, 104.21887],[-1.255879, 104.22439],[-1.251501, 104.22991],[-1.249597, 104.236573],[-1.25093, 104.243235],[-1.252643, 104.248946],[-1.252643, 104.253324],[-1.253214, 104.259987],[-1.255689, 104.263223],[-1.256069, 104.269505],[-1.255498, 104.27255],[-1.256831, 104.278451],[-1.261019, 104.284353],[-1.265397, 104.290444],[-1.266729, 104.297678],[-1.268252, 104.303959],[-1.269014, 104.310241],[-1.268443, 104.31481],[-1.269394, 104.319759],[-1.271679, 104.324137],[-1.27244, 104.331561],[-1.274344, 104.33632],[-1.274344, 104.339937],[-1.273952, 104.343623],[-1.27389, 104.349936],[-1.273033, 104.355818],[-1.272062, 104.358274],[-1.267836, 104.359816],[-1.262297, 104.36347],[-1.258242, 104.367582],[-1.259556, 104.373921],[-1.263896, 104.378033],[-1.267737, 104.38161],[-1.26955, 104.386256],[-1.270006, 104.390768],[-1.268978, 104.39545],[-1.266254, 104.402923],[-1.262411, 104.40982],[-1.262161, 104.410462],[-1.261162, 104.411105],[-1.260519, 104.411212],[-1.260333, 104.411135],[-1.260116, 104.411043],[-1.259451, 104.410741],[-1.259115, 104.410565],[-1.258782, 104.410392],[-1.258342, 104.410169],[-1.258035, 104.410073],[-1.257842, 104.409991],[-1.257638, 104.409915],[-1.257493, 104.409843],[-1.257364, 104.409782],[-1.257233, 104.409719],[-1.257052, 104.409618],[-1.257013, 104.409601],[-1.256893, 104.409547],[-1.256733, 104.409489],[-1.256573, 104.409437],[-1.256451, 104.409404],[-1.256288, 104.409357],[-1.256138, 104.40931],[-1.25596, 104.409264],[-1.255694, 104.40914],[-1.255535, 104.409052],[-1.255389, 104.408969],[-1.255222, 104.408862],[-1.254921, 104.408722],[-1.254803, 104.408671],[-1.254754, 104.40865],[-1.2546, 104.408586],[-1.254481, 104.408535],[-1.254321, 104.408463],[-1.254162, 104.408406],[-1.254021, 104.408355],[-1.253878, 104.408303],[-1.253733, 104.408236],[-1.253602, 104.408165],[-1.253477, 104.408101],[-1.253072, 104.407892],[-1.252907, 104.407799],[-1.252749, 104.407678],[-1.252564, 104.407566],[-1.25229, 104.407405],[-1.252141, 104.407314],[-1.25203, 104.407243],[-1.251932, 104.407185],[-1.251833, 104.407126],[-1.251716, 104.407069],[-1.251572, 104.407003],[-1.251272, 104.406843],[-1.251105, 104.406742],[-1.250934, 104.406647],[-1.2508, 104.406579],[-1.250622, 104.406481],[-1.250475, 104.406403],[-1.250322, 104.406316],[-1.250184, 104.406201],[-1.250097, 104.40612],[-1.250003, 104.406039],[-1.25, 104.406037],[-1.249684, 104.405802],[-1.249342, 104.40558],[-1.248998, 104.405406],[-1.24839, 104.405111],[-1.247903, 104.404862],[-1.247502, 104.404713],[-1.247005, 104.404454],[-1.246594, 104.404227],[-1.246448, 104.404159],[-1.246274, 104.404092],[-1.246235, 104.404079],[-1.246189, 104.404063],[-1.246136, 104.404045],[-1.246002, 104.403995],[-1.245853, 104.403924],[-1.245723, 104.403864],[-1.245582, 104.403783],[-1.245448, 104.403708],[-1.245269, 104.403635],[-1.244452, 104.4033],[-1.243198, 104.402724],[-1.242704, 104.402505],[-1.242362, 104.402362],[-1.242156, 104.402267],[-1.241985, 104.402192],[-1.241187, 104.401864],[-1.240184, 104.40142],[-1.239954, 104.401309],[-1.239734, 104.40122],[-1.23955, 104.401153],[-1.238844, 104.400908],[-1.23849, 104.400781],[-1.238185, 104.400664],[-1.237973, 104.400565],[-1.237771, 104.400458],[-1.237608, 104.400361],[-1.237462, 104.40027],[-1.237319, 104.400179],[-1.237203, 104.400071],[-1.237096, 104.399906],[-1.237053, 104.399828],[-1.236996, 104.39979],[-1.236929, 104.399753],[-1.236882, 104.399705],[-1.236832, 104.39966],[-1.236786, 104.399624],[-1.236712, 104.399603],[-1.23663, 104.399596],[-1.236496, 104.399603],[-1.23632, 104.399626],[-1.236134, 104.399639],[-1.235964, 104.39964],[-1.235824, 104.399643],[-1.235705, 104.399641],[-1.235572, 104.399626],[-1.235438, 104.399608],[-1.235343, 104.399578],[-1.235269, 104.399542],[-1.235156, 104.399494],[-1.235024, 104.399458],[-1.234848, 104.399429],[-1.234679, 104.399385],[-1.234494, 104.39932],[-1.234344, 104.399255],[-1.23422, 104.399204],[-1.234112, 104.399172],[-1.234025, 104.399145],[-1.233888, 104.399121],[-1.233731, 104.39908],[-1.233589, 104.399035],[-1.233473, 104.399088],[-1.233118, 104.398838],[-1.232983, 104.398771],[-1.232058, 104.398443],[-1.231243, 104.398089],[-1.23076, 104.397858],[-1.230417, 104.397676],[-1.230072, 104.397518],[-1.229913, 104.397463],[-1.22974, 104.397403],[-1.229405, 104.397298],[-1.229235, 104.397244],[-1.228971, 104.397161],[-1.228561, 104.397031],[-1.228127, 104.396926],[-1.227649, 104.396776],[-1.226977, 104.396565],[-1.225782, 104.39609],[-1.225369, 104.395859],[-1.225312, 104.395839],[-1.225259, 104.395827],[-1.225178, 104.395827],[-1.225074, 104.395832],[-1.224945, 104.395839],[-1.224793, 104.395822],[-1.224635, 104.395782],[-1.224489, 104.395723],[-1.224406, 104.395674],[-1.224363, 104.395632],[-1.224179, 104.395462],[-1.22399, 104.395376],[-1.223746, 104.395307],[-1.223059, 104.395071],[-1.22248, 104.394835],[-1.222066, 104.394672],[-1.221995, 104.394663],[-1.221882, 104.394653],[-1.221776, 104.394655],[-1.221742, 104.394652],[-1.221642, 104.394645],[-1.221544, 104.39463],[-1.221495, 104.394623],[-1.221361, 104.394591],[-1.221225, 104.394545],[-1.221096, 104.394493],[-1.220986, 104.394446],[-1.22086, 104.394412],[-1.22065, 104.39436],[-1.220346, 104.394261],[-1.220192, 104.394187],[-1.220027, 104.394097],[-1.219929, 104.394027],[-1.219814, 104.393966],[-1.219666, 104.393934],[-1.219527, 104.393905],[-1.219381, 104.39387],[-1.219038, 104.393725],[-1.218921, 104.393655],[-1.218859, 104.393617],[-1.218672, 104.393515],[-1.218521, 104.393456],[-1.218394, 104.393422],[-1.218243, 104.39337],[-1.218078, 104.393296],[-1.217948, 104.393215],[-1.217848, 104.393136],[-1.217771, 104.393072],[-1.217517, 104.39295],[-1.217408, 104.392888],[-1.217323, 104.392787],[-1.217277, 104.392662],[-1.21726, 104.392531],[-1.217242, 104.392399],[-1.217228, 104.3923],[-1.217189, 104.392136],[-1.217121, 104.392034],[-1.217031, 104.391966],[-1.216894, 104.391938],[-1.21677, 104.391949],[-1.216328, 104.392033],[-1.216109, 104.392093],[-1.216001, 104.392158],[-1.215988, 104.392181],[-1.215933, 104.392279],[-1.215857, 104.392408],[-1.215695, 104.392504],[-1.215523, 104.392519],[-1.215329, 104.392504],[-1.215098, 104.392447],[-1.214836, 104.392365],[-1.214552, 104.392283],[-1.214232, 104.392247],[-1.213948, 104.392237],[-1.213707, 104.392269],[-1.213689, 104.392273],[-1.213448, 104.392333],[-1.213272, 104.392362],[-1.213092, 104.392358],[-1.212934, 104.392323],[-1.212477, 104.39223],[-1.21224, 104.392223],[-1.211887, 104.392241],[-1.211761, 104.392252],[-1.211501, 104.392288],[-1.211487, 104.392278],[-1.211229, 104.39232],[-1.211028, 104.39237],[-1.211028, 104.39237],[-1.210816, 104.392448],[-1.210693, 104.392495],[-1.210629, 104.392538],[-1.210488, 104.392641],[-1.21037, 104.39272],[-1.210233, 104.392745],[-1.210197, 104.392741],[-1.210157, 104.39272],[-1.210147, 104.392598],[-1.210143, 104.392459],[-1.210114, 104.39232],[-1.209999, 104.39222],[-1.209841, 104.39217],[-1.209636, 104.392177],[-1.20942, 104.392231],[-1.209212, 104.392252],[-1.208931, 104.392238],[-1.208737, 104.392152],[-1.208575, 104.392052],[-1.208413, 104.391999],[-1.208219, 104.391974],[-1.207967, 104.391977],[-1.207446, 104.392106],[-1.206598, 104.392147],[-1.205692, 104.392263],[-1.205624, 104.392271],[-1.205279, 104.392282],[-1.205228, 104.392282],[-1.204909, 104.392282],[-1.204557, 104.392286],[-1.204187, 104.392333],[-1.203902, 104.392392],[-1.20359, 104.392439],[-1.203341, 104.392447],[-1.202714, 104.392443],[-1.20233, 104.392436],[-1.201897, 104.392425],[-1.201553, 104.392429],[-1.201201, 104.392447],[-1.200883, 104.392473],[-1.200604, 104.392502],[-1.20023, 104.39256],[-1.199897, 104.392618],[-1.199597, 104.392702],[-1.199245, 104.392819],[-1.198878, 104.392928],[-1.198604, 104.392997],[-1.198285, 104.393066],[-1.197992, 104.393117],[-1.197211, 104.393252],[-1.196819, 104.393329],[-1.196372, 104.393424],[-1.195984, 104.3935],[-1.195658, 104.393537],[-1.195292, 104.393569],[-1.19498, 104.393595],[-1.19468, 104.393621],[-1.194394, 104.393661],[-1.194181, 104.393701],[-1.193866, 104.393777],[-1.193559, 104.393872],[-1.193383, 104.393912],[-1.192917, 104.39397],[-1.192541, 104.394012],[-1.192456, 104.394021],[-1.191976, 104.394102],[-1.191631, 104.394178],[-1.191353, 104.394244],[-1.191122, 104.394288],[-1.190932, 104.39432],[-1.190745, 104.394339],[-1.19066, 104.394354],
];

const BIDANG_TANAH_DATA: [number, number][][] = [
    [[-1.198166300534297, 104.3844162302249], [-1.197804479892795, 104.3844610497377], [-1.198230073259253, 104.3833124581035], [-1.198455981158531, 104.3832889633151], [-1.198608171629758, 104.3832673364185], [-1.198166300534297, 104.3844162302249]],
    [[-1.200086319827733, 104.3840357900198], [-1.199732129933807, 104.3839926198636], [-1.200041679280048, 104.3830636282839], [-1.200428770871042, 104.3830086203516], [-1.200144639963128, 104.3838608404055], [-1.200144630070554, 104.3838608700831], [-1.200103399752038, 104.3839845403543], [-1.200086319827733, 104.3840357900198]],
    [[-1.193698081900891, 104.3848139706882], [-1.193128950440666, 104.3848401400605], [-1.193605785378622, 104.3837933840575], [-1.194263585496003, 104.3837249735288], [-1.194200191385676, 104.3838470511006], [-1.193698081900891, 104.3848139706882]]
];

export const MapComponent: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [activeLayer, setActiveLayer] = useState<keyof typeof BASE_LAYERS>('satellite');
  const [activeLayers, setActiveLayers] = useState<string[]>(['Peta Administrasi', 'Bidang Tanah']);
  const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);
  const [infoPanelExpanded, setInfoPanelExpanded] = useState(false);
  const [markerInfo, setMarkerInfo] = useState<LayerInfoProps['markerInfo']>(null);
  const administrativeBoundaryRef = useRef<Polygon | null>(null);
  const bidangTanahLayersRef = useRef<Polygon[]>([]);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map', {
      center: DESA_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
    });
    mapRef.current = map;

    L.tileLayer(BASE_LAYERS[activeLayer].url, {
      attribution: BASE_LAYERS[activeLayer].attribution
    }).addTo(map);

    const kantorDesaMarker = L.marker([-1.2224187831143103, 104.38307336564955]).addTo(map)
      .bindPopup('<b>Kantor Desa Remau Bako Tuo</b><br>Pusat pemerintahan dan layanan publik desa.')
      .on('click', () => {
        setMarkerInfo({
          title: 'Kantor Desa Remau Bako Tuo',
          coordinates: [-1.2224187831143103, 104.38307336564955],
          description: 'Kantor Desa Remau Bako Tuo adalah pusat administrasi dan pelayanan publik untuk masyarakat desa. Di sini, warga dapat mengurus berbagai keperluan administrasi kependudukan, perizinan, dan mendapatkan informasi terkait program desa.',
          type: 'marker'
        });
        setInfoPanelExpanded(true);
      });

  }, []);

  useEffect(() => {
    if (mapRef.current) {
      L.tileLayer(BASE_LAYERS[activeLayer].url, {
        attribution: BASE_LAYERS[activeLayer].attribution
      }).addTo(mapRef.current);
    }
  }, [activeLayer]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Peta Administrasi
    if (activeLayers.includes('Peta Administrasi')) {
      if (!administrativeBoundaryRef.current) {
        administrativeBoundaryRef.current = L.polygon(ADMINISTRATIVE_BOUNDARY, { color: 'blue' })
        .bindPopup('<b>Batas Administrasi Desa</b>')
        .on('click', () => {
          setMarkerInfo({
            title: 'Batas Wilayah Administrasi',
            description: 'Ini adalah batas wilayah administrasi resmi dari Desa Remau Bako Tuo, mencakup semua dusun dan area yang berada di bawah yurisdiksinya.',
            type: 'boundary'
          });
          setInfoPanelExpanded(true);
        });
      }
      administrativeBoundaryRef.current.addTo(map);
    } else {
      administrativeBoundaryRef.current?.remove();
    }

    // Bidang Tanah
    if (activeLayers.includes('Bidang Tanah')) {
        if (bidangTanahLayersRef.current.length === 0) {
            const colors = ['red', 'green', 'purple', 'orange', 'cyan', 'magenta', 'yellow', 'lime', 'navy', 'olive', 'maroon', 'teal', 'aqua', 'fuchsia'];
            BIDANG_TANAH_DATA.forEach((polygonData, index) => {
                const polygon = L.polygon(polygonData as LatLngTuple[], { color: colors[index % colors.length] })
                    .bindPopup(`<b>Bidang Tanah ${index + 1}</b>`)
                    .on('click', () => {
                        setMarkerInfo({
                            title: `Informasi Bidang Tanah ${index + 1}`,
                            description: `Ini adalah informasi untuk bidang tanah ${index + 1}.`,
                            type: 'bidang'
                        });
                        setInfoPanelExpanded(true);
                    });
                bidangTanahLayersRef.current.push(polygon);
            });
        }
        bidangTanahLayersRef.current.forEach(layer => layer.addTo(map));
    } else {
        bidangTanahLayersRef.current.forEach(layer => layer.remove());
    }
  }, [activeLayers]);

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-full z-0" />
      <MapControls 
        mapRef={mapRef}
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        layerPanelExpanded={layerPanelExpanded}
        setLayerPanelExpanded={setLayerPanelExpanded}
      />
      <LayerPanel 
        expanded={layerPanelExpanded}
        onToggle={() => setLayerPanelExpanded(!layerPanelExpanded)}
        activeLayers={activeLayers}
        onLayerToggle={(layer) => {
          setActiveLayers(prev => 
            prev.includes(layer) 
              ? prev.filter(l => l !== layer) 
              : [...prev, layer]
          );
        }}
      />
      <LayerInfo 
        isOpen={infoPanelExpanded}
        onClose={() => setInfoPanelExpanded(false)}
        markerInfo={markerInfo}
      />
    </div>
  );
};
