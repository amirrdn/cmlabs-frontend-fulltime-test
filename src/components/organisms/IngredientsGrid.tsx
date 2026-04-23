'use client';

import { useMemo, useState } from 'react';
import { Ingredient } from '../../services/api';
import { SearchBar } from '../molecules/SearchBar';
import { Card } from '../molecules/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface GridProps {
  items: Ingredient[];
}

const HOME_LIMIT = 24;

export const IngredientsGrid = ({ items }: GridProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.strIngredient.toLowerCase().includes(search.toLowerCase())
      ),
    [items, search]
  );

  const displayedItems = useMemo(() => {
    if (search.trim()) {
      return filteredItems;
    }
    return filteredItems.slice(0, HOME_LIMIT);
  }, [filteredItems, search]);
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="container mx-auto max-w-6xl px-6">
      <div className="mb-5 mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ingredients</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Popular Ingredients
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
          {search.trim() ? `${filteredItems.length} matched` : `${HOME_LIMIT} shown`}
        </span>
      </div>

      <SearchBar value={search} onChange={handleSearchChange} placeholder="Search ingredients (e.g. Chicken, Tomato)..." />

      <div className="grid grid-cols-1 gap-5 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {displayedItems.map((item) => (
            <motion.div
              key={item.idIngredient}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                title={item.strIngredient}
                image={
                  item.strThumb ||
                  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
                    item.strIngredient.toLowerCase()
                  )}.png`
                }
                description={item.strDescription || 'No description available.'}
                onClick={() => router.push(`/ingredient/${encodeURIComponent(item.strIngredient)}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!search.trim() && filteredItems.length > HOME_LIMIT && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm text-slate-500">
          <p>
            Showing {HOME_LIMIT} of {filteredItems.length} ingredients. Use search to see more.
          </p>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-6 py-14 text-center">
          <p className="text-xl font-semibold text-gray-700">No ingredients found</p>
          <p className="mt-2 text-gray-500">
            We could not find results for &quot;{search}&quot;. Try another keyword.
          </p>
        </div>
      )}
    </div>
  );
};
