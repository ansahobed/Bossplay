import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2 } from 'lucide-react';
import { Quote } from 'lucide-react';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [rating, setRating] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setTestimonials(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !text || !rating) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('testimonials').insert({
        name,
        text,
        image_url: secure_url,
        rating,
      });
      setName('');
      setText('');
      setFile(null);
      setRating('');
      fetchTestimonials();
    } catch (err) {
      console.error('Testimonial upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', id);
    fetchTestimonials();
  };

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">🌟 Manage Testimonials</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Testimonial Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white md:col-span-2"
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white md:col-span-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Uploading...' : 'Add Testimonial'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#111] rounded-2xl overflow-hidden shadow-md border border-white/10 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-48 bg-gray-900 flex items-center justify-center p-4">
                <img
                  src={t.image_url}
                  alt={t.name}
                  className="max-h-full max-w-full object-contain rounded-full"
                />
              </div>
              <div className="p-4 space-y-2 text-white">
                <div className="flex justify-center text-pink-500">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="text-sm text-white/80 italic text-center">"{t.text}"</p>
                <div className="flex justify-center text-yellow-400">
                  {[...Array(t.rating || 0)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {[...Array(5 - (t.rating || 0))].map((_, i) => (
                    <span key={i} className="text-gray-600">★</span>
                  ))}
                </div>
                <h4 className="text-center font-semibold text-lg mt-2">{t.name}</h4>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-600 text-sm transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
