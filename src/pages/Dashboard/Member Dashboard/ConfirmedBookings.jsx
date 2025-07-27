import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdSportsTennis } from "react-icons/md";
import { TbLocationFilled } from "react-icons/tb";
import Loader from "../../../shared/Loader";
import { BsBookmarkCheckFill } from "react-icons/bs";

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["confirmedBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/confirmed");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center text-red-500 mt-10">Failed to load confirmed bookings.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl lg:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
        <BsBookmarkCheckFill className="text-4xl md:text-5xl text-lime-500" />
        <span className="text-[#FF02CB]">Confirmed</span> Bookings
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">🚫 No confirmed bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-300 rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MdSportsTennis className="text-lime-600" />
                  {booking.courtType} Court
                </h3>
                <span className="px-3 py-1 bg-lime-200 text-lime-700 rounded-full text-sm font-medium">
                  {booking.status}
                </span>
              </div>

              <p className="text-gray-600 mb-1">📅 <span className="font-medium">{booking.date}</span></p>
              <p className="text-gray-600 mb-1">⏰ Slots: <span className="font-medium">{booking.slots?.join(", ")}</span></p>
              <p className="text-gray-700 font-bold mt-2">💰 Total Price: ${booking.price}</p>
              <p className="text-sm text-gray-400 mt-1">
                Booked at: {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
