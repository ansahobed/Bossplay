import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Play, Calendar, Music } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to next event (example: 30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
      title: "Live Shows",
      subtitle: "Experience the Energy",
    },
    {
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      title: "Studio Sessions",
      subtitle: "Behind the Magic",
    },
    {
      image: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      title: "Global Movement",
      subtitle: "One Sound, One Vision",
    },
  ];

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="hero-glow absolute inset-0 z-10"></div>
      
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-fuchsia/20 to-accent-purple/20" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-6">
              <span className="gradient-text">Feel the Vibe.</span>
              <br />
              <span className="text-white">Hear the Soul.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Afrobeats, Soul, and Global Music Energy. One Sound. One Movement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn btn-primary flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Listen Now</span>
              </button>
              <button className="btn btn-outline flex items-center justify-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Join the Journey</span>
              </button>
            </div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glow-card p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-accent-fuchsia" />
                <span className="text-accent-fuchsia font-semibold">Next Event</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold gradient-text">{timeLeft.days}</div>
                  <div className="text-sm text-white/60">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">{timeLeft.hours}</div>
                  <div className="text-sm text-white/60">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">{timeLeft.minutes}</div>
                  <div className="text-sm text-white/60">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">{timeLeft.seconds}</div>
                  <div className="text-sm text-white/60">Seconds</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}