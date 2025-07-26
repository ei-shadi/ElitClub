import { useState, useEffect } from 'react';
import Button from '../../shared/Button.jsx';
import { TbLocationFilled } from 'react-icons/tb';
import showSwal from '../../shared/showSwal.js';
import axios from 'axios';

const CourtBookingModal = ({ isOpen, onRequestClose, court, user }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedSlots([]);
      setSelectedDate('');
    }
  }, [isOpen]);

  if (!court || !user) return null;

  const handleSlotChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSlots((prev) =>
      checked ? [...prev, value] : prev.filter((slot) => slot !== value)
    );
  };

  const handleSubmit = () => {
    // Validation for selected date and slots
    if (!selectedDate || selectedSlots.length === 0) {
      showSwal({
        icon: 'error',
        title: 'Incomplete Booking',
        html: '<p class="text-red-500 text-lg">Please select a date and at least one slot.</p>',
      });
      return;
    }

    // Booking Data
    const bookingData = {
      user: user.email,
      courtId: court.id,
      courtType: court.courtType,
      slots: selectedSlots,
      date: selectedDate,
      price: court.price * selectedSlots.length,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Booking Data Send To Database
    axios.post(`${import.meta.env.VITE_API_URL}/booking-courts`, bookingData)
      .then(data => {
        if (data.data.insertedId) {
          showSwal({
            icon: 'success',
            title: `<div class="text-4xl font-bold text-[#10B981]">Booking Confirmed!</div>`,
            html: `
            <p class="text-gray-600 mt-2 text-xl">Thanks, 
            <span class="text-[#FF02CB] font-semibold text-2xl font-hoover">${user.displayName || user.email}</span>
            </p>`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
      .catch(error => {
        console.log(error);
        showSwal({
          icon: 'error',
          title: 'Booking Failed!',
          html: `<p class="text-gray-600 mt-2 text-xl">Sorry, <span class="text-[#FF02CB] font-semibold text-2xl font-hoover">${user.displayName || user.email}</span></p>
          <p class="text-red-500 text-lg">Please try again later or Contact Our Support Team.</p>`,
          showConfirmButton: true,
          confirmButtonText: 'Try Again',
        })
      })

    onRequestClose();
  };

  const totalPrice = court.price * selectedSlots.length;


  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-xl rounded-3xl bg-[#EFEAE6] shadow-2xl p-10 relative">
            {/* Close button top-right */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              onClick={onRequestClose}
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mb-6 text-center flex items-center justify-center gap-3 flex-wrap">
              Book <span className="text-[#FF02CB]">{court.courtType}</span> Court
              <TbLocationFilled className="rotate-180 text-5xl md:text-6xl" />
            </h2>

            <div className="mb-5">
              <label className="block font-semibold text-lg text-gray-700 mb-1">Court Type</label>
              <input
                className="w-full bg-white px-4 py-3 rounded-2xl cursor-not-allowed font-semibold text-lg border border-pink-300 shadow-sm outline-none"
                value={court.courtType}
                readOnly
              />
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-lg text-gray-700 mb-1">Price per Slot</label>
              <input
                className="w-full bg-white px-4 py-3 rounded-2xl cursor-not-allowed font-semibold text-lg border border-pink-300 shadow-sm outline-none"
                value={`$ ${court.price}`}
                readOnly
              />
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-lg text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-2xl border border-pink-300 shadow-sm focus:ring-2 focus:ring-[#FF02CB] focus:outline-none transition duration-300"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-lg text-gray-700 mb-3">Select Slots</label>
              <div className="flex flex-wrap gap-3">
                {court.slotTimes?.map((slot, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-md cursor-pointer hover:bg-pink-100 transition select-none"
                  >
                    <input
                      type="checkbox"
                      value={slot}
                      onChange={handleSlotChange}
                      className="accent-pink-500 w-5 h-5"
                    />
                    <span className="text-lg font-medium text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <p className="font-extrabold text-2xl text-center bg-[#FF02CB] px-8 md:px-16 py-3 rounded-full shadow-lg w-fit mx-auto transition-transform duration-300 hover:scale-105 text-gray-800">
              Total Price :
              <span className="ml-2 text-white">
                $ {totalPrice}</span>
            </p>

            <div className="flex flex-col-reverse md:flex-row justify-center gap-6 mt-8">
              <Button
                text="Cancel"
                bgColor="#0E000A"
                onClick={onRequestClose}
                className="md:flex-1 text-center"
              />
              <Button
                text="Confirm Booking"
                onClick={handleSubmit}
                className="md:flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourtBookingModal;
