import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

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
    if (!error) setImages(data);
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
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Gallery Manager</h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md transition-shadow"
            >
              <img
                src={item.image_url}
                alt="Gallery"
                className="w-full h-48 object-cover"
                style={{
                  filter: 'none',           // Removes contrast/brightness filters
                  transition: 'none'        // Avoids hover effects
                }}
              />
              <div className="p-3 flex justify-between items-center">
                <p className="text-sm text-white truncate">Image #{item.id}</p>
                <button
                  onClick={() => deleteImage(item.id)}
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
