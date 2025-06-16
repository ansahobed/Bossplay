// src/admin/pages/FeaturedVideoManager.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import DashboardLayout from '../layout/DashboardLayout';

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
      .from('featured_videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setVideos(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setLoading(true);
    try {
      await supabase.from('featured_videos').insert({
        title,
        url,
      });
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
    await supabase.from('featured_videos').delete().eq('id', id);
    fetchVideos();
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Featured Videos Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Video Title"
          className="p-2 border rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="YouTube or Vimeo Video URL"
          className="p-2 border rounded w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Video'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded shadow p-4">
            <iframe
              src={video.url}
              title={video.title}
              className="w-full h-48 rounded mb-2"
              allowFullScreen
            />
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <button
              onClick={() => deleteVideo(video.id)}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
