import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import showSwal from "../../../shared/showSwal";
import useAuth from "../../../hooks/useAuth";
import { TbLocationFilled } from "react-icons/tb";

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const booking = location.state;
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(booking?.price || 0);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (booking?.price) {
      setDiscountedPrice(booking.price);
    }
  }, [booking]);

  // Apply Coupon
  const applyCoupon = async () => {
    try {
      const res = await axiosSecure.get(`/coupons/validate?code=${couponCode}`);
      const validCoupon = res.data;

      if (validCoupon && validCoupon.discount) {
        const discount = Number(validCoupon.discount);
        const newPrice = Math.max(booking.price - discount, 0);
        setDiscountedPrice(newPrice);
        setCouponApplied(true);
        showSwal({
          icon: "success",
          title: "Coupon Applied!",
          text: `You saved $${discount}`,
        });
      } else {
        showSwal({
          icon: "error",
          title: "Invalid Coupon",
          text: "Please enter a valid coupon code.",
        });
      }
    } catch (error) {
      showSwal({
        icon: "error",
        title: "Coupon Error",
        text: error.response?.data?.message || "Failed to apply coupon.",
      });
    }
  };

  // Payment Mutation without booking status update
  const paymentMutation = useMutation({
    mutationFn: async () => {
      const paymentData = {
        bookingId: booking._id,
        email: user.email,
        courtType: booking.courtType,
        slots: booking.slots,
        date: booking.date,
        price: discountedPrice,
        couponUsed: couponApplied ? couponCode : null,
        status: "paid",
      };

      const res = await axiosSecure.post("/payments", paymentData);
      return res.data;
    },
    onSuccess: () => {
      showSwal({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your payment.",
      });

      navigate("/dashboard/confirmed-bookings");
    },
    onError: () => {
      showSwal({
        icon: "error",
        title: "Payment Failed",
        text: "Please try again.",
      });
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (discountedPrice === 0) {
      showSwal({
        icon: "warning",
        title: "Invalid Price",
        text: "You can't make a payment of $0.",
      });
      return;
    }
    paymentMutation.mutate();
  };

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">
          🚫 Booking Not Found. Please go back and select a Booking.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Helmet>
        <title>Payment - EliteClub</title>
      </Helmet>

      <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full p-8 sm:p-10 md:p-12">
        <h2 className="text-4xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
          Complete Your <span className="text-[#FF02CB]">Payment</span>
          <TbLocationFilled className="rotate-180 text-4xl" />
        </h2>

        {/* Coupon Field */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-5 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            disabled={couponApplied}
            autoComplete="off"
          />
          <button
            onClick={applyCoupon}
            className={`w-full sm:w-auto bg-[#FF02CB] hover:bg-black text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer hover:scale-110 duration-300 ease-in-out disabled:hover:scale-none`}
            disabled={couponApplied || !couponCode.trim()}
            aria-label="Apply Coupon"
          >
            {couponApplied ? "Applied ✓" : "Apply"}
          </button>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputLabel label="Email" value={user?.email} />
          <InputLabel label="Court Type" value={booking?.courtType} />
          <InputLabel label="Slots" value={booking?.slots?.join(", ")} />
          <InputLabel label="Date" value={booking?.date} />
          <InputLabel
            label="Total Price"
            value={`$${discountedPrice.toFixed(2)}`}
            isPrice
          />

          <button
            type="submit"
            disabled={paymentMutation.isLoading}
            className="w-full bg-lime-600 text-2xl hover:bg-black hover:text-lime-600 cursor-pointer text-white font-extrabold py-4 rounded-xl shadow-xl transition disabled:cursor-not-allowed"
          >
            {paymentMutation.isLoading ? <LoadingAnimation /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable input label + value readonly component
const InputLabel = ({ label, value, isPrice }) => (
  <div>
    <label className="block text-gray-600 mb-1 font-medium">{label}</label>
    <input
      type="text"
      readOnly
      value={value}
      className={`w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900 cursor-not-allowed focus:outline-none ${
        isPrice ? "text-green-600 font-semibold text-lg" : "text-gray-700"
      }`}
    />
  </div>
);

// Dummy Loading animation (replace with your actual component)
const LoadingAnimation = () => (
  <svg
    className="animate-spin h-6 w-6 mx-auto text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

export default Payment;
