import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <img
          src="https://illustrations.popsy.co/gray/web-error.svg"
          alt="404 illustration"
          className="w-72 mx-auto mb-8"
        />

        <h1 className="text-5xl font-bold text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          The page you're looking for might have been removed or is temporarily
          unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
