import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loader from "../../../Components/Loader/Loader";

const PendingBookings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/pending/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
       const res = await axiosSecure.patch(`/bookings/cancel/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries(["pendingBookings"]);
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });

  const handleCancel = (id) => {
    cancelBookingMutation.mutate(id);
  };

  if (isLoading) return <Loader/>;

  return (
    <div className=" px-12 py-10 bg-white  shadow-md min-h-screen ">
      <h2 className="text-3xl font-extrabold text-accent mb-2">Pending Bookings</h2>

      <div className="overflow-x-auto border bg-white border-gray-300 rounded-lg mt-6">
        <table className="table  w-full">
          <thead className="bg-secondary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Court</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.courtType}</td>
                <td>{booking.date}</td>
                <td>{booking.slots.join(", ")}</td>
                <td>${booking.price}</td>
                <td>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-error btn-sm text-white flex items-center gap-2"
                  >
                    <FaTrash /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 py-3">No pending bookings.</p>
        )}
      </div>
    </div>
  );
};

export default PendingBookings;
