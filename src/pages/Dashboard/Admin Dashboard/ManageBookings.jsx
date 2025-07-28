import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loader from "../../../shared/Loader";
import { FaCalendarCheck, FaSearch } from "react-icons/fa";
import { TbLocationFilled } from "react-icons/tb";

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["confirmed-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/confirmed-all");
      return res.data;
    },
  });

  const filteredBookings = bookings.filter((booking) =>
    booking?.courtType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-600 mb-10 mt-4 text-center drop-shadow-sm flex items-center justify-center gap-3 flex-wrap">
        <FaCalendarCheck className="text-emerald-500 text-4xl md:text-5xl" />
        Manage <span className="text-[#FF02CB]">Bookings</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by Court Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-60"
          />
        </div>
      </div>

      {/* Show No Bookings */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">
          🚫 No Confirmed Bookings Found.
        </p>
      ) : (
        <>
          {/* Table */}
          <div className="w-full md:w-[390px] lg:w-full overflow-x-auto rounded-xl border bg-base-100 shadow-md">
            <table className="table table-zebra w-full min-w-[1300px]">
              <thead className="bg-base-200 text-gray-700 text-3xl font-hoover">
                <tr>
                  <th className="px-5 py-6">No</th>
                  <th className="px-8 py-6">Court</th>
                  <th className="px-8 py-6">User</th>
                  <th className="px-8 py-6">Slot</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-xl">
                {filteredBookings.map((booking, idx) => (
                  <tr key={booking._id} className="hover:bg-base-100 transition">
                    <td className="px-6 py-5">{idx + 1}</td>
                    <td className="px-6 py-5 font-semibold">{booking.courtType}</td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-lg">{booking.userName}</div>
                      <div className="text-sm text-gray-500">{booking.userEmail}</div>
                    </td>
                    <td className="px-6 py-5 space-y-1">
                      {booking.slots?.map((slot, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-[#FF02CB] text-lg">•</span>
                          <span>{slot}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-5">{booking.date}</td>
                    <td className="px-6 py-5 font-bold">৳ {booking.price}</td>
                    <td className="px-6 py-5">
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Count */}
          <div className="mt-6 text-right text-xl font-semibold text-white bg-black py-2 px-10 rounded-2xl w-fit mx-auto">
            Total Confirmed Bookings :{" "}
            <span className="text-[#FF02CB]">{filteredBookings.length}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmedBookings;
