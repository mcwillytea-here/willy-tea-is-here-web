import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  audioUrl: string;
  coverUrl?: string;
  genre?: string;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isHydrated: boolean; // pro bezpečný SSR
  
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  setVolume: (v: number) => void;
  
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setHydrated: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1, // Default volume
  currentTime: 0,
  duration: 0,
  isHydrated: false,

  playTrack: (track) => {
    const { currentTrack, isPlaying } = get();
    if (currentTrack?.id === track.id) {
       set({ isPlaying: !isPlaying });
    } else {
       set({ currentTrack: track, isPlaying: true, currentTime: 0 });
    }
  },

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setVolume: (volume) => {
    set({ volume });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('underground-volume', volume.toString());
      } catch (e) {}
    }
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  
  setHydrated: () => {
    if (typeof window !== 'undefined') {
      try {
        const savedVolume = localStorage.getItem('underground-volume');
        if (savedVolume !== null) {
          set({ volume: parseFloat(savedVolume) });
        }
      } catch (e) {}
    }
    set({ isHydrated: true });
  }
}));
