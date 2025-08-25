import { useQuery } from '@tanstack/react-query';
import { Clock, Eye } from 'lucide-react';
import nocategories from '../assets/No found categries.png';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSucure';

const CategoriesArticle = () => {
    const axiosSucure = useAxiosSecure()
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const { data: CategoriesArticles } = useQuery({
        queryKey: ['CategoriesArticle'],
        queryFn: async () => {
            const res = await axiosSucure.get(`/categories-article?category=${category}`);
            return res.data;
        }
    });
    console.log(CategoriesArticles)
    return (
        <div className='w-11/12 mx-auto my-6'>
{CategoriesArticles?.length===0?(<div className="text-center py-10">
          <img
            src={nocategories}
            alt="No articles"
            className="mx-auto w-[30%]"
          />
          <p className="text-gray-500 mt-4 font-medium">
            No articles found in this category.
          </p>
        </div>):            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
                {
                    CategoriesArticles?.map(article => (
                        <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={article?.image}
                                    alt="Good cholesterol foods"
                                    className="w-full h-48 object-cover"
                                />
                                {/* View count */}
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                                    <Eye size={16} />
                                    {article?.view}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {/* Category and Date */}
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                                    <span className="text-amber-600 font-semibold">{article?.categories}</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{article?.date}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="text-lg font-bold text-gray-900 mb-2">
                                    {article?.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                    {article?.description.split(" ").slice(0, 13).join(" ")}...
                                </p>

                                {/* Tags */}
                                {article?.tag.map(tags =>
                                    <span className="text-xs bg-gray-100 ml-2  text-gray-700 px-3 py-1 rounded-full font-medium">{tags}
                                    </span>
                                )}

                                {/* Author */}
                                <div className="flex items-center justify-between pt-5">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={article?.author_img}
                                            alt="Prothom Alo"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{article?.publisher}</p>
                                            <p className="text-xs text-gray-500">Journalist</p>
                                        </div>
                                    </div>

                                    {/* Read More button */}
                                    <Link to={`/Articles-Details/${article?._id}`}>
                                        <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>}
        </div>
    );
};

export default CategoriesArticle;