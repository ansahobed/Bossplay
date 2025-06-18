import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2 } from 'lucide-react';

export default function GalleryManager() {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setImages(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('gallery').insert({ image_url: secure_url });
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    await supabase.from('gallery').delete().eq('id', id);
    fetchImages();
  };

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">🖼️ Manage Gallery</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-lg mb-10 space-y-4"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image_url}
                alt={`Gallery #${item.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <span className="text-sm text-white/70 truncate">Image #{item.id}</span>
                <button
                  onClick={() => deleteImage(item.id)}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-red-600 text-sm transition"
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
