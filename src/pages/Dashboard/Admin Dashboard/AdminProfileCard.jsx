import { FaUsers, FaUserShield } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";

const AdminProfileCard = ({ courts, users, members }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-8 w-full">
      {/* Total Courts */}
      <div className="bg-white dark:bg-gray-900 border-l-8 border-r-8 border-[#FF02CB] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
        <MdSportsTennis className="text-4xl text-[#FF02CB]" />
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Total Courts :
        </p>
        <p className="text-2xl font-bold text-black dark:text-gray-200">
          {courts}
        </p>
      </div>

      {/* Total Users */}
      <div className="bg-white dark:bg-gray-900 border-l-8 border-r-8 border-[#16DB65] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
        <FaUsers className="text-4xl text-[#16DB65]" />
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Total Users :
        </p>
        <p className="text-2xl font-bold text-black dark:text-gray-200">
          {users}
        </p>
      </div>

      {/* Total Members */}
      <div className="bg-white dark:bg-gray-900 border-l-8 border-r-8 border-[#3A86FF] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
        <FaUserShield className="text-4xl text-[#3A86FF]" />
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Total Members :
        </p>
        <p className="text-2xl font-bold text-black dark:text-gray-200">
          {members}
        </p>
      </div>
    </div>
  );
};

export default AdminProfileCard;
