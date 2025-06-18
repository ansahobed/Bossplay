import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <div className="text-white px-4 py-6 space-y-10">
        <h2 className="text-3xl font-bold text-pink-500 tracking-tight">🎞️ Hero Slider Manager</h2>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-xl space-y-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              placeholder="Slide Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-black text-white p-3 rounded-lg border border-white/10 placeholder-white/40"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1 bg-black text-white p-3 rounded-lg border border-white/10"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition w-full md:w-auto"
            >
              {loading ? 'Uploading...' : 'Add Slide'}
            </button>
          </div>
        </form>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={slide.image_url}
                alt={slide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <p className="text-white text-sm font-medium truncate">{slide.title}</p>
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-600 text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
