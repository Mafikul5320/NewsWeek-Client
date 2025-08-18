import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Ray Robertson",
    title: "CEO, Company",
    img: "https://i.pravatar.cc/100?img=1",
    date: "10th Feb, 2023",
    review:
      "NewsHub Pro has completely changed the way I consume news daily. The articles are insightful, reliable, and beautifully presented.",
  },
  {
    name: "Ray Robertson",
    title: "CEO, Company",
    img: "https://i.pravatar.cc/100?img=1",
    date: "10th Feb, 2023",
    review:
      "NewsHub Pro has completely changed the way I consume news daily. The articles are insightful, reliable, and beautifully presented.",
  },
  {
    name: "Ray Robertson",
    title: "CEO, Company",
    img: "https://i.pravatar.cc/100?img=1",
    date: "10th Feb, 2023",
    review:
      "NewsHub Pro has completely changed the way I consume news daily. The articles are insightful, reliable, and beautifully presented.",
  },
  {
    name: "Ray Robertson",
    title: "CEO, Company",
    img: "https://i.pravatar.cc/100?img=1",
    date: "10th Feb, 2023",
    review:
      "NewsHub Pro has completely changed the way I consume news daily. The articles are insightful, reliable, and beautifully presented.",
  },
  {
    name: "Sherl",
    title: "Marketing Manager",
    img: "https://i.pravatar.cc/100?img=2",
    date: "15th Mar, 2023",
    review:
      "I love the premium experience. The UI is clean, distraction-free, and feels tailored just for me.",
  },
  {
    name: "David Johnson",
    title: "Software Engineer",
    img: "https://i.pravatar.cc/100?img=3",
    date: "2nd Apr, 2023",
    review:
      "The content quality is unmatched! I feel confident that I’m always reading trustworthy and up-to-date information.",
  },
];

const ReviewSection = () => {
  return (
    <section className="my-12 px-4 sm:px-8 lg:px-20">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900">
        What Our Readers Say
      </h1>
      <p className="text-base sm:text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto">
        Join thousands of satisfied readers who trust{" "}
        <span className="font-semibold text-orange-500">NewsHub Pro</span> for
        their daily news. Here’s what they say about their experience.
      </p>

      {/* Swiper Container */}
      <div className="mt-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="pb-12"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white shadow-xl rounded-2xl p-8 h-full flex flex-col justify-between border border-gray-100 hover:shadow-2xl transition-all duration-300">
                {/* Stars + Date */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex text-yellow-400 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={18} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>

                {/* Review */}
                <div className="relative mb-6">
                  <FaQuoteLeft className="absolute -top-4 -left-2 text-3xl text-orange-500/80" />
                  <p className="text-gray-700 font-medium text-base leading-relaxed pl-7">
                    {review.review}
                  </p>
                </div>

                {/* Profile */}
                <div className="flex items-center mt-6 space-x-4">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500">{review.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
