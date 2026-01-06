"use client";
import React, { useState, useEffect, useRef } from 'react';
import L, { LatLngTuple, LatLngBounds, Icon, Map as LeafletMap, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';
import { Map, Satellite, Mountain, Plus, Minus, Maximize2, Layers, ChevronDown, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Firestore imports
import { useFirebase } from '@/firebase';
import { collection, query, onSnapshot, DocumentData } from 'firebase/firestore';

// Fix Leaflet default marker issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const DESA_CENTER: LatLngTuple = [-1.2224187831143103, 104.38307336564955];
const DEFAULT_ZOOM = 16;
const DESA_BOUNDS = new LatLngBounds(
  [-1.2324187831143103, 104.37307336564955],
  [-1.2124187831143103, 104.39307336564955]
);

const BASE_LAYERS = {
  street: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap' },
  satellite: { url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', attribution: '&copy; Google' },
  terrain: { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenTopoMap' }
};

interface LayerCategory {
  id: string;
  name: string;
  layers: string[];
}

interface MapMarker {
  id: string;
  position: LatLngTuple;
  title: string;
  description: string;
  category: string;
}

interface MapPolygon {
  id: string;
  path: [number, number][];
  title: string;
  description: string;
  category: string;
  options: {
    color: string;
    weight: number;
    fillColor: string;
    fillOpacity: number;
  };
}

const MapControls: React.FC<{
  map: LeafletMap | null;
  activeBaseLayer: keyof typeof BASE_LAYERS;
  setActiveBaseLayer: (layer: keyof typeof BASE_LAYERS) => void;
  onLayerPanelToggle: () => void;
  layerPanelExpanded: boolean;
}> = ({ map, activeBaseLayer, setActiveBaseLayer, onLayerPanelToggle, layerPanelExpanded }) => {
  if (!map) return null;
  return (
     <div className="absolute left-2 top-20 z-[999]">
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/40">
          <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={onLayerPanelToggle} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${layerPanelExpanded ? 'bg-white/30' : ''} hover:bg-white/20`}>
                    <Layers className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Layer</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setActiveBaseLayer('street')} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${activeBaseLayer === 'street' ? 'bg-white/30' : ''} hover:bg-white/20`}>
                    <Map className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Street</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <button onClick={() => setActiveBaseLayer('satellite')} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${activeBaseLayer === 'satellite' ? 'bg-white/30' : ''} hover:bg-white/20`}>
                    <Satellite className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Satellite</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                   <button onClick={() => setActiveBaseLayer('terrain')} className={`w-[48px] h-[48px] flex items-center justify-center transition-colors ${activeBaseLayer === 'terrain' ? 'bg-white/30' : ''} hover:bg-white/20`}>
                    <Mountain className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Terrain</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden border border-white/40">
           <div className="flex flex-col divide-y divide-white/40">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <button onClick={() => map.zoomIn()} className="w-[48px] h-[48px] flex items-center justify-center transition-colors hover:bg-white/20"><Plus className="h-5 w-5" /></button>
                    </TooltipTrigger>
                    <TooltipContent side="right"><p>Zoom In</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={() => map.zoomOut()} className="w-[48px] h-[48px] flex items-center justify-center transition-colors hover:bg-white/20"><Minus className="h-5 w-5" /></button>
                    </TooltipTrigger>
                    <TooltipContent side="right"><p>Zoom Out</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button onClick={() => map.fitBounds(DESA_BOUNDS)} className="w-[48px] h-[48px] flex items-center justify-center transition-colors hover:bg-white/20"><Maximize2 className="h-5 w-5" /></button>
                    </TooltipTrigger>
                    <TooltipContent side="right"><p>Fit Bounds</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
           </div>
        </div>
      </div>
    </div>
  );
};

const LayerPanel: React.FC<{
  expanded: boolean;
  onToggle: () => void;
  activeLayers: string[];
  onLayerToggle: (layer: string) => void;
  categories: LayerCategory[];
}> = ({ expanded, onToggle, activeLayers, onLayerToggle, categories }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categories.length > 0 && !expandedCategory) {
      setExpandedCategory(categories[0].id);
    }
  }, [categories, expandedCategory]);

  return (
    <Sheet open={expanded} onOpenChange={onToggle}>
      <SheetContent side="left" className="w-[70vw] sm:w-[336px] bg-white/40 backdrop-blur-md rounded-r-[2rem] top-14 sm:top-20 h-[calc(100vh-7rem)] sm:h-[calc(100vh-10rem)]">
        <SheetTitle>Layer Peta</SheetTitle>
        <ScrollArea className="h-full px-4 py-8">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id}>
                <button onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)} className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium">
                  {category.name}
                  {expandedCategory === category.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {expandedCategory === category.id && (
                  <div className="pl-4 mt-2 space-y-2">
                    {category.layers.map(layer => (
                      <label key={layer} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={activeLayers.includes(layer)} onChange={() => onLayerToggle(layer)} className="rounded" />
                        <span>{layer}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

const MapComponent = () => {
  const { firestore } = useFirebase();
  const [map, setMap] = useState<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeBaseLayer, setActiveBaseLayer] = useState<keyof typeof BASE_LAYERS>('satellite');
  const [layerPanelExpanded, setLayerPanelExpanded] = useState(false);

  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [polygons, setPolygons] = useState<MapPolygon[]>([]);
  const [layerCategories, setLayerCategories] = useState<LayerCategory[]>([]);
  const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
  
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const featureLayersRef = useRef<LayerGroup>(L.layerGroup());

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      const mapInstance = L.map(mapContainerRef.current, {
        center: DESA_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        maxBounds: DESA_BOUNDS,
      });
      setMap(mapInstance);
      
      // Cleanup function to remove map on component unmount
      return () => {
        mapInstance.remove();
      };
    }
  }, [mapContainerRef, map]);

  // Handle Base Layer Changes
  useEffect(() => {
    if (map) {
        if (baseLayerRef.current) {
            map.removeLayer(baseLayerRef.current);
        }
        baseLayerRef.current = L.tileLayer(BASE_LAYERS[activeBaseLayer].url, {
            attribution: BASE_LAYERS[activeBaseLayer].attribution
        }).addTo(map);

        if (!map.hasLayer(featureLayersRef.current)) {
          featureLayersRef.current.addTo(map);
        }
    }
  }, [map, activeBaseLayer]);

  // Fetch data from Firestore
  useEffect(() => {
    if (!firestore) return;

    const unsubCategories = onSnapshot(query(collection(firestore, 'tata_ruang_kategori')), (snapshot) => {
        const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LayerCategory));
        setLayerCategories(cats);
        if (cats.length > 0 && cats[0].layers.length > 0 && activeOverlays.length === 0) {
            setActiveOverlays([cats[0].layers[0]]);
        }
    });

    const unsubMarkers = onSnapshot(query(collection(firestore, 'tata_ruang_penanda')), (snapshot) => {
        setMarkers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MapMarker)));
    });

    const unsubPolygons = onSnapshot(query(collection(firestore, 'tata_ruang_poligon')), (snapshot) => {
        setPolygons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MapPolygon)));
    });

    return () => {
        unsubCategories();
        unsubMarkers();
        unsubPolygons();
    };
  }, [firestore, activeOverlays.length]);


  // Update map features when data or active overlays change
  useEffect(() => {
      if (!map) return;
      const featureLayer = featureLayersRef.current;
      featureLayer.clearLayers();

      polygons.forEach(p => {
          if (activeOverlays.includes(p.category)) {
              L.polygon(p.path, p.options).bindPopup(`<b>${p.title}</b><br>${p.description}`).addTo(featureLayer);
          }
      });

      markers.forEach(m => {
          if (activeOverlays.includes(m.category)) {
              L.marker(m.position).bindPopup(`<b>${m.title}</b><br>${m.description}`).addTo(featureLayer);
          }
      });
  }, [map, markers, polygons, activeOverlays]);

  const handleLayerToggle = (layerName: string) => {
    setActiveOverlays(prev =>
      prev.includes(layerName)
        ? prev.filter(l => l !== layerName)
        : [...prev, layerName]
    );
  };

  return (
    <>
      <div id="map" ref={mapContainerRef} className="w-full h-full" />
      <MapControls
        map={map}
        activeBaseLayer={activeBaseLayer}
        setActiveBaseLayer={setActiveBaseLayer}
        onLayerPanelToggle={() => setLayerPanelExpanded(!layerPanelExpanded)}
        layerPanelExpanded={layerPanelExpanded}
      />
      <LayerPanel
        expanded={layerPanelExpanded}
        onToggle={() => setLayerPanelExpanded(!layerPanelExpanded)}
        activeLayers={activeOverlays}
        onLayerToggle={handleLayerToggle}
        categories={layerCategories}
      />
    </>
  );
};

export default MapComponent;
