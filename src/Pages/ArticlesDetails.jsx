import {
  ArrowLeft,
  Eye,
  Clock,
  User,
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const ArticlesDetails = () => {
  const { User } = useAuth();
  const UserAxios = useAxios();
  const params = useParams();
  console.log(params?.id)
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", User?.email],
    queryFn: async () => {
      const res = await UserAxios.get(`/articles?id=${params?.id}`)
      console.log(res)
      return res.data;
    }
  })

  if (isLoading || !article) {
    return <div className="text-center mt-16 text-xl">Loading...</div>;
  }

  console.log(article)
  const { categories, image, tag, title, description, date, _id } = article
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className=" w-9/13 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Articles</span>
        </button>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Image Header */}
          <div className="relative">
            <img
              src={image}
              alt="Climate Summit"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-4 text-sm mb-4">
                <span className="bg-amber-500 px-3 py-1 rounded-full font-semibold">
                  {categories}
                </span>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>15,420 views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {title}
            </h1>

            {/* Author Section */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">Sarah Johnson</div>
                  <div className="text-sm text-slate-600">Journalist</div>
                  <div className="text-xs text-slate-500 mt-1 max-w-md">
                    Sarah is a seasoned journalist with over a decade of experience in climate and political reporting.
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-slate-100 hover:bg-green-100 hover:text-green-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Published on July 20, 2025
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-slate-600 hover:text-amber-600 transition-colors text-sm font-medium">
                    Share Article
                  </button>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 font-medium">
                    Read More Articles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlesDetails;
