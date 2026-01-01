import {
  Home,
  History,
  Target,
  Compass,
  Building2,
  FileText,
  ListTodo,
  HeartHandshake,
  MessageSquareWarning,
  BookOpen,
  Scale,
  Handshake,
  Store,
  Users,
  Activity,
  Apple,
  Calendar,
  Library,
  FileSpreadsheet,
  Wallet,
  ChevronRight,
} from "lucide-react";

export const webControlMenuItems = [
    {
      title: "Profil Desa",
      basePath: "profil",
      items: [
        { title: "Profil Desa", slug: "profil-desa", icon: Home },
        { title: "Sejarah Desa", slug: "sejarah-desa", icon: History },
        { title: "Perkembangan", slug: "perkembangan", icon: ChevronRight },
        { title: "Visi dan Misi", slug: "visi-misi", icon: Target },
        { title: "Arah Kebijakan", slug: "arah-kebijakan", icon: Compass },
        { title: "Pemerintahan Desa", slug: "struktur-pemerintah", icon: Building2 },
      ]
    },
    {
      title: "Layanan",
       basePath: "layanan",
      items: [
        { title: "Persuratan", slug: "persuratan", icon: FileText },
        { title: "Perlindungan Sosial", slug: "perlindungan-sosial", icon: HeartHandshake },
        { title: "Penanganan Keluhan", slug: "penanganan-keluhan", icon: MessageSquareWarning },
        { title: "Monografi Desa", slug: "monografi-desa", icon: BookOpen },
        { title: "Peraturan Desa", slug: "peraturan-desa", icon: Scale },
        { title: "Posyandu", slug: "posyandu", icon: Activity },
        { title: "MPG", slug: "mpg", icon: Activity }
      ]
    },
    {
      title: "Ekonomi",
      basePath: "ekonomi",
      items: [
        { title: "BUMDes", slug: "bumdes", icon: Building2 },
        { title: "Koperasi Merah Putih", slug: "koperasi", icon: Handshake },
        { title: "UMKM", slug: "umkm", icon: Store }
      ]
    },
    {
      title: "Kelembagaan",
       basePath: "kelembagaan",
      items: [
        { title: "LKMD", slug: "lkmd", icon: Users },
        { title: "PKK", slug: "pkk", icon: Users },
      ]
    },
    {
      title: "Aktivitas",
       basePath: "aktivitas",
      items: [
        { title: "Kalender Pangan", slug: "kalender-pangan", icon: Apple },
        { title: "Kalender Kegiatan", slug: "kalender-kegiatan", icon: Calendar },
        { title: "Agenda", slug: "agenda", icon: ListTodo }
      ]
    },
    {
      title: "Literasi",
       basePath: "pustaka",
      items: [
        { title: "Pustaka Desa", slug: "pustaka-desa", icon: Library },
        { title: "Publikasi", slug: "publikasi", icon: FileSpreadsheet }
      ]
    },
    {
        title: "Pembangunan",
        basePath: "pembangunan",
        items: [
            { title: "Daftar Program", slug: "daftar-program", icon: ListTodo },
            { title: "RKPDes", slug: "rkpdes", icon: FileText },
            { title: "RPJMDes", slug: "rpjmdes", icon: FileText },
        ]
    },
    {
        title: "Dana Desa",
        basePath: "dana-desa",
        items: [
            { title: "Pendapatan", slug: "pendapatan", icon: Building2 },
            { title: "Belanja", slug: "belanja", icon: Wallet },
            { title: "Pembiayaan", slug: "pembiayaan", icon: Building2 },
        ]
    },
     {
        title: "Indeks Desa",
        basePath: "indeks",
        items: [
            { title: "Ketahanan Sosial", slug: "ketahanan-sosial", icon: HeartHandshake },
            { title: "Ketahanan Ekonomi", slug: "ketahanan-ekonomi", icon: Building2 },
            { title: "Ketahanan Lingkungan", slug: "ketahanan-lingkungan", icon: Compass },
        ]
    }
  ];