import Link from 'next/link';
import { ChefHat, MapPin } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 py-3 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3 text-xl font-black tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <ChefHat size={18} />
          </span>
          <span>Meal<span className="text-teal-600">Finder</span></span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <MapPin size={14} />
            Service Area
          </span>
          <Link href="/" className="font-semibold text-slate-600 transition-colors hover:text-teal-600">Ingredients</Link>
        </div>
      </div>
    </nav>
  );
};
