import type { Metadata } from 'next';
import { mealApi } from '../services/api';
import { IngredientsGrid } from '../components/organisms/IngredientsGrid';
import { Suspense } from 'react';
import Loading from './loading';
import { Clock3, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Browse popular ingredients and find meals quickly with smart search.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home | MealFinder',
    description: 'Browse popular ingredients and find meals quickly with smart search.',
    url: '/',
  },
  twitter: {
    title: 'Home | MealFinder',
    description: 'Browse popular ingredients and find meals quickly with smart search.',
  },
};

export default async function HomePage() {
  const ingredients = await mealApi.getIngredients();

  return (
    <main className="min-h-screen">
      <section className="px-6 pt-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 px-8 py-12 shadow-sm md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
            Discover Meals
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
            Find Recipes by Ingredient
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            Browse ingredients, explore meal ideas, and open complete recipe details in seconds.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              <Store size={16} />
              800+ ingredients listed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              <Clock3 size={16} />
              Fast ingredient search
            </span>
          </div>
        </div>
      </section>

      <Suspense fallback={<Loading />}>
        <IngredientsGrid items={ingredients} />
      </Suspense>
    </main>
  );
}
