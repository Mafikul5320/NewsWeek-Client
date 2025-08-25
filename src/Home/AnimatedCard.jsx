import React from "react";

export default function AnimatedCard() {
  return (
    <div className="relative">
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-spin-slow blur opacity-75"></div>

      {/* Card content */}
      <div className="relative rounded-2xl bg-gray-900 p-6 text-white">
        <h2 className="text-xl font-semibold">Animated Border Card</h2>
        <p className="text-gray-300 mt-2">
          This card has a glowing animated border with rounded corners.
        </p>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
