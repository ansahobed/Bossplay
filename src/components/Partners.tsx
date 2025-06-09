import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export function Partners() {
  const partners = [
    {
      name: "Ghana Music Awards",
      logo: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
    },
    {
      name: "Afrobeats Festival",
      logo: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    },
    {
      name: "African Music Network",
      logo: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    },
    {
      name: "Global Sound Records",
      logo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
      name: "Tema Music Hub",
      logo: "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg",
    },
    {
      name: "West Africa Tours",
      logo: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
    }
  ];

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
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="group">
                  <div className="glow-card p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 group-hover:animate-float">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-white font-heading font-semibold text-sm">
                      {partner.name}
                    </h3>
                  </div>
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