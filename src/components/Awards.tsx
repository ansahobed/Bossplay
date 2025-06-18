import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Award {
  id: string;
  title: string;
  organization: string;
  icon: string;
}

export function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    const { data, error } = await supabase
      .from('awards')
      .select('id, title, organization, icon')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAwards(data);
    } else {
      console.error('Error fetching awards:', error);
    }
  };

  return (
    <section
      id="awards"
      className="section scroll-mt-24 bg-primary section-glow"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-3">
            Awards & Recognition
          </h2>
          <div className="h-1 w-16 bg-primary-gold mx-auto mb-4 rounded-full"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Celebrating excellence in luxury sound and musical innovation
          </p>
        </motion.div>

        {/* Awards Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {awards.map((award, index) => (
            <SwiperSlide key={award.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glow-card text-center p-6 sm:p-8 transition-all duration-300 hover:border-primary-gold/50"
              >
                <div className="text-5xl mb-4 text-primary-gold">{award.icon}</div>
                <h3 className="text-xl font-semibold font-serif text-primary-gold mb-2">
                  {award.title}
                </h3>
                <p className="text-white/70 text-sm">{award.organization}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
