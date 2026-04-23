import type { Metadata } from 'next';
import { mealApi } from '../../../services/api';
import { MealsGrid } from '../../../components/organisms/MealsGrid';
import { ChevronRight, Flame, MapPin, Sparkles } from 'lucide-react';
import { Suspense } from 'react';
import Link from 'next/link';

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const label = `${decodedName} Meals`;

  return {
    title: label,
    description: `Browse meal ideas and recipes using ${decodedName} as the main ingredient.`,
    alternates: {
      canonical: `/ingredient/${encodeURIComponent(decodedName)}`,
    },
    openGraph: {
      title: `${label} | MealFinder`,
      description: `Browse meal ideas and recipes using ${decodedName} as the main ingredient.`,
      url: `/ingredient/${encodeURIComponent(decodedName)}`,
    },
    twitter: {
      title: `${label} | MealFinder`,
      description: `Browse meal ideas and recipes using ${decodedName} as the main ingredient.`,
    },
  };
}

export default async function IngredientDetailPage({ params }: Props) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const meals = await mealApi.getMealsByIngredient(decodedName);

  return (
    <main className="min-h-screen">
      <header className="px-6 pb-3 pt-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="transition-colors hover:text-teal-600">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/" className="transition-colors hover:text-teal-600">
              Meals
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-700">By Ingredient</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-5 py-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              Meal Results
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {decodedName} Meals
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <Flame size={13} />
                {meals.length} meals found
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <MapPin size={13} />
                Nearby favorites style
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <Sparkles size={13} />
                Curated picks
              </span>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading meals...</div>}>
        <MealsGrid items={meals} />
      </Suspense>
    </main>
  );
}
