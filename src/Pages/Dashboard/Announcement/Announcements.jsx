import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader/Loader';
import { FaBullhorn } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const Announcements = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent flex items-center gap-2">
        <FaBullhorn /> Announcements
      </h2>
      {announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="border border-secondary p-4 rounded-xl shadow transform hover:bg-base-100 transition duration-300">
              <h3 className="text-xl font-semibold text-secondary">{announcement.title}</h3>
              <p className="text-gray-700">{announcement.text}</p>
              <p className="text-gray-500 text-sm">
                {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
