import PublicLayout from "@/layouts/PublicLayout";
import { getCustomPageBySlug } from "@/lib/static-pages-actions";
import { notFound } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumb";
import PopulationStatChart from "@/components/charts/PopulationStatChart";
import PendidikanChart from "@/components/charts/PendidikanChart";
import PekerjaanChart from "@/components/charts/PekerjaanChart";
import IndeksSosial from "@/components/charts/IndeksSosial";
import IndeksEkonomi from "@/components/charts/IndeksEkonomi";
import IndeksLingkungan from "@/components/charts/IndeksLingkungan";
import VisitorStatChart from "@/components/charts/VisitorStatChart";
import PendapatanDesaChart from "@/components/charts/PendapatanDesaChart";
import BelanjaDesaChart from "@/components/charts/BelanjaDesaChart";
import React from "react";

const CHART_PLACEHOLDERS = {
    '[STATISTIK_PENDUDUK_CHART]': <PopulationStatChart />,
    '[STATISTIK_PENDIDIKAN_CHART]': <PendidikanChart />,
    '[STATISTIK_PEKERJAAN_CHART]': <PekerjaanChart />,
    '[INDEKS_KETAHANAN_SOSIAL]': <IndeksSosial />,
    '[INDEKS_KETAHANAN_EKONOMI]': <IndeksEkonomi />,
    '[INDEKS_KETAHANAN_LINGKUNGAN]': <IndeksLingkungan />,
    '[STATISTIK_PENGUNJUNG_CHART]': <VisitorStatChart />,
    '[DIAGRAM_PENDAPATAN_DESA]': <PendapatanDesaChart />,
    '[DIAGRAM_BELANJA_DESA]': <BelanjaDesaChart />,
};

const allPlaceholders = Object.keys(CHART_PLACEHOLDERS).map(p => p.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).join('|');
const placeholderRegex = new RegExp(`(${allPlaceholders})`, 'g');


export default async function Page() {
    const slug = 'pembangunan/rpjmdes';
    const page = await getCustomPageBySlug(slug);

    if (!page) {
        notFound();
    }

    const breadcrumbItems = slug.split('/').map((segment, index, arr) => {
        const path = `/${arr.slice(0, index + 1).join('/')}`;
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { title, path: index === arr.length - 1 ? undefined : path };
    });

    const contentParts = page.content.split(placeholderRegex).filter(Boolean);

    return (
        <PublicLayout>
             <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <Breadcrumb items={breadcrumbItems} />
                <article className="prose lg:prose-xl max-w-none">
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{page.title}</h1>
                        {page.createdAt && (
                            <p className="text-muted-foreground">
                                Diterbitkan pada {new Date(page.createdAt as string).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                    {contentParts.map((part, index) => {
                       const ChartComponent = (CHART_PLACEHOLDERS as any)[part];
                       if (ChartComponent) {
                           return <React.Fragment key={index}>{ChartComponent}</React.Fragment>;
                       }
                       return (
                           <div
                                key={index}
                                className="whitespace-pre-wrap text-foreground/90 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br />') }}
                           />
                       );
                    })}
                </article>
             </div>
        </PublicLayout>
    );
}
