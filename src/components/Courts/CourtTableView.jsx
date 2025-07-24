import Button from "../../shared/Button";

const CourtTableView = ({ courts, selectedSlots, setSelectedSlots, handleBooking }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded shadow-md">
        <thead className="bg-[#FF02CB] text-white text-2xl md:text-4xl font-hoover text-center">
          <tr>
            <th className="p-4">Court</th>
            <th className="p-4">Slot</th>
            <th className="p-4">Price</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr
              key={court.id}
              className="border-b hover:bg-black hover:text-white transition duration-300 group"
            >
              {/* Court Info */}
              <td className="p-4 flex items-center gap-4">
                <img
                  src={court.image}
                  alt={court.courtType}
                  className="w-14 h-14 object-cover rounded-full border shadow-sm transition-transform duration-300 group-hover:scale-125"
                />
                <span className="font-semibold text-gray-700 group-hover:text-white text-lg md:text-xl">
                  {court.courtType}
                </span>
              </td>

              {/* Slot Dropdown - centered under Slot title */}
              <td className="p-4 text-center">
                <select
                  className="bg-gray-100 border border-gray-300 text-sm text-black rounded-md px-3 py-1 mx-12 md:mx-0 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={selectedSlots[court.id] || ""}
                  onChange={(e) =>
                    setSelectedSlots({
                      ...selectedSlots,
                      [court.id]: e.target.value,
                    })
                  }
                >
                  <option value="">-- Choose a slot --</option>
                  {court.slotTimes?.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </td>

              {/* Price */}
              <td className="p-4 text-[#FB2C36] font-bold text-xl md:text-2xl px-8 text-center">
                ${court.price}
              </td>


              {/* Book Button */}
              <td className="py-4 px-6 text-center align-middle">
                <div className="inline-block">
                  <Button text="Book" onClick={() => handleBooking(court)} />
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtTableView;
