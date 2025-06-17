// src/admin/pages/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const sections = [
  { title: 'Hero Slider', path: '/admin/hero-slider' },
  { title: 'Gallery', path: '/admin/gallery' },
  { title: 'Featured Videos', path: '/admin/featured-videos' },
  { title: 'Partners', path: '/admin/partners' },
  { title: 'Testimonials', path: '/admin/testimonials' },
  { title: 'Events', path: '/admin/events' },
  { title: 'Awards', path: '/admin/awards' },
  { title: 'Latest Releases', path: '/admin/LatestReleases' },
];

export default function AdminHomePage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 text-center font-medium"
          >
            {section.title}
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
