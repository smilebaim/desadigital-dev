import { useEffect } from 'react';
import { mapAnalytics } from '@/utils/analytics';

export const useMapAnalytics = (
  isLoaded: boolean,
  loadError: Error | undefined,
  useFallbackMap: boolean
) => {
  // Track map load
  useEffect(() => {
    if (isLoaded) {
      mapAnalytics.trackEvent({
        type: 'load',
        details: {
          timestamp: Date.now(),
          mapProvider: 'google'
        }
      });
    }
  }, [isLoaded]);

  // Track errors
  useEffect(() => {
    if (loadError) {
      mapAnalytics.trackEvent({
        type: 'error',
        details: {
          timestamp: Date.now(),
          mapProvider: 'google',
          error: loadError.message
        }
      });
    }
  }, [loadError]);

  const trackLayerToggle = (layerName: string) => {
    mapAnalytics.trackEvent({
      type: 'layer_toggle',
      details: {
        timestamp: Date.now(),
        mapProvider: useFallbackMap ? 'leaflet' : 'google',
        layerName
      }
    });
  };

  const trackMapTypeChange = (mapType: string) => {
    mapAnalytics.trackEvent({
      type: 'map_type_change',
      details: {
        timestamp: Date.now(),
        mapProvider: useFallbackMap ? 'leaflet' : 'google',
        mapType
      }
    });
  };

  const trackInteraction = () => {
    mapAnalytics.trackEvent({
      type: 'interaction',
      details: {
        timestamp: Date.now(),
        mapProvider: useFallbackMap ? 'leaflet' : 'google'
      }
    });
  };

  return {
    trackLayerToggle,
    trackMapTypeChange,
    trackInteraction
  };
};

export default useMapAnalytics; 