import React from "react";
import { Users, UserCheck, Crown, TrendingUp } from "lucide-react";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatisticsSection = () => {
  const axiosSecure = useAxiosSucure();
  const { data: growthData, isLoading } = useQuery({
    queryKey: ["growthData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart/overview");
      return res.data;
    },
  });

  if (isLoading || !growthData) {
    return <div className="text-center mt-16 text-xl">Loading...</div>;
  }

  const { totalUsers, premiumUsers, totalArticles } = growthData;

  const stats = [
    {
      title: "Total Readers",
      value: totalUsers,
      icon: <Users className="h-8 w-8" />,
      color: "from-amber-500 to-red-600",
      desc: "Daily readers across the globe",
    },
    {
      title: "Premium Subscribers",
      value: premiumUsers,
      icon: <UserCheck className="h-8 w-8" />,
      color: "from-green-500 to-emerald-700",
      desc: "Exclusive members with full access",
    },
    {
      title: "Published Articles",
      value: totalArticles,
      icon: <Crown className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-700",
      desc: "News & stories shaping the world",
    },
  ];

  return (
    <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-[#fdfcf9]">
      {/* Paper style background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#fff6e5,_#ffffff)]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Editorial Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-5xl font-extrabold font-serif text-gray-900 leading-tight">
            By the Numbers: <br /> <span className="text-red-600">Our Reach</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Trusted by thousands of readers, our newsroom continues to grow
            with impactful journalism, premium storytelling, and millions of
            engaged views every month.
          </p>

          <div className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full shadow-md text-sm font-semibold mt-8 tracking-wide uppercase">
            <TrendingUp className="h-4 w-4 mr-2" />
            Growing 25% Every Month
          </div>
        </motion.div>

        {/* Right: Breaking Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative rounded-xl p-[2px] bg-gradient-to-r from-gray-200 via-white to-gray-200 shadow-xl"
            >
              <div className="bg-white rounded-xl p-8 h-full flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white shadow-md`}
                  >
                    {item.icon}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div
                    className={`mt-2 text-4xl font-extrabold font-serif bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    <CountUp duration={4} end={item.value} /> +
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
