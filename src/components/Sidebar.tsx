import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart, Settings, Music } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [playlists, setPlaylists] = useState([
    { id: '1', name: 'Favorite Mix' },
    { id: '2', name: 'Chill Vibes' },
    { id: '3', name: 'Workout Mix' },
  ]);

  return (
    <div className="w-64 bg-card flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8 fade-in">
          <Music className="w-8 h-8 text-primary" />
          <span className="text-foreground text-xl font-bold">Musicify</span>
        </div>
        
        <nav className="space-y-2">
          <Link 
            to="/" 
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive('/') 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:text-white hover:bg-card-foreground/5'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          
          <Link 
            to="/search" 
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive('/search') 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:text-white hover:bg-card-foreground/5'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search</span>
          </Link>
          
          <Link 
            to="/library" 
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive('/library') 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:text-white hover:bg-card-foreground/5'
            }`}
          >
            <Library className="w-5 h-5" />
            <span className="font-medium">Your Library</span>
          </Link>

          <Link 
            to="/settings" 
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive('/settings') 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:text-white hover:bg-card-foreground/5'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="mt-8 space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-card-foreground/5 transition-all duration-300">
            <PlusCircle className="w-5 h-5" />
            <span className="font-medium">Create Playlist</span>
          </button>
          
          <Link 
            to="/liked" 
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive('/liked') 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-400 hover:text-white hover:bg-card-foreground/5'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">Liked Songs</span>
          </Link>
        </div>

        <div className="mt-8">
          <h3 className="px-4 text-sm font-semibold text-gray-400 mb-4">YOUR PLAYLISTS</h3>
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white block transition-colors"
              >
                {playlist.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          <p>© 2025 Musicify</p>
        </div>
      </div>
    </div>
  );
};