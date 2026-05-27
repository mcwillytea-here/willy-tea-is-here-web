import { Metadata } from 'next';
import { LyricsInteractive } from '@/components/archive/lyrics-interactive';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

// Fake fetch simulation since Supabase is not fully populated yet
const mockTrackData = {
  title: 'Generace X (Remaster)',
  slug: 'generace-x',
  cover_url: 'https://picsum.photos/seed/generacex/800/800',
  description: 'Je to krev, pot a pravda. Generace X remaster rve uši všem pozérům.',
  audio_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2760205561.mp3',
  lyrics: [
    { id: 'l1', text: "Vstal jsem z postele, další den je stejnej jako včera", note: null },
    { id: 'l2', text: "Sledujete influencery s mozkem o velikosti hrachu", note: "Sledujete jenom ty prázdný schránky. Žádná hloubka, jen swipe, swipe a mrtvej pohled do prázdna." },
    { id: 'l3', text: "Tvoje startupy jsou jenom pyramidy v novým kabátě", note: null },
    { id: 'l4', text: "A systém nás krmí práškama, abychom drželi hubu", note: "Celá farmaceutická mašinérie je navržená tak, aby z nás udělala poslušný ovečky. Já nespím, analyzuju." },
  ]
};

async function getTrackDetails(slug: string) {
  // Simulace fetchování ze Supabase 
  if (slug === 'generace-x' || slug === 'klubovy-peklo') {
    return {
      ...mockTrackData,
      title: slug === 'klubovy-peklo' ? 'Klubový peklo' : 'Generace X (Remaster)',
      slug: slug,
      cover_url: `https://picsum.photos/seed/${slug}/800/800`
    };
  }
  return mockTrackData; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const track = await getTrackDetails(slug);
  
  if (!track) {
    return { title: 'Track Not Found' };
  }

  return {
    title: `${track.title} | Underground Archive`,
    description: track.description,
    openGraph: {
      title: `Poslouchej: ${track.title}`,
      description: track.description,
      images: [
        {
          url: track.cover_url,
          width: 800,
          height: 800,
          alt: `Cover pro track ${track.title}`,
        },
      ],
      type: 'music.song',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Poslouchej: ${track.title}`,
      description: track.description,
      images: [track.cover_url],
    },
  };
}

export default async function TrackDetail({ params }: Props) {
  const slug = (await params).slug;
  const track = await getTrackDetails(slug);

  if (!track) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 font-mono">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16">
        <div className="w-full md:w-1/3 aspect-square relative border-2 border-zinc-900 overflow-hidden group">
           <div className="absolute inset-0 bg-emerald-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
           <Image 
             src={track.cover_url} 
             alt={track.title} 
             fill
             className="object-cover grayscale group-hover:grayscale-0 transition-duration-700"
             referrerPolicy="no-referrer"
           />
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-[0.2em] block mb-4">// DEKRYPTOVANÝ ZÁZNAM</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter uppercase italic leading-none">{track.title}</h1>
            <p className="text-zinc-500 max-w-lg leading-relaxed text-sm">
              Klikni na podtržené rýmy pro zobrazení mýho breakdownu. Kdo nečte mezi řádky, ten radši ať neposlouchá.
            </p>
        </div>
      </div>
      
      <div className="border-t border-zinc-900 pt-16">
        <LyricsInteractive lines={track.lyrics} />
      </div>
    </div>
  );
}
