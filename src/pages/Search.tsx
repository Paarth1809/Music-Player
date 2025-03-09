import React, { useState } from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export const Search = () => {
  const { setCurrentSong, setQueue, setIsPlaying } = usePlayerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([
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
  ]);

  const playSong = (song: any) => {
    setCurrentSong(song);
    setQueue(searchResults);
    setIsPlaying(true);
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for songs, artists, or albums"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 rounded-full py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {searchQuery && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group relative"
                  onClick={() => playSong(result)}
                >
                  <div className="relative">
                    <img
                      src={result.cover_url}
                      alt={result.title}
                      className="w-full aspect-square object-cover rounded-md mb-4 group-hover:shadow-lg transition-shadow"
                    />
                    <button className="absolute bottom-6 right-2 bg-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <Play className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <h3 className="font-medium text-white mb-1">{result.title}</h3>
                  <p className="text-sm text-gray-400">{result.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {['Rock', 'Pop', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical'].map((genre) => (
              <div
                key={genre}
                className="aspect-square bg-gradient-to-br from-primary/80 to-primary rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <span className="text-xl font-bold text-white">{genre}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};