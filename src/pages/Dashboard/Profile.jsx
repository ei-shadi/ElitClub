import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import Loader from "../../shared/Loader";
import Button from "../../shared/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import AdminProfileCard from "./Admin Dashboard/AdminProfileCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import useUserData from "../../hooks/useUserData";

const Profile = () => {
  const { logOutUser } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Get User By Email
  const { data: userData, isLoading, isError } = useUserData();

  // Get total courts
  const { data: courts = [] } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  // Get all users
  const { data: allUsers = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const totalMembers =
    allUsers?.filter((u) => u.role?.toLowerCase() === "member").length || 0;

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-2xl mt-10 text-red-500 font-semibold bg-white py-6 rounded-2xl">
        Error fetching user data. <br /> Please Try Again
      </div>
    );

  const { name, email, photoURL, createdAt, role, approvedAt } = userData || {};

  // Handle Logout
  const handleLogout = () => {
    navigate("/");
    logOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout successfully!",
          showConfirmButton: true,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] mt-10 px-4">
      <div className="w-full max-w-xl bg-gradient-to-br from-[#FF02CB] to-black text-black rounded-2xl shadow-xl p-12 flex flex-col items-center">
        <img
          src={
            photoURL ||
            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
          }
          alt="User"
          className="w-48 h-48 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white pb-2">
          {name}
        </h2>
        <p className="text-gray-300 text-xl italic font-semibold">{email}</p>

        {/* Conditionally render based on role */}
        {role?.toLowerCase() === "member" ? (
          <p className="text-md text-gray-200 font-semibold italic mt-2">
            Member on :{" "}
            <span className="font-medium">
              {approvedAt
                ? format(new Date(approvedAt), "MMMM dd, yyyy")
                : "Pending"}
            </span>
          </p>
        ) : (
          <p className="text-md text-gray-200 font-semibold italic mt-2">
            Registered on :{" "}
            <span className="font-medium">
              {createdAt
                ? format(new Date(createdAt), "MMMM dd, yyyy")
                : "N/A"}
            </span>
          </p>
        )}

        <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg font-hoover uppercase">
          <strong className="normal-case">ElitClub's :</strong>{" "}
          <span className="text-lime-600">{role || "User"}</span>
        </p>

        <div className="mt-6">
          <Button text="Logout" onClick={handleLogout} />
        </div>
      </div>

      {/* Admin-only dashboard stats */}
      {role === "admin" && (
        <div className="w-full max-w-6xl mt-10">
          <AdminProfileCard
            courts={courts.length}
            users={allUsers.length}
            members={totalMembers}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
