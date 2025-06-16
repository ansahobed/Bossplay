import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function PartnersManager() {
  const [partners, setPartners] = useState<any[]>([]);
  const [name, setName] = useState('');
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
    if (!error) setPartners(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('partners').insert({
        name,
        logo_url: secure_url,
      });
      setName('');
      setFile(null);
      fetchPartners();
    } catch (err) {
      console.error('Partner upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id: string) => {
    await supabase.from('partners').delete().eq('id', id);
    fetchPartners();
  };

  return (
    <DashboardLayout>
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Partners Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Partner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-white/60"
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
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Add Partner'}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow text-center p-4"
            >
              <div className="w-24 h-24 mx-auto mb-2 bg-white rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-semibold text-white">{partner.name}</p>
              <button
                onClick={() => deletePartner(partner.id)}
                className="mt-2 text-red-400 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
