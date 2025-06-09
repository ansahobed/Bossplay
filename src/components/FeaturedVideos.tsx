import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

export function FeaturedVideos() {
  const videos = [
    {
      title: "Live at Accra Music Festival",
      thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
      duration: "4:32",
      views: "2.1M",
      youtube: "#",
    },
    {
      title: "Behind the Scenes: Studio Sessions",
      thumbnail: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
      duration: "6:15",
      views: "890K",
      youtube: "#",
    },
    {
      title: "Afrobeat Fusion Performance",
      thumbnail: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg",
      duration: "5:28",
      views: "1.5M",
      youtube: "#",
    },
  ];

  return (
    <section id="videos" className="section bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Featured Videos</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Watch our latest performances and behind-the-scenes content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Main Featured Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={videos[0].thumbnail}
                alt={videos[0].title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent-fuchsia rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  {videos[0].title}
                </h3>
                <div className="flex items-center justify-between text-white/80">
                  <span>{videos[0].views} views</span>
                  <span>{videos[0].duration}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Videos */}
          <div className="space-y-6">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex space-x-4 glow-card p-4 group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-fuchsia rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </button>
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-heading font-semibold text-white mb-2">
                    {video.title}
                  </h4>
                  <p className="text-white/60 text-sm">{video.views} views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href="#"
            className="btn btn-outline inline-flex items-center space-x-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View All on YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}