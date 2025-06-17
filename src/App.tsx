import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Website Components
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

// Admin Auth
import Login from './admin/auth/login';
import Register from './admin/auth/register';
import ProtectedRoute from './admin/auth/ProtectedRoute';

// Admin Pages
import HeroSliderManager from './admin/pages/HeroSliderManager';
import GalleryManager from './admin/pages/GalleryManager';
import VideoManager from './admin/pages/FeaturedVideoManager';
import PartnersManager from './admin/pages/PartnersManager';
import TestimonialsManager from './admin/pages/TestimonialsManager';
import EventsManager from './admin/pages/EventsManager';
import AwardsManager from './admin/pages/AwardsManager';
import LatestReleasesManager from './admin/pages/LatestReleasesManager'; // 👈 ADD THIS LINE

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
        {/* 🌍 Public Site */}
        <Route path="/" element={<HomePage />} />

        {/* 🔐 Admin Auth */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />

        {/* 🛡️ Protected Admin Dashboard Pages */}
        <Route
          path="/admin/hero-slider"
          element={
            <ProtectedRoute>
              <HeroSliderManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <GalleryManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <ProtectedRoute>
              <VideoManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <ProtectedRoute>
              <PartnersManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialsManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <EventsManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/awards"
          element={
            <ProtectedRoute>
              <AwardsManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/latest-releases" // 👈 ADD THIS ROUTE
          element={
            <ProtectedRoute>
              <LatestReleasesManager />
            </ProtectedRoute>
          }
        />

        {/* 🔁 Redirect all unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
