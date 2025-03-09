export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover_url: string;
  audio_url: string;
  created_at: string;
  genre?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  display_name?: string;
  avatar_url?: string;
  theme_preference?: 'dark' | 'light';
}

export interface Playlist {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  description?: string;
  cover_url?: string;
}

export interface LikedSong {
  user_id: string;
  song_id: string;
  created_at: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  audioQuality: 'normal' | 'high';
  crossfadeEnabled: boolean;
  crossfadeDuration: number;
}