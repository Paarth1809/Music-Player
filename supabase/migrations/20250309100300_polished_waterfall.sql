/*
  # Initial Schema Setup for Music Player

  1. New Tables
    - users (managed by Supabase Auth)
    - songs
      - id (uuid, primary key)
      - title (text)
      - artist (text)
      - album (text)
      - duration (integer, seconds)
      - cover_url (text)
      - audio_url (text)
      - created_at (timestamp)
    - playlists
      - id (uuid, primary key)
      - name (text)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - playlist_songs
      - playlist_id (uuid, foreign key)
      - song_id (uuid, foreign key)
      - added_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  album text NOT NULL,
  duration integer NOT NULL,
  cover_url text NOT NULL,
  audio_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create playlist_songs junction table
CREATE TABLE IF NOT EXISTS playlist_songs (
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE,
  song_id uuid REFERENCES songs(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (playlist_id, song_id)
);

-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Songs are viewable by everyone"
  ON songs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Playlists are viewable by owner"
  ON playlists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Playlist songs are viewable by playlist owner"
  ON playlist_songs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE id = playlist_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own playlists"
  ON playlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can add songs to their playlists"
  ON playlist_songs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE id = playlist_id
      AND user_id = auth.uid()
    )
  );