import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import DashboardLayout from '../layout/DashboardLayout';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AwardsManager() {
  const [awards, setAwards] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [icon, setIcon] = useState('');
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
    if (!title || !organization || !icon) return;
    setLoading(true);
    try {
      await supabase.from('awards').insert({
        title,
        organization,
        icon,
      });
      setTitle('');
      setOrganization('');
      setIcon('');
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
      <div className="space-y-10">
        <h2 className="text-3xl font-bold text-accent-fuchsia">Awards & Recognitions</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 space-y-4"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-neutral-300">Award Title</label>
              <input
                type="text"
                placeholder="e.g. Winner - Brassband 2023"
                className="bg-black text-white p-3 rounded-md border border-neutral-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-neutral-300">Organization</label>
              <input
                type="text"
                placeholder="e.g. Ebony/Skyy Media"
                className="bg-black text-white p-3 rounded-md border border-neutral-600"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-neutral-300">Select Emoji Icon</label>
              <select
                className="bg-black text-white p-3 rounded-md border border-neutral-600"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              >
                <option value="">-- Select Emoji Icon --</option>
                <option value="🏆">🏆 Trophy</option>
                <option value="🎵">🎵 Music Note</option>
                <option value="🌟">🌟 Star</option>
                <option value="🎤">🎤 Mic</option>
                <option value="🥇">🥇 Gold Medal</option>
                <option value="🎬">🎬 Clapperboard</option>
                <option value="🎻">🎻 Violin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent-fuchsia hover:bg-fuchsia-700 text-white px-6 py-2 rounded-md transition-all"
          >
            {loading ? 'Saving...' : 'Add Award'}
          </button>
        </form>

        {/* Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-neutral-900 border border-neutral-700 rounded-2xl p-4 glow-card hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="text-center space-y-1">
                <p className="text-3xl mb-2">{award.icon}</p>
                <p className="text-lg font-semibold text-white">{award.title}</p>
                <p className="text-sm text-neutral-400 italic">Organized by {award.organization}</p>
              </div>
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => deleteAward(award.id)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 size={14} />
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
