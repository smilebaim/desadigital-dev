import { Route } from "react-router-dom";
import IndeksPage from "@/pages/Indeks";
import KetahananSosial from "@/pages/indeks/KetahananSosial";
import KetahananEkonomi from "@/pages/indeks/KetahananEkonomi";
import KetahananLingkungan from "@/pages/indeks/KetahananLingkungan";
import KetahananDesa from "@/pages/indeks/KetahananDesa";

export const indeksRoutes = (
  <Route path="/indeks">
    <Route index element={<IndeksPage />} />
    <Route path="ketahanan-sosial" element={<KetahananSosial />} />
    <Route path="ketahanan-ekonomi" element={<KetahananEkonomi />} />
    <Route path="ketahanan-lingkungan" element={<KetahananLingkungan />} />
    <Route path="ketahanan-desa" element={<KetahananDesa />} />
  </Route>
); 