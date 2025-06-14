import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Play, Calendar, Music } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function calculateTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) return null;

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export function Hero() {
  const events = [
    { id: 1, title: 'Accra Music Festival', date: new Date('2025-07-15T20:00:00') },
    { id: 2, title: 'Studio Album Release', date: new Date('2025-08-01T18:00:00') },
    { id: 3, title: 'Global Tour Kickoff', date: new Date('2025-09-10T19:30:00') },
  ];

  const [upcomingEvent, setUpcomingEvent] = useState<{ id: number; title: string; date: Date } | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextEvent = events
        .filter((event) => event.date > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;

      setUpcomingEvent(nextEvent);

      if (nextEvent) {
        const newTimeLeft = calculateTimeLeft(nextEvent.date);
        if (newTimeLeft) {
          setTimeLeft(newTimeLeft);
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
      title: 'Live Shows',
      subtitle: 'Experience the Energy',
    },
    {
      image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
      title: 'Studio Sessions',
      subtitle: 'Behind the Magic',
    },
    {
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg',
      title: 'Global Movement',
      subtitle: 'One Sound, One Vision',
    },
  ];

  return (
    <section
      id="home"
      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
        isShrunk ? 'h-[70vh]' : 'h-screen'
      }`}
    >
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
                style={{ backgroundImage: `url(${slide.image})` }}
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
              <span className="gradient-text">Bossplay .</span>
              <br />
              <span className="text-white">Feel The Vibe.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              The Invictus, One God is Enough, Asempa Ye Tsia.....
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://audiomack.com/bossplay-music"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Listen Now</span>
              </a>
              <a
                href="https://www.facebook.com/share/1BUd8EEovJ/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex items-center justify-center space-x-2"
              >
                <Music className="w-5 h-5" />
                <span>Join the Journey</span>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glow-card p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-accent-fuchsia" />
                <span className="text-accent-fuchsia font-semibold">
                  Next Event: {upcomingEvent ? upcomingEvent.title : 'No Upcoming Events'}
                </span>
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
