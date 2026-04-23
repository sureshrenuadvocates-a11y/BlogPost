import React, { useState } from "react";
import { Loader2, X } from "lucide-react";
import useAuthStore from "../Store/Store";

const UploadDialog = ({ showDialog, setShowDialog }) => {
  const { UploadVideo, isUploadingVideo } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    await UploadVideo(formData);
    setShowDialog(false);
  };
  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 hover:text-white"
              onClick={() => setShowDialog(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl  font-bold mb-4">Upload Video</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength={300}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-sm  bg-transparent placeholder:text-gray-400"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-sm  bg-transparent placeholder:text-gray-400"
                required
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full p-2 border rounded-sm  bg-transparent"
                required
              />
              <button
                type="submit"
                className={`  w-full bg-red-500 text-black p-2 rounded hover:bg-green-200 `}
                disabled={isUploadingVideo}
              >
                {isUploadingVideo ? (
                  <div className="flex justify-evenly items-center">
                    <Loader2 className="animate-spin h-5 w-5 " />
                  </div>
                ) : (
                  "Upload Video"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDialog;
