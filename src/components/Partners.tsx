import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { supabase } from '../lib/supabaseClient';
import 'swiper/css';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching partners:', error.message);
      } else {
        setPartners(data);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="section bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Our Partners</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Collaborating with industry leaders to bring you the best musical experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="partners-swiper"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="group">
                  <a
                    href={partner.website_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-card p-6 text-center hover:scale-105 transition-transform duration-300 block"
                  >
                    <div className="w-full h-32 overflow-hidden rounded mb-4">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-heading font-semibold text-sm">
                      {partner.name}
                    </h3>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-8">
            Interested in partnering with us?
          </p>
          <button className="btn btn-outline">
            Become a Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
}
