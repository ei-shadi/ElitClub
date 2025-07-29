import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdSportsTennis } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbLocationFilled } from "react-icons/tb";
import showSwal from "../../../shared/showSwal";
import Loader from "../../../shared/Loader";
import { FcApproval } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const ApprovedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch approved bookings for logged in user
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["approvedBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/approved");
      return res.data;
    },
  });

  // Mutation to cancel (delete) booking
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["approvedBookings"]);
      showSwal({ icon: "success", title: "Booking Cancelled!" });
      setModalOpen(false);
      setDeleteId(null);
    },
  });

  // Open modal confirmation dialog to cancel booking
  const openModal = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Close modal without action
  const closeModal = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  // Navigate to payment page with booking data passed in state
  const handlePayment = (booking) => {
    navigate("/dashboard/payments", { state: booking });
  };

  // Confirm deletion of booking
  const handleDeleteConfirm = () => {
    if (deleteId) cancelMutation.mutate(deleteId);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load approved bookings.
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Approved Bookings - EliteClub</title>
      </Helmet>

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl lg:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          <FcApproval className="text-4xl md:text-5xl" />
          <span className="text-[#FF02CB]">Approved</span> Bookings
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">
            🚫 No Approved Bookings Found.
          </p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-300 rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <MdSportsTennis className="text-green-500" />
                    {booking.courtType} Court
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {booking.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-1">
                  📅 <span className="font-medium">{booking.date}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  ⏰ Slots: <span className="font-medium">{booking.slots?.join(", ")}</span>
                </p>
                <p className="text-gray-700 font-bold mt-2">💰 Total Price: ${booking.price}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Booked at: {new Date(booking.createdAt).toLocaleString()}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handlePayment(booking)}
                    className="px-4 py-2 bg-green-600 hover:bg-black hover:scale-110 cursor-pointer text-white rounded-lg transition flex items-center gap-2 justify-center"
                    disabled={cancelMutation.isLoading}
                  >
                    <FaMoneyBillWave /> Pay Now
                  </button>

                  <button
                    onClick={() => openModal(booking._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-black hover:scale-110 cursor-pointer text-white rounded-lg transition"
                    disabled={cancelMutation.isLoading && deleteId === booking._id}
                  >
                    {cancelMutation.isLoading && deleteId === booking._id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DaisyUI Modal */}
      <input type="checkbox" className="modal-toggle" checked={modalOpen} readOnly />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Cancellation</h3>
          <p className="py-4">Are you sure you want to cancel this approved booking?</p>
          <div className="modal-action flex gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-600 py-2 px-4 rounded text-white hover:scale-110 cursor-pointer"
              disabled={cancelMutation.isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-600 py-2 px-4 rounded text-white hover:scale-110 cursor-pointer"
              disabled={cancelMutation.isLoading}
            >
              {cancelMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovedBookings;
