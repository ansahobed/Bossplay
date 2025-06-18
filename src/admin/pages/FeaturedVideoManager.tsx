import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2, LinkIcon } from 'lucide-react';

export default function VideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setVideos(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    setLoading(true);
    try {
      await supabase.from('videos').insert({ title, url });
      setTitle('');
      setUrl('');
      fetchVideos();
    } catch (err) {
      console.error('Video upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id: string) => {
    await supabase.from('videos').delete().eq('id', id);
    fetchVideos();
  };

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">🎬 Manage Featured Videos</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="url"
              placeholder="YouTube or Vimeo URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Uploading...' : 'Add Video'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="w-full aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full rounded-t-2xl"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-lg font-semibold text-white">{video.title}</h4>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pink-400 hover:underline text-sm"
                >
                  <LinkIcon className="w-4 h-4" />
                  Watch Video
                </a>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm mt-2"
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
