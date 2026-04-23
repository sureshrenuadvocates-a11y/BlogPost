import React from "react";
import { LucidePlus } from "lucide-react";

const VideoButton = ({ setShowDialog }) => {
  return (
    <button
      onClick={() => setShowDialog(true)}
      className="fixed bottom-7 left-1/2 transform -translate-x-1/2 z-50
                 bg-blue-600 text-white p-4 rounded-full shadow-xl
                 hover:bg-blue-700 transition duration-300 ease-in-out
                 hover:scale-110 flex items-center justify-center group"
      aria-label="Upload Video"
    >
      <LucidePlus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
      <span className="sr-only">Add Video</span>
    </button>
  );
};

export default VideoButton;
