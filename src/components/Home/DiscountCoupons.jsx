import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '../../shared/Button';
import { TbLocationFilled } from 'react-icons/tb';
import Img1 from '../../assets/card1.jpg';
import Img2 from '../../assets/card2.jpg';
import Img3 from '../../assets/card3.jpg';


const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cardData = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/WvNNtrV0/card1.jpg',
    coupon: 'SPORT5',
    discount: '5%',
    description: 'Save 5% on our Sports Club Management System with code SPORT5.',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/TZpTmw5/card2.jpg',
    coupon: 'CLUB10',
    discount: '10%',
    description: 'Get 10% off when you manage your single club with CLUB10!',
  },
  {
    id: 3,
    imageUrl: 'https://i.ibb.co/G4GFvz98/card3.jpg',
    coupon: 'GYM15',
    discount: '15%',
    description: 'Upgrade your club’s system and save 15% using GYM15.',
  },
];

export default function Carousel() {
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
    <div className="relative w-full max-w-7xl mx-auto py-10 select-none pb-32">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-600 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
        Discount <span className="text-[#FF02CB]">Coupons</span>
        <TbLocationFilled className='rotate-180 text-4xl md:text-5xl' />
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
              className="absolute w-[70%] md:w-[50%] lg:w-[38%] h-[100%] mx-auto"
              animate={{
                x: `${offset * 60}%`,
                scale: isActive ? 1 : 0.8,
                opacity: isVisible ? 1 : 0,
                zIndex: cardData.length - Math.abs(offset),
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl"
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={onDragEnd}
              >
                <img
                  src={card.imageUrl}
                  alt={`Card ${card.id}`}
                  className="w-full h-full object-cover hover:scale-125 transition duration-500"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent text-white p-4 w-full">

                  <div className="flex flex-col items-center justify-center">
                    <span className="backdrop-blur bg-gradient-to-r from-pink-500/40 to-fuchsia-500/30 border border-pink-400 text-white  font-semibold px-4 py-10 rounded-4xl shadow-md hover:scale-105 transition-all duration-300 mb-5 text-2xl sm:text-3xl">
                      <p className='pb-4'>🎁 Coupon: </p>

                      <p className='bg-white px-4 py-2 rounded-4xl font-hoover text-black text-lg sm:text-xl lg:text-3xl'>
                        {card.coupon} — {card.discount} OFF
                      </p>
                    </span>
                    <Button text="Get Offer" />
                  </div>


                  {/* Description */}
                  {isActive && (
                    <p className="text-center text-sm mt-4 text-white font-medium">
                      {card.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => changeSlide(activeIndex - 1)}
          className="p-2 rounded-full bg-[#4E6766] text-white shadow hover:bg-black hover:scale-110 cursor-pointer transition"
        >
          <ChevronLeftIcon />
        </button>
        {cardData.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-black w-4' : 'bg-white'
              } transition-all`}
          />
        ))}
        <button
          onClick={() => changeSlide(activeIndex + 1)}
          className="p-2 rounded-full bg-[#4E6766] text-white shadow hover:bg-black cursor-pointer transition hover:scale-110"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
