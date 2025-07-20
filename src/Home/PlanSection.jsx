import React from 'react';
import { Search, Crown } from 'lucide-react';

const PlanSection = () => {
    return (
        <div className='w-11/13 mx-auto'>
            <div className=" bg-gradient-to-br from-orange-50/60 to-amber-50 p-10 rounded-2xl shadow-xl border-1 border-amber-300 mt-10">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Can&apos;t Find What You&apos;re Looking For?
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Our comprehensive search engine covers millions of articles across all categories.
                    Use our advanced filters to find exactly what you need, when you need it.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md flex items-center hover:scale-105 transition-transform duration-300 gap-2">
                        <Search size={18} />
                        Advanced Search
                    </button>

                    <button className="border border-amber-400 text-amber-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-md font-medium cursor-pointer flex items-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl gap-2">
                        <Crown size={18} />
                        Get Premium Access 
                    </button>
                </div>

                <hr className="border-amber-400 mb-6" />

                <div className="text-center font-medium text-sm text-gray-400 mb-2">Quick Access:</div>

                <div className="flex flex-wrap justify-center gap-4">
                    {['World News', 'Technology', 'Business', 'Health & Science', 'Sports', 'Entertainment'].map((item, index) => (
                        <button
                            key={index}
                            className="shadow-2x cursor-pointer bg-amber-500 hover:bg-orange-500 text-slate-900 font-semibold hover:scale-105 transition-transform duration-200 text-white text-sm px-4 py-2 rounded-md"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanSection;