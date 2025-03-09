import React from 'react';
import { Heart, Play, MoreHorizontal } from 'lucide-react';

export const LikedSongs = () => {
  const likedSongs = [
    {
      id: '1',
      title: 'Song Title 1',
      artist: 'Artist 1',
      album: 'Album 1',
      duration: 180,
      cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    // Add more liked songs here
  ];

  return (
    <div className="text-white">
      <div className="flex items-end gap-6 mb-8">
        <div className="w-52 h-52 bg-gradient-to-br from-pink-600 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
          <Heart className="w-24 h-24 text-white" />
        </div>
        <div>
          <h4 className="text-sm uppercase font-semibold mb-2">Playlist</h4>
          <h1 className="text-5xl font-bold mb-4">Liked Songs</h1>
          <p className="text-gray-400">Your favorite tracks in one place</p>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <div className="grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 text-sm text-gray-400 px-2">
            <div>#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date Added</div>
            <div>Duration</div>
          </div>
        </div>

        <div className="divide-y divide-gray-700/50">
          {likedSongs.map((song, index) => (
            <div 
              key={song.id}
              className="grid grid-cols-[16px_4fr_3fr_2fr_1fr] gap-4 p-2 hover:bg-white/5 group"
            >
              <div className="flex items-center text-gray-400 group-hover:text-white">
                {index + 1}
              </div>
              <div className="flex items-center gap-3">
                <img 
                  src={song.cover_url} 
                  alt={song.title}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <div className="font-medium group-hover:text-white">{song.title}</div>
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

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};