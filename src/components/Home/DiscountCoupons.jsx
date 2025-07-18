import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '../../shared/Button';
import { TbLocationFilled } from 'react-icons/tb';

const ModernChevronLeftIcon = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    viewBox="0 0 24 24"
  >
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ModernChevronRightIcon = () => (
  <svg
    className="w-7 h-7 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    viewBox="0 0 24 24"
  >
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cardData = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/Wpv3Yr9J/card1.jpg',
    coupon: 'SPORT5',
    discount: '5%',
    description: 'Save 5% on our Sports Club Management System with code SPORT5.',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/m5gwfHWb/card2.jpg',
    coupon: 'CLUB10',
    discount: '10%',
    description: 'Get 10% off when you manage your single club with CLUB10!',
  },
  {
    id: 3,
    imageUrl: 'https://i.ibb.co/Ps1Zzg90/card3.jpg',
    coupon: 'GYM15',
    discount: '15%',
    description: 'Upgrade your club’s system and save 15% using GYM15.',
  },
];


// DiscountCoupons Button
const handleCouponClaim = () => {
  alert('Coupon code copied to clipboard!');
}

const DiscountCoupons = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const autoplayRef = useRef(null);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  }, []);

  useEffect(() => {
    autoplayRef.current = setInterval(goToNext, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [goToNext]);

  const changeSlide = (index) => {
    setActiveIndex((index + cardData.length) % cardData.length);
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

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-20 md:pb-32">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
        Discount <span className="text-[#FF02CB]">Coupons</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>
      <p className="max-w-3xl px-4 mx-auto text-lg md:text-xl font-semibold italic text-gray-700 mb-10 leading-relaxed text-center">
        Grab your EliteClub discount coupons now—save more on courts, sessions, and memberships!
      </p>

      {/* Carousel container */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[550px] overflow-hidden flex items-center justify-center">
        {cardData.map((card, index) => {
          let offset = index - activeIndex;
          if (offset > cardData.length / 2) offset -= cardData.length;
          if (offset < -cardData.length / 2) offset += cardData.length;

          const isVisible = Math.abs(offset) <= 1;
          const isActive = offset === 0;

          return (
            <motion.div
              key={card.id}
              className="absolute w-[70%] md:w-[60%] lg:w-[38%] h-[100%] mx-auto"
              animate={{
                x: `${offset * 60}%`,
                scale: isActive ? 1 : 0.8,
                opacity: isVisible ? 1 : 0,
                zIndex: cardData.length - Math.abs(offset),
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
                  src={card.imageUrl}
                  alt={`Card ${card.id}`}
                  className="w-full h-full object-cover group-hover:scale-125 transition duration-500 "
                />

                {/* Overlay and centered content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent text-white w-full h-full ">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 text-center">
                    <span className="backdrop-blur bg-gradient-to-r from-pink-500/40 to-fuchsia-500/30 border border-pink-400 text-white font-semibold px-4 md:px-8 py-10 rounded-4xl shadow-md hover:scale-105 transition-all duration-300 text-2xl sm:text-3xl">
                      <p className="pb-4 text-left">🎁 Coupon:</p>
                      <p className="bg-white px-4 md:px-8 py-2 rounded-4xl font-hoover text-black text-lg sm:text-3xl">
                        {card.coupon} — {card.discount} OFF
                      </p>
                    </span>
                    <Button text="Claim Coupon" onClick={handleCouponClaim}/>
                    {isActive && (
                      <p className="text-sm md:text-lg absolute bottom-8 text-white font-medium max-w-md px-1.5">
                        {card.description}
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
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 shadow-lg hover:shadow-pink-400 hover:scale-110 transition transform cursor-pointer"
          aria-label="Previous Slide"
        >
          <ModernChevronLeftIcon />
        </button>

        {cardData.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-3 h-3 rounded-full ${i === activeIndex
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-4 h-4 shadow-lg'
                : 'bg-white'
              } transition-all cursor-pointer`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}

        <button
          onClick={() => changeSlide(activeIndex + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 shadow-lg hover:shadow-pink-400 hover:scale-110 transition transform cursor-pointer"
          aria-label="Next Slide"
        >
          <ModernChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

export default DiscountCoupons;