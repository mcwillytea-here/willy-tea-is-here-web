'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const GENRES = ['ALL', 'TECHNO', 'DUBSTEP', 'RAP'];

export function EraFilter({ currentGenre }: { currentGenre: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilter = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (genre === 'ALL') {
      params.delete('genre');
    } else {
      params.set('genre', genre);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map(genre => {
        const isActive = currentGenre.toUpperCase() === genre;
        return (
          <button
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest transition-colors border ${
              isActive 
                ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white'
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
