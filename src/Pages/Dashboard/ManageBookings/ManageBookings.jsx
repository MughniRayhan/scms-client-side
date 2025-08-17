import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';

const ManageBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState('');

  // Fetch confirmed bookings for all users
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['allConfirmedBookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/confirmed/all', {
        params: { search }
      });
      return res.data;
    }
  });

  // Fetch all payments
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['allPayments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/all');
      return res.data;
    }
  });

  if (bookingsLoading || paymentsLoading) return <Loader />;

  // Helper function to get paid price for a booking
  const getPaidPrice = (bookingId) => {
    const payment = payments.find(p => p.bookingId === bookingId);
    return payment ? payment.price : 'N/A';
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Manage Bookings</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by court type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="overflow-x-auto border bg-white dark:bg-gray-800 border-gray-300 rounded-lg">
        <table className="table w-full">
          <thead className="bg-secondary dark:bg-orange-400 font-bold text-gray-700 dark:text-white">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Court Type</th>
              <th>Slots</th>
              <th>Date</th>
              <th>Paid Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.courtType}</td>
                <td>{booking.slots.join(', ')}</td>
                <td>{booking.date}</td>
                <td>
                  {
                    getPaidPrice(booking._id)
                      ? `$${getPaidPrice(booking._id)}`
                      : <span className="text-red-500">Not Paid</span>
                  }
                </td>
                <td>{booking.status}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
