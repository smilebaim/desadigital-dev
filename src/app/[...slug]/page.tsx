import PublicLayout from "@/layouts/PublicLayout";
import { getCustomPageBySlug } from "@/lib/static-pages-actions";
import { notFound } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumb";
import PopulationStatChart from "@/components/charts/PopulationStatChart";
import PendidikanChart from "@/components/charts/PendidikanChart";
import PekerjaanChart from "@/components/charts/PekerjaanChart";
import React from "react";

const CHART_PLACEHOLDERS = {
    '[STATISTIK_PENDUDUK_CHART]': <PopulationStatChart />,
    '[STATISTIK_PENDIDIKAN_CHART]': <PendidikanChart />,
    '[STATISTIK_PEKERJAAN_CHART]': <PekerjaanChart />,
};

// Create a regex to find all placeholders
const allPlaceholders = Object.keys(CHART_PLACEHOLDERS).map(p => p.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).join('|');
const placeholderRegex = new RegExp(`(${allPlaceholders})`, 'g');


export default async function CustomPage({ params }: { params: { slug: string[] } }) {
    if (!params.slug || params.slug.length === 0) {
        notFound();
    }

    const slug = params.slug.join('/');
    const page = await getCustomPageBySlug(slug);

    if (!page) {
        notFound();
    }

    const breadcrumbItems = params.slug.map((segment, index) => {
        const path = `/${params.slug.slice(0, index + 1).join('/')}`;
        // Capitalize first letter
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { title, path: index === params.slug.length - 1 ? undefined : path };
    });

    // Split content by any of the placeholders
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
