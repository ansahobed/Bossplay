import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lightbulb, Users, Hand, Landmark } from 'lucide-react';

export function AboutUs() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Discipline",
      description: "We stay consistent, focused, and committed to excellence in every performance and project."
    },
    {
      icon: Lightbulb,
      title: "Creativity",
      description: "We embrace innovation and originality, crafting experiences that surprise and inspire."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Together, we achieve more — collaboration is the rhythm of our success."
    },
    {
      icon: Hand,
      title: "Integrity",
      description: "We operate with honesty, trust, and respect — on stage and off."
    },
    {
      icon: Landmark,
      title: "Community Impact",
      description: "We uplift, educate, and energize the communities we serve through music and culture."
    }
  ];

  return (
    <section id="about" className="bg-primary py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="/images/bg-bossplay-stage.jpg" alt="Bossplay" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

      <div className="relative z-10 container max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-600 bg-clip-text text-transparent">
            About Bossplay
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 text-center max-w-3xl mx-auto mb-12"
        >
          From Music to Masquerade — Our Story of Passion, Vision, and Cultural Reinvention.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold gradient-text mb-4">Our Story</h3>
            <div className="bg-white/5 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                <span className="gradient-text font-semibold">Bossplay</span> began as a passionate music group, a tight-knit collective of young talents bound by rhythm, creativity, and the dream to make a mark in Ghana’s music scene. With nothing but instruments, heart, and harmony, we set stages alight, bringing joy to communities through sound.
              </p>
              <p>But we dreamed bigger.</p>
              <p>
                Fueled by determination and the desire to break new ground, Bossplay transformed from just a music group into a cultural powerhouse. We took a bold leap infusing our vibrant brassband roots with the dynamic flair of <span className="gradient-text font-semibold">Ankos (masquerade)</span> traditions. It was a daring blend of music and visual storytelling that no one had seen before in Takoradi.
              </p>
              <p>
                <span className="gradient-text font-semibold">Bossplay Music & Masquerade</span> became the first group in the city to pioneer this unique fusion and it wasn’t by chance. It was the result of years of persistence, sleepless nights, and the visionary guidance of <span className="gradient-text font-semibold">Kobby Yankey</span> — a legend in the brassband world whose leadership and experience helped shape our evolution.
              </p>
              <p>Today, we don’t just perform — we inspire.</p>
              <p>
                Bossplay stands as a living example of how <span className="gradient-text font-semibold">vision</span>, <span className="gradient-text font-semibold">hard work</span>, and <span className="gradient-text font-semibold">belief in one’s culture</span> can turn ordinary beginnings into extraordinary legacies. We are entertainers, culture bearers, and innovators — <span className="gradient-text font-semibold">proudly Ghanaian</span>, <span className="gradient-text font-semibold">boldly global</span>.
              </p>
              <p className="text-white font-bold italic pt-4 gradient-text">
                #AsempaYeTsia &nbsp; #OneGodIsEnough &nbsp; #TheInvictus
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold gradient-text mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl text-center border border-white/10 backdrop-blur group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4 group-hover:animate-float">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Vision and Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Our Vision</h3>
            <p className="text-white/70 text-base">
              To become a leading cultural and musical group in Ghana and beyond — preserving heritage while innovating entertainment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Our Mission</h3>
            <ul className="text-white/70 list-disc list-inside space-y-1 text-base">
              <li>To promote Ghanaian music and cultural identity.</li>
              <li>To offer high-quality performances at events, festivals, and social programs.</li>
              <li>To nurture young talent and create community engagement through the arts.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
