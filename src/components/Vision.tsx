import React from 'react';
import { motion } from 'framer-motion';
import { coreValues } from '../data';

export function Vision() {
  return (
    <section id="vision" className="section bg-primary">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-gold mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-white/80 mb-8">
              To redefine luxury through sound, creating timeless musical experiences that resonate with elegance, innovation, and soul.
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-gold mb-4">
              Our Mission
            </h3>
            <p className="text-xl text-white/80 mb-8">
              To produce and deliver world-class music and sound experiences for premium clients and audiences, while nurturing creative excellence across borders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-gold mb-8">
              Core Values
            </h3>
            <div className="grid gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-primary-purple/10 backdrop-blur-sm border border-white/10"
                >
                  <h4 className="text-xl font-serif font-semibold text-primary-gold mb-2">
                    {value.title}
                  </h4>
                  <p className="text-white/70">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}