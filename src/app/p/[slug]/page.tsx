import PublicLayout from "@/layouts/PublicLayout";
import { getCustomPageBySlug } from "@/lib/static-pages-actions";
import { notFound } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumb";

export default async function CustomPage({ params }: { params: { slug: string } }) {
    if (!params.slug) {
        notFound();
    }

    const page = await getCustomPageBySlug(params.slug);

    if (!page) {
        notFound();
    }

    return (
        <PublicLayout>
             <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <Breadcrumb items={[{ title: page.title }]} />
                <article className="prose lg:prose-xl max-w-4xl mx-auto">
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{page.title}</h1>
                        {page.createdAt && (
                            <p className="text-muted-foreground">
                                Dibuat pada {new Date(page.createdAt.seconds * 1000).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                    <div
                        className="whitespace-pre-wrap text-foreground/90 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }}
                    />
                </article>
             </div>
        </PublicLayout>
    );
}
