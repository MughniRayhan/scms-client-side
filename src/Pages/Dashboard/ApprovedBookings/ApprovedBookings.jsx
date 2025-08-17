import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import Loader from '../../../Components/Loader/Loader';
import { FaTimesCircle, FaMoneyCheckAlt } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';

const ApprovedBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const {user} = UseAuth();

  // Fetch approved bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${user.email}`);
      return res.data;
    }
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/bookings/cancel/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking cancelled');
      queryClient.invalidateQueries(['approvedBookings']);
      queryClient.invalidateQueries(['pendingBookings']); // to update admin dashboard if used
    },
    onError: () => toast.error('Failed to cancel booking'),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Approved Bookings</h2>

      <div className="overflow-x-auto border bg-white dark:bg-gray-800 border-gray-300 rounded-lg mt-6">
        <table className="table w-full">
          <thead className="bg-secondary font-bold text-gray-700 dark:bg-orange-400 dark:text-white">
            <tr>
              <th>#</th>
              <th>Court Type</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.courtType}</td>
                <td>{booking.date}</td>
                <td>{booking.slots.join(', ')}</td>
                <td>${booking.price}</td>
                <td className="capitalize">{booking.status}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/payment/${booking._id}`}
                    className="btn btn-primary btn-sm flex items-center gap-2"
                  >
                    <FaMoneyCheckAlt /> Pay
                  </Link>
                  <button
                    onClick={() => cancelBookingMutation.mutate(booking._id)}
                    className="btn btn-error btn-sm flex items-center gap-2 text-white"
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No approved bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedBookings;
