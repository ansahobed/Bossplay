import React from 'react';
import { motion } from 'framer-motion';

export function VideoSection() {
  return (
    <section className="relative h-screen bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-gold mb-6">
              Experience Excellence
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Witness the fusion of minimalist aesthetics and powerful sound in our signature productions.
            </p>
            <button className="btn btn-outline">
              View Our Portfolio
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}