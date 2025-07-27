import { useQuery } from "@tanstack/react-query";
import { TbLocationFilled } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import useAxios from "../../hooks/useAxios";

const Announcements = () => {
  const axiosInstance = useAxios();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/announcements");
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      {/* Title with icon and responsive wrap */}
      <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-700 mb-12 text-center drop-shadow-sm flex flex-wrap items-center justify-center gap-3">
        <GrAnnounce className="text-4xl md:text-5xl text-orange-400" />
        <span className="text-[#FF02CB]">Announcements</span>
        <TbLocationFilled className="rotate-180 text-4xl md:text-5xl" />
      </h2>

      <div className="space-y-6">
        {announcements.length === 0 ? (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-dashed border-pink-300 text-center py-10 rounded-lg">
            <p className="text-center text-gray-500 bg-white py-2 px-10 rounded-2xl w-fit mx-auto font-hoover text-xl md:text-2xl">🚫 No announcement from Admin!</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-gradient-to-tr from-white to-pink-50 hover:from-pink-50 hover:to-white transition-all duration-300 shadow-lg rounded-xl p-6 border-l-4 border-[#FF02CB] hover:scale-[1.01]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                📌 {announcement.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-2">{announcement.message}</p>
              <p className="text-xs text-gray-500 text-right mt-4 italic">
                📅 {new Date(announcement.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
