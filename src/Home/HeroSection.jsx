import { useQuery } from '@tanstack/react-query';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import { Link } from 'react-router';

const HeroSection = () => {
    const axiosSucure = useAxiosSucure();
    const { data: trendingArticles = [] } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosSucure.get('/articles/trending');
            return res.data;
        }
    });

    return (
        <section className="mx-auto  py-10 grid grid-cols-1 lg:grid-cols-8 gap-6">
            {/* Left - Breaking News */}
            <div className='lg:col-span-2 space-y-4'>
                <h2 className="text-xl font-bold border-b-4 border-black inline-block mb-2">
                    Breaking news:
                </h2>
                <div>
                    <p className="text-yellow-500 font-semibold">Politics</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-1 mb-2">
                        The Scars of War Will Remain There for Life, Published Study Finds
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">March 22, 2022</p>
                    <p className="text-gray-600 text-sm mb-4">
                        I actually first read this as alkalizing meaning effecting pH level,
                        and I was like, OK I guess I understand how that could positively
                        effect...
                    </p>
                    <button className="bg-black text-white text-xs px-3 py-1 font-semibold">
                        READ MORE
                    </button>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex flex-col">
                        <span className="text-white bg-blue-900 px-2 py-0.5 text-xs font-bold w-fit rounded">
                            LOCKED
                        </span>
                        <p className="font-bold text-lg mt-1">
                            Companies Will Invest At Least $125 Billion in Metaverse Development
                        </p>
                        <span className="text-yellow-500 font-semibold">Finance</span>
                        <span className="text-gray-600">March 8, 2022</span>
                    </div>

                    <div className="flex flex-col mt-3">
                        <p className="font-bold">
                            New Soundboard Review: Pricing is Not Always the Only Criteria
                        </p>
                        <span className="text-yellow-500 font-semibold">Technology</span>
                        <span className="text-gray-600">March 8, 2022</span>
                    </div>
                </div>
            </div>

            {/* Center - Swiper */}
            <div className="flex flex-col items-center lg:col-span-4">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="w-full h-[200px] sm:h-[300px] md:h-[500px] lg:h-[600px]"
                >
                    {trendingArticles?.map((baner, index) => (
                        <SwiperSlide key={index}>
                            <div className='relative'>
                                <Link to={`/Articles-Details/${baner?._id}`}>
                                    <img
                                        src={baner?.image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover mt-6"
                                    />
                                </Link>
                                <span className='absolute px-2 rounded-md top-1 right-1 bg-black text-white text-xs'>
                                    {baner?.view} view
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Right - Popular */}
            <div className='lg:col-span-2 space-y-6'>
                <h2 className="text-xl font-bold border-b-4 border-black inline-block">
                    Popular:
                </h2>

                <div className="w-full">
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                        alt="popular-1"
                        className="w-full h-36 object-cover rounded"
                    />
                    <p className="text-yellow-500 font-semibold mt-2">Finance</p>
                    <p className="font-bold text-sm sm:text-base">
                        The Secret to Your Company’s Financial Health is Very Important
                    </p>
                </div>

                <div className="w-full">
                    <img
                        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
                        alt="popular-2"
                        className="w-full h-36 object-cover rounded"
                    />
                    <p className="text-yellow-500 font-semibold mt-2">Music</p>
                    <div className="flex items-center gap-2">
                        <span className="text-white bg-blue-900 px-2 py-0.5 text-xs font-bold rounded">
                            LOCKED
                        </span>
                        <p className="font-bold text-sm sm:text-base">
                            Pixar Brings it’s Animated Movies to Life with Studio Music
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
