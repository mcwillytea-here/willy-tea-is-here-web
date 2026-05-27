'use client';

import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/lib/store/use-audio-store';
import { motion, AnimatePresence } from 'motion/react';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    currentTime, 
    duration,
    togglePlayPause, 
    setVolume,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    isHydrated,
    setHydrated
  } = useAudioStore();

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  useEffect(() => {
    if (audioRef.current && isHydrated) {
      audioRef.current.volume = volume;
    }
  }, [volume, isHydrated]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack?.id, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement || 
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'KeyM':
          e.preventDefault();
          if (audioRef.current) {
            setVolume(audioRef.current.volume === 0 ? 1 : 0);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (audioRef.current) {
            const nextTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
            audioRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (audioRef.current) {
            const prevTime = Math.max(0, audioRef.current.currentTime - 5);
            audioRef.current.currentTime = prevTime;
            setCurrentTime(prevTime);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, setVolume, setCurrentTime]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!isHydrated) return null;

  return (
    <>
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-zinc-950 border-t border-zinc-800 px-4 md:px-8 flex items-center gap-4 md:gap-10 font-mono"
          >
            <div className="flex items-center gap-4 min-w-[150px] md:min-w-[200px]">
              <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                <div className={`w-2 h-2 bg-emerald-500 ${isPlaying ? 'animate-ping' : ''}`}></div>
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white leading-none mb-1 truncate">{currentTrack.title}</div>
                <div className="text-[10px] text-zinc-500 truncate">{currentTrack.genre || 'Underground Audio'}</div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 flex-col">
              <div className="flex justify-between text-[9px] text-zinc-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="h-1 bg-zinc-800 w-full rounded-full relative cursor-pointer" onClick={(e) => {
                if (audioRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const targetTime = (x / rect.width) * duration;
                  audioRef.current.currentTime = targetTime;
                  setCurrentTime(targetTime);
                }
              }}>
                <div 
                  className="absolute left-0 top-0 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-6 ml-auto">
               <div className="hidden lg:flex items-center gap-2">
                  <span className="text-[10px] text-zinc-600">VOL</span>
                  <div 
                    className="w-24 h-1 bg-zinc-800 cursor-pointer" 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setVolume(Math.max(0, Math.min(1, x / rect.width)));
                    }}
                  >
                    <div className="h-full bg-zinc-400" style={{ width: `${volume * 100}%` }}></div>
                  </div>
               </div>
               <div className="flex gap-4">
                 <button className="w-8 h-8 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white transition-colors">«</button>
                 <button 
                   onClick={togglePlayPause}
                   className="w-8 h-8 flex items-center justify-center bg-white text-black font-bold hover:bg-emerald-500 transition-colors"
                 >
                   {isPlaying ? '||' : '▶'}
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white transition-colors">»</button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
