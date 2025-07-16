import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const UserDashboard = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

 

  // Fetch pending bookings
  const { data: pendingBookings = [], isLoading: loadingPending } = useQuery({
    queryKey: ['pendingBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/pending/${user.email}`);
      return res.data;
    }
  });

  // Fetch announcements
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  if (loadingPending || loadingAnnouncements) return <Loader />;

  // Prepare data for Bar Chart (bookings per court type)
  const courtTypeData = Object.values(
    pendingBookings.reduce((acc, cur) => {
      acc[cur.courtType] = acc[cur.courtType] || { courtType: cur.courtType, count: 0 };
      acc[cur.courtType].count += 1;
      return acc;
    }, {})
  );



  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-accent mb-4">Welcome, {user.displayName}</h2>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div data-aos="fade-up" className="bg-primary text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Pending Bookings</h3>
          <p className="text-4xl font-bold mt-2 px-5 ">{pendingBookings.length}</p>
          <Link to="/dashboard/pendingBookings" className="underline mt-2 block">View</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="bg-secondary text-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">My Profile</h3>
          <p className="mt-2">View and update your profile information.</p>
          <Link to="/dashboard/myProfile" className="underline mt-2 block ">Go to Profile</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="bg-accent text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Announcements</h3>
          <p className="text-4xl font-bold mt-2">{announcements.length}</p>
          <Link to="/dashboard/announcements" className="underline mt-2 block">View</Link>
        </div>
      </div>

      {/* Bar Chart for Pending Bookings */}
      <div data-aos="fade-up" className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-4 text-primary">Pending Bookings by Court Type</h3>
        {courtTypeData.length === 0 ? (
          <p>No pending bookings data to show.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courtTypeData}>
              <XAxis dataKey="courtType" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      
    </div>
  );
};

export default UserDashboard;
