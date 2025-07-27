import React from 'react';
import { Clock, Eye } from "lucide-react";
import { Link } from 'react-router';

const AllArticle = ({ oneArticle }) => {
    console.log(oneArticle)
    const { categories, image,  tag, title, description, date, _id } = oneArticle;
    const shortDescription = description.length > 170 ? description.slice(0, 170) + "..." : description
    return (
        <div className=" rounded-2xl overflow-hidden shadow-lg bg-white border border-slate-200">
            {/* Image with overlay */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <Eye size={16} />
                    15,420
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Author"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="text-sm font-medium text-slate-800">Sarah Johnson</p>
                            <p className="text-xs text-slate-500">Journalist</p>
                        </div>
                    </div>
                    <Link to={`/Articles-Details/${_id}`}>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllArticle;