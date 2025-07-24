import React, { use } from 'react';
import { FaUser, FaBars, FaSearch } from "react-icons/fa";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Navber = () => {
    const { email } = use(AuthContext);
    console.log(email)
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
                        <Link to={"/login"}>
                            <div className="flex items-center gap-1">
                                <FaUser />
                                <span className="text-sm">My account</span>
                            </div>
                        </Link>
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
                    <NavLink to={'/subscription'}> Subscription</NavLink>
                    <NavLink to={"/user-articles"}> My Articles</NavLink>
                    <NavLink to={"/premium-articles"}>Premium Articles</NavLink>
                    <NavLink>About</NavLink>
                    <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    <NavLink to={"/my-profile"}>My Profile</NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Navber;