import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function HeroSliderManager() {
  const [slides, setSlides] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from('hero_slider')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSlides(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('hero_slider').insert({
        title,
        image_url: secure_url,
      });
      setTitle('');
      setFile(null);
      fetchSlides();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlide = async (id: string) => {
    await supabase.from('hero_slider').delete().eq('id', id);
    fetchSlides();
  };

  return (
    <DashboardLayout>
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Hero Slider Manager</h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Slide Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded w-full"
          >
            {loading ? 'Uploading...' : 'Add Slide'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={slide.image_url}
                alt={slide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 flex justify-between items-center">
                <p className="text-sm text-white truncate">{slide.title}</p>
                <button
                  onClick={() => deleteSlide(slide.id)}
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
