import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { supabase } from '../lib/supabaseClient';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface GalleryImage {
  id: string;
  image_url: string;
  title?: string;
  category?: string;
}

export function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setGalleryImages(data);
      } else {
        console.error('Error fetching gallery:', error?.message);
      }
    };

    fetchGallery();
  }, []);

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
            Capturing moments from our musical journey, Masquerade Tensions, and live experiences.
          </p>
        </motion.div>

        {/* Slider Section */}
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
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={image.image_url}
                    alt={image.title || 'Gallery Image'}
                    className="w-full h-80 object-cover"
                  />
                  {(image.title || image.category) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3 text-sm">
                      {image.category && (
                        <span className="block text-xs text-pink-400">{image.category}</span>
                      )}
                      {image.title && (
                        <span className="block font-medium">{image.title}</span>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {galleryImages.slice(0, 8).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg aspect-square shadow-md"
            >
              <img
                src={image.image_url}
                alt={image.title || 'Gallery Image'}
                className="w-full h-full object-cover"
              />
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 text-center">
                  {image.title}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
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
