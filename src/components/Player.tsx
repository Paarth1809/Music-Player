import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { Howl } from 'howler';
import { usePlayerStore } from '../store/playerStore';

export const Player = () => {
  const { 
    currentSong, 
    isPlaying, 
    volume,
    repeat,
    shuffle,
    settings,
    setIsPlaying,
    setVolume,
    setRepeat,
    setShuffle,
    nextSong,
    previousSong
  } = usePlayerStore();
  
  const soundRef = useRef<Howl | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number>();

  useEffect(() => {
    if (currentSong) {
      soundRef.current?.unload();
      soundRef.current = new Howl({
        src: [currentSong.audio_url],
        volume: volume,
        html5: true,
        format: [settings.audioQuality === 'high' ? 'flac' : 'mp3'],
        onend: () => {
          if (repeat === 'one') {
            soundRef.current?.play();
          } else {
            nextSong();
          }
        },
      });

      if (isPlaying) {
        soundRef.current.play();
      }
    }

    return () => {
      soundRef.current?.unload();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentSong, settings.audioQuality]);

  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (isPlaying && soundRef.current) {
      progressInterval.current = window.setInterval(() => {
        const seek = soundRef.current?.seek() || 0;
        const duration = soundRef.current?.duration() || 0;
        setProgress((seek / duration) * 100);
      }, 1000);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!soundRef.current) return;
    const value = parseFloat(e.target.value);
    const duration = soundRef.current.duration();
    soundRef.current.seek(duration * (value / 100));
    setProgress(value);
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={currentSong.cover_url} 
            alt={currentSong.title} 
            className="w-14 h-14 rounded-md shadow-lg hover-scale"
          />
          <div>
            <h4 className="text-white font-medium hover:text-primary transition-colors">
              {currentSong.title}
            </h4>
            <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 px-4 max-w-xl">
          <div className="flex items-center gap-6">
            <button 
              className={`text-gray-400 hover:text-white transition ${shuffle ? 'text-primary' : ''}`}
              onClick={() => setShuffle(!shuffle)}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              className="text-gray-400 hover:text-white transition"
              onClick={previousSong}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white rounded-full p-2 hover:scale-105 transition shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>
            <button 
              className="text-gray-400 hover:text-white transition"
              onClick={nextSong}
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button 
              className={`text-gray-400 hover:text-white transition ${repeat !== 'off' ? 'text-primary' : ''}`}
              onClick={() => setRepeat(repeat === 'off' ? 'all' : repeat === 'all' ? 'one' : 'off')}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(soundRef.current?.seek() || 0)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="flex-1"
            />
            <span className="text-xs text-gray-400 w-10">
              {formatTime(soundRef.current?.duration() || 0)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};