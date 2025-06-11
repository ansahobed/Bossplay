import React from 'react';
import { motion } from 'framer-motion';
import { awards } from '../data';



export function Awards() {
  return (
    <section id="awards" className="section bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-gold mb-6">
            Awards & Recognition
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Celebrating excellence in luxury sound and musical innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award: Award, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 rounded-lg bg-primary-purple/10 backdrop-blur-sm border border-white/10 hover:border-primary-gold/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{award.icon}</div>
              <h3 className="text-xl font-serif font-semibold text-primary-gold mb-4">
                {award.title}
              </h3>
              <p className="text-white/70">{award.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
