// src/admin/pages/GalleryManager.tsx
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

  const handleUpload = async (e: React.FormEvent) => {
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
      <h2 className="text-2xl font-bold mb-4">Gallery Manager</h2>

      <form onSubmit={handleUpload} className="space-y-3 mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white p-2 rounded shadow">
            <img
              src={img.image_url}
              alt="Gallery"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <button
              onClick={() => deleteImage(img.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
