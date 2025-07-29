import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Button from '../../shared/Button';
import { TbLocationFilled } from 'react-icons/tb';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const ModernChevronLeftIcon = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ModernChevronRightIcon = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Fixed images
const fixedImages = [
  'https://i.ibb.co/Wpv3Yr9J/card1.jpg',
  'https://i.ibb.co/m5gwfHWb/card2.jpg',
  'https://i.ibb.co/Ps1Zzg90/card3.jpg',
];

const DiscountCoupons = () => {
  const axiosInstance = useAxios();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const navigate = useNavigate();

  // Fetch coupons from database
  const { data: coupons = [], isError } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coupons');
      return res.data;
    },
  });

  // Auto slide logic
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % coupons.length);
  }, [coupons]);

  useEffect(() => {
    if (coupons.length > 1) {
      autoplayRef.current = setInterval(goToNext, 4000);
      return () => clearInterval(autoplayRef.current);
    }
  }, [goToNext, coupons]);

  const changeSlide = (index) => {
    setActiveIndex((index + coupons.length) % coupons.length);
  };

  const onDragEnd = (event, info) => {
    const offset = info.offset.x;
    const threshold = 100;
    if (offset > threshold) {
      changeSlide(activeIndex - 1);
    } else if (offset < -threshold) {
      changeSlide(activeIndex + 1);
    }
  };

  // Handle coupon claim
  const handleCouponClaim = (couponCode) => {
    // Copy the coupon code to clipboard
    navigator.clipboard.writeText(couponCode).then(() => {
      // Show success popup
      Swal.fire({
        title: 'Coupon Claimed!',
        text: `Code "${couponCode}" copied to clipboard.`,
        icon: 'success',
        confirmButtonText: 'Continue',
        timer: 2000
      });

      navigate('/courts');
    }).catch(err => {
      console.error('Failed to copy coupon code:', err);
      Swal.fire({
        title: 'Oops!',
        text: 'Failed to copy the coupon code.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };


  if (isError) return <div className="text-center text-red-500 py-10">Failed to load coupons. Please login again.</div>;

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-20 md:pb-32">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
        Discount <span className="text-[#FF02CB]">Coupons</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>
      <p className="max-w-3xl px-4 mx-auto text-lg md:text-xl font-semibold italic text-gray-700 mb-10 leading-relaxed text-center">
        Grab your EliteClub discount coupons now—save more on courts, sessions, and memberships!
      </p>

      {/* Carousel */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[550px] overflow-hidden flex items-center justify-center">
        {coupons.map((coupon, index) => {
          const offset = index - activeIndex;
          const displayOffset = offset > coupons.length / 2 ? offset - coupons.length : offset < -coupons.length / 2 ? offset + coupons.length : offset;
          const isVisible = Math.abs(displayOffset) <= 1;
          const isActive = displayOffset === 0;

          return (
            <motion.div
              key={coupon._id}
              className="absolute w-[70%] md:w-[60%] lg:w-[38%] h-[100%] mx-auto"
              animate={{
                x: `${displayOffset * 60}%`,
                scale: isActive ? 1 : 0.8,
                opacity: isVisible ? 1 : 0,
                zIndex: coupons.length - Math.abs(displayOffset),
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl group"
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={onDragEnd}
              >
                <img
                  src={fixedImages[index % fixedImages.length]}
                  alt="Coupon Card"
                  className="w-full h-full object-cover group-hover:scale-125 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent text-white w-full h-full">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 text-center">
                    <span className="backdrop-blur bg-gradient-to-r from-pink-500/40 to-fuchsia-500/30 border border-pink-400 text-white font-semibold px-4 md:px-8 py-10 rounded-4xl shadow-md hover:scale-105 transition-all duration-300 text-2xl sm:text-3xl">
                      <p className="pb-4 text-left">🎁 Coupon:</p>
                      <p className="bg-white px-4 md:px-8 py-2 rounded-4xl text-black text-lg sm:text-2xl font-hoover">
                        {coupon.coupon} — {coupon.discount} OFF
                      </p>
                    </span>
                    <Button text="Claim Coupon" onClick={() => handleCouponClaim(coupon.coupon)} />
                    {isActive && (
                      <p className="text-sm md:text-lg absolute bottom-8 text-white font-medium max-w-md px-1.5">
                        {coupon.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <button
          onClick={() => changeSlide(activeIndex - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 shadow-lg hover:shadow-pink-400 hover:scale-110 transition transform"
        >
          <ModernChevronLeftIcon />
        </button>

        {coupons.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-3 h-3 rounded-full ${i === activeIndex ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-4 h-4 shadow-lg' : 'bg-white'} transition-all cursor-pointer`}
          />
        ))}

        <button
          onClick={() => changeSlide(activeIndex + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 shadow-lg hover:shadow-pink-400 hover:scale-110 transition transform"
        >
          <ModernChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default DiscountCoupons;
