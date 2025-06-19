import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface EventItem {
  id: string;
  title: string;
  start_date: string;
  end_date?: string;
  venue: string;
  ticketLink?: string;
  image_url?: string;
}

type Status = 'upcoming' | 'today' | 'ongoing' | 'past';

export function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Status | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true });
      if (!error && data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const getStatus = (e: EventItem): Status => {
    const now = dayjs();
    const start = dayjs(e.start_date);
    const end = e.end_date ? dayjs(e.end_date) : null;
    if (start.isSame(now, 'day') && (!end || end.isSame(now, 'day'))) return 'today';
    if (end && now.isAfter(start) && now.isBefore(end)) return 'ongoing';
    if (now.isBefore(start)) return 'upcoming';
    return 'past';
  };

  const enriched = events.map(e => ({
    ...e,
    status: getStatus(e),
    dateObj: dayjs(e.start_date),
    time: dayjs(e.start_date).format('HH:mm'),
  })).sort((a, b) => a.dateObj.valueOf() - b.dateObj.valueOf());

  const statusColors: Record<Status, string> = {
    today: 'bg-yellow-600',
    ongoing: 'bg-blue-600',
    upcoming: 'bg-green-600',
    past: 'bg-gray-700',
  };

  const formatDate = (raw: string) => {
    const d = dayjs(raw);
    return { day: d.date(), month: d.format('MMM'), year: d.year() };
  };

  const filtered = activeTab === 'all' ? enriched : enriched.filter(e => e.status === activeTab);
  const paginatedEvents = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <div className="text-white text-center py-12">Loading events...</div>;

  return (
    <section id="events" className="section bg-primary section-glow">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            <span className="gradient-text">Events Monitor</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover live events happening across Ghana and beyond
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-8">
          {(['all', 'today', 'ongoing', 'upcoming', 'past'] as (Status | 'all')[]).map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === tab ? 'bg-pink-600 text-white' : 'bg-gray-800 text-white/60 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-8"
        >
          {filtered.map(e => {
            const dt = formatDate(e.start_date);
            const status = getStatus(e);
            return (
              <SwiperSlide key={e.id}>
                <motion.div
                  className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md border border-white/10 hover:shadow-pink-500/30 transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {e.image_url && (
                    <img
                      src={e.image_url}
                      alt={e.title}
                      className="w-full h-40 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-semibold text-white truncate max-w-[70%]">{e.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>{status}</span>
                    </div>
                    <p className="text-white/80 flex items-center gap-2 text-xs">
                      <Calendar className="w-4 h-4" />
                      {dt.month} {dt.day}, {dt.year} • {dayjs(e.start_date).format('h:mm A')}
                      {e.end_date && <span>- {dayjs(e.end_date).format('h:mm A')}</span>}
                    </p>
                    <p className="text-white/80 flex items-center gap-2 text-xs">
                      <MapPin className="w-4 h-4" />
                      {e.venue}
                    </p>
                    {e.ticketLink && (
                      <a href={e.ticketLink} target="_blank" rel="noreferrer" className="text-pink-400 flex items-center gap-1 text-xs hover:underline">
                        <ExternalLink className="w-4 h-4" /> Ticket
                      </a>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Pagination (only for non-All views) */}
        {totalPages > 1 && activeTab !== 'all' && (
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full text-sm ${currentPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-700 text-white/60 hover:text-white'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
