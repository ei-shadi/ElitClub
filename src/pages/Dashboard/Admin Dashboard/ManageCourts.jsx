import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { MdDelete, MdEdit, MdAdd } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import Loader from '../../../shared/Loader';
import useAxios from '../../../hooks/useAxios';
import { TbLocationFilled } from 'react-icons/tb';
import { FaPersonRunning } from 'react-icons/fa6';

const ManageCourts = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [deleteCourtId, setDeleteCourtId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    courtType: '',
    slotTimes: '',
    price: '',
    image: '',
  });

  // Fetch courts
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/courts');
      return res.data;
    },
  });

  // Add court mutation
  const addCourtMutation = useMutation({
    mutationFn: async (newCourt) => {
      return await axiosSecure.post('/courts', newCourt);
    },
    onSuccess: () => {
      toast.success('Court added successfully');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => toast.error('Failed to add court'),
  });

  // Edit court mutation
  const editCourtMutation = useMutation({
    mutationFn: async ({ id, updatedCourt }) => {
      return await axiosSecure.patch(`/courts/${id}`, updatedCourt);
    },
    onSuccess: () => {
      toast.success('Court updated successfully');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => toast.error('Failed to update court'),
  });

  // Delete court mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/courts/${id}`);
    },
    onSuccess: () => {
      toast.success('Court deleted successfully');
      queryClient.invalidateQueries(['courts']);
    },
    onError: () => toast.error('Failed to delete court'),
  });

  // Handle Add/Edit form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { courtType, slotTimes, price, image } = formData;
    const payload = {
      courtType,
      slotTimes: slotTimes.split(',').map((s) => s.trim()),
      price: parseFloat(price),
      image,
    };

    if (isEditMode && formData._id) {
      editCourtMutation.mutate({ id: formData._id, updatedCourt: payload });
    } else {
      addCourtMutation.mutate(payload);
    }

    setFormData({ courtType: '', slotTimes: '', price: '', image: '' });
    setIsEditMode(false);
    document.getElementById('form_modal').close();
  };

  const handleDelete = () => {
    if (deleteCourtId) {
      deleteMutation.mutate(deleteCourtId);
      setDeleteCourtId(null);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-600 mb-10 mt-4 text-center drop-shadow-sm flex items-center justify-center gap-3">
        <FaPersonRunning className="text-amber-500 text-4xl md:text-5xl" />
        Manage <span className="text-[#FF02CB]">Courts</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>
      <div className="flex items-center justify-between mb-6">
        <h3 className='bg-green-600 text-white font-bold py-2 px-4 lg:px-8 rounded-full text-xl lg:text-2xl'>Total Courts : {courts.length}</h3>
        <button
          className="text-white bg-[#FF02CB] hover:bg-black hover:scale-115 duration-300 font-medium rounded-lg text-xl lg:text-2xl px-5 py-2 cursor-pointer flex items-center gap-2"
          onClick={() => {
            setFormData({ courtType: '', slotTimes: '', price: '', image: '' });
            setIsEditMode(false);
            document.getElementById('form_modal').showModal();
          }}
        >
          <MdAdd className="text-2xl" />
          <span>Add Court</span>
        </button>
      </div>

      {/* Table */}
      <div className="w-full md:w-[350px] lg:w-full overflow-x-auto rounded-xl border bg-base-100 shadow-md">
        <table className="table table-zebra w-full min-w-[1300px]">
          <thead className="bg-base-200 text-gray-700 text-3xl font-hoover">
            <tr>
              <th className="px-5 py-6">No</th>
              <th className="px-10 py-6">Image</th>
              <th className="px-10 py-6">Type</th>
              <th className="px-10 py-6">Slot Times</th>
              <th className="px-10 py-6">Price</th>
              <th className="px-10 py-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {courts.map((court, idx) => (
              <tr key={court._id} className="hover:bg-base-100 transition">
                <td className="px-8 py-5">{idx + 1}</td>
                <td className="px-8 py-5">
                  <img
                    src={court.image}
                    alt={court.courtType}
                    className="w-24 h-16 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300"
                  />
                </td>
                <td className="px-8 py-5 font-semibold text-xl">{court.courtType}</td>
                <td className="px-8 py-5 max-w-md whitespace-normal text-lg text-gray-800">
                  {court.slotTimes?.map((slot, i) => (
                    <div key={i} className="mb-1">• {slot}</div>
                  ))}
                </td>
                <td className="px-8 py-5 text-xl font-semibold">৳{court.price}</td>
                <td className="px-8 py-5">
                  <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
                    <button
                      className="flex items-center gap-2 bg-amber-400 px-4 py-2 rounded-md hover:bg-black text-black hover:text-amber-500 hover:scale-120 duration-300 ease-in-out tooltip cursor-pointer"
                      data-tip="Edit"
                      onClick={() => {
                        setFormData({
                          ...court,
                          slotTimes: court.slotTimes.join(', ')
                        });
                        setIsEditMode(true);
                        document.getElementById('form_modal').showModal();
                      }}
                    >
                      <MdEdit className="text-lg" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md hover:bg-black text-white hover:text-red-600 hover:scale-120 tooltip cursor-pointer duration-300 ease-in-out"
                      data-tip="Delete"
                      onClick={() => setDeleteCourtId(court._id)}
                    >
                      <MdDelete className="text-lg" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className={`modal ${deleteCourtId ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this court?</p>
          <div className="modal-action">
            <button className="btn" onClick={() => setDeleteCourtId(null)}>Cancel</button>
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </dialog>

      {/* Add/Edit Court Modal */}
      <dialog id="form_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg lg:text-4xl mb-4 text-center">
            {isEditMode ? 'Edit Court' : 'Add New Court'}
          </h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Court Type"
              className="input input-bordered w-full"
              value={formData.courtType}
              onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Slot Times (comma-separated) like 10:00 AM - 12:00 PM, 14:00 PM - 16:00 AM"
              className="input input-bordered w-full"
              value={formData.slotTimes}
              onChange={(e) => setFormData({ ...formData, slotTimes: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />

            <div className="modal-action flex gap-4">
              <button
                type="button"
                className="text-xl bg-red-600 px-4 py-2 rounded-md hover:bg-black text-white hover:text-red-600 hover:scale-110 cursor-pointer duration-300 ease-in-out"
                onClick={() => {
                  setFormData({ courtType: '', slotTimes: '', price: '', image: '' });
                  document.getElementById('form_modal').close();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="text-xl bg-green-400 px-4 py-2 rounded-md hover:bg-black text-black hover:text-green-500 hover:scale-110 cursor-pointer duration-300 ease-in-out">
                {isEditMode ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageCourts;
