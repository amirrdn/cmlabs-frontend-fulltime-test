import type { Metadata } from 'next';
import { mealApi } from '../../../services/api';
import { Button } from '../../../components/atoms/Button';
import { ChevronLeft, MapPin, PlayCircle, Tag, Utensils } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meal = await mealApi.getMealById(id);

  if (!meal) {
    return {
      title: 'Meal Not Found',
      description: 'The requested meal details are not available.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${meal.strMeal} Recipe`;
  const description = `View ingredients, instructions, and video tutorial for ${meal.strMeal}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/meal/${id}`,
    },
    openGraph: {
      title: `${title} | MealFinder`,
      description,
      url: `/meal/${id}`,
      images: meal.strMealThumb ? [{ url: meal.strMealThumb, alt: meal.strMeal }] : undefined,
    },
    twitter: {
      title: `${title} | MealFinder`,
      description,
      images: meal.strMealThumb ? [meal.strMealThumb] : undefined,
    },
  };
}

export default async function MealDetailPage({ params }: Props) {
  const { id } = await params;
  const meal = await mealApi.getMealById(id);

  if (!meal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-gray-900">Meal not found</h1>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing, measure: meas });
    }
  }

  const youtubeId = meal.strYoutube ? new URL(meal.strYoutube).searchParams.get('v') : null;

  return (
    <main className="px-6 py-10 pb-24">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="transition-colors hover:text-teal-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="transition-colors hover:text-teal-600">
              Meals
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">{meal.strMeal}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {meal.strMeal}
            </h1>
            <Link href={`/ingredient/${encodeURIComponent(meal.strIngredient1 || '')}`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-slate-300 text-slate-700 hover:border-slate-800 hover:bg-slate-800 hover:text-white active:bg-slate-900 active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <ChevronLeft size={16} /> Back to Meals
              </Button>
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              <Utensils size={13} />
              {meal.strCategory}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              <MapPin size={13} />
              {meal.strArea}
            </span>
            {meal.strTags && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <Tag size={13} />
                {meal.strTags.split(',')[0]}
              </span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-slate-200">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {youtubeId && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <PlayCircle size={18} />
                  Video Tutorial
                </h2>
                <div className="aspect-video overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-8 lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Recipe Ingredients</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ingredients.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <span className="text-sm font-semibold text-teal-700">{item.measure}</span>
                    <span className="text-sm font-medium text-slate-700">{item.ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Cooking Instructions</h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                {meal.strInstructions.split('\r\n').map((step, i) => (
                  step.trim() && <p key={i}>{step}</p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
