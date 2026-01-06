import React from 'react';

interface LayerPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  activeLayers: { [key: string]: boolean };
  onLayerToggle: (layer: string, isActive: boolean) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({ isOpen, onToggle, activeLayers, onLayerToggle }) => {
  return (
    <div className="absolute left-4 top-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 z-10">
      <div 
        className="flex items-center justify-center cursor-pointer mb-4"
        onClick={onToggle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="space-y-3">
          {Object.entries(activeLayers).map(([layer, isActive]) => (
            <div key={layer} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={layer}
                checked={isActive}
                onChange={(e) => onLayerToggle(layer, e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor={layer} className="text-xs font-medium text-gray-700">
                {layer}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(LayerPanel);