import React, { useRef } from 'react';
import { Link } from 'react-router';
import {
  Globe,
  Activity,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSucure';

const FeaturedCategories = () => {
  const categoriesRef = useRef(null);
  const axiosSucure = useAxiosSecure()

  const { data: categories } = useQuery({
    queryKey: ["Allcategories"],
    queryFn: async () => {
      const res = await axiosSucure.get("/categories")
      return res.data;
    }
  })

  // const categories = [
  //   {
  //     name: 'World News',
  //     //   icon: Globe,
  //     color: 'from-blue-500 to-blue-600',
  //     bgColor: 'bg-blue-50',
  //     description: 'Global events and international affairs',
  //     articleCount: 1250,
  //     image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
  //   },
  //   {
  //     name: 'Technology',
  //     //   icon: Laptop,
  //     color: 'from-purple-500 to-purple-600',
  //     bgColor: 'bg-purple-50',
  //     description: 'Latest tech innovations and digital trends',
  //     articleCount: 890,
  //     image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400'
  //   },
  //   {
  //     name: 'Business',
  //     //   icon: DollarSign,
  //     color: 'from-green-500 to-green-600',
  //     bgColor: 'bg-green-50',
  //     description: 'Market analysis and economic insights',
  //     articleCount: 756,
  //     image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400'
  //   },
  //   {
  //     name: 'Health',
  //     icon: Activity,
  //     color: 'from-red-500 to-red-600',
  //     bgColor: 'bg-red-50',
  //     description: 'Medical breakthroughs and wellness',
  //     articleCount: 634,
  //     image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=400'
  //   },
  // ];

  return (
    <div className="space-y-12 my-6 w-11/13 mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
          Explore by Category
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Discover news that matters to you. Browse our comprehensive categories
          covering everything from breaking news to in-depth analysis.
        </p>
      </div>
      {/* Categories Grid */}
      <div ref={categoriesRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {categories?.slice(0, 4).map((category, index) => {
          const IconComponent = category?.icon;
          return (
            <Link
              to={`/categories-article?category=${category?.category}`}
              key={index}

              className="category-card group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                {/* Background Image */}
                <div className="relative h-40 overflow-hidden">
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

      {/* Call to Action */}
      <div className="mt-6 flex justify-end">
        <Link
          to={"/all-category"}
          className="inline-flex items-center px-6 py-2 bg-slate-900 text-white font-semibold 
               rounded-lg hover:bg-slate-800 transition-all duration-200"
        >
          View All Articles
          <Globe className="ml-2 h-5 w-5" />
        </Link>
      </div>

    </div>
  );
};

export default FeaturedCategories;