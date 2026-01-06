import React from 'react';
import { Button } from "@/components/ui/button";
import { Map, Sun, Moon, Map as MapIcon, Satellite } from "lucide-react";
import { useMap } from 'react-leaflet';

interface MapControlsProps {
  isOpen: boolean;
  onToggle: () => void;
  mapType: 'satellite' | 'roadmap';
  onMapTypeChange: (type: 'satellite' | 'roadmap') => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  className?: string;
}

const MapControls: React.FC<MapControlsProps> = ({
  isOpen,
  onToggle,
  mapType,
  onMapTypeChange,
  darkMode,
  onDarkModeToggle,
  className
}) => {
  return (
    <div className={`absolute z-20 pointer-events-auto ${className || ''}`}>
      <div
        className="flex items-center justify-center cursor-pointer w-12 h-12 bg-transparent border border-white/10 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-100 shadow-lg hover:bg-black/10 transition-all duration-300 rounded-lg"
        onClick={onToggle}
      >
        <Map className="h-6 w-6 text-white" />
      </div>
      
      {isOpen && (
        <div className="absolute left-[4.5rem] top-0 flex flex-row gap-1 animate-in slide-in-from-left-2 duration-200">
          <div
            className={`flex items-center justify-center cursor-pointer w-12 h-12 ${mapType === 'roadmap' ? 'bg-black/10' : 'bg-transparent'} border border-white/10 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-100 shadow-lg hover:bg-black/10 transition-all duration-300 rounded-lg`}
            onClick={() => onMapTypeChange('roadmap')}
          >
            <MapIcon className="h-6 w-6 text-white" />
          </div>
          
          <div
            className={`flex items-center justify-center cursor-pointer w-12 h-12 ${mapType === 'satellite' ? 'bg-black/10' : 'bg-transparent'} border border-white/10 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-100 shadow-lg hover:bg-black/10 transition-all duration-300 rounded-lg`}
            onClick={() => onMapTypeChange('satellite')}
          >
            <Satellite className="h-6 w-6 text-white" />
          </div>

          <div
            className="flex items-center justify-center cursor-pointer w-12 h-12 bg-transparent border border-white/10 backdrop-blur-md backdrop-saturate-150 backdrop-brightness-100 shadow-lg hover:bg-black/10 transition-all duration-300 rounded-lg"
            onClick={onDarkModeToggle}
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-white" />
            ) : (
              <Moon className="h-6 w-6 text-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MapControls); 