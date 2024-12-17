import React from "react";

const TableLoader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-3 gap-4 w-full">
        {/* Skeleton rows */}
        {[...Array(20)].map((_, index) => (
          <div key={index} className="flex items-center animate-pulse">
            <div className="w-16 h-5 bg-gray-300 rounded mr-4"></div>
            <div className="flex-1 h-5 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
