
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";
import BelanjaDesaChart from "@/components/charts/BelanjaDesaChart";
import { FileText, Goal, Briefcase, DollarSign } from "lucide-react";

const rpjmdesData = {
    info: {
        deskripsi: "Rencana Pembangunan Jangka Menengah Desa (RPJMDes) adalah dokumen perencanaan strategis untuk periode enam tahunan yang menjadi acuan utama dalam pembangunan desa. Dokumen ini disusun secara partisipatif dengan melibatkan seluruh elemen masyarakat untuk menggali potensi, mengidentifikasi masalah, dan merumuskan program prioritas.",
        periode: "2021-2026",
        dasarHukum: "Peraturan Desa No. 1 Tahun 2021"
    },
    visi: "Terwujudnya Desa Remau Bako Tuo yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa",
    misi: [
        "Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan yang merata dan terjangkau.",
        "Mengembangkan potensi ekonomi lokal berbasis pertanian, perikanan, dan pariwisata secara berkelanjutan.",
        "Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, profesional, dan partisipatif.",
        "Meningkatkan kuantitas dan kualitas infrastruktur dasar yang mendukung aktivitas sosial dan ekonomi.",
        "Melestarikan dan mengembangkan nilai-nilai budaya, adat istiadat, serta kearifan lokal.",
    ],
    programStrategis: [
        { bidang: "Penyelenggaraan Pemerintahan Desa", contoh: "Peningkatan kapasitas perangkat desa, digitalisasi layanan administrasi." },
        { bidang: "Pelaksanaan Pembangunan Desa", contoh: "Pembangunan jalan usaha tani, normalisasi drainase, pembangunan sarana air bersih." },
        { bidang: "Pembinaan Kemasyarakatan Desa", contoh: "Pembinaan Karang Taruna, PKK, dan lembaga adat." },
        { bidang: "Pemberdayaan Masyarakat Desa", contoh: "Pelatihan UMKM, pengembangan BUMDes, program ketahanan pangan." },
    ]
};

const RPJMDes = () => {
    return (
        <div className="container mx-auto px-4 py-8 mt-16 mb-20">
            <Breadcrumb
                items={[
                { title: "Pembangunan", path: "#" },
                { title: "RPJMDes" }
                ]}
            />
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Rencana Pembangunan Jangka Menengah Desa (RPJMDes)</h2>
                    <p className="text-muted-foreground">
                        Arah dan Kebijakan Pembangunan Desa 6 Tahun ke Depan
                    </p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Dokumen RPJMDes {rpjmdesData.info.periode}</CardTitle>
                            <CardDescription>Landasan Pembangunan Jangka Menengah</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{rpjmdesData.info.deskripsi}</p>
                        <p className="text-sm"><strong>Dasar Hukum:</strong> {rpjmdesData.info.dasarHukum}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Goal className="h-5 w-5 text-primary" />
                            Visi & Misi Desa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Visi</h3>
                            <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
                                “{rpjmdesData.visi}”
                            </blockquote>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg mb-2">Misi</h3>
                            <ul className="list-decimal space-y-2 pl-5">
                                {rpjmdesData.misi.map((item, index) => (
                                    <li key={index} className="text-muted-foreground">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Briefcase className="h-5 w-5 text-primary" />
                            Program Strategis Berdasarkan Bidang
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {rpjmdesData.programStrategis.map((program, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h4 className="font-semibold">{program.bidang}</h4>
                                <p className="text-sm text-muted-foreground mt-1">Contoh Program: {program.contoh}</p>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="pt-4">
                     <BelanjaDesaChart />
                </div>
            </div>
        </div>
    );
};

export default RPJMDes;
