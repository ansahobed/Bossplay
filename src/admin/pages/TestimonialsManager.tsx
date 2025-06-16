import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setTestimonials(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !text) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('testimonials').insert({
        name,
        text,
        image_url: secure_url,
      });
      setName('');
      setText('');
      setFile(null);
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
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Testimonials Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <textarea
            placeholder="Testimonial"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Uploading...' : 'Add Testimonial'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={t.image_url}
                alt={t.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h4 className="font-semibold text-white mb-1">{t.name}</h4>
                <p className="text-white/80 text-sm mb-2">{t.text}</p>
                <button
                  onClick={() => deleteTestimonial(t.id)}
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
