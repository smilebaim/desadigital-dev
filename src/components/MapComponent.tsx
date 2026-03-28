'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import type { LatLngTuple, LatLngBounds, Map as LeafletMap } from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Clock, Phone, Mail, Globe, Users, Home, Building2, TreePine, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { visualizationTemplates } from '@/lib/visualization-templates';

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

const CATEGORY_COLORS: Record<string, string> = {
  'Batas Desa': '#3b82f6', // blue
  'Batas Dusun': '#60a5fa', // light blue
  'Sawah': '#22c55e', // green
  'Perkebunan': '#16a34a', // dark green
  'Pemukiman': '#f97316', // orange
  'Jalan': '#475569', // slate
  'Irigasi': '#06b6d4', // cyan
  'default': '#ef4444' // red
};

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

const getShapeHtml = (shape: string, color: string) => {
  const commonStyle = `filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.3)); stroke: ${color}; stroke-width: 3px; fill: transparent;`;
  switch(shape) {
     case 'square':
       return `<svg width="20" height="20" viewBox="0 0 20 20" style="overflow: visible"><rect x="1" y="1" width="18" height="18" rx="2" style="${commonStyle}" /></svg>`;
     case 'triangle':
       return `<svg width="20" height="20" viewBox="0 0 20 20" style="overflow: visible"><polygon points="10,1 19,19 1,19" style="${commonStyle}" stroke-linejoin="round" /></svg>`;
     case 'diamond':
       return `<svg width="20" height="20" viewBox="0 0 20 20" style="overflow: visible"><polygon points="10,1 19,10 10,19 1,10" style="${commonStyle}" stroke-linejoin="round" /></svg>`;
     case 'pin':
       return `<svg width="20" height="28" viewBox="0 0 24 32" style="overflow: visible"><path d="M12 2C6.48 2 2 6.48 2 12c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" style="${commonStyle}" /></svg>`;
     case 'circle':
     default:
       return `<svg width="20" height="20" viewBox="0 0 20 20" style="overflow: visible"><circle cx="10" cy="10" r="9" style="${commonStyle}" /></svg>`;
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

  const renderDescription = (text: string) => {
    let elements: React.ReactNode[] = [];
    let remainingText = text || '';

    visualizationTemplates.forEach(template => {
      if (remainingText.includes(template.placeholder)) {
        const parts = remainingText.split(template.placeholder);
        if (parts[0]) elements.push(<span key={elements.length}>{parts[0]}</span>);
        elements.push(
          <div key={elements.length} className="my-4 w-full overflow-hidden bg-white/50 rounded-lg p-2 shadow-inner">
            <h4 className="font-semibold text-xs mb-2 text-center text-slate-700">{template.title}</h4>
            <div className="transform scale-[0.8] origin-top -mt-2 -mb-8">
                {template.previewComponent}
            </div>
          </div>
        );
        remainingText = parts.slice(1).join(template.placeholder);
      }
    });

    if (remainingText) {
      elements.push(<span key={elements.length}>{remainingText}</span>);
    }

    return elements.length > 0 ? elements : <span>{text}</span>;
  };

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
              <div className="text-xs sm:text-sm text-black/80 whitespace-pre-wrap">
                {renderDescription(featureInfo.description)}
              </div>
            </div>
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
      setActiveOverlays([]);
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
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      touchZoom: true,
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

    // Initialize marker cluster
    // Use type assertion since markerClusterGroup is added to the L namespace via side-effects
    const markersCluster = (L as any).markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });

    // Draw active markers
    markers.forEach(marker => {
      if (activeOverlays.includes(marker.category)) {
        const markerColor = marker.color || CATEGORY_COLORS[marker.category] || CATEGORY_COLORS['default'];
        const markerShape = marker.shape || 'circle';
        
        let iconSize: [number, number] = [20, 20];
        let iconAnchor: [number, number] = [10, 10];
        if (markerShape === 'pin') {
           iconSize = [20, 28];
           iconAnchor = [10, 28]; // Anchor at bottom tip
        }

        const customIcon = L.divIcon({
          className: 'custom-div-icon bg-transparent border-none',
          html: getShapeHtml(markerShape, markerColor),
          iconSize: iconSize,
          iconAnchor: iconAnchor
        });

        const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: customIcon })
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
        markersCluster.addLayer(leafletMarker);
      }
    });

    // Add cluster layer to map
    createAndAddLayer('markers-cluster', markersCluster);

    // Draw active polygons
    polygons.forEach(polygon => {
      if (activeOverlays.includes(polygon.category)) {
        try {
          const coordinates = JSON.parse(polygon.coordinates);
          if (Array.isArray(coordinates)) {
            const polygonColor = polygon.color || CATEGORY_COLORS[polygon.category] || CATEGORY_COLORS['default'];
            const isLine = polygon.category === 'Jalan' || polygon.category === 'Irigasi';
            const leafletPolygon = L.polygon(coordinates as LatLngTuple[], { 
              color: polygonColor,
              weight: polygon.category.includes('Batas') ? 3 : (isLine ? 4 : 3),
              fillOpacity: isLine ? 0.0 : 0.05
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
