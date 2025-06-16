import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const navItems = [
  { name: 'Hero Slider', path: '/admin/hero-slider' },
  { name: 'Gallery', path: '/admin/gallery' },
  { name: 'Featured Videos', path: '/admin/videos' },
  { name: 'Partners', path: '/admin/partners' },
  { name: 'Testimonials', path: '/admin/testimonials' },
  { name: 'Events', path: '/admin/events' },
  { name: 'Awards', path: '/admin/awards' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black bg-opacity-80 backdrop-blur-lg border-r border-neutral-800 px-6 py-8 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-10 text-pink-500 tracking-wide">BossPlay Admin</h1>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-md font-semibold transition duration-200 ${
                  location.pathname === item.path
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'hover:bg-neutral-800 hover:text-pink-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Dashboard</h2>
          <span className="text-sm text-neutral-400">Welcome, Admin</span>
        </div>

        {/* Content */}
        <div className="bg-neutral-900 p-6 rounded-xl shadow-lg">{children}</div>
      </main>
    </div>
  );
}
