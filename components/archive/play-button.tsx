'use client';

import { useAudioStore } from '@/lib/store/use-audio-store';

export function PlayButton({ track }: { track: { id: string, title: string, audioUrl: string, coverUrl?: string, genre?: string } }) {
  const { currentTrack, isPlaying, playTrack } = useAudioStore();
  const isThisPlaying = currentTrack?.id === track.id && isPlaying;

  return (
    <button 
      onClick={() => playTrack(track)}
      className="mt-6 px-8 py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-emerald-400 transition-colors inline-block w-full md:w-auto text-center"
    >
      {isThisPlaying ? '|| POZASTAVIT' : '▶ PŘEHRÁT TRACK'}
    </button>
  );
}
