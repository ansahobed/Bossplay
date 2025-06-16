// src/admin/pages/HeroSliderManager.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function HeroSliderManager() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    const { data, error } = await supabase
      .from('hero_sliders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setSliders(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('hero_sliders').insert({ image_url: secure_url });
      setFile(null);
      fetchSliders();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlider = async (id: string) => {
    await supabase.from('hero_sliders').delete().eq('id', id);
    fetchSliders();
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Hero Image Slider</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
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
          {loading ? 'Uploading...' : 'Add Slide'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sliders.map((slide) => (
          <div key={slide.id} className="bg-white p-3 rounded shadow text-center">
            <img
              src={slide.image_url}
              alt="Hero Slide"
              className="w-full h-32 object-cover rounded mb-2"
            />
            <button
              onClick={() => deleteSlider(slide.id)}
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
