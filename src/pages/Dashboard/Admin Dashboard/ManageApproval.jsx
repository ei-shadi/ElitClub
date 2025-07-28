import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../shared/Loader";
import { TbLocationFilled } from "react-icons/tb";
import useCancelBookings from "../../../hooks/useCancelBookings";
import LoadingAnimation from "../../../shared/Spinner";


const ManageApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { rejectBooking } = useCancelBookings();

  // Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending-all");
      return res.data;
    },
  });

  // Handle Approve booking
  const approveMutation = useMutation({
    mutationFn: ({ bookingId, userEmail }) =>
      axiosSecure.patch(`/bookings/approve/${bookingId}`, {
        status: "approved",
        approvedAt: new Date().toISOString(),
        userEmail
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingBookings"]);
      Swal.fire("Approved!", "Booking has been approved.", "success");
    },
    onError: (error) => {
      console.error("Approval error:", error);
      Swal.fire("Error", "Failed to approve booking.", "error");
    },
  });

  // Handle Rejection booking
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectBooking(id);
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4">
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-600 mb-10 mt-4 text-center drop-shadow-sm flex items-center justify-center gap-3">
        <FaCheckCircle className="text-green-600 text-4xl md:text-5xl" />
        Manage <span className="text-[#FF02CB]">Approval</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">🚫 No Pending Bookings Available.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white text-black hover:text-white hover:bg-black bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col justify-between transition hover:scale-105 duration-300"
            >
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-[#FF02CB] mb-6 text-center">
                  🏟 Court : {booking.courtType}
                </h3>
                <p className="mb-2">
                  <strong>👤 Name :</strong> {booking.name}
                </p>
                <p className="mb-2">
                  <strong>📧 Email :</strong> {booking.email}
                </p>
                <p>
                  <strong>📅 Date :</strong> {booking.date}
                </p>
                <div className="my-2">
                  <strong>⏰ Slots :</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {booking.slots?.map((slot, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-base font-semibold"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 font-semibold">
                  <strong>💰 Price :</strong> ${booking.price}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-5 md:gap-10">
                <button
                  onClick={() =>
                    approveMutation.mutate({
                      bookingId: booking._id,
                      userEmail: booking.email,
                    })
                  }
                  disabled={approveMutation.isLoading}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-white hover:text-green-600 cursor-pointer hover:scale-115 text-white px-8 lg:px-12 py-2 rounded-xl transition-all duration-200"
                >
                  <FaCheckCircle className="text-lg" />
                  {approveMutation.isLoading ? <LoadingAnimation /> : "Approve"}
                </button>

                <button
                  onClick={() => handleReject(booking._id)}
                  disabled={isLoading}
                  className="px-8 lg:px-12 py-2 inline-flex items-center justify-center gap-2 rounded-xl transition-all cursor-pointer duration-200 bg-red-500 hover:bg-white hover:scale-115 text-white hover:text-red-600"
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
