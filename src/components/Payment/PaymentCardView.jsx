const PaymentCardView = ({ payments }) => {
  const renderSlots = (slots) => {
    if (!slots || slots.length === 0) return "N/A";

    return (
      <ul className="list-disc list-inside ml-4">
        {slots.map((slot, idx) => {
          let slotText;
          if (slot.startTime && slot.endTime) slotText = `${slot.startTime} - ${slot.endTime}`;
          else if (typeof slot === "string") slotText = slot;
          else slotText = JSON.stringify(slot);

          return <li key={idx}>{slotText}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {payments.map((p) => (
        <div
          key={p._id}
          className="relative group flex flex-col rounded-3xl overflow-hidden bg-black text-black font-semibold px-8 pt-12 pb-10 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition duration-500 rounded-3xl z-0" />
          <div className="relative z-10 flex flex-col gap-4 text-gray-300">
            <h3 className="text-3xl font-extrabold text-[#FB2C36] bg-[#EFEAE6] px-8 py-3 rounded-full text-center drop-shadow">
              {p.courtType || "Court"} Court
            </h3>

            <p className="text-xl">
              <strong className="font-semibold text-lime-500">Email :</strong> {p.email}
            </p>
            <div className="text-lg">
              <strong className="font-semibold text-lime-500">Slots :</strong>
              {renderSlots(p.slots)}
            </div>
            <p className="text-lg">
              <strong className="font-semibold text-lime-500">Date :</strong> {new Date(p.date).toLocaleDateString()}
            </p>
            <p className="text-lg">
              <strong className="font-semibold text-lime-500">Amount :</strong> $ {p.price.toFixed(2)}
            </p>
            <p className="text-lg">
              <strong className="font-semibold text-lime-500">Coupon Used :</strong> {p.couponUsed || "N/A"}
            </p>
            <p className="text-lg capitalize">
              <strong className="font-semibold text-lime-500">Status :</strong> {p.status}
            </p>
            <p className="text-sm text-lime-600 italic">
              <strong>Payment Date :</strong> {new Date(p.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCardView;
