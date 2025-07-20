import React from 'react';
import { FaUser, FaBars, FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router';

const Navber = () => {
    return (
        <div className="w-full border-b border-gray-300">
            <div className='w-11/13 mx-auto'>
                <div className="flex items-center justify-between   py-2">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <button className="text-red-600 font-bold flex items-center gap-1">
                            MENU <FaBars />
                        </button>
                        <button className="flex items-center gap-1">
                            <span className="font-medium">Search</span>
                            <FaSearch />
                        </button>
                    </div>

                    {/* Center Logo */}
                    <div className="text-7xl font-serif text-amber-500 italic">
                        NewsWeek<span className="text-xs align-top ml-1">PRO</span>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                            <FaUser />
                            <span className="text-sm">My account</span>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-1 rounded font-semibold">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex justify-center gap-6 py-2 text-sm font-semibold">
                    <NavLink> Home</NavLink>
                    <NavLink to={'/add-articles'}> Add Articles</NavLink>
                    <NavLink to={'/all-articles'}> All Articles</NavLink>
                    <NavLink> Subscription</NavLink>
                    <NavLink> My Articles</NavLink>
                    <NavLink>Premium Articles</NavLink>
                    <NavLink>About</NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Navber;