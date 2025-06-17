import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { supabase } from '../lib/supabaseClient';
import { MessageCircle } from 'lucide-react'; // WhatsApp-style icon
import 'swiper/css';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showContact, setShowContact] = useState(false);

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
        {/* Heading */}
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
            Collaborating with industry leaders to bring you the best musical & cultural experiences.
          </p>
        </motion.div>

        {/* Slider */}
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

        {/* Become a Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-8">
            Interested in partnering with us?
          </p>
          <button
            className="btn btn-outline"
            onClick={() => setShowContact(!showContact)}
          >
            Become a Partner
          </button>

          {showContact && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Contact 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 p-6 rounded-xl shadow-xl backdrop-blur-md text-white text-left border border-white/10"
              >
                <h4 className="text-lg font-semibold text-pink-400 mb-2">Partner Contact Info</h4>
                <p><strong>Contact Person:</strong> Mr. Smart Wages (Programs/Partnership Manager)</p>
                <p className="flex items-center gap-2">
                  <strong>Phone:</strong>
                  <a
                    href="https://wa.me/233242581363" 
          
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 flex items-center gap-1"
                  >
                    +233 55 123 4567 <MessageCircle className="w-4 h-4" />
                  </a>
                </p>
                <p><strong>Email:</strong> bossplaygh@gmail.com</p>
              </motion.div>

              {/* Contact 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 p-6 rounded-xl shadow-xl backdrop-blur-md text-white text-left border border-white/10"
              >
                <h4 className="text-lg font-semibold text-pink-400 mb-2">Partner Contact Info</h4>
                <p><strong>Contact Person:</strong> Mr. Kobby Yankey (Chief Executive Officer)</p>
                <p className="flex items-center gap-2">
                  
                  <strong>Phone:</strong>
                  <a
                    href="https://wa.me/233276293017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 flex items-center gap-1"
                  >
                    +233 24 987 6543 <MessageCircle className="w-4 h-4" />
                  </a>
                </p>
                <p><strong>Email:</strong> Bossplaygh@gmail.com</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
