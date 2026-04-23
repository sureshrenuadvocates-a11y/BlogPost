import React from "react";

export default function VideoSkeleton({ count = 8 }) {
  return (
    <div className="p-4 bg-base-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-black rounded-lg shadow-md animate-pulse overflow-hidden"
        >
          <div className="bg-base-300 h-40 w-full" />
          <div className="p-3">
            <div className="h-4 bg-base-100 rounded w-3/4 mb-2" />
            <div className="h-3 bg-base-100 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
