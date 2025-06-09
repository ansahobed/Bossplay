import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

export function Events() {
  const events = [
    {
      date: '2025-02-15',
      title: 'KY Xperience',
      venue: 'National Theatre, Accra',
      time: '8:00 PM',
      status: 'upcoming',
      ticketLink: '#'
    },
    {
      date: '2025-03-08',
      title: 'Soul & Rhythm Festival',
      venue: 'Laboma Beach, Tema',
      time: '6:00 PM',
      status: 'upcoming',
      ticketLink: '#'
    },
    {
      date: '2025-03-22',
      title: 'Global Music Fusion',
      venue: 'Alliance Française, Accra',
      time: '7:30 PM',
      status: 'upcoming',
      ticketLink: '#'
    },
    {
      date: '2025-04-10',
      title: 'BossPlay Live Experience',
      venue: 'Movenpick Ambassador Hotel',
      time: '8:00 PM',
      status: 'upcoming',
      ticketLink: '#'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  return (
    <section id="events" className="section bg-primary section-glow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Upcoming Events</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join us for unforgettable live experiences across Ghana and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => {
            const dateInfo = formatDate(event.date);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glow-card p-6 group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex flex-col items-center justify-center text-white group-hover:animate-pulse-glow">
                      <span className="text-xs font-medium">{dateInfo.month}</span>
                      <span className="text-lg font-bold">{dateInfo.day}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-white mb-3">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-white/70">
                        <MapPin className="w-4 h-4 text-accent-fuchsia" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <Clock className="w-4 h-4 text-accent-blue" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <Calendar className="w-4 h-4 text-accent-green" />
                        <span className="text-sm">{dateInfo.year}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-accent-green/20 text-accent-green text-xs font-medium rounded-full">
                        {event.status}
                      </span>
                      <a
                        href={event.ticketLink}
                        className="flex items-center space-x-1 text-accent-fuchsia hover:text-white transition-colors"
                      >
                        <span className="text-sm font-medium">Get Tickets</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="btn btn-outline">
            View All Events
          </button>
        </motion.div>
      </div>
    </section>
  );
}