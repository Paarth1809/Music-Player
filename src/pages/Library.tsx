import React, { useState } from 'react';
import { Grid, List, MoreHorizontal } from 'lucide-react';

export const Library = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const playlists = [
    {
      id: '1',
      name: 'Favorite Mix',
      songCount: 25,
      lastPlayed: '2 days ago',
      cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      name: 'Chill Vibes',
      songCount: 42,
      lastPlayed: '1 week ago',
      cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      name: 'Workout Mix',
      songCount: 18,
      lastPlayed: '3 days ago',
      cover_url: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              <img
                src={playlist.cover_url}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg mb-4 group-hover:shadow-lg transition-shadow"
              />
              <h3 className="font-semibold text-lg mb-1">{playlist.name}</h3>
              <p className="text-sm text-gray-400">{playlist.songCount} songs</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-[4fr_1fr_1fr_48px] gap-4 text-sm text-gray-400">
              <div>Name</div>
              <div>Songs</div>
              <div>Last Played</div>
              <div></div>
            </div>
          </div>
          <div className="divide-y divide-gray-700/50">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="grid grid-cols-[4fr_1fr_1fr_48px] gap-4 p-4 hover:bg-white/5 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={playlist.cover_url}
                    alt={playlist.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="font-medium">{playlist.name}</span>
                </div>
                <div className="flex items-center text-gray-400">{playlist.songCount}</div>
                <div className="flex items-center text-gray-400">{playlist.lastPlayed}</div>
                <div className="flex items-center justify-center">
                  <button className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};