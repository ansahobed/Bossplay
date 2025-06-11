import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LatestReleases } from './components/LatestReleases';
import { FeaturedVideos } from './components/FeaturedVideos';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Partners } from './components/Partners';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';


function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LatestReleases />
      <FeaturedVideos />
      <AboutUs />
      <Services />
      <Events />
      <Gallery />
      <Awards />
      <Testimonials />
      <Partners />
      <Contact />
      <Footer />
      
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
