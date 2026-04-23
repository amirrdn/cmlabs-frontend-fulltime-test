'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MealSummary } from '../../services/api';
import { Card } from '../molecules/Card';
import { useRouter } from 'next/navigation';
import { ArrowUpDown, Search, SlidersHorizontal } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Skeleton } from '../atoms/Skeleton';

interface GridProps {
  items: MealSummary[];
}

const CARD_HEIGHT = 144;
const GRID_GAP = 16;

const getMealMeta = (idMeal: string) => {
  const numeric = Number(idMeal) || 0;
  const rating = (4.2 + (numeric % 8) * 0.1).toFixed(1);
  const etaStart = 15 + (numeric % 4) * 5;
  const etaEnd = etaStart + 10;
  const promo = numeric % 3 === 0 ? 'Free Delivery' : numeric % 5 === 0 ? '20% Off' : undefined;

  return {
    rating,
    eta: `${etaStart}-${etaEnd} min`,
    promo,
  };
};

export const MealsGrid = ({ items }: GridProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [columnCount, setColumnCount] = useState(4);
  const search = useDebouncedValue(searchInput, 280);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const isSearching = searchInput !== search;

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.strMeal.toLowerCase().includes(search.toLowerCase())
      ),
    [items, search]
  );

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 640) {
        setColumnCount(1);
      } else if (window.innerWidth < 768) {
        setColumnCount(2);
      } else if (window.innerWidth < 1024) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  useEffect(() => {
    parentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [search, columnCount]);

  const rowCount = Math.ceil(filteredItems.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + GRID_GAP,
    overscan: 4,
  });

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-6">
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="relative w-full max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search meals by name"
              className="h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-500"
            />
          </label>
          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            <ArrowUpDown size={14} />
            {isSearching ? 'Updating...' : `${filteredItems.length} meals`}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            <SlidersHorizontal size={12} />
            Recommended
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Fast delivery
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Top rated
          </span>
        </div>
      </div>

      {isSearching && (
        <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!isSearching && filteredItems.length === 0 && (
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-14 text-center">
          <p className="text-xl font-semibold text-gray-700">No meals found</p>
          <p className="mt-2 text-gray-500">
            We could not find results for &quot;{searchInput}&quot;. Try another keyword.
          </p>
        </div>
      )}

      {!isSearching && filteredItems.length > 0 && (
        <div ref={parentRef} className="h-[70vh] overflow-auto pb-6">
          <div
            className="relative"
            style={{
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columnCount;
              const rowItems = filteredItems.slice(startIndex, startIndex + columnCount);

              return (
                <div
                  key={virtualRow.key}
                  className="absolute left-0 top-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: virtualRow.size,
                  }}
                >
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                    }}
                  >
                    {rowItems.map((item) => (
                      <div key={item.idMeal} className="rounded-2xl">
                        <Card
                          variant="meal"
                          title={item.strMeal}
                          image={item.strMealThumb}
                          meta={getMealMeta(item.idMeal)}
                          onClick={() => router.push(`/meal/${item.idMeal}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
