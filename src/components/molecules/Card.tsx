'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock3, Star } from 'lucide-react';

interface CardProps {
  title: string;
  image?: string;
  description?: string;
  onClick?: () => void;
  variant?: 'ingredient' | 'meal';
  meta?: {
    rating: string;
    eta: string;
    promo?: string;
  };
}

export const Card = ({ title, image, description, onClick, variant = 'ingredient', meta }: CardProps) => {
  return (
    <motion.div 
      className={`group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg flex h-full flex-col ${
        variant === 'ingredient' ? 'min-h-[140px]' : ''
      }`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {variant === 'ingredient' ? (
        <div className="relative h-full min-h-[140px]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full min-h-[140px] items-center justify-center bg-gray-100 text-2xl font-black text-gray-500">
              {title.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h3 className="line-clamp-2 text-center text-xl font-bold text-white drop-shadow-sm">
              {title}
            </h3>
          </div>
        </div>
      ) : (
        <>
          {image && (
            <div className="relative h-36 w-full overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
              <div className="absolute left-2 top-2 flex items-center gap-2">
                {meta?.promo && (
                  <span className="rounded-md bg-teal-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {meta.promo}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-slate-700">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {meta?.rating ?? '4.7'}
                </span>
              </div>
              <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-slate-900/85 px-2 py-1 text-[10px] font-semibold text-white">
                <Clock3 size={11} />
                {meta?.eta ?? '20-30 min'}
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="line-clamp-2 text-center text-2xl font-semibold text-white drop-shadow-sm">
                  {title}
                </h3>
              </div>
            </div>
          )}
          {!image && (
            <div className="flex grow flex-col gap-1 p-5">
              <h3 className="text-center text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                {title}
              </h3>
              {description && (
                <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};
