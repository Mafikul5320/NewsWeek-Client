import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ArticlesLoading = () => {
    return (
 <div className="rounded-2xl overflow-hidden shadow-lg h-full bg-white border border-slate-200">
      {/* Image with overlay */}
      <div className="relative">
        <Skeleton height={192} /> {/* h-48 image placeholder */}
        <div className="absolute top-2 right-2">
          <Skeleton height={24} width={70} borderRadius={20} />
        </div>
        <div className="absolute bottom-2 right-2">
          <Skeleton height={24} width={60} borderRadius={6} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Publisher and Date */}
        <div className="flex justify-between items-center mb-2">
          <Skeleton height={16} width={80} />
          <Skeleton height={16} width={100} />
        </div>

        {/* Title */}
        <Skeleton height={22} width="90%" />

        {/* Description */}
        <Skeleton count={3} height={14} />

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <Skeleton height={24} width={60} borderRadius={20} />
          <Skeleton height={24} width={50} borderRadius={20} />
          <Skeleton height={24} width={70} borderRadius={20} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton circle height={40} width={40} />
            <div>
              <Skeleton height={14} width={100} />
              <Skeleton height={12} width={60} />
            </div>
          </div>
          <Skeleton height={36} width={100} borderRadius={8} />
        </div>
      </div>
    </div>
    );
};

export default ArticlesLoading;