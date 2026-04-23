import { Skeleton } from '@/components/atoms/Skeleton';

export default function IngredientLoading() {
  return (
    <main className="min-h-screen">
      <header className="px-6 pb-3 pt-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-3 w-10 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-10 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="mt-3 h-11 w-64 rounded-xl" />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-7 w-32 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-6 pt-6">
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Skeleton className="h-10 w-full max-w-sm rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
