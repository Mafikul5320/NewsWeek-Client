import React from 'react';
import { FaUser, FaBars, FaSearch } from "react-icons/fa";

const Navber = () => {
    return (
        <div className="w-full border-b border-gray-400">
            <div className='w-11/13 mx-auto'>
                <div className="flex items-center justify-between  px-4 lg:px-10 py-2">
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
                    <div className="text-7xl font-serif font-bold text-[#F3910B] italic">
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
                    <a href="#">Music</a>
                    <a href="#">Celebrity</a>
                    <a href="#">Politics</a>
                    <a href="#">Finance</a>
                    <a href="#">Travel</a>
                    <a href="#">Food</a>
                    <a href="#">Marketing</a>
                    <a href="#">Tech</a>
                    <a href="#">Make-up</a>
                </nav>
            </div>
        </div>
    );
};

export default Navber;