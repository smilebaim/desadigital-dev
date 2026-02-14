'use client';
import PublicLayout from "@/layouts/PublicLayout";
import IndeksEkonomi from "@/components/charts/IndeksEkonomi";
import Breadcrumb from "@/components/Breadcrumb";

const KetahananEkonomi = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Indeks", path: "/indeks" },
          { title: "Ketahanan Ekonomi" }
        ]}
      />
      <IndeksEkonomi />
    </div>
  );
};

export default KetahananEkonomi;
