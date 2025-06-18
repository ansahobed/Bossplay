import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2 } from 'lucide-react';

export default function LatestReleasesManager() {
  const [releases, setReleases] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [audioLink, setAudioLink] = useState('');
  const [appleLink, setAppleLink] = useState('');
  const [boomplayLink, setBoomplayLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    const { data, error } = await supabase
      .from('latest_releases')
      .select('*')
      .order('release_date', { ascending: false }); // Sort by actual release date
    if (!error) setReleases(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !artist || !releaseDate) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('latest_releases').insert({
        title,
        artist,
        release_date: releaseDate,
        image_url: secure_url,
        audiomack_url: audioLink,
        apple_url: appleLink,
        boomplay_url: boomplayLink,
      });
      setTitle('');
      setArtist('');
      setReleaseDate('');
      setAudioLink('');
      setAppleLink('');
      setBoomplayLink('');
      setFile(null);
      fetchReleases();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRelease = async (id: string) => {
    await supabase.from('latest_releases').delete().eq('id', id);
    fetchReleases();
  };

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">🎵 Manage Latest Releases</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Release Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="url"
              placeholder="AudioMack Link"
              value={audioLink}
              onChange={(e) => setAudioLink(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="url"
              placeholder="Apple Music Link"
              value={appleLink}
              onChange={(e) => setAppleLink(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="url"
              placeholder="Boomplay Link"
              value={boomplayLink}
              onChange={(e) => setBoomplayLink(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Uploading...' : 'Add Release'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <div
              key={release.id}
              className="bg-[#111] rounded-2xl overflow-hidden shadow-md border border-white/10 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={release.image_url}
                alt={release.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h4 className="text-xl font-bold">{release.title}</h4>
                <p className="text-sm text-white/80">{release.artist}</p>
                <p className="text-xs text-white/50">🎧 Released: {release.release_date}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {release.audiomack_url && (
                    <a
                      href={release.audiomack_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      🔗 AudioMack
                    </a>
                  )}
                  {release.apple_url && (
                    <a
                      href={release.apple_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      🔗 Apple Music
                    </a>
                  )}
                  {release.boomplay_url && (
                    <a
                      href={release.boomplay_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:underline"
                    >
                      🔗 Boomplay
                    </a>
                  )}
                </div>
                <button
                  onClick={() => deleteRelease(release.id)}
                  className="mt-2 inline-flex items-center gap-2 text-red-400 hover:text-red-600 text-sm transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
