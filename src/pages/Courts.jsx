import { TbLocationFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import CourtBookingModal from "../components/CourtBookingModal";
import Pagination from "../components/Pagination";
import Loader from "../shared/Loader";
import axios from "axios";


const Courts = () => {
  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courtsDataResponse = await axios(`${import.meta.env.VITE_API_URL}/courts-data`);
        const courtsData = await courtsDataResponse.data;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCourtsData(courtsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const { user } = useAuth();
  const [courtsData, setCourtsData] = useState([]);
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const numberOfPages = Math.ceil(courtsData?.length / itemPerPage);

  // Calculate which courts to show on current page
  const paginatedCourts = courtsData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );



  // Handle Booking Button
  const handleBooking = (court) => {
    if (user) {
      setSelectedCourt(court);
      setModalOpen(true);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="min-h-screen py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mt-4 mb-10 md:mb-16 text-center drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
        <span>Available</span>

        <div className="flex items-center gap-2">
          <span className="text-[#FF02CB]">Courts : {courtsData?.length}</span>
          <TbLocationFilled className="rotate-180 text-3xl md:text-5xl" />
        </div>
      </h2>

      {/* Courts Card Details */}
      <div >
        {loading && <Loader />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedCourts?.map((court) => (
            <div
              key={court.id}
              className="relative group flex flex-col rounded-4xl overflow-hidden backdrop-blur bg-gradient-to-br from-[#FF02CB] to-black text-black font-semibold px-4 md:px-6 pt-10 pb-6 shadow-md transition-all duration-300 h-[600px]"
            >
              {/* Background image scaling on hover */}
              <img
                src={court.image}
                alt={court.courtType}
                className="absolute inset-0 w-full h-full object-cover 
              opacity-0 group-hover:opacity-100 
              scale-100 group-hover:scale-125 
              transition-all duration-700 ease-in-out z-0"
              />

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-all duration-700 z-10" />

              {/* Top thumbnail (disappears on hover) */}
              <div className="relative z-20 mb-4 rounded-xl h-96 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.courtType}
                  className="h-full w-full object-cover rounded-xl transition-all duration-500 group-hover:opacity"
                />
              </div>

              {/* Content section */}
              <div className="relative z-30 flex flex-col p-6 text-center  rounded-3xl group-hover:backdrop-blur group-hover:bg-gradient-to-r group-hover:from-pink-500/40 group-hover:to-fuchsia-500/30">
                <h3 className="text-3xl mb-4 font-bold text-[#FB2C36] bg-[#EFEAE6] px-6 py-2 rounded-full">
                  {court.courtType} Court
                </h3>

                <div className="mb-4 text-left">
                  <label className="block text-sm mb-2 bg-[#EFEAE6] px-4 w-fit py-1 rounded-full">
                    Select Slot
                  </label>
                  <select className="w-full bg-[#EFEAE6] text-black border border-white rounded-md px-3 py-2 focus:outline-none">
                    {court.slotTimes?.map((slot, idx) => (
                      <option key={idx} value={slot} className="text-black">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-2xl md:text-3xl bg-[#EFEAE6] px-8 py-2 rounded-full text-[#FF02CB] font-hoover">
                  $ {court.price}
                </p>

              </div>
              {/* Button */}
              <div className="mt-4 flex justify-center relative z-30">
                <Button text="Book Now"
                  onClick={() => handleBooking(court)} />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Pagination */}
      <div className="mt-16">
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={(page) => {
            setLoading(true);
            setTimeout(() => {
              setCurrentPage(page);
              setLoading(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 200);
          }}
        />
      </div>

      {/* MODAL HERE */}
      {
        modalOpen && (
          <CourtBookingModal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            court={selectedCourt}
            user={user} />
        )
      }
    </div>
  );
};

export default Courts;
