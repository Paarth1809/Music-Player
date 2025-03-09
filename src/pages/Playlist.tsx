import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, MoreHorizontal, Pause } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export const Playlist = () => {
  const { id } = useParams();
  const { currentSong, isPlaying, setCurrentSong, setQueue, setIsPlaying } = usePlayerStore();
  
  const playlist = {
    id,
    name: 'My Awesome Playlist',
    description: 'A collection of my favorite tracks',
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    songs: [
      {
        id: '1',
        title: 'Midnight City',
        artist: 'M83',
        album: 'Hurry Up, We\'re Dreaming',
        duration: 244,
        cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: '2',
        title: 'Starboy',
        artist: 'The Weeknd',
        album: 'Starboy',
        duration: 230,
        cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
    ],
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playPlaylist = () => {
    setQueue(playlist.songs);
    setCurrentSong(playlist.songs[0]);
    setIsPlaying(true);
  };

  const playSong = (song: any) => {
    setCurrentSong(song);
    setQueue(playlist.songs);
    setIsPlaying(true);
  };

  const isCurrentSong = (song: any) => currentSong?.id === song.id;

  return (
    <div className="text-white">
      <div className="flex items-end gap-6 mb-8">
        <img
          src={playlist.cover_url}
          alt={playlist.name}
          className="w-52 h-52 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h4 className="text-sm uppercase font-semibold mb-2">Playlist</h4>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-gray-400">{playlist.description}</p>
        </div>
      </div>

      <div className="mb-8">
        <button 
          className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition"
          onClick={playPlaylist}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <div className="grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 text-sm text-gray-400 px-2">
            <div>#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date Added</div>
            <div className="flex justify-end">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-700/50">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              className={`grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 p-2 hover:bg-white/5 group cursor-pointer ${
                isCurrentSong(song) ? 'bg-white/10' : ''
              }`}
              onClick={() => playSong(song)}
            >
              <div className="flex items-center text-gray-400 group-hover:text-white">
                {isCurrentSong(song) ? (
                  <Play className="w-4 h-4 text-primary" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={song.cover_url}
                  alt={song.title}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <div className={`font-medium ${isCurrentSong(song) ? 'text-primary' : 'group-hover:text-white'}`}>
                    {song.title}
                  </div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-400">{song.album}</div>
              <div className="flex items-center text-gray-400">2 days ago</div>
              <div className="flex items-center justify-between text-gray-400">
                <span>{formatDuration(song.duration)}</span>
                <button className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};