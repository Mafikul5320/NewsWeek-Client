import React from 'react';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Eye } from 'lucide-react';

const TrendingArticles = () => {
  const axiosSucure = useAxiosSucure();
  const { data: articles = [], } = useQuery({
    queryKey: ['trendingArticles'],
    queryFn: async () => {
      const res = await axiosSucure.get('/articles/trending');
      return res.data;
    }
  });
  return (
    <div>
      <div className='flex justify-center'>
        <div className="relative inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 shadow-inner glow">
          <span className="relative flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 shadow"></span>
          </span>
          <span className="text-2xl font-semibold !italic tracking-wide text-red-600">
            Breaking News Live
          </span>

          {/* shimmer */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute -left-10 top-0 h-full w-10 translate-x-0  bg-white/30 blur-md shine"></span>
          </span>

          <style>{`
        @keyframes shineMove { 
          0% { transform: translateX(-120%) ; } 
          100% { transform: translateX(220%) ; } 
        }
        .shine { animation: shineMove 2.2s linear infinite; }
        @keyframes glowPulse {
          0%,100% { box-shadow: inset 0 0 0 0 rgba(239,68,68,0.10), 0 0 0 0 rgba(239,68,68,0.15); }
          50% { box-shadow: inset 0 0 30px 4px rgba(239,68,68,0.12), 0 0 20px 4px rgba(239,68,68,0.20); }
        }
        .glow { animation: glowPulse 2.4s ease-in-out infinite; }
      `}</style>
        </div>
      </div>
      <div className="bg-white py-6 pl-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Breaking</h2>
        <div className=" gap-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            centeredSlides={false}
            grabCursor={true}
          >
            {articles.map((article) => (
              <SwiperSlide key={article._id} className="!w-[27%] ">
<div className="relative group overflow-hidden rounded-lg">
  <Link to={`/Articles-Details/${article._id}`}>
    <img
      src={article?.image}
      alt={article?.title}
      className="w-full !h-120 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
    />
  </Link>

  {/* bottom overlay with category, title & views */}
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white flex justify-between items-end">
    <div>
      <div className="bg-red-600 uppercase text-xs px-2 py-1 mb-1 inline-block rounded">
        {article?.categories}
      </div>
      <h3 className="font-semibold text-lg leading-snug">
        {article?.title}
      </h3>
    </div>

    {/* views counter */}
    <span className="flex items-center text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full gap-1">
      <Eye size={14} /> {article.view}
    </span>
  </div>
</div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TrendingArticles;
