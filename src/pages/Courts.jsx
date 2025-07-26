import { useState } from "react";
import { useNavigate } from "react-router";
import { TbLocationFilled } from "react-icons/tb";
import { FaThLarge, FaTable } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

import Loader from "../shared/Loader";
import Pagination from "../components/Pagination";
import CourtBookingModal from "../components/Courts/CourtBookingModal";
import CourtCardView from "../components/Courts/CourtCardView";
import CourtTableView from "../components/Courts/CourtTableView";
import useAxios from "../hooks/useAxios";

const Courts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [viewType, setViewType] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = viewType === "table" ? 10 : 6;

  const { data: courtsData = [], isPending, isError, error } = useQuery({
    queryKey: ["courts-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  const numberOfPages = Math.ceil(courtsData.length / itemPerPage);
  const paginatedCourts = courtsData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

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
    <div className="min-h-screen px-4 py-20 md:py-40 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-10 ">
        {/* Centered Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 text-center drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mt-6 md:mt-4">
          <span>Available</span>
          <div className="flex items-center gap-2">
            <span className="text-[#FF02CB]">Courts : {courtsData.length}</span>
            <TbLocationFilled className="rotate-180 text-3xl md:text-5xl" />
          </div>
        </h2>

        {/* Toggle View Icons */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4 text-2xl bg-white px-4 py-2 rounded-full">
            <button
              title="Card View"
              onClick={() => setViewType("card")}
              className={` rounded-full hover:bg-[#FF02CB]/20 transition ${
                viewType === "card" ? "text-[#FF02CB]" : "text-gray-400"
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewType("table")}
              title="Table View"
              className={`rounded-full hover:bg-[#FF02CB]/20 transition ${
                viewType === "table" ? "text-[#FF02CB]" : "text-gray-400"
              }`}
            >
              <FaTable />
            </button>
          </div>
        </div>
      </div>

      {/* Loader */}
      {isPending && <Loader />}

      {/* No data */}
      {!isPending && paginatedCourts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courts available at the moment.</p>
      )}

      {/* Views */}
      {!isPending && viewType === "card" && (
        <CourtCardView
          courts={paginatedCourts}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          handleBooking={handleBooking}
        />
      )}

      {!isPending && viewType === "table" && (
        <CourtTableView
          courts={paginatedCourts}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          handleBooking={handleBooking}
        />
      )}

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
