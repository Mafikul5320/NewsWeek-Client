import { TrendingUp, Search, Star, CheckCircle } from "lucide-react";

const PublishersSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted <span className="text-blue-600">Publishers</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover content from verified publishers worldwide
          </p>
        </div>

        {/* Filters - UI only, not functional */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search publishers..."
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <select className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-48">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Science</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-48">
            <option>Most Followers</option>
            <option>Most Articles</option>
            <option>Highest Rated</option>
            <option>Most Readers</option>
          </select>
        </div>

        {/* Publishers Grid - 3 static cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Publisher Card */}
          <div className="bg-white rounded-xl border border-gray-300 p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80"
                  alt="TechCrunch"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-500 bg-white rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">TechCrunch</h3>
                <div className="flex gap-2 mt-1 text-xs">
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Technology</span>
                  <span className="flex items-center bg-orange-500 text-white px-2 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3 mr-1" /> Hot
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Leading technology news and startup insights covering startups, innovation, and the latest tech trends.
            </p>
            <div className="grid grid-cols-2 text-center mb-4">
              <div>
                <div className="font-semibold text-sm">2,500,000</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div>
                <div className="font-semibold text-sm">1,250</div>
                <div className="text-xs text-gray-400">Articles</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <button className="text-sm font-semibold bg-[#ff5724] rounded-lg shadow text-white px-3 py-3  hover:bg-blue-700">
                Follow
              </button>
            </div>
          </div>

          {/* More publisher cards can be duplicated similarly */}
        </div>
      </div>
    </section>
  );
};

export default PublishersSection;
