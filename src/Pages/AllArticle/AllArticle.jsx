import React from 'react';
import { Clock, Crown, Eye } from "lucide-react";
import { Link } from 'react-router';
import useAxiosSucure from '../../Hooks/useAxiosSucure';
import { useQuery } from '@tanstack/react-query';
import usePremiumFind from '../../Hooks/usePremiumFind';

const AllArticle = ({ oneArticle }) => {
    // console.log(oneArticle)
    const axiosSucure = useAxiosSucure();
    const { PremiumUser } = usePremiumFind();
    console.log(PremiumUser)
    const { categories, image, tag, title, description, date, _id, publisher, view, plan } = oneArticle;
    // console.log(publisher)
    const shortDescription = description?.length > 170 ? description.slice(0, 170) + "..." : description;

    const { data: PublisherDetails } = useQuery({
        queryKey: ["PublisherDetails", publisher],
        enabled: !!publisher, // only run if publisher is not empty
        queryFn: async () => {
            const res = await axiosSucure.get(`/publisher-details?name=${publisher}`);
            return res.data;
        },
    });


    return (
        <div className=" rounded-2xl overflow-hidden shadow-lg h-full bg-white border border-slate-200">
            {/* Image with overlay */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                {plan === "Premium" && <div className="flex items-center space-x-1 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-medium absolute px-2 py-1 rounded-2xl top-2 right-2"><Crown size={14} /> <span className="text-xs"><span>premium</span></span></div>}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <Eye size={16} />
                    {view}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Publisher and Date */}
                <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                    <span className="text-amber-600 font-semibold">{categories}</span>
                    <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{date}</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                    {shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tag?.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                {
                    PublisherDetails?.name == publisher && <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={PublisherDetails?.logo}
                                alt="Author"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="text-sm font-medium text-slate-800">{PublisherDetails?.name}</p>
                                <p className="text-xs text-slate-500">Journalist</p>
                            </div>
                        </div>
                        <Link to={`/Articles-Details/${_id}`}>
                            <button disabled={PremiumUser?.user_status !== "premium" && plan == "Premium"} className={` ${PremiumUser?.user_status !== "premium" && plan === "Premium" ? 'bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-60' : 'bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm'}`}>
                                Read More
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default AllArticle;