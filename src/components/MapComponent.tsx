'use client';

import React, { useState, useEffect, useRef } from 'react';
import L, { LatLngTuple, LatLngBounds, Icon, Map as LeafletMap, Polygon as LeafletPolygon, Marker as LeafletMarker } from 'leaflet';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight, Phone, Mail, Globe, Users, Home, Building2, TreePine } from 'lucide-react';
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


interface ExtendedMarker extends MapMarker {
  id: string;
}

interface ExtendedPolygon extends MapPolygon {
  id: string;
}

interface FeatureLayer {
    layer: LeafletMarker | LeafletPolygon;
    category: string;
}

const getPolygonStyle = (category: string) => {
    switch (category) {
        case 'Wilayah Administratif':
            return { color: '#ff0000', weight: 3, fillColor: '#ff0000', fillOpacity: 0.1 };
        case 'Area Pertanian':
            return { color: '#22c55e', weight: 2, fillColor: '#22c55e', fillOpacity: 0.2 };
        case 'Fasilitas Umum':
            return { color: '#3b82f6', weight: 2, fillColor: '#3b82f6', fillOpacity: 0.2 };
        default:
            return { color: '#ffffff', weight: 2, fillColor: '#10b981', fillOpacity: 0.2 };
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
      setExpandedCategory(layerCategories[0].id);
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
                  onClick={() => toggleCategory(category.id)}
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
    const mapInstanceRef = useRef<LeafletMap | null>(null);
    const featureLayersRef = useRef<FeatureLayer[]>([]);
    
    const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
    const [activeBaseLayer, setActiveBaseLayer] = useState<string>('satellite');
    const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
    const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<{ title: string; coordinates?: LatLngTuple; description: string; type?: 'marker' | 'boundary' | 'polygon'; } | null>(null);
    const [layerCategories, setLayerCategories] = useState<MapLayerCategory[]>([]);


    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: DESA_CENTER,
                zoom: DEFAULT_ZOOM,
                zoomControl: false,
                maxBounds: DESA_BOUNDS,
                maxBoundsViscosity: 1.0,
            });
            mapInstanceRef.current = map;
            setMapInstance(map);
        }

        const unsubCategories = getLayerCategoriesStream((data) => {
            setLayerCategories(data as MapLayerCategory[]);
             // Set initial active overlays from categories
            const initialActive: string[] = [];
            data.forEach((cat: any) => {
                if (cat.layers.length > 0) {
                    initialActive.push(cat.layers[0]);
                }
            });
            setActiveOverlays(initialActive);
        });

        const unsubMarkers = getMarkersStream((data) => {
            if (mapInstanceRef.current) {
                // Clear only markers
                featureLayersRef.current
                    .filter(f => f.layer instanceof LeafletMarker)
                    .forEach(f => f.layer.remove());

                featureLayersRef.current = featureLayersRef.current.filter(f => !(f.layer instanceof LeafletMarker));
                
                const newMarkers = (data as ExtendedMarker[]).map(markerData => {
                    const marker = L.marker([markerData.latitude, markerData.longitude])
                        .on('click', () => {
                            setSelectedFeature({
                                title: markerData.name,
                                coordinates: [markerData.latitude, markerData.longitude],
                                description: markerData.description,
                                type: 'marker',
                            });
                        });
                    return { layer: marker, category: markerData.category };
                });
                featureLayersRef.current.push(...newMarkers);
                updateFeatureLayers();
            }
        });
        
        const unsubPolygons = getPolygonsStream((data) => {
             if (mapInstanceRef.current) {
                // Clear only polygons
                featureLayersRef.current
                    .filter(f => f.layer instanceof LeafletPolygon)
                    .forEach(f => f.layer.remove());

                featureLayersRef.current = featureLayersRef.current.filter(f => !(f.layer instanceof LeafletPolygon));

                const newPolygons = (data as ExtendedPolygon[]).map(polygonData => {
                    try {
                        const coordinates = JSON.parse(polygonData.coordinates) as [number, number][];
                        const polygon = L.polygon(coordinates, getPolygonStyle(polygonData.category)).on('click', () => {
                            setSelectedFeature({
                                title: polygonData.name,
                                description: polygonData.description,
                                type: 'polygon',
                            });
                        });
                        return { layer: polygon, category: polygonData.category };
                    } catch (e) {
                        console.error("Failed to parse polygon coordinates:", e);
                        return null;
                    }
                }).filter((p): p is FeatureLayer => p !== null);
                
                featureLayersRef.current.push(...newPolygons);
                updateFeatureLayers();
            }
        });
        
        const updateFeatureLayers = () => {
            if (!mapInstanceRef.current) return;
            const map = mapInstanceRef.current;
            featureLayersRef.current.forEach(({ layer, category }) => {
                if (activeOverlays.includes(category)) {
                    if (!map.hasLayer(layer)) {
                        layer.addTo(map);
                    }
                } else {
                    if (map.hasLayer(layer)) {
                        map.removeLayer(layer);
                    }
                }
            });
        };

        return () => {
            unsubCategories();
            unsubMarkers();
            unsubPolygons();
             if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapInstance) {
            const currentLayer = Object.values(mapInstance._layers).find(layer => layer instanceof L.TileLayer);
            if (currentLayer) {
              mapInstance.removeLayer(currentLayer);
            }

            const baseLayerData = BASE_LAYERS[activeBaseLayer as keyof typeof BASE_LAYERS];
            L.tileLayer(baseLayerData.url, {
                attribution: baseLayerData.attribution
            }).addTo(mapInstance).bringToBack();
        }
    }, [activeBaseLayer, mapInstance]);

    useEffect(() => {
        if (!mapInstance) return;

        featureLayersRef.current.forEach(({ layer, category }) => {
            if (activeOverlays.includes(category)) {
                if (!mapInstance.hasLayer(layer)) {
                    layer.addTo(mapInstance);
                }
            } else {
                if (mapInstance.hasLayer(layer)) {
                    mapInstance.removeLayer(layer);
                }
            }
        });
    }, [activeOverlays, mapInstance, layerCategories]);

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
                map={mapInstance}
                activeLayer={activeBaseLayer as keyof typeof BASE_LAYERS}
                setActiveLayer={setActiveBaseLayer as (layer: keyof typeof BASE_LAYERS) => void}
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

    