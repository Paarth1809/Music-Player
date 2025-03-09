import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Library } from './pages/Library';
import { LikedSongs } from './pages/LikedSongs';
import { Settings } from './pages/Settings';
import { Playlist } from './pages/Playlist';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked" element={<LikedSongs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Routes>
        </main>
        <Player />
      </div>
    </Router>
  );
}

export default App;