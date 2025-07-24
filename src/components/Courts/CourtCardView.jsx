import Button from "../../shared/Button";

const CourtCardView = ({ courts, selectedSlots, setSelectedSlots, handleBooking }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {courts.map((court) => (
        <div
          key={court.id}
          className="relative group flex flex-col rounded-4xl overflow-hidden backdrop-blur bg-gradient-to-br from-[#FF02CB] to-black text-black font-semibold px-4 md:px-6 pt-10 pb-6 shadow-md transition-all duration-300 h-[600px]"
        >
          {/* Hover Background */}
          <img
            src={court.image}
            alt={court.courtType}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-125 transition-all duration-700 ease-in-out z-0"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-all duration-700 z-10" />

          {/* Thumbnail */}
          <div className="relative z-20 mb-4 rounded-xl h-96 overflow-hidden">
            <img
              src={court.image}
              alt={court.courtType}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="relative z-30 flex flex-col p-6 text-center rounded-3xl group-hover:backdrop-blur group-hover:bg-gradient-to-r group-hover:from-pink-500/40 group-hover:to-fuchsia-500/30">
            <h3 className="text-3xl mb-4 font-bold text-[#FB2C36] bg-[#EFEAE6] px-6 py-2 rounded-full">
              {court.courtType} Court
            </h3>

            <div className="mb-4 text-left">
              <label className="block text-sm mb-2 bg-[#EFEAE6] px-4 w-fit py-1 rounded-full">
                Select Slot
              </label>
              <select
                className="w-full bg-[#EFEAE6] text-black border border-white rounded-md px-3 py-2 focus:outline-none"
                value={selectedSlots[court.id] || ""}
                onChange={(e) =>
                  setSelectedSlots({ ...selectedSlots, [court.id]: e.target.value })
                }
              >
                <option value="">-- Choose a slot --</option>
                {court.slotTimes?.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-2xl md:text-3xl bg-[#EFEAE6] px-8 py-2 rounded-full text-[#FF02CB] font-hoover">
              $ {court.price}
            </p>
          </div>

          <div className="mt-4 flex justify-center relative z-30">
            <Button text="Book Now" onClick={() => handleBooking(court)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourtCardView;
