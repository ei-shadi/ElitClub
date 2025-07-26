import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";
import Loader from "../../shared/Loader";
import Button from "../../shared/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";




const Profile = () => {
  const { user, logOutUser } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-2xl mt-10 text-red-500 font-semibold bg-white py-6 rounded-2xl">
        Error fetching user data. <br /> Please Try Again
      </div>
    );

  const { name, email, photoURL, created_at, role } = userData || {};

  // Handle logout
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
    <div className="flex items-center justify-center min-h-[80vh] mt-10 px-4">
      <div className="w-full max-w-xl bg-gradient-to-br from-[#FF02CB] to-black text-black rounded-2xl shadow-xl p-12 flex flex-col items-center">
        <img
          src={photoURL || "https://i.ibb.co/2FsfXqM/default-user.png"}
          alt="User"
          className="w-48 h-48 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white pb-2">{name}</h2>
        <p className="text-gray-300 text-xl italic font-semibold">{email}</p>
        <p className="text-md text-gray-200 font-semibold italic mt-2">
          Registered on :{" "}
          <span className="font-medium">
            {created_at ? format(new Date(created_at), "MMMM dd, yyyy") : "N/A"}
          </span>
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg font-hoover uppercase">
          <strong className="normal-case">ElitClub's :</strong> {role || "User"}
        </p>
        <div className="mt-6">
          <Button text="Logout" onClick={handleLogout}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
