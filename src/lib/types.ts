export interface MapFeature {
  id: string;
  title: string;
  description: string;
  type: 'marker' | 'polygon';
  coordinates: string; // For marker: "lat,lng", For polygon: "lat1,lng1;lat2,lng2;..."
  color: string;
  category: string; // Added category field
  createdAt?: any;
  updatedAt?: any;
}
