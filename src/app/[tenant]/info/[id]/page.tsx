
import type { Metadata, ResolvingMetadata } from 'next';
import PublicLayout from "@/layouts/PublicLayout";
import { getPost, incrementPostView } from "@/lib/posts-actions";
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: 'Halaman Tidak Ditemukan | DesaHub',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const description = post.content ? post.content.substring(0, 150) + '...' : 'Informasi terbaru dari Pemerintahan Desa.';

  return {
    title: `${post.title} | Info Desa`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: [
        '/logo-desa.png',
        ...previousImages,
      ],
      type: 'article',
      publishedTime: post.createdAt || undefined,
      authors: [post.author || 'Admin Desa'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: ['/logo-desa.png'],
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        notFound();
    }
    
    const post = await getPost(id);
    
    if (!post || post.status !== 'Published') {
        notFound();
    }

    // Increment view count, fire and forget
    incrementPostView(id);

    return (
        <PublicLayout>
             <div className="container mx-auto px-4 py-8 mt-24 mb-20">
                <article className="prose lg:prose-xl max-w-4xl mx-auto">
                    <div className="mb-8 border-b pb-4">
                         <Badge className="mb-4">
                            {post.category}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
                        <p className="text-muted-foreground">
                            Ditulis oleh {post.author} pada {post.createdAt ? new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                        </p>
                    </div>
                    <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                        {post.content}
                    </div>
                </article>
             </div>
        </PublicLayout>
    );
}
