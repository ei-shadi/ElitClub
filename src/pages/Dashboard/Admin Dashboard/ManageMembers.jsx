import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "../../../shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { TbLocationFilled } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Members
  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data;
    },
  });

  // Delete Member 
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the member and all their bookings!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/members/${id}`);
        Swal.fire("Deleted!", "Member and bookings removed.", "success");
        queryClient.invalidateQueries(["members"]);
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };


  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-600 text-xl mt-10">
        Failed to load members.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
        <FaUsersCog className="text-4xl md:text-5xl text-purple-600" />
        Manage
        <span className="text-[#FF02CB]">Members</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      <input
        type="text"
        placeholder="Search Member By Name..."
        className="w-full p-3 mb-6 border-2 focus:outline-[#FF02CB] rounded-md italic"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">🚫 No Members found. Found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center"
            >
              <img
                src={
                  member.photoURL ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-hoover text-lime-400">
                {member.name}
              </h3>
              <p className="text-gray-300">{member.email}</p>

              <button
                onClick={() => handleDelete(member._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-white hover:text-red-600 cursor-pointer hover:scale-125 duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
