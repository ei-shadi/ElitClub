const PaymentTableView = ({ payments }) => {
  // Render slots as bullet points instead of comma separated string
  const renderSlots = (slots) => {
    if (!slots || slots.length === 0) return <span>N/A</span>;
    return (
      <ul className="list-disc w-[150px] text-center ">
        {slots.map((slot, idx) => {
          let text;
          if (slot.startTime && slot.endTime) text = `${slot.startTime} - ${slot.endTime}`;
          else if (typeof slot === "string") text = slot;
          else text = JSON.stringify(slot);
          return <li key={idx}>{text}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="overflow-x-auto w-full md:w-[370px] lg:w-full mt-8 rounded-lg shadow-md border border-gray-300">
      <table className="min-w-full bg-white rounded-lg table-auto">
        <thead className="bg-[#FF02CB] text-white text-2xl font-hoover font-semibold text-center select-none rounded-t-lg">
          <tr>
            <th className="py-5 px-8">Email</th>
            <th className="py-5 px-8">Court</th>
            <th className="py-5 px-8">Slots</th>
            <th className="py-5 px-8">Date</th>
            <th className="py-5 px-8">Price</th>
            <th className="py-5 px-8">Coupon</th>
            <th className="py-5 px-8">Status</th>
            <th className="py-5 px-8">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr
              key={p._id}
              className={`border-b transition-colors duration-300 ${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-black hover:text-white cursor-default`}
            >
              <td className="py-4 px-8 text-center font-medium break-words max-w-xs">{p.email}</td>
              <td className="py-4 px-8 text-center font-semibold">{p.courtType}</td>
              {/* Adjusted padding and added whitespace-normal */}
              <td className="py-4 px-6 text-left">{renderSlots(p.slots)}</td>
              <td className="py-4 px-8 text-center">{new Date(p.date).toLocaleDateString()}</td>
              <td className="py-4 px-8 text-center text-[#FB2C36] font-bold text-lg md:text-xl">${p.price.toFixed(2)}</td>
              <td className="py-4 px-8 text-center">{p.couponUsed || "N/A"}</td>
              <td className="py-4 px-8 text-center capitalize font-semibold">{p.status}</td>
              <td className="py-4 px-8 text-center text-sm text-gray-600">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTableView;
