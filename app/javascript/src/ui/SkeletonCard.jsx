import React from "react";

const SkeletonCard = () => (
  <div className="max-w-sm w-full mx-auto">
    <div className="flex space-x-4 animate-pulse">
      <div className="flex-1 space-y-2 py-1">
        <div className="h-44 sm:h-32 md:h-40 xl:h-60 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
