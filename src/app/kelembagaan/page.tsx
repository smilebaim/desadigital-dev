import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLandingPage } from "@/lib/landing-pages-actions";
import DynamicIcon from "@/components/DynamicIcon";

export default async function KelembagaanPage() {
  const pageData = await getLandingPage('kelembagaan');

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8 mt-24 mb-20">
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{pageData.title}</h2>
                <p className="text-muted-foreground">
                    {pageData.subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageData.links.map(link => (
                    <Link key={link.href} href={link.href} className="block group">
                        <Card className="h-full transition-all group-hover:shadow-md group-hover:-translate-y-1">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        {link.icon && <DynamicIcon name={link.icon} className="h-6 w-6 text-primary" />}
                                        {link.title}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </CardTitle>
                            </CardHeader>
                            {link.description && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                </CardContent>
                            )}
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </PublicLayout>
  );
}
