import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure"; // adjust the path as needed

const useCancelBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: rejectBooking, isLoading, isError, error } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingBookings"]);
      Swal.fire("Rejected!", "Booking has been removed.", "info");
    },
    onError: (err) => {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to remove booking.", "error");
    },
  });

  return { rejectBooking, isLoading, isError, error };
};

export default useCancelBookings;
