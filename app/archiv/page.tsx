'use client';

import { useAudioStore } from '@/lib/store/use-audio-store';

const DUMMY_TRACKS = [
  { id: '1', title: 'Generace X (Remaster)', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2760205561.mp3', genre: 'rap' },
  { id: '2', title: 'Klubový peklo', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_145d8b2d18.mp3', genre: 'hardtechno' },
];

export default function ArchivPage() {
  const { playTrack, currentTrack, isPlaying } = useAudioStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-mono">
      <h1 className="text-4xl md:text-6xl text-white font-bold mb-8 tracking-tighter italic uppercase border-b border-zinc-800 pb-4">Archiv</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_TRACKS.map(track => {
          const isThisPlaying = currentTrack?.id === track.id && isPlaying;
          return (
            <div key={track.id} className="p-8 border border-zinc-800 bg-zinc-900 group relative overflow-hidden flex flex-col justify-between aspect-square">
              <div className="absolute inset-0 bg-emerald-500 mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] uppercase font-bold text-zinc-500">[{track.genre}]</span>
                {isThisPlaying && <span className="px-2 py-0.5 border border-emerald-500 text-emerald-500 text-[9px] uppercase font-bold animate-pulse">Playing</span>}
              </div>
              
              <div className="flex flex-col items-center justify-center z-10 flex-1">
                <div className="w-24 h-24 border-2 border-dashed border-zinc-500 flex items-center justify-center mb-6">
                   <div className="w-16 h-16 bg-white opacity-5"></div>
                </div>
                <span className="text-xl md:text-2xl font-bold text-white tracking-widest text-center">{track.title}</span>
              </div>

              <div className="flex gap-2 w-full mt-4 z-10">
                <button 
                  onClick={() => playTrack(track)}
                  className="flex-1 py-3 border border-zinc-700 text-white text-xs font-bold uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                >
                  {isThisPlaying ? '|| PAUSE' : '▶ PLAY'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
