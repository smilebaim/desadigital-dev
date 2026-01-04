
'use client';

import React, { useState, useEffect, useRef } from 'react';
import L, { LatLngTuple, LatLngBounds, Map as LeafletMap, Polygon as LeafletPolygon, Marker as LeafletMarker, Layer, TileLayer, LayerGroup } from 'leaflet';
import { Map as MapIcon, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Phone, Mail, Globe, Users, Home, Building2, TreePine } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import { getMarkersStream, getLayerCategoriesStream, getPolygonsStream } from '@/lib/map-client-actions';
import type { MapLayerCategory, MapMarker, MapPolygon } from '@/lib/map-actions';

const DESA_CENTER: LatLngTuple = [-1.2224187831143103, 104.38307336564955];
const DEFAULT_ZOOM = 16;
const DESA_BOUNDS_COORDS: [[number, number], [number, number]] = [
  [-1.2324187831143103, 104.37307336564955],
  [-1.2124187831143103, 104.39307336564955]
];
const DESA_BOUNDS = new LatLngBounds(DESA_BOUNDS_COORDS);

const BASE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    name: 'Street',
    icon: MapIcon
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

interface ExtendedMarker extends MapMarker {
  id: string;
}

interface ExtendedPolygon extends MapPolygon {
  id: string;
}

const getPolygonStyle = (category: string) => {
    switch (category) {
        case 'Batas Desa':
            return { color: '#ff0000', weight: 3, fillColor: '#ff0000', fillOpacity: 0.1 };
        case 'Bidang Tanah':
        case 'Area Pertanian':
            return { color: '#3b82f6', weight: 2, fillColor: '#3b82f6', fillOpacity: 0.2 };
        default:
            return { color: '#10b981', weight: 2, fillColor: '#10b981', fillOpacity: 0.2 };
    }
};

