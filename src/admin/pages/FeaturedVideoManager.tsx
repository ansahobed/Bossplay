import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function VideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
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
    if (!file || !title) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('featured_videos').insert({
        title,
        video_url: secure_url,
      });
      setTitle('');
      setFile(null);
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
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Featured Videos Manager</h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <video
                controls
                className="w-full h-48 object-cover"
                src={video.video_url}
              />
              <div className="p-3 flex justify-between items-center">
                <p className="text-sm text-white truncate">{video.title}</p>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
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
