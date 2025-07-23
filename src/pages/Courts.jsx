import { useState } from "react";
import { useNavigate } from "react-router";
import { TbLocationFilled } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import Pagination from "../components/Pagination";
import CourtBookingModal from "../components/CourtBookingModal";




const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  // React Query - fetch courts
  const {
    data: courtsData = [], isPending, isError, error } = useQuery({
      queryKey: ["courts-data"],
      queryFn: async () => {
        const res = await axiosSecure.get("/courts-data");
        return res.data;
      }
    });

  // Pagination logic
  const numberOfPages = Math.ceil(courtsData.length / itemPerPage);
  const paginatedCourts = courtsData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  // Handle court booking
  const handleBooking = (court) => {
    if (user) {
      setSelectedCourt({
        ...court,
        selectedSlot: selectedSlots[court.id] || null,
      });
      setModalOpen(true);
    } else {
      navigate("/auth/login");
    }
  };

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mt-4 mb-10 md:mb-16 text-center drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
        <span>Available</span>
        <div className="flex items-center gap-2">
          <span className="text-[#FF02CB]">Courts : {courtsData.length}</span>
          <TbLocationFilled className="rotate-180 text-3xl md:text-5xl" />
        </div>
      </h2>

      {/* Loading */}
      {isPending && <Loader />}

      {/* Empty state */}
      {!isPending && paginatedCourts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courts available at the moment.</p>
      )}

      {/* Court Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {paginatedCourts.map((court) => (
          <div
            key={court.id}
            className="relative group flex flex-col rounded-4xl overflow-hidden backdrop-blur bg-gradient-to-br from-[#FF02CB] to-black text-black font-semibold px-4 md:px-6 pt-10 pb-6 shadow-md transition-all duration-300 h-[600px]"
          >
            {/* Hover background image */}
            <img
              src={court.image}
              alt={court.courtType}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-125 transition-all duration-700 ease-in-out z-0"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-all duration-700 z-10" />

            {/* Thumbnail image */}
            <div className="relative z-20 mb-4 rounded-xl h-96 overflow-hidden">
              <img
                src={court.image}
                alt={court.courtType}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>

            {/* Court details */}
            <div className="relative z-30 flex flex-col p-6 text-center rounded-3xl group-hover:backdrop-blur group-hover:bg-gradient-to-r group-hover:from-pink-500/40 group-hover:to-fuchsia-500/30">
              <h3 className="text-3xl mb-4 font-bold text-[#FB2C36] bg-[#EFEAE6] px-6 py-2 rounded-full">
                {court.courtType} Court
              </h3>

              <div className="mb-4 text-left">
                <label className="block text-sm mb-2 bg-[#EFEAE6] px-4 w-fit py-1 rounded-full">
                  Select Slot
                </label>
                <select
                  className="w-full bg-[#EFEAE6] text-black border border-white rounded-md px-3 py-2 focus:outline-none"
                  value={selectedSlots[court.id] || ""}
                  onChange={(e) =>
                    setSelectedSlots({ ...selectedSlots, [court.id]: e.target.value })
                  }
                >
                  <option value="">-- Choose a slot --</option>
                  {court.slotTimes?.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-2xl md:text-3xl bg-[#EFEAE6] px-8 py-2 rounded-full text-[#FF02CB] font-hoover">
                $ {court.price}
              </p>
            </div>

            {/* Booking Button */}
            <div className="mt-4 flex justify-center relative z-30">
              <Button text="Book Now" onClick={() => handleBooking(court)} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!isPending && numberOfPages > 1 && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* Booking Modal */}
      {modalOpen && (
        <CourtBookingModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          court={selectedCourt}
          user={user}
        />
      )}
    </div>
  );
};

export default Courts;
