import { Skeleton } from '@/components/atoms/Skeleton';

export default function Loading() {
  return (
    <div className="px-6 pt-8">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="h-[300px] w-full rounded-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-5 mt-8 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-8 w-64 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <Skeleton className="mb-6 h-12 w-full max-w-2xl rounded-xl" />

        <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
