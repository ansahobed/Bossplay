import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2, UploadCloud } from 'lucide-react';

export default function AwardsManager() {
  const [awards, setAwards] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setAwards(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('awards').insert({
        title,
        image_url: secure_url,
      });
      setTitle('');
      setFile(null);
      fetchAwards();
    } catch (err) {
      console.error('Award upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAward = async (id: string) => {
    await supabase.from('awards').delete().eq('id', id);
    fetchAwards();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-pink-500">Awards & Recognitions</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 p-6 rounded-xl space-y-4 border border-neutral-700"
        >
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-neutral-300">Award Title</label>
            <input
              type="text"
              placeholder="Award title..."
              className="bg-black text-white p-2 rounded border border-neutral-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-neutral-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="text-white"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition"
          >
            <UploadCloud size={18} />
            {loading ? 'Uploading...' : 'Add Award'}
          </button>
        </form>

        {/* Display Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-neutral-800 rounded-xl p-4 shadow-md border border-neutral-700"
            >
              <img
                src={award.image_url}
                alt={award.title}
                className="w-full h-40 object-contain rounded mb-3 bg-black"
              />
              <p className="font-medium text-white">{award.title}</p>
              <button
                onClick={() => deleteAward(award.id)}
                className="flex items-center gap-1 text-sm mt-2 text-red-400 hover:text-red-500"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
