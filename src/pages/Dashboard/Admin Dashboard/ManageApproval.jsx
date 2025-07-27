import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../shared/Loader";
import { TbLocationFilled } from "react-icons/tb";

const ManageApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending-all");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/bookings/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingBookings"]);
      Swal.fire("Approved!", "Booking has been approved.", "success");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingBookings"]);
      Swal.fire("Rejected!", "Booking has been removed.", "info");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 ">
    <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-600 mb-10 mt-4 text-center drop-shadow-sm flex items-center justify-center gap-3">
      <FaCheckCircle className="text-green-600 text-4xl md:text-5xl" />
          Manage <span className="text-[#FF02CB]">Approval</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 text-lg">
          No pending bookings available.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col justify-between transition hover:scale-[1.01] duration-300"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                  🏟 Court : {booking.courtType}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>👤 User :</strong> {booking.user}
                </p>
                <p className="text-gray-700 dark:text-gray-300 ">
                  <strong>📅 Date :</strong> {booking.date}
                </p>
                <div className="text-gray-700 dark:text-gray-300 my-2">
                  <strong>⏰ Slots :</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {booking.slots?.map((slot, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white text-sm px-3 py-1 rounded-full"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>💰 Price :</strong> ${booking.price}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-5 md:gap-10">
                <button
                  onClick={() => approveMutation.mutate(booking._id)}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-black cursor-pointer hover:scale-105  text-white px-8 lg:px-12 py-2 rounded-xl transition-all duration-200"
                >
                  <FaCheckCircle className="text-lg" />
                  Approve
                </button>
                <button
                  onClick={() => rejectMutation.mutate(booking._id)}
                  className="px-8 lg:px-12 py-2 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-black cursor-pointer hover:scale-105 text-white rounded-xl transition-all duration-200"
                >
                  <FaTimesCircle className="text-lg" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageApproval;
