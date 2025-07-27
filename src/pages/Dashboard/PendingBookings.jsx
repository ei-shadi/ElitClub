import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdSportsTennis } from 'react-icons/md';
import Loader from '../../shared/Loader';
import { TbLocationFilled } from 'react-icons/tb';
import showSwal from '../../shared/showSwal';

const PendingBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState(null); // store id to delete
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch pending bookings
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['pending-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings/pending');
      return res.data;
    },
  });

  // Delete booking mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-bookings']);
      setModalOpen(false);
      setDeleteId(null);
    },
  });

  const openModal = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      showSwal({ icon: 'success', title: 'Booking Cancelled!' });
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center text-red-500 mt-10">Failed to load bookings.</div>;

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl lg:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          <span className="text-[#FF02CB]">⏳ Pending</span> Bookings
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">🚫 No Pending Bookings Found.</p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-300 rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <MdSportsTennis className="text-pink-500" />
                    {booking.courtType} Court
                  </h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    {booking.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-1">
                  📅 <span className="font-medium">{booking.date}</span>
                </p>
                <p className="text-gray-600 mb-1">
                  ⏰ Slots: <span className="font-medium">{booking.slots?.join(', ')}</span>
                </p>
                <p className="text-gray-700 font-bold mt-2">💰 Total Price: ${booking.price}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Booked at: {new Date(booking.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() => openModal(booking._id)}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-black hover:scale-115 cursor-pointer text-white rounded-lg transition"
                  disabled={deleteMutation.isLoading && deleteId === booking._id}
                >
                  {deleteMutation.isLoading && deleteId === booking._id ? 'Canceling...' : 'Cancel Booking'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DaisyUI Modal */}
      <input type="checkbox" id="delete-modal" className="modal-toggle" checked={modalOpen} readOnly />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Cancellation</h3>
          <p className="py-4">Are you sure? Do you want to cancel this booking?</p>
          <div className="modal-action flex gap-4">
            <button onClick={closeModal} className="bg-gray-600 duration-200 py-2 px-4 rounded cursor-pointer text-white hover:scale-110">
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-600 duration-200 py-2 px-4 rounded hover:bg-black cursor-pointer text-white hover:scale-110"
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingBookings;
