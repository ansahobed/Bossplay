import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function LatestReleases() {
  const [releases, setReleases] = useState<any[]>([]);

  useEffect(() => {
    const fetchReleases = async () => {
      const { data, error } = await supabase
        .from('latest_releases')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Failed to fetch releases:', error.message);
      } else {
        setReleases(data);
      }
    };

    fetchReleases();
  }, []);

  return (
    <section id="music" className="section bg-primary section-glow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Latest Releases</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience our newest sounds that blend Afrobeats with global music energy
          </p>
        </motion.div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {releases.map((release, index) => (
            <SwiperSlide key={release.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glow-card p-6 group hover:scale-[1.03] transition-transform duration-300 h-full"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={release.image_url}
                    alt={release.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-fuchsia rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  {release.title}
                </h3>
                <p className="text-white/60 mb-4">{release.artist}</p>

                <div className="flex space-x-4 flex-wrap">
                  {release.audiomack_url && (
                    <a
                      href={release.audiomack_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-accent-green hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">AudioMack</span>
                    </a>
                  )}
                  {release.apple_url && (
                    <a
                      href={release.apple_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-accent-blue hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Apple Music</span>
                    </a>
                  )}
                  {release.boomplay_url && (
                    <a
                      href={release.boomplay_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-accent-orange hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Boomplay</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
