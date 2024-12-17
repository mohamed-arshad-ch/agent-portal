import React from "react";

const ImageContentSkeleton = () => {
  return (
    
    <div className="flex flex-col p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-28 bg-gray-300 rounded-md"></div>

      {/* Content Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-20 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-20 bg-gray-300 rounded-md w-full"></div>
        <div className="h-20 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-20 bg-gray-300 rounded-md w-2/3"></div>
      </div>
   
    </div>
  );
};

export default ImageContentSkeleton;
