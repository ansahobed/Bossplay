import React from 'react';
import { Music, Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary py-16 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold gradient-text">
                BossPlay Music
              </span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
             Feel the Vibe. Hear the Soul.
               BossPlay Music is the live brand band that merges African roots, 
               soul, and global soundscapes into unforgettable audio experiences.


            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold gradient-text mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#music" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Latest Music
                </a>
              </li>
              <li>
                <a href="#videos" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Videos
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-heading font-bold gradient-text mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Live Performances
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Studio Production
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Mentorship
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Sonic Branding
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">
                  Film/TV Music
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-heading font-bold gradient-text mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <Mail className="w-5 h-5 text-accent-fuchsia" />
                <span>Bossplaygh@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-5 h-5 text-accent-blue" />
                <span>+233 24 258 1363</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone className="w-5 h-5 text-accent-blue" />
                <span>+233 53 077 3488</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent-green" />
                <span>Apollo/Dupaul House No.(66)-<br />Takoradi, Ghana</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-center md:text-left">
              &copy; {new Date().getFullYear()} BossPlay Music. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/50 hover:text-accent-fuchsia transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-accent-fuchsia transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 hover:text-accent-fuchsia transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}