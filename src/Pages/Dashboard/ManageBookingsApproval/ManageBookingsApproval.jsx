import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';

const ManageBookingsApproval = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/pending');
      return res.data;
    }
  });

  // Approve mutation
  const approveBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/bookings/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking approved and user promoted to member');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: () => toast.error('Approval failed'),
  });

  // Reject mutation
  const rejectBookingMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Booking rejected and removed');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: () => toast.error('Rejection failed'),
  });

  if (isLoading) return <div><Loader/></div>;

  return (
    <div className=" px-12 py-10 bg-white  shadow-md min-h-screen ">
      <h2 className="text-3xl font-extrabold text-accent mb-2">Manage Bookings Approval</h2>

      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6">
        <table className="table  w-full">
          <thead className="bg-secondary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Court</th>
              <th>Slots</th>
              <th>Date</th>
              <th>Price</th>
              <th>User Email</th>
              <th>Actions</th>
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
                <td>{booking.userEmail}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => approveBookingMutation.mutate(booking._id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectBookingMutation.mutate(booking._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No pending bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookingsApproval;

