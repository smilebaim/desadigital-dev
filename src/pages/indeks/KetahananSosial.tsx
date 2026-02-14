'use client';
import PublicLayout from "@/layouts/PublicLayout";
import IndeksSosial from "@/components/charts/IndeksSosial";
import Breadcrumb from "@/components/Breadcrumb";

const KetahananSosial = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Indeks", path: "/indeks" },
          { title: "Ketahanan Sosial" }
        ]}
      />
        <IndeksSosial />
    </div>
  );
};

export default KetahananSosial;
