import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";
import Swal from "sweetalert2";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { TbLocationFilled } from "react-icons/tb";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-600 text-xl mt-10">
        Failed to load users.
      </p>
    );

  return (
    <>
      <Helmet>
        <title>All Users - EliteClub</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          <FaUsers className="text-4xl md:text-5xl text-cyan-500" />
          All
          <span className="text-[#FF02CB]">Users</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        <input
          type="text"
          placeholder="Search Users By Name Or Email..."
          className="w-full p-3 mb-6 border-2 focus:outline-[#FF02CB] rounded-md italic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">🚫 No Users Found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-black shadow-lg rounded-xl p-6 flex flex-col items-center hover:bg-gray-800 duration-300 hover:scale-110"
              >
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-cyan-500 ">
                  {user.name}
                </h3>
                <p className="text-gray-300 italic">{user.email}</p>
                <span className="mt-2 px-3 py-1 text-sm bg-lime-500 text-black rounded-full font-bold">
                  Role : <span className="font-semibold uppercase text-gray-100">{user.role || "N/A"}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
