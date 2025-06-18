import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';

interface EventItem {
  id: string;
  title: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  venue: string;
  ticketLink?: string;
  image_url?: string;
  end_date?: string;
  end_time?: string;
}

type Status = 'upcoming' | 'today' | 'ongoing' | 'past';

export function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Status | 'all'>('upcoming');

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setEvents(data as EventItem[]);
        setLoading(false);
      });
  }, []);

  const getStatus = (e: EventItem): Status => {
    const now = dayjs();
    const start = dayjs(`${e.date}T${e.time}`);
    const end = e.end_date && e.end_time ? dayjs(`${e.end_date}T${e.end_time}`) : null;
    if (start.isSame(now, 'day')) return 'today';
    if (end && now.isAfter(start) && now.isBefore(end)) return 'ongoing';
    if (start.isAfter(now)) return 'upcoming';
    return 'past';
  };

  const enriched = events.map(e => ({
    ...e,
    dateObj: dayjs(`${e.date}T${e.time}`),
    status: getStatus(e),
    endDateObj: e.end_date && e.end_time ? dayjs(`${e.end_date}T${e.end_time}`) : null,
  })).sort((a, b) => a.dateObj.valueOf() - b.dateObj.valueOf());

  const nextEvent = enriched.find(e => ['upcoming', 'today'].includes(e.status));

  useEffect(() => {
    if (!nextEvent) return;
    const timer = setInterval(() => {
      const diff = nextEvent.dateObj.valueOf() - dayjs().valueOf();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEvent]);

  const formatDate = (raw: string) => {
    const d = dayjs(raw);
    return { day: d.date(), month: d.format('MMM'), year: d.year() };
  };

  const filtered = enriched.filter(e => {
    if (activeTab === 'all') return true;
    return e.status === activeTab;
  });

  if (loading) return <div className="text-white text-center py-12">Loading events...</div>;

  return (
    <>
      <section id="events" className="section bg-primary section-glow">
        <div className="container">
          {/* Next Event */}
          {nextEvent && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-5xl font-heading gradient-text font-bold">Next Event</h2>
              <p className="text-xl text-white/80 mt-2">{nextEvent.title} — {nextEvent.venue}</p>
              <div className="flex justify-center space-x-6 mt-4 text-white/90">
                {['days', 'hrs', 'mins', 'secs'].map((k, i) => (
                  <div key={i} className="text-center">
                    <span className="text-4xl font-bold">{countdown[k as keyof typeof countdown]}</span><br />
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              <span className="gradient-text">Events Monitor</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join us for unforgettable live experiences across Ghana and beyond
            </p>
          </motion.div>

          {/* Preview List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {enriched.slice(0, 2).map((e, idx) => {
              const dt = formatDate(e.date);
              return (
                <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="glow-card p-6 group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-4">
                    {e.image_url && <img src={e.image_url} alt="" className="w-24 h-24 object-cover rounded-xl" />}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-primary rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-xs font-medium">{dt.month}</span>
                        <span className="text-lg font-bold">{dt.day}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-white">{e.title}</h3>
                      <div className="text-white/70 text-sm">
                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {e.venue}</div>
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {e.time}</div>
                      </div>
                      {e.ticketLink && (
                        <a href={e.ticketLink} target="_blank" rel="noreferrer" className="text-accent-fuchsia inline-flex items-center mt-2"><ExternalLink className="w-4 h-4" /> Tickets</a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Events */}
          {enriched.length > 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-center">
              <button className="btn btn-outline" onClick={() => setModalOpen(true)}>
                View All Events
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-xl max-w-3xl w-full max-h-full overflow-y-auto p-6 relative">
            <button className="absolute top-4 right-4 text-white" onClick={() => setModalOpen(false)}>
              <X size={24} />
            </button>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
              {(['upcoming', 'today', 'ongoing', 'past', 'all'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-medium ${activeTab === tab ? 'bg-accent-fuchsia text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.length ? filtered.map(e => {
                const dt = formatDate(e.date);
                return (
                  <div key={e.id} className="bg-[#111] rounded-xl overflow-hidden shadow-lg p-4">
                    <div className="flex space-x-4">
                      {e.image_url && <img src={e.image_url} alt="" className="w-20 h-20 object-cover rounded-lg" />}
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-white">{e.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            e.status === 'upcoming' ? 'bg-green-600' :
                            e.status === 'today' ? 'bg-yellow-500 text-black' :
                            e.status === 'ongoing' ? 'bg-blue-600' :
                            'bg-gray-600'
                          }`}>
                            {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-white/70 text-sm mt-1">
                          <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {dt.month} {dt.day}, {dt.year}</div>
                          <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {e.time}</div>
                          <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {e.venue}</div>
                          {e.ticketLink && (
                            <a href={e.ticketLink} target="_blank" rel="noreferrer" className="inline-flex items-center mt-1 text-accent-fuchsia"><ExternalLink className="w-4 h-4" /> Tickets</a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="col-span-full text-center text-white/60 py-12">No events found in this category.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
