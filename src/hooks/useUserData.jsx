import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"; // adjust path if needed
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUserData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      if (!res.data.success) throw new Error("Failed to fetch user");
      return res.data.data;
    },
  });
};

export default useUserData;
