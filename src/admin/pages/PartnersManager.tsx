import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2, ImagePlus, LinkIcon } from 'lucide-react';

export default function PartnersManager() {
  const [partners, setPartners] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPartners(data || []);
    else console.error('Fetch error:', error.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);

      const { error } = await supabase.from('partners').insert([
        {
          name,
          logo_url: secure_url, // ✅ Correct column
          website_url: link || '', // ✅ Empty string fallback
        },
      ]);

      if (error) {
        console.error('Insert error:', error.message);
      } else {
        setName('');
        setLink('');
        setFile(null);
        fetchPartners(); // refresh list
      }
    } catch (err) {
      console.error('Upload or insert failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id: string) => {
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) console.error('Delete error:', error.message);
    fetchPartners();
  };

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-8">🤝 Manage Partners</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Partner Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="url"
              placeholder="Partner Link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            />
            <label className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white cursor-pointer hover:border-pink-500 transition">
              <ImagePlus className="w-5 h-5" />
              <span>{file ? file.name : 'Upload Logo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Uploading...' : 'Add Partner'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#111] rounded-2xl overflow-hidden shadow-md border border-white/10 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-full h-48 bg-gray-900 flex items-center justify-center p-4">
                <img
                  src={partner.logo_url} // ✅ use correct field
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-xl font-bold">{partner.name}</h4>
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-pink-400 hover:underline text-sm"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Visit Partner
                  </a>
                )}
                <button
                  onClick={() => deletePartner(partner.id)}
                  className="mt-3 inline-flex items-center gap-2 text-red-400 hover:text-red-600 text-sm transition"
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
