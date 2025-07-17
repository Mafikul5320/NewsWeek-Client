import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";
const Footer = () => {
    return (
        <div className='bg-gray-100'>
            <footer className=" w-11/13 mx-auto text-black">
                <div className="text-4xl font-serif font-bold italic text-black border-b-4 py-3 ">
                    NewsWeek <span className="text-xs align-top">PRO</span>
                </div>
                <div className="mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>

                        <h3 className="text-lg font-bold mb-2">About us</h3>
                        <p className="text-sm mb-4">
                            Each template in our ever growing studio library can be added and moved around within any page effortlessly with one click.
                        </p>
                        <div className="flex gap-3">
                            <button className="bg-black text-white p-2 rounded">
                                <FaFacebookF />
                            </button>
                            <button className="bg-black text-white p-2 rounded">
                                <FaInstagram />
                            </button>
                            <button className="bg-black text-white p-2 rounded">
                                <FaTwitter />
                            </button>
                            <button className="bg-black text-white p-2 rounded">
                                <FaYoutube />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Company</h3>
                        <ul className="space-y-2 text-sm font-semibold">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Subscription Plans</a></li>
                            <li><a href="#">My account</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">The latest</h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <p className="font-semibold">Social Media Marketing for Franchises is Meant for Women</p>
                                <p className="text-xs text-gray-700">MARKETING · September 29, 2021</p>
                            </li>
                            <li>
                                <p className="font-semibold">A Look at How Social Media & Mobile Gaming Can Increase Sales</p>
                                <p className="text-xs text-gray-700">FINANCE · September 29, 2021</p>
                            </li>
                            <li>
                                <p className="font-semibold">Cover Girl Announces Star Shine Makeup Line is Due for Next December</p>
                                <p className="text-xs text-gray-700">MAKE-UP · September 29, 2021</p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-2">Subscribe</h3>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-2 border rounded-sm mb-3 focus:outline-none"
                        />
                        <button className="w-full bg-black text-white font-bold py-2 mb-2">
                            I WANT IN →
                        </button>
                        <div className="flex items-start gap-2 text-sm">
                            <input type="checkbox" />
                            <p>
                                I've read and accept the{" "}
                                <a href="#" className="text-red-600 font-medium">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-700">
                    © Copyright © 2025 - All right reserved by NewsWeek
                </div>
            </footer>
        </div>
    );
};

export default Footer;