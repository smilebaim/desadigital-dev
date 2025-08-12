import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function VillageInfo() {
  return (
    <section className="py-12 md:py-16">
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline text-foreground/90">
            A Glimpse into Our Village
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="max-w-3xl mx-auto text-center text-lg text-muted-foreground leading-relaxed font-body">
            Remau Bako Tuo is a serene village nestled amidst lush landscapes, where tradition and nature coexist in harmony. Our economy is deeply rooted in agriculture, with vast, vibrant green rice paddies defining our scenery and sustaining our community. The spirit of cooperation and the warmth of our people are the cornerstones of our village life.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
