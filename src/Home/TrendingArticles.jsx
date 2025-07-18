import React from 'react';

const articles = [
  {
    id: 1,
    category: 'Celebrity',
    title: 'The Definitive Guide To Marketing Your Business On Instagram',
    image: 'https://media.prothomalo.com/prothomalo-english%2F2025-07-17%2F0nzk488a%2F%E0%A7%AB.JPG?rect=0%2C0%2C1620%2C1080&w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    id: 2,
    category: 'Finance',
    title: 'Dell Will Invest $125 Billion in China’s Tech in the Next 5 Years',
    image: 'https://media.prothomalo.com/prothomalo-english%2F2025-07-14%2Fqqdnkdyr%2F%E0%A7%A9.jpg?w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    id: 3,
    category: 'Tech',
    title: 'Discover the Newest Waterproof Smartphones that Come on Sale',
    image: 'https://media.prothomalo.com/prothomalo-english%2F2025-07-14%2Fjmz4eav0%2F%E0%A7%AE.jpg?w=622&auto=format%2Ccompress&fmt=avif',
  },
  {
    id: 4,
    category: 'Celebrity',
    title: 'Now Is the Time to Think About Your Small-Business Success',
    image: 'https://media.prothomalo.com/prothomalo-english%2F2025-07-12%2Fnhev8q4m%2F10.jpg?w=622&auto=format%2Ccompress&fmt=avif',
  },
];

const TrendingArticles = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Breaking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="relative group overflow-hidden rounded-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-auto h-130 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
              <div className="bg-red-600 uppercase text-xs px-2 py-1 mb-1">
                {article.category}
              </div>
              <h3 className="font-semibold text-lg leading-snug">
                {article.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
