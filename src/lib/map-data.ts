import { Map, Satellite, Mountain } from 'lucide-react';

export const BASE_LAYERS = {
  street: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap', name: 'Street', icon: Map },
  satellite: { url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', attribution: '&copy; Google', name: 'Satellite', icon: Satellite },
  terrain: { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenTopoMap', name: 'Terrain', icon: Mountain }
};

export const LAYER_CATEGORIES = {
  wilayah: { name: 'Peta Wilayah', layers: ['Peta Administrasi', 'Penggunaan Lahan'] },
  sosial: { name: 'Peta Sosial', layers: ['Demografi', 'Pendidikan', 'Kesehatan'] },
  ekonomi: { name: 'Peta Ekonomi', layers: ['Sektor Pangan', 'Perkebunan', 'Peternakan'] },
  fasilitas: { name: 'Fasilitas', layers: ['Fasilitas Umum', 'Kantor Desa'] },
};
