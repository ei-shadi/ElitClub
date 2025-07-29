import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaEdit, FaTrash, FaTags, FaSearch, FaPlus } from "react-icons/fa";
import Loader from "../../../shared/Loader";
import { TbLocationFilled } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ coupon: "", discount: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingId) {
        return axiosSecure.patch(`/coupons/${editingId}`, data);
      }
      return axiosSecure.post("/coupons", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire({
        icon: "success",
        title: editingId ? "Coupon Updated!" : "Coupon Added!",
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
    mutationFn: async (id) => axiosSecure.delete(`/coupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire({
        icon: "success",
        title: "Coupon Deleted!",
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
    setForm({ coupon: "", discount: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleEdit = (coupon) => {
    setForm({
      coupon: coupon.coupon,
      discount: coupon.discount,
      description: coupon.description,
    });
    setEditingId(coupon._id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredCoupons = coupons.filter((c) =>
    c.coupon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Manage Coupons - EliteClub</title>
      </Helmet>

      <div className="p-6">
        <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          <FaTags className="text-4xl md:text-5xl text-[#FF02CB]" />
          Manage <span className="text-[#FF02CB]">Coupons</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md shadow-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search coupon code"
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
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              name="coupon"
              value={form.coupon}
              onChange={(e) => setForm({ ...form, coupon: e.target.value })}
              placeholder="Coupon Code"
              required
              className="flex-1 px-4 py-2 rounded border"
            />
            <input
              type="text"
              name="discount"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder="Discount (e.g. 15%)"
              required
              className="w-48 px-4 py-2 rounded border"
            />
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Coupon Description"
            required
            className="w-full px-4 py-2 rounded border"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-600 text-white text-xl px-5 py-2 rounded hover:bg-black hover:scale-120 cursor-pointer duration-300 ease-in-out transition flex items-center gap-2"
            >
              {editingId ? "Update Coupon" : "Add Coupon"} <FaPlus />
            </button>
          </div>
        </form>

        {/* Table View (Desktop) */}
        {filteredCoupons.length === 0 ? (
          <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto text-xl md:text-2xl">
            🚫 No Coupons Found.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto hidden lg:block">
              <table className="table w-full bg-white rounded-xl shadow-md min-w-[900px]">
                <thead className="bg-base-200 text-xl text-gray-700">
                  <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {filteredCoupons.map((coupon, idx) => (
                    <tr key={coupon._id} className="hover:bg-base-100 transition">
                      <td>{idx + 1}</td>
                      <td className="font-bold">{coupon.coupon}</td>
                      <td className="text-pink-600 font-semibold">{coupon.discount}</td>
                      <td>{coupon.description}</td>
                      <td className="flex gap-4 items-center mt-2">
                        <button
                          onClick={() => handleEdit(coupon)}
                          className="text-yellow-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-yellow-600 duration-300 ease-in-out"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
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

            {/* Card View (Mobile & Tablet) */}
            <div className="grid gap-4 lg:hidden mt-4">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="bg-white p-4 rounded-xl shadow-md border flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-pink-600">{coupon.coupon}</h3>
                    <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                      {coupon.discount}
                    </span>
                  </div>
                  <p className="text-gray-600">{coupon.description}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="text-yellow-600 bg-black px-3 py-3 rounded-full cursor-pointer hover:text-white hover:scale-125 hover:bg-yellow-600 duration-300 ease-in-out"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
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

export default ManageCoupons;
