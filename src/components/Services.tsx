import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Mic2, Film, Users, Radio, Mail, MessageCircleMore, X } from 'lucide-react';

export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: Music,
      title: 'Live Performances',
      description: 'Electrifying live shows that bring Afrobeats energy to any venue or event.',
      features: ['Concert performances', 'Festival appearances', 'Private events', 'Corporate shows']
    },
    {
      icon: Mic2,
      title: 'Studio Production',
      description: 'Professional music production services with our signature Afrobeats-global fusion.',
      features: ['Music production', 'Recording services', 'Mixing & mastering', 'Songwriting']
    },
    {
      icon: Film,
      title: 'Sound for Film/TV',
      description: 'Custom soundtracks and music licensing for visual media projects.',
      features: ['Original soundtracks', 'Music licensing', 'Audio post-production', 'Sync placements']
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Guiding the next generation of African artists to global success.',
      features: ['Artist development', 'Industry guidance', 'Performance coaching', 'Career planning']
    },
    {
      icon: Radio,
      title: 'Sonic Branding',
      description: 'Creating distinctive audio identities for brands and businesses.',
      features: ['Brand jingles', 'Audio logos', 'Commercial music', 'Sound design']
    }
  ];

  return (
    <section id="services" className="section bg-primary relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From live performances to studio production, we deliver excellence across all musical experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glow-card p-8 group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6 group-hover:animate-float">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-heading font-bold text-white mb-4">
                {service.title}
              </h3>

              <p className="text-white/70 mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-white/60">
                    <div className="w-1.5 h-1.5 bg-accent-fuchsia rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            Get a Quote
          </button>
        </motion.div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
            <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-4 text-primary">Get a Quote</h3>
              <p className="text-gray-700 mb-6">
                Reach out to us directly through WhatsApp or Email and we’ll get back to you with a personalized quote.
              </p>

              <div className="flex flex-col space-y-3">
                <a
                  href="https://wa.me/233242581363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center justify-center space-x-2"
                >
                  <MessageCircleMore className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                    href="mailto:bossplaygh@gmail.com?subject=Quote%20Request&body=Hi%20BossPlay,%0D%0A%0D%0AI'm%20interested%20in%20getting%20a%20quote%20for%20your%20services.%20Please%20let%20me%20know%20the%20next%20steps.%0D%0A%0D%0ARegards,%0D%0A[Your%20Name]"
                    className="btn btn-outline flex items-center justify-center space-x-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                     <Mail className="w-5 h-5" />
                        <span>Email Us</span>
                      </a>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
