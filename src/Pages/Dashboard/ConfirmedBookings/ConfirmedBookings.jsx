import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';

const ConfirmedBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  // Fetch confirmed bookings for the logged-in user
  const { data, isLoading } = useQuery({
  queryKey: ['confirmedBookingsAndPayments', user.email],
  queryFn: async () => {
    const [bookingsRes, paymentsRes] = await Promise.all([
      axiosSecure.get(`/bookings/confirmed/${user.email}`),
      axiosSecure.get(`/payments/user/${user.email}`)
    ]);

    return {
      bookings: bookingsRes.data,
      payments: paymentsRes.data
    };
  }
});

  

  if (isLoading) return <Loader />;

const { bookings, payments } = data;

const mergedBookings = bookings.map(booking => {
  const payment = payments.find(p => p.bookingId === booking._id);

  return {
    ...booking,
    paidPrice: payment ? payment.price : booking.price // use paid price if exists, else original
  };
});

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto border bg-white dark:bg-gray-800 border-gray-300 rounded-lg">
          <table className="table w-full">
            <thead className="bg-secondary font-bold text-gray-700 dark:bg-orange-400 dark:text-white">
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
              {mergedBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.slots.join(', ')}</td>
                  <td>{booking.date}</td>
                  <td>${booking.paidPrice}</td>
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
