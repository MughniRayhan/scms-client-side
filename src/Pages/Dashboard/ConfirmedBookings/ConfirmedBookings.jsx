import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';

const ConfirmedBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  // Fetch confirmed bookings for the logged-in user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['confirmedBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed/${user.email}`);
      return res.data;
    }
  });

  

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg">
          <table className="table w-full">
            <thead className="bg-secondary font-bold text-gray-700">
              <tr>
                <th>#</th>
                <th>Court Type</th>
                <th>Slots</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.slots.join(', ')}</td>
                  <td>{booking.date}</td>
                  <td>${booking.price}</td>
                  <td className="text-green-600 font-bold">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
