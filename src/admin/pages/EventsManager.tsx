import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { uploadToCloudinary } from '../../lib/cloudinary';
import DashboardLayout from '../layout/DashboardLayout';
import { Calendar, MapPin, Trash2, ImagePlus } from 'lucide-react';
import dayjs from 'dayjs';

export default function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'upcoming' | 'ongoing' | 'past'>('upcoming');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (!error) setEvents(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !date || !time || !location) return;
    setLoading(true);
    try {
      const { secure_url } = await uploadToCloudinary(file);
      const startDateTime = `${date}T${time}`;
      const endDateTime = endDate && endTime ? `${endDate}T${endTime}` : null;

      await supabase.from('events').insert({
        title,
        date: startDateTime,
        end_date: endDateTime,
        location,
        image_url: secure_url,
      });
      setTitle('');
      setDate('');
      setTime('');
      setEndDate('');
      setEndTime('');
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

  const now = dayjs();

  const getStatus = (event: any) => {
    const start = dayjs(event.date);
    const end = event.end_date ? dayjs(event.end_date) : null;

    if (start.isSame(now, 'day') && (!end || end.isSame(now, 'day'))) return 'Today';
    if (end && now.isAfter(start) && now.isBefore(end)) return 'Ongoing';
    if (now.isBefore(start)) return 'Upcoming';
    return 'Past';
  };

  const filteredEvents = events.filter((event) => {
    const status = getStatus(event);
    return tab === 'upcoming'
      ? status === 'Upcoming'
      : tab === 'ongoing'
      ? status === 'Ongoing'
      : status === 'Past';
  });

  return (
    <DashboardLayout>
      <div className="text-white px-4 py-6">
        <h2 className="text-3xl font-bold mb-6">🎤 Manage Events</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {['upcoming', 'ongoing', 'past'].map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-xl capitalize ${
                tab === t ? 'bg-pink-600' : 'bg-gray-800'
              }`}
              onClick={() => setTab(t as any)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-2xl border border-white/10 shadow-lg space-y-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              placeholder="End Date (optional)"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              placeholder="End Time (optional)"
            />
            <label className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white cursor-pointer hover:border-pink-500 transition">
              <ImagePlus className="w-5 h-5" />
              <span>{file ? file.name : 'Upload Event Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Uploading...' : 'Add Event'}
          </button>
        </form>

        {/* Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const status = getStatus(event);
            return (
              <div
                key={event.id}
                className="bg-[#111] rounded-2xl overflow-hidden shadow-md border border-white/10 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold">{event.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        status === 'Today'
                          ? 'bg-yellow-500'
                          : status === 'Ongoing'
                          ? 'bg-blue-600'
                          : status === 'Upcoming'
                          ? 'bg-green-600'
                          : 'bg-gray-600'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-white/80 flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {dayjs(event.date).format('ddd, MMM D • h:mm A')}
                    {event.end_date && (
                      <span>
                        {' '} - {dayjs(event.end_date).format('h:mm A')}
                      </span>
                    )}
                  </p>
                  <p className="text-white/80 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="mt-3 inline-flex items-center gap-2 text-red-400 hover:text-red-600 text-sm transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
