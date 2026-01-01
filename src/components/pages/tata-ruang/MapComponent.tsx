'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import { LatLngTuple, LatLngBounds, Icon, divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { 
  Map, 
  Satellite, 
  Mountain, 
  Plus, 
  Minus, 
  Maximize2, 
  Layers, 
  ChevronDown, 
  ChevronRight, 
  MapPin,
  School,
  Hospital,
  Building
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getMapFeatures } from '@/lib/map-actions';
import type { MapFeature } from '@/lib/types';
import { BASE_LAYERS, LAYER_CATEGORIES } from '@/lib/map-data';

// Fix Leaflet default marker issue with a blank icon, as we'll be using custom ones.
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
});


const DESA_CENTER: LatLngTuple = [-1.2224187831143103, 104.38307336564955];
const DEFAULT_ZOOM = 14;
const DESA_BOUNDS = new LatLngBounds(
  [-1.28, 104.33],
  [-1.18, 104.43]
);

const getIconForCategory = (category: string) => {
  let IconComponent;
  switch (category) {
    case 'Pendidikan':
      IconComponent = School;
      break;
    case 'Kesehatan':
      IconComponent = Hospital;
      break;
    case 'Kantor Desa':
      IconComponent = Building;
      break;
    case 'Fasilitas Umum':
        IconComponent = MapPin;
        break;
    default:
      IconComponent = MapPin;
  }
  
  const iconMarkup = renderToStaticMarkup(
    <div className="p-1.5 bg-primary rounded-full shadow-lg">
      <IconComponent className="h-4 w-4 text-white" />
    </div>
  );

  return divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
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
            <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-r border-white/20 rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300 p-0">
                <SheetHeader className="p-4 border-b border-black/10">
                  <SheetTitle>Kontrol Layer</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100%-4rem)]">
                    <div className="space-y-3 sm:space-y-4 p-4">
                        {Object.entries(LAYER_CATEGORIES).map(([key, category]) => (
                            <div key={key} className="rounded-lg overflow-hidden">
                                <button onClick={() => toggleCategory(key)} className="w-full flex items-center justify-between transition-all py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm text-black/90 hover:bg-white/20">
                                    {category.name}
                                    {expandedCategory === key ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                                <div className={`transition-all duration-200 ${expandedCategory === key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                    <div className="py-1">
                                        {category.layers.map(layer => (
                                            <label key={layer} className="flex items-center space-x-2 py-1.5 px-4 hover:bg-white/10 transition-colors cursor-pointer text-black/80">
                                                <input type="checkbox" checked={activeLayers.includes(layer)} onChange={() => onLayerToggle(layer)} className="rounded border-black/30 text-emerald-500 focus:ring-emerald-500 bg-white/20" />
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
    featureInfo: MapFeature | null;
}

const LayerInfo: React.FC<LayerInfoProps> = ({ isOpen, onClose, featureInfo }) => {
    if (!featureInfo) return null;
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md backdrop-saturate-200 backdrop-brightness-125 border-l border-white/20 rounded-l-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)] transition-all duration-300">
                <SheetHeader>
                    <SheetTitle>{featureInfo.title}</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-full px-4 py-8">
                    <div className="space-y-6 sm:space-y-8">
                        <p className="text-xs sm:text-sm text-black/80">{featureInfo.description}</p>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};


const MapControls: React.FC<{ activeLayer: keyof typeof BASE_LAYERS; setActiveLayer: (layer: keyof typeof BASE_LAYERS) => void; setLayerPanelExpanded: (expanded: boolean) => void; layerPanelExpanded: boolean }> = ({ activeLayer, setActiveLayer, setLayerPanelExpanded, layerPanelExpanded }) => {
    const map = useMap();
    return (
        <div className="absolute left-2 top-20 z-[999] space-y-2">
            <div className="bg-white/20 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/40">
                <TooltipProvider>
                    <Tooltip><TooltipTrigger asChild><button onClick={() => setLayerPanelExpanded(!layerPanelExpanded)} className="w-[48px] h-[48px] flex items-center justify-center transition-colors text-black hover:bg-white/20"><Layers className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right"><p>Layers</p></TooltipContent></Tooltip>
                    {(Object.keys(BASE_LAYERS) as Array<keyof typeof BASE_LAYERS>).map(k => { const L = BASE_LAYERS[k]; return <Tooltip key={k}><TooltipTrigger asChild><button onClick={() => setActiveLayer(k)} className={`w-[48px] h-[48px] flex items-center justify-center ${activeLayer === k ? 'bg-white/30' : ''}`}><L.icon className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right"><p>{L.name}</p></TooltipContent></Tooltip> })}
                </TooltipProvider>
            </div>
             <div className="bg-white/20 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/40">
                 <TooltipProvider>
                    <Tooltip><TooltipTrigger asChild><button onClick={() => map.zoomIn()} className="w-[48px] h-[48px] flex items-center justify-center"><Plus className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right"><p>Zoom In</p></TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><button onClick={() => map.zoomOut()} className="w-[48px] h-[48px] flex items-center justify-center"><Minus className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right"><p>Zoom Out</p></TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><button onClick={() => map.fitBounds(DESA_BOUNDS)} className="w-[48px] h-[48px] flex items-center justify-center"><Maximize2 className="h-5 w-5" /></button></TooltipTrigger><TooltipContent side="right"><p>Fit to Bounds</p></TooltipContent></Tooltip>
                 </TooltipProvider>
            </div>
        </div>
    );
};

const parseMarkerCoords = (coords: string): LatLngTuple | null => {
    const parts = coords.split(',').map(s => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return [parts[0], parts[1]];
    }
    return null;
};

const parsePolygonCoords = (coords: string): LatLngTuple[] | null => {
    const pairs = coords.split(';').map(p => p.split(',').map(s => parseFloat(s.trim())));
    if (pairs.every(p => p.length === 2 && !isNaN(p[0]) && !isNaN(p[1]))) {
        return pairs.map(p => [p[0], p[1]] as LatLngTuple);
    }
    return null;
};


export default function MapComponent() {
    const [activeBaseLayer, setActiveBaseLayer] = useState<keyof typeof BASE_LAYERS>('satellite');
    const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
    const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);
    const [mapFeatures, setMapFeatures] = useState<MapFeature[]>([]);

    useEffect(() => {
        const unsubscribe = getMapFeatures((data) => {
            setMapFeatures(data);
        });
        return () => unsubscribe();
    }, []);

    const filteredFeatures = useMemo(() => {
        if (activeOverlays.length === 0) return mapFeatures;
        return mapFeatures.filter(feature => activeOverlays.includes(feature.category));
    }, [mapFeatures, activeOverlays]);


    return (
        <>
            <MapContainer center={DESA_CENTER} zoom={DEFAULT_ZOOM} className="w-full h-full" zoomControl={false} maxBounds={DESA_BOUNDS} maxBoundsViscosity={1.0}>
                <TileLayer url={BASE_LAYERS[activeBaseLayer].url} attribution={BASE_LAYERS[activeBaseLayer].attribution} />
                
                {filteredFeatures.map(feature => {
                    if (feature.type === 'marker') {
                        const pos = parseMarkerCoords(feature.coordinates);
                        const icon = getIconForCategory(feature.category);
                        return pos ? <Marker key={feature.id} position={pos} icon={icon} eventHandlers={{ click: () => setSelectedFeature(feature) }} /> : null;
                    }
                    if (feature.type === 'polygon') {
                        const pos = parsePolygonCoords(feature.coordinates);
                        return pos ? <Polygon key={feature.id} positions={pos} pathOptions={{ color: feature.color || '#3388ff' }} eventHandlers={{ click: () => setSelectedFeature(feature) }} /> : null;
                    }
                    return null;
                })}

                <MapControls activeLayer={activeBaseLayer} setActiveLayer={setActiveBaseLayer} layerPanelExpanded={layerPanelExpanded} setLayerPanelExpanded={setLayerPanelExpanded} />
            </MapContainer>

            <LayerPanel expanded={layerPanelExpanded} onToggle={() => setLayerPanelExpanded(!layerPanelExpanded)} activeLayers={activeOverlays} onLayerToggle={(l) => setActiveOverlays(p => p.includes(l) ? p.filter(i => i !== l) : [...p, l])} />
            
            <LayerInfo isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} featureInfo={selectedFeature} />
        </>
    );
};
