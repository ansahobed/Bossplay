import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Send,
} from 'lucide-react';

// ✅ Custom TikTok Icon Component
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

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiry: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSuccess(true);

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      inquiry: '',
      message: '',
    });

    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="section bg-primary section-glow">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to create something amazing together? Let's talk about your next musical project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glow-card p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-white/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="neon-input w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="neon-input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white/80 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="neon-input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-white/80 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="neon-input w-full"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="booking">Live Performance Booking</option>
                    <option value="production">Music Production</option>
                    <option value="mentorship">Mentorship Program</option>
                    <option value="branding">Sonic Branding</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="neon-input w-full resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                {success && (
                  <p className="text-green-400 text-center pt-4 font-medium">
                    Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glow-card p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">Contact Details</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">Bossplaygh@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white font-medium">
                      +233 24 258 1363 / +233 53 077 3488 / +233 54 999 3624
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Address</p>
                    <p className="text-white font-medium">
                      Apollo/Dupaul House No. (66)
                      <br />
                      Takoradi, Ghana
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Icons including TikTok */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/80 mb-4">Follow us on social media</p>
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
                  <a href="https://www.tiktok.com/@bossplaycity?_t=ZM-8wYI6ufFRHM&_r=1" className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <TikTokIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
<div className="glow-card p-2 overflow-hidden">
  <div className="w-full h-80 rounded-lg overflow-hidden relative">
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Bossplay+Music"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10"
      aria-label="Bossplay HeadQuaters"
    ></a>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3975.239867593104!2d-1.7927755263594976!3d4.899470139905156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0xfe779e874e5e52f%3A0xbc867f9ea463dc05!2sBossplay%20Music%2C%20Nana%20Nketiah%20IV%20Street%2C%20Takoradi!3m2!1d4.8994648!2d-1.7902006!5e0!3m2!1sen!2sgh!4v1750940085934!5m2!1sen!2sgh"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Bossplay"
    ></iframe>
  </div>
</div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
