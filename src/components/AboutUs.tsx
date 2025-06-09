import React from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Globe, Star } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: Music,
      title: "Musical Excellence",
      description: "Crafting sounds that move souls and transcend boundaries"
    },
    {
      icon: Heart,
      title: "Authentic Soul",
      description: "Every beat carries the essence of African rhythm and global harmony"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting cultures through the universal language of music"
    },
    {
      icon: Star,
      title: "Innovation",
      description: "Pushing creative boundaries while honoring musical traditions"
    }
  ];

  return (
    <section id="about" className="section bg-primary section-glow">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="gradient-text">Our Story</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              BossPlay Music emerged from the vibrant streets of Ghana, where Afrobeats meets global sounds. 
              We are more than musicians – we are storytellers, culture carriers, and dream weavers.
            </p>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Our journey began with a simple belief: music has the power to unite, heal, and inspire. 
              From local stages to international platforms, we've carried the soul of Africa to the world, 
              creating sounds that resonate across continents.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold gradient-text mb-4">Vision</h3>
                <p className="text-white/70">
                  To be the leading force in Afrobeats and global music fusion, 
                  creating timeless sounds that celebrate our heritage while embracing the future.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold gradient-text mb-4">Mission</h3>
                <p className="text-white/70">
                  To produce exceptional music that bridges cultures, mentors emerging talent, 
                  and delivers unforgettable experiences that move both body and soul.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glow-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 group-hover:animate-float">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-heading font-bold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-white/70 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}