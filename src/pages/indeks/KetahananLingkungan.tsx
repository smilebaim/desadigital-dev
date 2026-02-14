'use client';
import PublicLayout from "@/layouts/PublicLayout";
import IndeksLingkungan from "@/components/charts/IndeksLingkungan";
import Breadcrumb from "@/components/Breadcrumb";

const KetahananLingkungan = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-20">
       <Breadcrumb
        items={[
          { title: "Indeks", path: "/indeks" },
          { title: "Ketahanan Lingkungan" }
        ]}
      />
      <IndeksLingkungan />
    </div>
  );
};

export default KetahananLingkungan;
