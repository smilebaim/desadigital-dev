import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import "@/styles/leaflet-fixes.css";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public Pages
import LandingPage from "@/pages/landing/LandingPage";
import DanaDesa from "@/pages/landing/DanaDesa";
import Pembangunan from "@/pages/landing/Pembangunan";
import TataRuang from "@/pages/landing/TataRuang";
import LoginPage from "@/pages/auth/LoginPage";
import NotFound from "./pages/NotFound";
import Indeks from "@/pages/indeks/Indeks";

// Profile Pages
import ProfilDesa from "@/pages/profile/ProfilDesa";
import SejarahDesa from "@/pages/profile/SejarahDesa";
import Perkembangan from "@/pages/profile/Perkembangan";
import VisiMisi from "@/pages/profile/VisiMisi";
import ArahKebijakan from "@/pages/profile/ArahKebijakan";
import StrukturPemerintah from "@/pages/profile/StrukturPemerintah";
import BiodataPemerintah from "@/pages/profile/BiodataPemerintah";
import StrukturBadan from "@/pages/profile/StrukturBadan";
import BiodataBadan from "@/pages/profile/BiodataBadan";

// Pembangunan Pages
import RKPDes from "@/pages/pembangunan/RKPDes";
import RPJMDes from "@/pages/pembangunan/RPJMDes";
import DaftarProgram from "@/pages/pembangunan/DaftarProgram";
import IDM from "@/pages/pembangunan/IDM";
import KetahananDesa from "@/pages/pembangunan/KetahananDesa";
import KetahananEkonomi from "@/pages/pembangunan/KetahananEkonomi";
import KetahananLingkungan from "@/pages/pembangunan/KetahananLingkungan";
import KetahananSosial from "@/pages/pembangunan/KetahananSosial";
import SDGs from "@/pages/pembangunan/SDGs";
import Belanja from "@/pages/pembangunan/Belanja";
import Pembiayaan from "@/pages/pembangunan/Pembiayaan";
import Pendapatan from "@/pages/pembangunan/Pendapatan";

// Layanan Pages
import Persuratan from "@/pages/layanan/Persuratan";
import PerlindunganSosial from "@/pages/layanan/PerlindunganSosial";
import PenangananKeluhan from "@/pages/layanan/PenangananKeluhan";
import MonografiDesa from "@/pages/layanan/MonografiDesa";
import PeraturanDesa from "@/pages/layanan/PeraturanDesa";
import BUMDes from "@/pages/ekonomi/BUMDes";
import Koperasi from "@/pages/ekonomi/Koperasi";
import UMKM from "@/pages/ekonomi/UMKM";
import LKMD from "@/pages/kelembagaan/LKMD";
import PKK from "@/pages/kelembagaan/PKK";
import Posyandu from "@/pages/kesehatan/Posyandu";
import MPG from "@/pages/kesehatan/MPG";

// Informasi Pages
import KalenderPangan from "@/pages/informasi/KalenderPangan";
import KalenderKegiatan from "@/pages/informasi/KalenderKegiatan";
import Agenda from "@/pages/informasi/Agenda";
import PustakaDesa from "@/pages/informasi/PustakaDesa";
import Publikasi from "@/pages/informasi/Publikasi";

// Dashboard Pages
import DashboardHome from "@/pages/dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "dana-desa", element: <DanaDesa /> },
      { path: "profil", element: <ProfilDesa /> },
      { path: "pembangunan", element: <Pembangunan /> },
      { path: "indeks", element: <Indeks /> },
      { path: "tata-ruang", element: <TataRuang /> },
      // Profile Routes
      { path: "profil/profil-desa", element: <ProfilDesa /> },
      { path: "profil/sejarah-desa", element: <SejarahDesa /> },
      { path: "profil/perkembangan", element: <Perkembangan /> },
      { path: "profil/visi-misi", element: <VisiMisi /> },
      { path: "profil/arah-kebijakan", element: <ArahKebijakan /> },
      { path: "profil/struktur-pemerintah", element: <StrukturPemerintah /> },
      { path: "profil/biodata-pemerintah", element: <BiodataPemerintah /> },
      { path: "profil/struktur-badan", element: <StrukturBadan /> },
      { path: "profil/biodata-badan", element: <BiodataBadan /> },
      // Pembangunan Routes
      { path: "pembangunan/rkpdes", element: <RKPDes /> },
      { path: "pembangunan/rpjmdes", element: <RPJMDes /> },
      { path: "pembangunan/daftar-program", element: <DaftarProgram /> },
      // Danadesa Routes
      { path: "dana-desa/belanja", element: <Belanja /> },
      { path: "dana-desa/pembiayaan", element: <Pembiayaan /> },
      { path: "dana-desa/pendapatan", element: <Pendapatan /> },
     // indeks Routes
      { path: "indeks/idm", element: <IDM /> },
      { path: "indeks/ketahanan-desa", element: <KetahananDesa /> },
      { path: "indeks/ketahanan-ekonomi", element: <KetahananEkonomi /> },
      { path: "indeks/ketahanan-lingkungan", element: <KetahananLingkungan /> },
      { path: "indeks/ketahanan-sosial", element: <KetahananSosial /> },
      { path: "indeks/sdgs", element: <SDGs /> },
      // Layanan Routes
      { path: "layanan/persuratan", element: <Persuratan /> },
      { path: "layanan/perlindungan-sosial", element: <PerlindunganSosial /> },
      { path: "layanan/penanganan-keluhan", element: <PenangananKeluhan /> },
      { path: "layanan/monografi-desa", element: <MonografiDesa /> },
      { path: "layanan/peraturan-desa", element: <PeraturanDesa /> },
      { path: "layanan/posyandu", element: <Posyandu /> },
      { path: "layanan/mpg", element: <MPG /> },
      // Ekonomi Routes  
      { path: "ekonomi/bumdes", element: <BUMDes /> },
      { path: "ekonomi/koperasi", element: <Koperasi /> },
      { path: "ekonomi/umkm", element: <UMKM /> },
      // kelembagaa Routes       
      { path: "kelembagaan/lkmd", element: <LKMD /> },
      { path: "kelembagaan/pkk", element: <PKK /> },
      // aktivitas Routes
      { path: "aktivitas/kalender-pangan", element: <KalenderPangan /> },
      { path: "aktivitas/kalender-kegiatan", element: <KalenderKegiatan /> },
      { path: "aktivitas/agenda", element: <Agenda /> },
      // pustaka Routes
      { path: "pustaka/pustaka-desa", element: <PustakaDesa /> },
      { path: "pustaka/publikasi", element: <Publikasi /> },
      // ... rest of your routes ...
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "penduduk", element: (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Data Penduduk</h1>
          <p>Halaman ini akan menampilkan data penduduk desa.</p>
        </div>
      ) },
      { path: "berita", element: (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Kelola Berita</h1>
          <p>Halaman ini untuk mengelola berita desa.</p>
        </div>
      ) },
      { path: "statistik", element: (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Statistik Desa</h1>
          <p>Halaman ini menampilkan statistik desa.</p>
        </div>
      ) },
      { path: "pengaturan", element: (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
          <p>Halaman pengaturan website desa.</p>
        </div>
      ) },
      { path: "profil", element: (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Profil Admin</h1>
          <p>Halaman untuk mengelola profil admin.</p>
        </div>
      ) }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
], {
  future: {
    v7_relativeSplatPath: true
  }
});

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
