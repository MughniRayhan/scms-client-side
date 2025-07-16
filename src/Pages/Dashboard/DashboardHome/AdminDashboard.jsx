import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();

 
  // Fetch bookings data
  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['allBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/confirmed/all');
      return res.data;
    }
  });

  // Fetch users data
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Fetch courts data
  const { data: courts = [], isLoading: loadingCourts } = useQuery({
    queryKey: ['allCourts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts/all');
      return res.data;
    }
  });

  // Fetch members data
  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members');
      return res.data;
    }
  });

  if (loadingBookings || loadingUsers || loadingCourts || loadingMembers) return <Loader />;

  // Prepare data for Bar Chart (bookings per court type)
  const courtTypeData = Object.values(
    bookings.reduce((acc, cur) => {
      acc[cur.courtType] = acc[cur.courtType] || { courtType: cur.courtType, count: 0 };
      acc[cur.courtType].count += 1;
      return acc;
    }, {})
  );

  // Prepare data for Pie Chart (user roles distribution)
  const roleData = Object.values(
    users.reduce((acc, cur) => {
      const role = cur.role || "user";
      acc[role] = acc[role] || { name: role, value: 0 };
      acc[role].value += 1;
      return acc;
    }, {})
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-accent mb-4">Admin Dashboard</h2>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div data-aos="fade-up" className="bg-primary text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Total Bookings</h3>
          <p className="text-4xl font-bold mt-2">{bookings.length}</p>
          <Link to="/dashboard/manageBookings" className="underline mt-2 block">Manage Bookings</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="bg-secondary text-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{users.length}</p>
          <Link to="/dashboard/allUsers" className="underline mt-2 block">All Users</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="bg-accent text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Total Courts</h3>
          <p className="text-4xl font-bold mt-2">{courts.length}</p>
          <Link to="/dashboard/manageCourts" className="underline mt-2 block">Manage Courts</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="300" className="bg-purple-500 text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Total Members</h3>
          <p className="text-4xl font-bold mt-2">{members.length}</p>
          <Link to="/dashboard/manageMembers" className="underline mt-2 block">Manage Members</Link>
        </div>
      </div>

      {/* Bar Chart for Bookings by Court Type */}
      <div data-aos="fade-up" className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-4 text-primary">Bookings by Court Type</h3>
        {courtTypeData.length === 0 ? (
          <p>No bookings data to show.</p>
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

      {/* Pie Chart for User Roles */}
      <div data-aos="fade-up" className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-4 text-primary">User Roles Distribution</h3>
        {roleData.length === 0 ? (
          <p>No users data to show.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
