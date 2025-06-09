import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Gallery() {
  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
      title: "Live Performance at Accra Music Festival",
      category: "Live Shows"
    },
    {
      src: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      title: "Studio Recording Session",
      category: "Behind the Scenes"
    },
    {
      src: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      title: "Backstage Moments",
      category: "Behind the Scenes"
    },
    {
      src: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      title: "Fan Meet & Greet",
      category: "Events"
    },
    {
      src: "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg",
      title: "Concert Crowd Energy",
      category: "Live Shows"
    },
    {
      src: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
      title: "Music Video Shoot",
      category: "Production"
    }
  ];

  return (
    <section id="gallery" className="section bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Capturing moments from our musical journey and live experiences
          </p>
        </motion.div>

        {/* Featured Gallery Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="gallery-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-accent-fuchsia/80 text-white text-xs font-medium rounded-full mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white font-heading font-semibold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.slice(0, 8).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium text-center px-2">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="btn btn-outline">
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  );
}