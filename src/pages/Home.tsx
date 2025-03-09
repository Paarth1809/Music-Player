import React from 'react';
import { usePlayerStore } from '../store/playerStore';

export const Home = () => {
  const featuredPlaylists = [
    {
      id: '1',
      name: 'Top Hits 2025',
      description: 'The hottest tracks right now',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      name: 'Chill Vibes',
      description: 'Relaxing beats for your day',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      name: 'Workout Essentials',
      description: 'Power your workout',
      coverUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div 
              key={playlist.id}
              className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              <img 
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-md mb-4 group-hover:shadow-lg transition-shadow"
              />
              <h3 className="font-semibold text-lg mb-1">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i}
              className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="aspect-square bg-gray-700 rounded-md mb-3 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};