interface MapEvent {
  type: 'load' | 'error' | 'interaction' | 'layer_toggle' | 'map_type_change';
  details: {
    timestamp: number;
    mapProvider: 'google' | 'leaflet';
    error?: string;
    layerName?: string;
    mapType?: string;
  };
}

class MapAnalytics {
  private events: MapEvent[] = [];
  private readonly MAX_EVENTS = 100;

  trackEvent(event: MapEvent) {
    this.events.push(event);
    if (this.events.length > this.MAX_EVENTS) {
      this.events.shift();
    }
    this.persistEvents();
  }

  private persistEvents() {
    try {
      localStorage.setItem('map_analytics', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to persist analytics:', error);
    }
  }

  getEvents(): MapEvent[] {
    try {
      const stored = localStorage.getItem('map_analytics');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve analytics:', error);
      return [];
    }
  }

  clearEvents() {
    this.events = [];
    localStorage.removeItem('map_analytics');
  }

  getErrorRate(): number {
    const errors = this.events.filter(e => e.type === 'error').length;
    return errors / this.events.length;
  }

  getMostUsedLayer(): string | null {
    const layerEvents = this.events.filter(e => e.type === 'layer_toggle');
    if (layerEvents.length === 0) return null;

    const layerCounts = layerEvents.reduce((acc, event) => {
      const layerName = event.details.layerName;
      if (layerName) {
        acc[layerName] = (acc[layerName] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(layerCounts)
      .sort(([, a], [, b]) => b - a)[0][0];
  }
}

export const mapAnalytics = new MapAnalytics(); 