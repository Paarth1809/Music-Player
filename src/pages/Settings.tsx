import React from 'react';
import { usePlayerStore } from '../store/playerStore';

export const Settings = () => {
  const { settings, setSettings } = usePlayerStore();

  return (
    <div className="max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-8">
        <section className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ theme: e.target.value as 'dark' | 'light' })}
                className="bg-gray-700 rounded-md px-3 py-2 w-full text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Playback</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Audio Quality
              </label>
              <select
                value={settings.audioQuality}
                onChange={(e) => setSettings({ audioQuality: e.target.value as 'normal' | 'high' })}
                className="bg-gray-700 rounded-md px-3 py-2 w-full text-white"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.crossfadeEnabled}
                  onChange={(e) => setSettings({ crossfadeEnabled: e.target.checked })}
                  className="rounded bg-gray-700 border-gray-600"
                />
                <span className="text-sm font-medium text-gray-400">Enable Crossfade</span>
              </label>
            </div>

            {settings.crossfadeEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Crossfade Duration (seconds)
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={settings.crossfadeDuration}
                  onChange={(e) => setSettings({ crossfadeDuration: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-400 mt-1">
                  {settings.crossfadeDuration} seconds
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};