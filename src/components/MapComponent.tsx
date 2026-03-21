'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import type { LatLngTuple, LatLngBounds, Map as LeafletMap } from 'leaflet';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Clock, Phone, Mail, Globe, Users, Home, Building2, TreePine, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { getMarkersStream, getPolygonsStream, getLayerCategoriesStream } from '@/lib/map-client-actions';
import type { MapMarker, MapPolygon, MapLayerCategory } from '@/lib/map-actions';


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


// Interfaces for data from Firestore
interface Marker extends MapMarker { id: string; }
interface Polygon extends MapPolygon { id: string; }
interface Category extends MapLayerCategory { id: string; }


interface LayerPanelProps {
  expanded: boolean;
  onToggle: () => void;
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
  categories: Category[];
}

const LayerPanel: React.FC<LayerPanelProps> = ({ expanded, onToggle, activeLayers, onLayerToggle, categories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Sheet open={expanded} onOpenChange={onToggle}>
      <SheetContent 
        side="left" 
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-white/20 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300"
      >
        <SheetHeader>
            <SheetTitle>Kontrol Lapisan</SheetTitle>
            <SheetDescription className="sr-only">
            Kontrol visibilitas berbagai lapisan peta dan kategori
            </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-3 sm:space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-black/90 hover:bg-white/20 ${
                    expandedCategory === category.id ? 'bg-white/10' : ''
                  }`}
                  aria-expanded={expandedCategory === category.id}
                  aria-controls={`category-${category.id}-layers`}
                >
                  {category.name}
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-4 w-4 text-black/90" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-black/90" />
                  )}
                </button>
                <div 
                  id={`category-${category.id}-layers`}
                  className={`transition-all duration-200 ${
                    expandedCategory === category.id 
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
  featureInfo: {
    title: string;
    coordinates?: LatLngTuple;
    description: string;
    type?: 'marker' | 'boundary' | 'polygon';
  } | null;
}

const LayerInfo: React.FC<LayerInfoProps> = ({ isOpen, onClose, featureInfo }) => {
  if (!featureInfo) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-l border-white/20 rounded-l-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300"
      >
        <SheetHeader>
            <SheetTitle>{featureInfo.title}</SheetTitle>
            <SheetDescription className="sr-only">
            Informasi detail untuk {featureInfo.title}
            </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {featureInfo.coordinates && (
                <div className="flex items-center space-x-2 text-black/80">
                  <MapPin className="h-4 w-4" />
                  <p className="text-xs sm:text-sm">
                    {featureInfo.coordinates[0].toFixed(6)}, {featureInfo.coordinates[1].toFixed(6)}
                  </p>
                </div>
              )}
              <p className="text-xs sm:text-sm text-black/80">
                {featureInfo.description}
              </p>
            </div>
            
            {featureInfo.type === 'marker' && (
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
                  <p>Toggle Panel Lapisan</p>
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
                  <p>Perbesar</p>
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
                  <p>Perkecil</p>
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
                  <p>Tampilkan Semua</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};


export const MapComponent: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const featureLayersRef = useRef<{[key: string]: L.Layer}>({});

  const [activeBaseLayer, setActiveBaseLayer] = useState<keyof typeof BASE_LAYERS>('satellite');
  const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
  const initializedOverlays = useRef(false);
  
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);
  const [infoPanelExpanded, setInfoPanelExpanded] = useState(false);
  const [selectedFeatureInfo, setSelectedFeatureInfo] = useState<LayerInfoProps['featureInfo']>(null);
  
  useEffect(() => {
    if (categories.length > 0 && !initializedOverlays.current) {
      const allLayers = categories.flatMap(c => c.layers);
      setActiveOverlays(allLayers);
      initializedOverlays.current = true;
    }
  }, [categories]);
  
  useEffect(() => {
    const unsubMarkers = getMarkersStream((data) => setMarkers(data as Marker[]));
    const unsubPolygons = getPolygonsStream((data) => setPolygons(data as Polygon[]));
    const unsubCategories = getLayerCategoriesStream((data) => setCategories(data as Category[]));

    return () => {
        unsubMarkers();
        unsubPolygons();
        unsubCategories();
    };
  }, []);

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
      touchZoom: false,
    });
    mapRef.current = map;

    L.tileLayer(BASE_LAYERS[activeBaseLayer].url, {
      attribution: BASE_LAYERS[activeBaseLayer].attribution
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
        // Remove old layer
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                layer.remove();
            }
        });
        // Add new layer
        L.tileLayer(BASE_LAYERS[activeBaseLayer].url, {
            attribution: BASE_LAYERS[activeBaseLayer].attribution
        }).addTo(mapRef.current);
    }
  }, [activeBaseLayer]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear all existing feature layers before redrawing
    Object.values(featureLayersRef.current).forEach(layer => layer.remove());
    featureLayersRef.current = {};

    const createAndAddLayer = (id: string, layer: L.Layer) => {
        featureLayersRef.current[id] = layer;
        layer.addTo(map);
    };

    // Draw active markers
    markers.forEach(marker => {
      if (activeOverlays.includes(marker.category)) {
        const leafletMarker = L.marker([marker.latitude, marker.longitude])
          .bindPopup(`<b>${marker.name}</b><br>${marker.description}`)
          .on('click', () => {
            setSelectedFeatureInfo({
              title: marker.name,
              coordinates: [marker.latitude, marker.longitude],
              description: marker.description,
              type: 'marker'
            });
            setInfoPanelExpanded(true);
          });
        createAndAddLayer(`marker-${marker.id}`, leafletMarker);
      }
    });

    // Draw active polygons
    polygons.forEach(polygon => {
      if (activeOverlays.includes(polygon.category)) {
        try {
          const coordinates = JSON.parse(polygon.coordinates);
          if (Array.isArray(coordinates)) {
            const leafletPolygon = L.polygon(coordinates as LatLngTuple[], { 
              color: polygon.name === 'Batas Administrasi Desa' ? 'blue' : 'red', // Example logic
              weight: polygon.name === 'Batas Administrasi Desa' ? 3 : 2
            })
              .bindPopup(`<b>${polygon.name}</b>`)
              .on('click', () => {
                setSelectedFeatureInfo({
                  title: polygon.name,
                  description: polygon.description,
                  type: 'polygon'
                });
                setInfoPanelExpanded(true);
              });
            createAndAddLayer(`polygon-${polygon.id}`, leafletPolygon);
          }
        } catch (e) {
          console.error(`Failed to parse coordinates for polygon ${polygon.name}:`, e);
        }
      }
    });
  }, [markers, polygons, activeOverlays, mapRef.current]);

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-full z-0" />
      <MapControls 
        mapRef={mapRef}
        activeLayer={activeBaseLayer}
        setActiveLayer={setActiveBaseLayer}
        layerPanelExpanded={layerPanelExpanded}
        setLayerPanelExpanded={setLayerPanelExpanded}
      />
      <LayerPanel 
        expanded={layerPanelExpanded}
        onToggle={() => setLayerPanelExpanded(!layerPanelExpanded)}
        activeLayers={activeOverlays}
        onLayerToggle={(layerName) => {
          setActiveOverlays(prev => 
            prev.includes(layerName) 
              ? prev.filter(l => l !== layerName) 
              : [...prev, layerName]
          );
        }}
        categories={categories}
      />
      <LayerInfo 
        isOpen={infoPanelExpanded}
        onClose={() => setInfoPanelExpanded(false)}
        featureInfo={selectedFeatureInfo}
      />
    </div>
  );
};
