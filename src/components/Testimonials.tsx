import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

export function Testimonials() {
  const testimonials = [
    {
      quote: "BossPlay Music brought incredible energy to our festival. Their Afrobeats fusion had the entire crowd dancing!",
      author: "Kwame Asante",
      company: "Bossplay Accra  Director",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      rating: 5
    },
    {
      quote: "Working with BossPlay on our film soundtrack was amazing. They perfectly captured the soul of our story.",
      author: "Smart Wagez ",
      company: "Computer Engineer , Ghana",
      image: "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg",
      rating: 5
    },
    {
      quote: "Their mentorship program transformed my music career. The guidance and industry connections were invaluable.",
      author: "Kofi Mensah",
      company: "Emerging Artist",
      image: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg",
      rating: 5
    },
    {
      quote: "BossPlay created the perfect sonic branding for our luxury hotel. Guests love the ambient Afrobeats vibes.",
      author: "Sarah Johnson",
      company: "Hotel Manager, Accra",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section bg-primary section-glow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">What People Say</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Hear from our clients, collaborators, and fans about their experiences with BossPlay Music
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glow-card p-8 h-full group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <Quote className="w-12 h-12 text-accent-fuchsia group-hover:animate-float" />
                </div>
                
                <blockquote className="text-lg text-white/80 mb-6 text-center leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-yellow fill-current" />
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-heading font-semibold text-white mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-white/60 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}