import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaThLarge, FaTable } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbLocationFilled } from "react-icons/tb";
import { Helmet } from "react-helmet-async";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import Loader from "../../../shared/Loader";
import Pagination from "../../../components/Pagination";
import PaymentCardView from "../../../components/Payment/PaymentCardView";
import PaymentTableView from "../../../components/Payment/PaymentTableView";

const PaymentHistory = () => {
  const { user } = useAuth(); // Firebase authenticated user info
  const axiosSecure = useAxiosSecure();

  const [viewType, setViewType] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);

  // Items per page based on view type
  const itemsPerPage = viewType === "table" ? 10 : 6;

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-payment-history", user?.email],
    enabled: !!user?.email, // only fetch if user email exists
    queryFn: async () => {
      const res = await axiosSecure.get("/payments"); // backend returns only this user's payments
      return res.data;
    },
  });

  // Pagination logic
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedPayments = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg font-semibold">
        Error loading payment history: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 max-w-[1400px] mx-auto">
      <Helmet>
        <title>Payment History - EliteClub</title>
      </Helmet>

      {/* Header */}
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
        <FaHandHoldingDollar className="text-4xl md:text-5xl text-yellow-500" />
        Payment <span className="text-[#FF02CB]">History</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      <div className="flex flex-row justify-between items-center mb-10">
        <h2 className="text-2xl lg:text-4xl font-extrabold text-gray-800 drop-shadow-sm lg:flex-1 text-center lg:text-left ">
          Total History <span className="text-[#FF02CB]">({payments.length})</span>
        </h2>

        {/* Toggle View Buttons */}
        <div className="flex items-center justify-center lg:justify-end gap-2 text-xl bg-white px-4 py-2 rounded-full shadow-lg select-none lg:flex-[0_0_auto]">
          <button
            onClick={() => setViewType("table")}
            title="Table View"
            className={`rounded-full p-2 transition-transform duration-200 ${
              viewType === "table"
                ? "text-[#FF02CB] scale-110"
                : "text-gray-400 hover:text-[#FF02CB] hover:scale-110"
            }`}
          >
            <FaTable />
          </button>
          <button
            onClick={() => setViewType("card")}
            title="Card View"
            className={`rounded-full p-2 transition-transform duration-200 ${
              viewType === "card"
                ? "text-[#FF02CB] scale-110"
                : "text-gray-400 hover:text-[#FF02CB] hover:scale-110"
            }`}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && <Loader />}

      {/* No Data */}
      {!isLoading && payments.length === 0 && (
        <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">
          🚫 No Confirmed Bookings Found.
        </p>
      )}

      {/* Data Display */}
      {!isLoading && payments.length > 0 && viewType === "card" && (
        <PaymentCardView payments={paginatedPayments} />
      )}
      {!isLoading && payments.length > 0 && viewType === "table" && (
        <PaymentTableView payments={paginatedPayments} />
      )}

      {/* Pagination */}
      {!isLoading && payments.length > 0 && totalPages > 1 && (
        <div className="mt-14">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
