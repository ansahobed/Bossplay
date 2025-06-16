import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';

export default function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setEvents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !date || !location) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      await supabase.from('events').insert({
        title,
        date,
        location,
        image_url: secure_url,
      });
      setTitle('');
      setDate('');
      setLocation('');
      setFile(null);
      fetchEvents();
    } catch (err) {
      console.error('Event upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  return (
    <DashboardLayout>
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-6">Events Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Uploading...' : 'Add Event'}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-white">
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <p className="text-white/80 text-sm">
                  📅 {event.date} <br /> 📍 {event.location}
                </p>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="mt-2 text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
