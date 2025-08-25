import { useQuery } from '@tanstack/react-query';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import { Link } from 'react-router';
import { Eye } from 'lucide-react';

const HeroSection = () => {
    const axiosSucure = useAxiosSucure();
    const { data: trendingArticles = [] } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosSucure.get('/articles/trending');
            return res.data;
        }
    });
    console.log(trendingArticles)
    const { data: LatestArticles = [] } = useQuery({
        queryKey: ['LatestArticles'],
        queryFn: async () => {
            const res = await axiosSucure.get('/latest/articles');
            return res.data;
        }
    });
    console.log(LatestArticles)

    const { data: Allcategories, } = useQuery({
        queryKey: ["Allcategories"],
        queryFn: async () => {
            const res = await axiosSucure.get("/categories")
            return res.data
        }
    });

    return (

        <section className="mx-auto  py-10 grid grid-cols-1 lg:grid-cols-8 gap-6">
            {/* Left - Breaking News */}
            <div className='lg:col-span-2 space-y-4'>
                <h2 className="text-xl font-bold border-b-4 border-black inline-block mb-2">
                    Latest news:
                </h2>
                <div>

                    {
                        LatestArticles?.slice(0, 1).map(oneArticles => (<div>
                            <p className="text-yellow-500 font-semibold">{oneArticles?.categories}</p>
                            <Link to={`/Articles-Details/${oneArticles?._id}`}><h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-1 mb-2 hover:text-amber-400">
                                {oneArticles?.title}
                            </h3></Link>
                            <p className="text-sm text-gray-700 mb-2">{oneArticles?.date}</p>
                            <p className="text-gray-600 text-sm mb-4">
                                {oneArticles?.description?.split(" ").slice(0, 25).join(" ")}...
                            </p>
                            <Link to={`/Articles-Details/${oneArticles?._id}`}>
                                <button className="bg-black text-white text-xs px-3 py-1 font-semibold hover:bg-black/50">
                                    READ MORE
                                </button>
                            </Link>
                        </div>))
                    }
                    {
                        LatestArticles?.slice(2, 3).map(oneArticles => (<div className="flex flex-col pt-2">

                            <Link to={`/Articles-Details/${oneArticles?._id}`}>
                                <p className="font-bold text-lg mt-1 hover:text-amber-400">
                                    {oneArticles?.title}
                                </p>
                            </Link>
                            <span className="text-yellow-500 font-semibold">{oneArticles?.categories}</span>
                            <span className="text-gray-600">{oneArticles?.date}</span>
                        </div>))
                    }
                    {
                        LatestArticles?.slice(3, 4).map(oneArticles => (
                            <div className="flex flex-col pt-2">

                                <Link to={`/Articles-Details/${oneArticles?._id}`}>
                                    <p className="font-bold text-lg mt-1 hover:text-amber-400">
                                        {oneArticles?.title}
                                    </p>
                                </Link>
                                <span className="text-yellow-500 font-semibold">{oneArticles?.categories}</span>
                                <span className="text-gray-600">{oneArticles?.date}</span>
                            </div>))
                    }

                </div>
            </div>
            {/* Center - Swiper */}
            <div className="flex flex-col items-center lg:col-span-4">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className="w-full h-[220px] sm:h-[350px] md:h-[570px]  rounded-2xl overflow-hidden shadow-xl"
                >
                    {trendingArticles?.map((baner, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/Articles-Details/${baner?._id}`}>
                                <div className="relative w-full h-full">
                                    {/* Background Image */}
                                    <img
                                        src={baner?.image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                                        <span className="bg-amber-500 text-xs px-3 py-1 rounded-full font-semibold">
                                            {baner?.categories || "News"}
                                        </span>


                                        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug hover:text-amber-400 transition-colors">
                                            {baner?.title}
                                        </h2>


                                        <p className="hidden sm:block text-sm md:text-base text-gray-200 line-clamp-2">
                                            {baner?.description?.split(" ").slice(0, 20).join(" ")}...
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs md:text-sm text-gray-300">
                                                {baner?.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                                                <Eye size={14} /> {baner?.view}
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* Right - Popular */}
            <div className='lg:col-span-2 space-y-6'>
                <h2 className="text-xl font-bold border-b-4 border-black inline-block">
                    Popular:
                </h2>
                {
                    Allcategories?.slice(0, 2).map(onecat => (<><Link to={`/categories-article?category=${onecat?.category}`}>
                        <div className="w-full group">
                            <img
                                src={onecat?.image}
                                alt="popular-1"
                                className="w-full h-40 object-cover rounded group-hover:scale-105 duration-300 transition-transform"
                            />
                            <p className="text-yellow-500 font-semibold mt-2">{onecat?.category}</p>
                            <p className="font-bold text-sm sm:text-base">
                                {onecat?.description}
                            </p>
                        </div>
                    </Link></>))
                }
            </div>
        </section>
    );
};

export default HeroSection;
