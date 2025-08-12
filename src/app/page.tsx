import { WelcomeSection } from '@/components/welcome-section';
import { VillageInfo } from '@/components/village-info';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 pt-6 md:pt-10">
          <WelcomeSection />
          <div id="info">
            <VillageInfo />
          </div>
          <Separator className="my-8 md:my-12" />
          <div id="gallery" className="text-center py-8">
             <Card className="bg-transparent border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline text-foreground/90">Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">Our gallery is coming soon. Stay tuned for beautiful moments from our village.</p>
                </CardContent>
             </Card>
          </div>
          <Separator className="my-8 md:my-12" />
           <div id="contact" className="text-center py-8">
             <Card className="bg-transparent border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-3xl md:text-4xl font-headline text-foreground/90">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">Want to get in touch? Our contact information will be available here shortly.</p>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
