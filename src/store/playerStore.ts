import { create } from 'zustand';
import { Song, UserSettings } from '../types';

interface PlayerStore {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  repeat: 'off' | 'all' | 'one';
  shuffle: boolean;
  settings: UserSettings;
  setCurrentSong: (song: Song | null) => void;
  setQueue: (songs: Song[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setRepeat: (repeat: 'off' | 'all' | 'one') => void;
  setShuffle: (shuffle: boolean) => void;
  setSettings: (settings: Partial<UserSettings>) => void;
  nextSong: () => void;
  previousSong: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  volume: 1,
  repeat: 'off',
  shuffle: false,
  settings: {
    theme: 'dark',
    audioQuality: 'normal',
    crossfadeEnabled: false,
    crossfadeDuration: 0,
  },
  setCurrentSong: (song) => set({ currentSong: song }),
  setQueue: (songs) => set({ queue: songs }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setRepeat: (repeat) => set({ repeat }),
  setShuffle: (shuffle) => set({ shuffle }),
  setSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings },
  })),
  nextSong: () => {
    const { queue, currentSong, repeat, shuffle } = get();
    if (!currentSong || queue.length === 0) return;

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
    let nextIndex = currentIndex + 1;

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      nextIndex = repeat === 'all' ? 0 : -1;
    }

    if (nextIndex >= 0) {
      set({ currentSong: queue[nextIndex] });
    }
  },
  previousSong: () => {
    const { queue, currentSong } = get();
    if (!currentSong || queue.length === 0) return;

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      set({ currentSong: queue[previousIndex] });
    }
  },
}));