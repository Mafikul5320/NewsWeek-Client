import React from "react";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <Lock className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ForbiddenPage;
