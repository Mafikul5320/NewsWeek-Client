import { TrendingUp, Search, Star, CheckCircle } from "lucide-react";
import useAxiosSucure from "../Hooks/useAxiosSucure";
import { useQuery } from "@tanstack/react-query";

const PublishersSection = () => {
  const axiosSucure = useAxiosSucure();
  const { data: Publishers = [], isLoading } = useQuery({
    queryKey: ['Publisherssection'],
    queryFn: async () => {
      const res = await axiosSucure.get('/publishers');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Trusted <span className="text-blue-600">Publishers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover content from verified publishers worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search publishers..."
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-400 transition duration-200"
            />
          </div>

          <select className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-48 transition duration-200">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Science</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 w-full md:w-48 transition duration-200">
            <option>Most Followers</option>
            <option>Most Articles</option>
            <option>Highest Rated</option>
            <option>Most Readers</option>
          </select>
        </div>

        {/* Publishers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Publishers?.map(onePublisher => (
            <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={onePublisher?.logo}
                    alt={onePublisher?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-blue-500 bg-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{onePublisher?.name}</h3>
                  <div className="flex gap-2 mt-1 text-xs">
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Technology</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {onePublisher?.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{onePublisher?.rating || '4.8'}</span>
                </div>
                <button className="text-sm font-semibold bg-blue-600 rounded-lg shadow text-white px-3 py-2 hover:bg-blue-700 transition duration-200">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublishersSection;
