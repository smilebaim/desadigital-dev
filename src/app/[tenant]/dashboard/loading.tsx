import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-[250px] bg-emerald-100/50 mb-2 rounded-md" />
          <Skeleton className="h-4 w-[350px] bg-gray-200/50 rounded-md" />
        </div>
        <Skeleton className="h-10 w-[140px] bg-emerald-100/50 rounded-lg shrink-0" />
      </div>
      
      {/* Metrics Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[100px] bg-gray-200/80 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full bg-emerald-100/50" />
            </div>
            <Skeleton className="h-8 w-[80px] bg-gray-200/80 rounded-md" />
            <Skeleton className="h-3 w-[120px] bg-gray-100 rounded-sm" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="pt-4 grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-4">
          <Skeleton className="h-[400px] w-full rounded-2xl bg-gray-100/80 border border-gray-100" />
        </div>
        <div className="md:col-span-3 space-y-4">
          <Skeleton className="h-[400px] w-full rounded-2xl bg-gray-100/80 border border-gray-100" />
        </div>
      </div>
    </div>
  );
}