const LayerPanel: React.FC<{
  expanded: boolean;
  onToggle: () => void;
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
  layerCategories: MapLayerCategory[];
}> = ({ expanded, onToggle, activeLayers, onLayerToggle, layerCategories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (layerCategories.length > 0 && !expandedCategory) {
      const firstCategory = layerCategories.find(c => c.layers.length > 0);
      if (firstCategory?.id) {
        setExpandedCategory(firstCategory.id);
      }
    }
  }, [layerCategories, expandedCategory]);


  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <Sheet open={expanded} onOpenChange={onToggle}>
      <SheetContent
        side="left"
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-white/20 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300 p-0"
        aria-label="Layer Panel"
      >
        <SheetTitle className="sr-only">Layer Controls</SheetTitle>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-3 sm:space-y-4">
            {layerCategories.map((category) => (
              <div key={category.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id!)}
                  className={`w-full flex items-center justify-between transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-black/90 hover:bg-white/20 ${expandedCategory === category.id ? 'bg-white/10' : '' }`}
                  aria-expanded={expandedCategory === category.id}
                  aria-controls={`category-${category.id}-layers`}
                >
                  {category.name}
                  {expandedCategory === category.id ? ( <ChevronDown className="h-4 w-4 text-black/90" /> ) : ( <ChevronRight className="h-4 w-4 text-black/90" /> )}
                </button>
                <div
                  id={`category-${category.id}-layers`}
                  className={`transition-all duration-200 ${expandedCategory === category.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
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


const LayerInfo: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  markerInfo: { title: string; coordinates?: LatLngTuple; description: string; type?: 'marker' | 'boundary' | 'polygon'; } | null;
}> = ({ isOpen, onClose, markerInfo }) => {
  if (!markerInfo) return null;
  const stats = [
    { icon: Users, label: 'Jumlah Penduduk', value: '3,245', change: '+125 dari tahun lalu', trend: 'up' },
    { icon: Home, label: 'Jumlah KK', value: '856', change: '+45 dari tahun lalu', trend: 'up' },
    { icon: Building2, label: 'Luas Wilayah', value: '2,500 Ha', subtext: '25 km²' },
    { icon: TreePine, label: 'Luas Hutan', value: '850 Ha', percentage: '34%' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-l border-white/20 rounded-l-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300 p-0"
        aria-label="Location Information"
      >
        <SheetTitle className="sr-only">{markerInfo.title}</SheetTitle>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-black/90">{markerInfo.title}</h3>
              {markerInfo.coordinates && (
                <div className="flex items-center space-x-2 text-black/80">
                  <Layers className="h-4 w-4" />
                  <p className="text-xs sm:text-sm">{markerInfo.coordinates[0].toFixed(6)}, {markerInfo.coordinates[1].toFixed(6)}</p>
                </div>
              )}
              <p className="text-xs sm:text-sm text-black/80">{markerInfo.description}</p>
            </div>
            {markerInfo.type === 'boundary' || markerInfo.type === 'polygon' ? (
              <>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-medium text-base mb-2 text-black/90">Informasi Area</h4>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-black/80"><span className="font-medium text-black/90">Utara:</span> Desa Teluk</p>
                    <p className="text-xs sm:text-sm text-black/80"><span className="font-medium text-black/90">Selatan:</span> Desa Sungai Rengit</p>
                    <p className="text-xs sm:text-sm text-black/80"><span className="font-medium text-black/90">Timur:</span> Selat Berhala</p>
                    <p className="text-xs sm:text-sm text-black/80"><span className="font-medium text-black/90">Barat:</span> Desa Sungai Rambut</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={index} className="bg-white/30 backdrop-blur-sm rounded-lg p-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <StatIcon className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-medium text-black/90">{stat.label}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-black/90">{stat.value}</div>
                          {stat.change && <div className={`text-xs ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>{stat.change}</div>}
                          {stat.percentage && <div className="text-xs text-black/60">{stat.percentage} dari total</div>}
                          {stat.subtext && <div className="text-xs text-black/60">{stat.subtext}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-base text-black/90">Kontak</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-black/80"><Phone className="h-4 w-4" /><span className="text-xs sm:text-sm">(0741) 123456</span></div>
                    <div className="flex items-center space-x-2 text-black/80"><Mail className="h-4 w-4" /><span className="text-xs sm:text-sm">info@remaubakotuo.desa.id</span></div>
                    <div className="flex items-center space-x-2 text-black/80"><Globe className="h-4 w-4" /><span className="text-xs sm:text-sm">www.remaubakotuo.desa.id</span></div>
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


const MapControls: React.FC<{
  map: LeafletMap | null;
  activeLayer: keyof typeof BASE_LAYERS;
  setActiveLayer: (layer: keyof typeof BASE_LAYERS) => void;
  layerPanelExpanded: boolean;
  setLayerPanelExpanded: (expanded: boolean) => void;
}> = ({ map, activeLayer, setActiveLayer, layerPanelExpanded, setLayerPanelExpanded }) => {
  if (!map) return null;
  const handleShowAll = () => map.fitBounds(DESA_BOUNDS_COORDS);

  return (
    <div className="absolute left-2 top-20 z-[999]">
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-150 rounded-lg shadow-2xl overflow-hidden border border-white/40">
          <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setLayerPanelExpanded(!layerPanelExpanded)} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${layerPanelExpanded ? 'bg-white/30 text-black hover:bg-white/40' : 'text-black hover:bg-white/20'}`}>
                    <Layers className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl"><p>Toggle Layer Panel</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {(Object.keys(BASE_LAYERS) as Array<keyof typeof BASE_LAYERS>).map((layer) => {
              const Icon = BASE_LAYERS[layer].icon;
              return (
                <TooltipProvider key={layer} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => setActiveLayer(layer)} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${activeLayer === layer ? 'bg-white/30 text-black hover:bg-white/40' : 'text-black hover:bg-white/20'}`}>
                        <Icon className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl"><p>{BASE_LAYERS[layer].name}</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-150 rounded-lg shadow-2xl overflow-hidden border border-white/40">
          <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger asChild><button onClick={() => map.zoomIn()} className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"><Plus className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl"><p>Zoom In</p></TooltipContent></Tooltip></TooltipProvider>
            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger asChild><button onClick={() => map.zoomOut()} className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"><Minus className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl"><p>Zoom Out</p></TooltipContent></Tooltip></TooltipProvider>
            <TooltipProvider delayDuration={100}><Tooltip><TooltipTrigger asChild><button onClick={handleShowAll} className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"><Maximize2 className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right" sideOffset={16} className="bg-white/20 backdrop-blur-xl text-black/90 border-white/40 shadow-2xl"><p>Show All</p></TooltipContent></Tooltip></TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapComponent = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const baseLayerRef = useRef<TileLayer | null>(null);
    const featureLayersRef = useRef<LayerGroup>(L.layerGroup());

    const [activeBaseLayer, setActiveBaseLayer] = useState<keyof typeof BASE_LAYERS>('satellite');
    const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
    const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<{ title: string; coordinates?: LatLngTuple; description: string; type?: 'marker' | 'boundary' | 'polygon'; } | null>(null);
    
    const [markers, setMarkers] = useState<ExtendedMarker[]>([]);
    const [polygons, setPolygons] = useState<ExtendedPolygon[]>([]);
    const [layerCategories, setLayerCategories] = useState<MapLayerCategory[]>([]);

    // Effect for ONE-TIME map initialization
    useEffect(() => {
        let mapInstance: LeafletMap;
        if (mapContainerRef.current && !mapRef.current) {
            mapInstance = L.map(mapContainerRef.current, {
                center: DESA_CENTER,
                zoom: DEFAULT_ZOOM,
                zoomControl: false,
                maxBounds: DESA_BOUNDS,
                maxBoundsViscosity: 1.0,
            });

            baseLayerRef.current = L.tileLayer(BASE_LAYERS.satellite.url, {
                attribution: BASE_LAYERS.satellite.attribution,
            }).addTo(mapInstance);

            featureLayersRef.current.addTo(mapInstance);
            
            mapRef.current = mapInstance;
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Effect for updating BASE layer when activeBaseLayer changes
    useEffect(() => {
        if (mapRef.current && baseLayerRef.current) {
            baseLayerRef.current.setUrl(BASE_LAYERS[activeBaseLayer].url);
        }
    }, [activeBaseLayer]);

    // Effect for fetching data from Firestore and setting initial overlay
    useEffect(() => {
        const unsubMarkers = getMarkersStream((data) => setMarkers(data as ExtendedMarker[]));
        const unsubPolygons = getPolygonsStream((data) => setPolygons(data as ExtendedPolygon[]));
        const unsubCategories = getLayerCategoriesStream((data) => {
            const categories = data as MapLayerCategory[];
            setLayerCategories(categories);
            
            // Set initial active overlay only once after categories are loaded
            if (activeOverlays.length === 0 && categories.length > 0) {
                 const firstCategoryWithLayers = categories.find(c => c.layers.length > 0);
                 if (firstCategoryWithLayers) {
                     setActiveOverlays([firstCategoryWithLayers.layers[0]]);
                 }
            }
        });

        return () => {
            unsubMarkers();
            unsubPolygons();
            unsubCategories();
        };
    }, []); // Run only once

    // The MAIN effect for drawing features on the map
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Clear existing features
        featureLayersRef.current.clearLayers();

        // Draw polygons
        polygons.forEach(polygonData => {
            if (activeOverlays.includes(polygonData.category)) {
                try {
                    const coordinates = JSON.parse(polygonData.coordinates) as [number, number][];
                    const polygon = L.polygon(coordinates, getPolygonStyle(polygonData.category)).on('click', () => {
                        setSelectedFeature({
                            title: polygonData.name,
                            description: polygonData.description,
                            type: polygonData.category === 'Batas Desa' ? 'boundary' : 'polygon',
                        });
                    });
                    featureLayersRef.current.addLayer(polygon);
                } catch (e) {
                    console.error(`Failed to parse polygon coordinates for "${polygonData.name}":`, e);
                }
            }
        });

        // Draw markers
        markers.forEach(markerData => {
            if (activeOverlays.includes(markerData.category)) {
                const marker = L.marker([markerData.latitude, markerData.longitude])
                    .on('click', () => {
                        setSelectedFeature({
                            title: markerData.name,
                            coordinates: [markerData.latitude, markerData.longitude],
                            description: markerData.description,
                            type: 'marker',
                        });
                    });
                featureLayersRef.current.addLayer(marker);
            }
        });

    }, [markers, polygons, activeOverlays]); // Re-run this effect when data or active overlays change

    const handleLayerToggle = (layerName: string) => {
        setActiveOverlays(prev =>
            prev.includes(layerName)
            ? prev.filter(l => l !== layerName)
            : [...prev, layerName]
        );
    };

    return (
        <div className="fixed inset-0">
            <div ref={mapContainerRef} className="w-full h-full" />
            <MapControls
                map={mapRef.current}
                activeLayer={activeBaseLayer}
                setActiveLayer={setActiveBaseLayer}
                layerPanelExpanded={layerPanelExpanded}
                setLayerPanelExpanded={setLayerPanelExpanded}
            />
            <LayerPanel
                expanded={layerPanelExpanded}
                onToggle={() => setLayerPanelExpanded(!layerPanelExpanded)}
                activeLayers={activeOverlays}
                onLayerToggle={handleLayerToggle}
                layerCategories={layerCategories}
            />
            <LayerInfo
                isOpen={!!selectedFeature}
                onClose={() => setSelectedFeature(null)}
                markerInfo={selectedFeature}
            />
        </div>
    );
};

export default MapComponent;
