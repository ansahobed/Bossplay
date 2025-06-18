import React from 'react';
import { Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M12.766 2c.21 1.87 1.438 3.438 3.058 3.938.592.187 1.224.277 1.846.308v3.253a7.947 7.947 0 01-3.06-.726v6.3c0 2.955-2.378 5.353-5.31 5.353A5.332 5.332 0 014.99 14.79a5.33 5.33 0 015.31-5.348c.284 0 .568.027.841.084v3.26a2.062 2.062 0 00-.84-.178 2.06 2.06 0 00-2.065 2.065c0 1.13.935 2.065 2.065 2.065 1.128 0 2.064-.935 2.064-2.065V2h1.401z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-primary py-16 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <img
                  src="https://res.cloudinary.com/dqk4ys8ou/image/upload/v1750088582/masquerade_rj2rju.jpg"
                  alt="BossPlay Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-heading font-bold gradient-text">
                BossPlay 
              </span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              BossPlay is a dynamic live brand band fusing African roots, masquerade artistry, and soulful music into immersive, global sound experiences that move hearts and ignite stages.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/bossplaymusic/" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.youtube.com/@bossplaymusic3334" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.facebook.com/share/1BUd8EEovJ/" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://x.com/bossplay_music" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@bossplaycity?_t=ZM-8wYI6ufFRHM&_r=1" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold gradient-text mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-white/70 hover:text-accent-fuchsia transition-colors">About Us</a></li>
              <li><a href="#music" className="text-white/70 hover:text-accent-fuchsia transition-colors">Latest Music</a></li>
              <li><a href="#videos" className="text-white/70 hover:text-accent-fuchsia transition-colors">Videos</a></li>
              <li><a href="#events" className="text-white/70 hover:text-accent-fuchsia transition-colors">Upcoming Events</a></li>
              <li><a href="#gallery" className="text-white/70 hover:text-accent-fuchsia transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-heading font-bold gradient-text mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">Live Performances</a></li>
              <li><a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">Studio Production</a></li>
              <li><a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">Mentorship</a></li>
              <li><a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">Sonic Branding</a></li>
              <li><a href="#services" className="text-white/70 hover:text-accent-fuchsia transition-colors">Film/TV Music</a></li>
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
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0">
              <a href="#" className="text-white/50 hover:text-accent-fuchsia transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-accent-fuchsia transition-colors text-sm">
                Terms of Service
              </a>
              <p className="text-white/50 text-sm text-center md:text-left">
                Designed By: Smart Tech & IT Solutions (+233-24-258-1363)
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
