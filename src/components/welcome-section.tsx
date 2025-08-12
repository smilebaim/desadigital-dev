import Image from 'next/image';
import { Card } from '@/components/ui/card';

export function WelcomeSection() {
  return (
    <Card id="home" className="relative w-full h-[50vh] min-h-[300px] md:h-[60vh] md:min-h-[400px] flex items-center justify-center text-center overflow-hidden border-0 shadow-xl scroll-mt-20">
      <Image
        src="https://placehold.co/1200x800.png"
        alt="Lush green rice paddies under a clear sky in Remau Bako Tuo"
        data-ai-hint="rice paddies landscape"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      <div className="relative z-10 p-6 text-white">
        <p className="text-xl md:text-2xl font-light text-gray-200 drop-shadow-md font-body">
          Welcome to
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg font-headline mt-1">
          Remau Bako Tuo
        </h1>
      </div>
    </Card>
  );
}
