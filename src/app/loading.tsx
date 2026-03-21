import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl animate-in fade-in duration-500">
      <div className="space-y-8">
        {/* Banner Skeleton */}
        <Skeleton className="h-[250px] md:h-[400px] w-full rounded-3xl bg-gray-200/60" />
        
        {/* Title Skeleton */}
        <div className="space-y-3 flex flex-col items-center justify-center text-center">
          <Skeleton className="h-10 w-3/4 md:w-1/2 bg-gray-200/80 rounded-lg" />
          <Skeleton className="h-5 w-1/3 bg-gray-200/60 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 pt-6 max-w-4xl mx-auto">
          <Skeleton className="h-4 w-full bg-gray-200/60" />
          <Skeleton className="h-4 w-[95%] bg-gray-200/60" />
          <Skeleton className="h-4 w-[98%] bg-gray-200/60" />
          <Skeleton className="h-4 w-[90%] bg-gray-200/60" />
          <Skeleton className="h-4 w-[85%] bg-gray-200/60" />
          <div className="py-2" />
          <Skeleton className="h-4 w-full bg-gray-200/60" />
          <Skeleton className="h-4 w-[92%] bg-gray-200/60" />
        </div>
      </div>
    </div>
  );
}
