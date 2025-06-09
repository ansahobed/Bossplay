import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';


export function LatestReleases() {
  const releases = [
    {
      title: "Afrobeat Vibes",
      artist: "BossPlay Music",
      cover: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      audiomack: "https://audiomack.com/bossplay-music",
      apple: "#",
      boomplay: "#",
    },
    {
      title: "Soul Connection",
      artist: "BossPlay Music",
      cover: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      AudioMack: "https://audiomack.com/bossplay-music",
      apple: "#",
      boomplay: "#",
    },
    {
      title: "Global Harmony",
      artist: "BossPlay Music",
      cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
      audiomack: "https://audiomack.com/bossplay-music",
      apple: "#",
      boomplay: "#",
    },
  ];

  return (
    <section id="music" className="section bg-primary section-glow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Latest Releases</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience our newest sounds that blend Afrobeats with global music energy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glow-card p-6 group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={release.cover}
                  alt={release.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-fuchsia rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
              
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                {release.title}
              </h3>
              <p className="text-white/60 mb-4">{release.artist}</p>
              
              <div className="flex space-x-4">
                <a
                  href={release.audiomack}
                  className="flex items-center space-x-2 text-accent-green hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">AudioMack</span>
                </a>
                <a
                  href={release.apple}
                  className="flex items-center space-x-2 text-accent-blue hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Apple Music</span>
                </a>
                <a
                  href={release.boomplay}
                  className="flex items-center space-x-2 text-accent-orange hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Boomplay</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}