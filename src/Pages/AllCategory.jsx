import React, { useRef } from 'react';
import { Link } from 'react-router';
import {
    Globe,
    Activity,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSucure';

const AllCategory = () => {
    const categoriesRef = useRef(null);
    const axiosSucure = useAxiosSecure()

    const { data: categories } = useQuery({
        queryKey: ["Allcategories"],
        queryFn: async () => {
            const res = await axiosSucure.get("/categories")
            return res.data;
        }
    })

    return (
        <div className="space-y-12 my-6 w-11/13 mx-auto">
            {/* Section Header */}
            <div className="relative bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl py-10 text-center text-amber-500 mb-30">
                <div className="absolute inset-0">
                    <img
                        src="https://i.ibb.co.com/0pcq5sXN/banner-for-news-feeds-and-headlines-for-tv-or-internet-needs-photo.jpg"
                        alt="News background"
                        className="w-full h-full object-cover rounded-2xl opacity-25"
                    />
                </div>
                <h2 className="relative text-3xl lg:text-4xl font-bold">
                    Explore by Category
                </h2>
                <p className="relative text-lg max-w-3xl mx-auto mt-2 text-slate-200">
                    Discover news that matters to you. Browse our comprehensive categories
                    covering everything from breaking news to in-depth analysis.
                </p>
            </div>

            {/* Categories Grid */}
            <div ref={categoriesRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 ">
                {categories?.map((category, index) => {
                    const IconComponent = category?.icon;
                    return (
                        <Link 
                        to={`/categories-article?category=${category?.category}`}
                            key={index}

                            className="category-card group"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                                {/* Background Image */}
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={category?.image}
                                        alt={category?.category}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    <div className="absolute top-3 right-3">
                                        <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                                            50
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                        {category?.category}
                                    </h3>
                                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                                        {category?.description}
                                    </p>
                                </div>
                                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-all duration-600 ease-in-out">
                                    {/* Blur background */}
                                    <div className="absolute inset-0 bg-amber-100/30 backdrop-blur-sm/20 z-0 rounded-xl"></div>

                                    {/* Button on top */}
                                    <div className="relative w-full h-full flex justify-center items-center z-10">
                                        <button className="bg-amber-400 px-4 py-2 rounded-lg shadow-md font-semibold">
                                            View
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-amber-500/5 transition-all duration-300 rounded-2xl"></div>
                            </div>
                        </Link>
                    );
                })}
            </div>


        </div>
    );
};

export default AllCategory;