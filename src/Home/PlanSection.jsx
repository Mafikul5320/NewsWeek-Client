import React from 'react';
import { Search, Crown, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const PlanSection = () => {
    return (
        <div className='w-11/13 mx-auto mb-9'>
            <div className="bg-gradient-to-br from-orange-50/60 to-amber-50 p-10 rounded-2xl shadow-xl border border-amber-200 mt-10">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
                    Can&apos;t Find What You&apos;re Looking For?
                </h2>
                <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                    Our comprehensive search engine covers millions of articles across all categories.
                    Use our advanced filters to find exactly what you need, when you need it.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                    <Link to={"/all-articles"}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center hover:scale-105 transition-transform duration-300 gap-2 shadow-md">
                            <Search size={18} />
                            Advanced Search
                        </button>
                    </Link>

                    <Link to={"/subscription"}>
                        <button className="border border-amber-400 text-amber-600 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium cursor-pointer flex items-center hover:scale-105 transition-transform duration-300 shadow-md gap-2">
                            <Crown size={18} />
                            Get Premium Access
                        </button>
                    </Link>
                </div>

                <hr className="border-amber-300 mb-8" />

                {/* Why Premium Section */}
                <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">Why Go Premium?</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-500 text-sm ">
                    {[
                        "Best reading experience",
                        "Exclusive premium articles",
                        "Early access to trending news",
                        "Personalized recommendations",
                        "Priority customer support",
                        "Weekly editor’s insights"
                    ].map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition font-semibold border-amber-200 border">
                            <CheckCircle className="text-[#a33b0e]" size={18} />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanSection;
