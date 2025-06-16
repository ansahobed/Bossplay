// src/admin/pages/TestimonialsManager.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
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
    if (!name || !message || !file) return;

    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('testimonials').insert({
        name,
        message,
        image_url: secure_url,
      });
      setName('');
      setMessage('');
      setFile(null);
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to upload testimonial:', err);
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
      <h2 className="text-2xl font-bold mb-4">Testimonials Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Testimonial"
          className="p-2 border rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
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
          {loading ? 'Uploading...' : 'Add Testimonial'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded shadow">
            <img
              src={t.image_url}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mb-2 mx-auto"
            />
            <h3 className="text-lg font-semibold text-center">{t.name}</h3>
            <p className="text-sm text-gray-700 mt-2">{t.message}</p>
            <button
              onClick={() => deleteTestimonial(t.id)}
              className="mt-3 text-red-500 text-sm hover:underline block text-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
