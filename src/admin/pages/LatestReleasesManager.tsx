import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

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
      .order('created_at', { ascending: false });
    if (!error) setReleases(data);
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
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Latest Releases Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            required
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            required
          />
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            required
          />
          <input
            type="url"
            placeholder="AudioMack Link"
            value={audioLink}
            onChange={(e) => setAudioLink(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <input
            type="url"
            placeholder="Apple Music Link"
            value={appleLink}
            onChange={(e) => setAppleLink(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <input
            type="url"
            placeholder="Boomplay Link"
            value={boomplayLink}
            onChange={(e) => setBoomplayLink(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Uploading...' : 'Add Release'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {releases.map((release) => (
            <div
              key={release.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={release.image_url}
                alt={release.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-white">
                <h4 className="font-semibold text-lg">{release.title}</h4>
                <p className="text-white/80 text-sm">{release.artist}</p>
                <div className="mt-2 space-x-2 text-sm">
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
                  className="mt-2 text-red-400 hover:text-red-600 text-sm"
                >
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
