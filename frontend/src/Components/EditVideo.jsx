import useAuthStore from "@/Store/Store";
import React, { useState } from "react";

const EditVideo = ({ video, onClose }) => {
  const { UpdateVideo } = useAuthStore();
  const [title, setTitle] = useState(video.title || "");
  const [description, setDescription] = useState(video.description || "");

  const handleSave = () => {
    location.reload();
    UpdateVideo(video._id, title, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Video</h2>
        <input
          type="text"
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
        />
        <textarea
          className="w-full border p-2 mb-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Video description"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
