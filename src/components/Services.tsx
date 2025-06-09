import React from 'react';
import { motion } from 'framer-motion';
import { Music, Mic2, Film, Users, Radio } from 'lucide-react';

export function Services() {
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
    <section id="services" className="section bg-primary">
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
          <button className="btn btn-primary">
            Get a Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}