// src/admin/pages/PartnersManager.tsx
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
      <h2 className="text-2xl font-bold mb-4">Partners Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Partner Name"
          className="p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? 'Uploading...' : 'Add Partner'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white p-3 rounded shadow text-center">
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="w-full h-24 object-contain mb-2"
            />
            <p className="font-semibold">{partner.name}</p>
            <button
              onClick={() => deletePartner(partner.id)}
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
