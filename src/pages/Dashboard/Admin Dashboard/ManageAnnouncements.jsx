import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaBullhorn,
} from "react-icons/fa";
import Loader from "../../../shared/Loader";
import { TbLocationFilled } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ManageAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingId) {
        return axiosSecure.patch(`/announcements/${editingId}`, data);
      }
      return axiosSecure.post("/announcements", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire({
        icon: "success",
        title: editingId ? "Announcement Updated!" : "Announcement Added!",
        showConfirmButton: false,
        timer: 1500,
      });
      resetForm();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Delete Failed!",
        text: "Something went wrong.",
      });
    },
  });

  const resetForm = () => {
    setForm({ title: "", message: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleEdit = (announcement) => {
    setForm({
      title: announcement.title,
      message: announcement.message,
    });
    setEditingId(announcement._id);
  };

  const filteredAnnouncements = announcements.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;

  const dateOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return (
    <>
      <Helmet>
        <title>Manage Announcements - EliteClub</title>
      </Helmet>

      <div className="p-6">
        <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          <FaBullhorn className="text-4xl md:text-5xl text-[#FF8904]" />
          Manage <span className="text-[#FF02CB]">Announcements</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search announcement title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none w-64"
            />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-10 space-y-4 border"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Announcement Title"
            required
            className="w-full px-4 py-2 rounded border"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Announcement Description"
            required
            className="w-full px-4 py-2 rounded border"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-600 text-white text-xl px-5 py-2 rounded hover:bg-black hover:scale-110 cursor-pointer duration-300 ease-in-out transition flex items-center gap-2"
            >
              {editingId ? "Update" : "Add"} Announcement <FaPlus />
            </button>
          </div>
        </form>

        {/* Table View */}
        {filteredAnnouncements.length === 0 ? (
          <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto text-xl md:text-2xl font-hoover">
            🚫 No Announcements Found.
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden lg:block">
              <table className="table w-full bg-white rounded-xl shadow-md min-w-[900px]">
                <thead className="bg-base-200 text-xl text-gray-700">
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {filteredAnnouncements.map((a, idx) => (
                    <tr key={a._id} className="hover:bg-base-100 transition">
                      <td className="px-6">{idx + 1}</td>
                      <td className="font-bold">{a.title}</td>
                      <td className="w-1/2">{a.message}</td>
                      <td>
                        {a.createdAt
                          ? new Date(a.createdAt).toLocaleDateString(
                              "en-US",
                              dateOptions
                            )
                          : "N/A"}
                      </td>
                      <td className="flex gap-4 items-center mt-2">
                        <button
                          onClick={() => handleEdit(a)}
                          className="text-yellow-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-yellow-600 duration-300 ease-in-out"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteMutation.mutate(a._id);
                              }
                            });
                          }}
                          className="text-red-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-red-600 duration-300 ease-in-out"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card View */}
            <div className="grid gap-4 lg:hidden mt-4">
              {filteredAnnouncements.map((a) => (
                <div
                  key={a._id}
                  className="bg-white p-4 rounded-xl shadow-md border flex flex-col gap-2"
                >
                  <div className="flex flex-col justify-start gap-1">
                    <h3 className="text-xl font-bold text-pink-600">
                      {a.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {a.createdAt
                        ? new Date(a.createdAt).toLocaleDateString(
                            "en-US",
                            dateOptions
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{a.message}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-yellow-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-yellow-600 duration-300 ease-in-out"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(a._id);
                          }
                        });
                      }}
                      className="text-red-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-red-600 duration-300 ease-in-out"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ManageAnnouncements;
