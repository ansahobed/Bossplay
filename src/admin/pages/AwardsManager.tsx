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
      <div className="text-white px-4 py-6 space-y-10">
        <h2 className="text-3xl font-bold text-pink-500 tracking-tight">🏅 Awards & Recognitions</h2>

        {/* Award Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-xl space-y-6"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">Award Title</label>
              <input
                type="text"
                placeholder="e.g. Winner - Brassband 2023"
                className="bg-black text-white p-3 rounded-lg border border-white/10 placeholder-white/40"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">Organization</label>
              <input
                type="text"
                placeholder="e.g. Ebony/Skyy Media"
                className="bg-black text-white p-3 rounded-lg border border-white/10 placeholder-white/40"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">Emoji Icon</label>
              <select
                className="bg-black text-white p-3 rounded-lg border border-white/10"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              >
                <option value="">-- Select Icon --</option>
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
            className="bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl w-full md:w-auto transition"
          >
            {loading ? 'Saving...' : 'Add Award'}
          </button>
        </form>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#111] border border-white/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition group"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="text-4xl mb-1">{award.icon}</div>
                <h3 className="text-lg font-bold text-white">{award.title}</h3>
                <p className="text-sm text-white/60 italic">
                  by {award.organization}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => deleteAward(award.id)}
                  className="inline-flex items-center gap-1 text-red-400 hover:text-red-600 text-sm transition"
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
