import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';
import { Link } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const MemberDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  

  // Fetch pending bookings
  const { data: pendingBookings = [], isLoading: loadingPending } = useQuery({
    queryKey: ['pendingBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/pending/${user.email}`);
      return res.data;
    }
  });

  // Fetch approved bookings
  const { data: approvedBookings = [], isLoading: loadingApproved } = useQuery({
    queryKey: ['approvedBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${user.email}`);
      return res.data;
    }
  });

  // Fetch confirmed bookings
  const { data: confirmedBookings = [], isLoading: loadingConfirmed } = useQuery({
    queryKey: ['confirmedBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed/${user.email}`);
      return res.data;
    }
  });

  // Fetch payments
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    }
  });

  if (loadingPending || loadingApproved || loadingConfirmed || loadingPayments) return <Loader />;

  // Prepare data for Bar Chart (bookings by status)
  const bookingStatusData = [
    { status: 'Pending', count: pendingBookings.length },
    { status: 'Approved', count: approvedBookings.length },
    { status: 'Confirmed', count: confirmedBookings.length }
  ];

  // Prepare data for Pie Chart (payments distribution)
  const paymentData = payments.map(p => ({
    name: p.courtType,
    value: p.price
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div className="p-6 space-y-8 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-accent mb-4">Member Dashboard</h2>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div data-aos="fade-up" className="bg-primary text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Pending Bookings</h3>
          <p className="text-4xl font-bold mt-2">{pendingBookings.length}</p>
          <Link to="/dashboard/pendingBookings" className="underline mt-2 block">View Pending</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="bg-secondary dark:bg-pink-800 dark:text-white text-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Approved Bookings</h3>
          <p className="text-4xl font-bold mt-2">{approvedBookings.length}</p>
          <Link to="/dashboard/approved-bookings" className="underline mt-2 block">View Approved</Link>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="bg-accent dark:bg-green-600 text-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold">Confirmed Bookings</h3>
          <p className="text-4xl font-bold mt-2">{confirmedBookings.length}</p>
          <Link to="/dashboard/confirmedBookings" className="underline mt-2 block">View Confirmed</Link>
        </div>
      </div>

      {/* Bar Chart for Bookings by Status */}
      <div data-aos="fade-up" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-4 text-primary">Your Bookings by Status</h3>
        {bookingStatusData.every(d => d.count === 0) ? (
          <p>No bookings data to show.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingStatusData}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart for Payments */}
      <div data-aos="fade-up" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h3 className="text-2xl font-bold mb-4 text-primary">Your Payments by Court Type</h3>
        {paymentData.length === 0 ? (
          <p>No payments data to show.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {paymentData.map((entry, index) => (
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

export default MemberDashboard;
