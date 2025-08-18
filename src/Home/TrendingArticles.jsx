import React from 'react';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';


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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Breaking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.slice(0, 4).map((article) => (
          <Link to={`/Articles-Details/${article?._id}`}>
            <div key={article?.id} className="relative group overflow-hidden rounded-lg">
              <span className='absolute bg-amber-300 px-1 top-1 right-1 rounded-lg'>{article?.view}</span>
              <img
                src={article?.image}
                alt={article?.title}
                className="w-auto h-130 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                <div className="bg-red-600 uppercase text-xs px-2 py-1 mb-1">
                  {article?.categories}
                </div>
                <h3 className="font-semibold text-lg leading-snug">
                  {article?.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
