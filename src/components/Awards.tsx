import React from 'react';
import { motion } from 'framer-motion';
import { awards } from '../data';

export function Awards() {
  return (
    <section
      id="awards"
      className="section scroll-mt-24 bg-primary section-glow"
    >
      <div className="container">
        {/* Section Header (styled like Partners) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-3">
            Awards & Recognition
          </h2>
          <div className="h-1 w-16 bg-primary-gold mx-auto mb-4 rounded-full"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Celebrating excellence in luxury sound and musical innovation
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card text-center p-6 sm:p-8 transition-all duration-300 hover:border-primary-gold/50"
            >
              <div className="text-5xl mb-4 text-primary-gold">{award.icon}</div>
              <h3 className="text-xl font-semibold font-serif text-primary-gold mb-2">
                {award.title}
              </h3>
              <p className="text-white/70 text-sm">{award.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
