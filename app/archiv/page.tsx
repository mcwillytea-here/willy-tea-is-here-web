import Link from 'next/link';
import Image from 'next/image';
import { EraFilter } from '@/components/archive/era-filter';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface Era {
  id: string;
  title: string;
  description: string;
  year_start: number;
  year_end: number | null;
  albums?: Album[];
}

interface Album {
  id: string;
  era_id: string;
  title: string;
  slug: string;
  cover_url: string;
  release_date: string;
}

// Fallback data v případě chybějící databáze
const mockEras: Era[] = [
  { id: '1', title: 'Techno', description: 'Začátky v temných klubech. 130 BPM a žádný slitování.', year_start: 2005, year_end: 2012 },
  { id: '2', title: 'Dubstep', description: 'Basy, který ti rozklepou kosti. Londýnská škola, žádnej americkej brostep.', year_start: 2012, year_end: 2018 },
  { id: '3', title: 'Rap', description: 'Slova jako zbraň. Cynismus, pravda a žádný metafory.', year_start: 2018, year_end: null },
];

const mockAlbums: Album[] = [
  { id: 'a1', era_id: '1', title: 'Klubový peklo', slug: 'klubovy-peklo', cover_url: 'https://picsum.photos/seed/klubovy-peklo/800/800', release_date: '2008-11-20' },
  { id: 'a2', era_id: '2', title: 'Static Dub', slug: 'static-dub', cover_url: 'https://picsum.photos/seed/static-dub/800/800', release_date: '2015-05-10' },
  { id: 'a3', era_id: '3', title: 'Generace X', slug: 'generace-x', cover_url: 'https://picsum.photos/seed/generace-x/800/800', release_date: '2022-03-15' },
  { id: 'a4', era_id: '3', title: 'Systém je rozbitej', slug: 'system-je-rozbitej', cover_url: 'https://picsum.photos/seed/system/800/800', release_date: '2024-01-01' },
];

async function getErasAndAlbums(genreFilter?: string) {
  let erasData: Era[] = [];
  let albumsData: Album[] = [];
  
  try {
    const { data: dbEras, error: erasError } = await supabase
      .from('eras')
      .select('*')
      .order('year_start', { ascending: false });
      
    const { data: dbAlbums, error: albumsError } = await supabase
      .from('albums')
      .select('*')
      .order('release_date', { ascending: false });
      
    if (dbEras && dbEras.length > 0 && !erasError && !albumsError) {
      erasData = dbEras;
      albumsData = dbAlbums || [];
    } else {
      erasData = mockEras;
      albumsData = mockAlbums;
    }
  } catch (e) {
    erasData = mockEras;
    albumsData = mockAlbums;
  }

  let filteredEras = erasData;
  if (genreFilter && genreFilter !== 'ALL') {
    filteredEras = erasData.filter(e => e.title.toUpperCase() === genreFilter.toUpperCase());
  }

  filteredEras.sort((a, b) => b.year_start - a.year_start);

  return filteredEras.map(era => ({
    ...era,
    albums: albumsData.filter(a => a.era_id === era.id).sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
  }));
}

export default async function ArchivPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const params = await searchParams;
  const genre = params.genre || 'ALL';
  const timelineData = await getErasAndAlbums(genre);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 font-mono">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-8 gap-6">
        <div>
           <h1 className="text-4xl md:text-6xl text-white font-bold tracking-tighter italic uppercase">Archiv</h1>
           <p className="text-zinc-500 mt-2">20 let tvorby. Žádný kompromisy.</p>
        </div>
        <EraFilter currentGenre={genre} />
      </div>
      
      <div className="space-y-16 md:space-y-24">
        {timelineData.length === 0 ? (
          <p className="text-zinc-500 italic">Pre zadaný filter neexistuje žiadny záznam.</p>
        ) : (
          timelineData.map(era => (
            <div key={era.id} className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 md:left-8"></div>
              
              <div className="relative pl-6 md:pl-24">
                 {/* Timeline dot */}
                 <div className="absolute left-[-5px] md:left-[27px] top-2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                 
                 <div className="mb-8">
                   <h2 className="text-2xl md:text-4xl font-bold text-white uppercase italic tracking-tighter mb-2">{era.title}</h2>
                   <div className="text-emerald-500 font-bold text-xs tracking-widest uppercase mb-4">
                     {era.year_start} — {era.year_end || 'SOUČASNOST'}
                   </div>
                   <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm md:text-base border-l-2 border-zinc-800 pl-4">{era.description}</p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {era.albums.map(album => (
                     <Link href={`/archiv/${album.slug}`} key={album.id} className="block group h-full">
                       <div className="p-4 border border-zinc-900 bg-[#050505] hover:bg-zinc-900 transition-colors relative overflow-hidden h-full flex flex-col">
                         <div className="absolute inset-0 bg-emerald-500 mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity"></div>
                         
                         <div className="aspect-square relative border border-zinc-800 mb-4 overflow-hidden">
                           <Image 
                             src={album.cover_url}
                             alt={album.title}
                             fill
                             className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                             referrerPolicy="no-referrer"
                           />
                         </div>
                         
                         <div className="mt-auto">
                           <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1 border-b border-zinc-900 pb-2">
                             RELEASE: {new Date(album.release_date).getFullYear()}
                           </div>
                           <h3 className="text-lg font-bold text-white uppercase tracking-tight mt-2 flex items-center justify-between">
                             {album.title}
                             <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                           </h3>
                         </div>
                       </div>
                     </Link>
                   ))}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
