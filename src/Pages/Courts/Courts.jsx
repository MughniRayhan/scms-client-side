import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Courts = () => {
  const courtsData = useLoaderData(); // fetched from courts.json
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [slotsByCourt, setSlotsByCourt] = useState({}); // Track slots per court ID or index
  const [date, setDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourts = courtsData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(courtsData.length / itemsPerPage);

  const openBookingModal = (court, key) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedCourt({
        ...court,
        selectedSlots: slotsByCourt[key] || [],
      });
      setDate("");
      document.getElementById("booking_modal").showModal();
    }
  };

  const handleBooking = async () => {
    const selectedSlots = selectedCourt?.selectedSlots || [];

    if (!date || selectedSlots.length === 0) {
      toast.error("Please select date and at least one slot");
      return;
    }

    const bookingData = {
      courtId: selectedCourt._id, // if using MongoDB _id later
      courtType: selectedCourt.type,
      slots: selectedSlots,
      date,
      price: selectedSlots.length * selectedCourt.pricePerSession,
      userEmail: user.email, // from Firebase user
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking requested successfully!");
      } else {
        toast.success("Booking requested (no insertedId returned)");
      }
      document.getElementById("booking_modal").close();
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  // Handle slot selection in cards per court key (_id or index)
  const handleSlotChange = (e, key) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSlotsByCourt((prev) => ({
      ...prev,
      [key]: selected,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-accent">Available Courts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCourts.map((court, index) => {
          const key = court._id || index; // Use _id if available, else fallback
          return (
            <div key={key} className="card bg-base-100 shadow-xl transform hover:scale-105 transition duration-300">
              <figure>
                <img
                  src={court.image}
                  alt={court.type}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-accent">{court.type}</h2>
                <p>Price per session: ${court.pricePerSession}</p>
<label className="font-semibold">Select Slots:</label>
<p className="text-sm text-gray-400">Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</p>
 <select
  className="select select-bordered w-full mt-2 h-20"
  multiple
  value={slotsByCourt[key] || []}
  onChange={(e) => handleSlotChange(e, key)}
>
  {court.slots.map((slot, idx) => (
    <option key={idx} value={slot}>
      {slot}
    </option>
  ))}
</select>
                <button
                  onClick={() => openBookingModal(court, key)}
                  className="btn btn-primary mt-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <div className="join">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`join-item btn ${
                currentPage === num + 1 ? "btn-active" : ""
              } bg-secondary border border-white text-white`}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="booking_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Book {selectedCourt?.type}</h3>
          <p className="py-2">
            Price per session: ${selectedCourt?.pricePerSession}
          </p>
          <p className="py-2">
            Selected Slots: {selectedCourt?.selectedSlots?.join(", ") || "None"}
          </p>
          <input
            type="date"
            className="input input-bordered w-full my-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <p>
            Total Price: $
            {(selectedCourt?.selectedSlots?.length || 0) *
              (selectedCourt?.pricePerSession || 0)}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn text-white">Close</button>
            </form>
            <button onClick={handleBooking} className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Courts;
