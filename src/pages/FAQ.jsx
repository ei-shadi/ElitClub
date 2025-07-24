import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaCalendarCheck, FaCreditCard, FaUsersCog, FaChevronDown } from 'react-icons/fa';
import { TbLocationFilled } from 'react-icons/tb';

// Usage steps with icons
const usageSteps = [
  {
    icon: <FaUserPlus className="text-3xl" />,
    title: '1. Register',
    desc: 'Sign up easily as a member, coach, or admin to access your personalized dashboard.',
  },
  {
    icon: <FaCalendarCheck className="text-3xl" />,
    title: '2. Book Sessions',
    desc: 'Reserve your preferred court or session with real-time availability.',
  },
  {
    icon: <FaCreditCard className="text-3xl" />,
    title: '3. Make Payments',
    desc: 'Pay for memberships and bookings securely using our integrated system.',
  },
  {
    icon: <FaUsersCog className="text-3xl" />,
    title: '4. Manage Dashboard',
    desc: 'Control your account, track activity, and monitor performance from one place.',
  },
];

const faqData = [
  {
    question: 'What is EliteClub?',
    answer: 'EliteClub is a Sports Club Management System (SCMS) designed to manage memberships, court bookings, sessions, payments, and user roles in a single-club environment.',
  },
  {
    question: 'Who can use the platform?',
    answer: 'The system supports three roles: Admins, Coaches/Managers, and Members. Each role has tailored dashboard features and access controls.',
  },
  {
    question: 'How do I register as a member?',
    answer: 'Simply go to the registration page, fill out your personal and contact details, and create your account. After registration, you can log in and access member features.',
  },
  {
    question: 'Can I book courts or training sessions online?',
    answer: 'Yes, members can check availability and book courts or sessions directly through the dashboard using the booking module.',
  },
  {
    question: 'How does payment work?',
    answer: 'The system offers secure payment processing for membership fees, bookings, and events. Users can pay using their preferred method, and admins can track payment status.',
  },
  {
    question: 'What kind of admin features are included?',
    answer: 'Admins have full access to user management, booking oversight, payment monitoring, coupon systems, and club announcements.',
  },
  {
    question: 'How can I get support if I face issues using EliteClub?',
    answer: 'EliteClub offers dedicated customer support through email, phone, and live chat. Our team is available to assist you with any technical issues, account questions, or feature requests to ensure a smooth experience.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-36 lg:pt-40 pb-32">
      {/* How To Use Section */}
      <div className="mb-32">
        <h2 className="text-3xl md:text-6xl font-extrabold text-gray-600 mb-14 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-2 md:gap-3">
          Why Choose <span className="text-[#FF02CB]">EliteClub?</span>
          <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {usageSteps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative group p-6 rounded-2xl border border-pink-400 bg-gradient-to-r from-pink-500/40 to-fuchsia-500/30 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:bg-[#FF02CB]/80 hover:scale-110 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-white">
                <div className="mb-4 text-white bg-pink-500/50 rounded-full p-4 shadow-md group-hover:bg-black/50">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 drop-shadow-md text-center">{step.title}</h3>
                <p className="text-sm text-center text-white/90">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <h2 className="text-3xl md:text-6xl font-extrabold text-gray-600 mb-14 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <TbLocationFilled className="rotate-90 text-4xl md:text-5xl" />
        <span className="text-[#FF02CB]">Frequently Asked</span>
        Question
      </h2>

      <div className="space-y-6">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer transition-all duration-300 bg-white/70 backdrop-blur-md border border-fuchsia-300 rounded-2xl px-6 py-5 shadow-md hover:shadow-xl hover:bg-white/90"
            onClick={() => toggleFAQ(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleFAQ(index);
              }
            }}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
            aria-labelledby={`faq-header-${index}`}
          >
            <div className="flex justify-between items-center w-full text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 group-hover:text-fuchsia-600 transition">
                {item.question}
              </h3>
              <FaChevronDown
                className={`ml-2 text-fuchsia-600 transition-transform duration-400 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>

            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
              id={`faq-content-${index}`}
              role="region"
              aria-labelledby={`faq-header-${index}`}
              className="mt-4 text-gray-700 text-lg leading-relaxed italic font-semibold"
            >
              {openIndex === index && <p>{item.answer}</p>}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
