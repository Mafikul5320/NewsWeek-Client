import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { CheckCircle } from "lucide-react";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import { useQuery } from "@tanstack/react-query";

const PublishersSection = () => {
  const axiosSucure = useAxiosSucure();
  const { data: Publishers = [], isLoading } = useQuery({
    queryKey: ["Publisherssection"],
    queryFn: async () => {
      const res = await axiosSucure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
<section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
  {/* Decorative Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
  </div>

  <div className="container mx-auto px-6 lg:px-12 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <div className="relative">
        <h2 className="text-5xl font-extrabold mb-6 leading-snug">
          Hear From Our{" "}
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
            Publishers
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          Discover why our trusted publishers love sharing content. Real
          feedback, real impact, and a global audience waiting for you.
        </p>

        {/* Decorative underline */}
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"></div>
      </div>

      {/* Right Content - Swiper */}
      <div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          loop={true}
        >
          {Publishers?.map((onePublisher, idx) => (
            <SwiperSlide key={idx}>
              {/* Gradient Border wrapper */}
              <div className="p-[2px] rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 shadow-xl my-5 ">
                <div className="relative bg-white rounded-3xl p-10">
                  {/* Logo with glowing ring */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 animate-pulse">
                        <img
                          src={onePublisher?.logo}
                          alt={onePublisher?.name}
                          className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
                      <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-amber-500 bg-white rounded-full shadow" />
                    </div>

                    {/* Publisher Name */}
                    <h3 className="text-2xl font-bold text-gray-900">
                      {onePublisher?.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{ fontStyle: "italic" }}
                    className="text-gray-600 text-base mt-6 text-center leading-relaxed"
                  >
                    {onePublisher?.description ||
                      "Sharing trusted stories with the world."}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-center mt-8">
                    <button
                      className="text-sm font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 
                      rounded-full shadow-md text-white px-6 py-2 
                      hover:scale-110 hover:shadow-[0_0_25px_rgba(251,191,36,0.7)] 
                      transition-all duration-300"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
</section>

  );
};

export default PublishersSection;
