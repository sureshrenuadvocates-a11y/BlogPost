import React, { useEffect } from "react";
import useAuthStore from "../Store/Store";
import { TimeSince } from "../_lib/Time";
import { useNavigate } from "react-router-dom";

const VideoGrid = ({ setZoomedVideo }) => {
  const { AuthUser, videos, Like, setProfile, Comments, AllComments } =
    useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    AllComments();
  }, []);
  const onSubmitProfileHandler = (id) => {
    setProfile(id);
    navigate(`/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => {
        const isLiked = video.likes?.includes(AuthUser.userId);
        const likesCount = Array.isArray(video.likes) ? video.likes.length : 0;
        const CommentsCount = Array.isArray(Comments) ? Comments.length : 0;
        return (
          <div
            key={video._id}
            className="bg-base-300 rounded-xl overflow-hidden shadow transition-shadow relative hover:shadow-xl"
          >
            <div
              className="relative w-full aspect-video bg-base-100 cursor-pointer"
              onClick={() => setZoomedVideo(video)}
            >
              <video
                src={video.video}
                className="absolute inset-0 w-full h-full object-cover"
                muted
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              {/* Uploader */}
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src={video.Uploader?.profilePic}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onClick={() => onSubmitProfileHandler(video.Uploader?._id)}
                />
                <div>
                  <h3
                    className="font-semibold hover:underline"
                    onClick={() => onSubmitProfileHandler(video.Uploader?._id)}
                  >
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {video.Uploader?.fullName} • {TimeSince(video.createdAt)}
                  </p>
                </div>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-gray-600 text-sm">Likes: {likesCount}</p>
                <p className="text-gray-600 text-sm">
                  Comments: {CommentsCount}
                </p>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full shadow transition-colors
                    ${
                      isLiked
                        ? "bg-white text-red-600"
                        : "bg-yellow-600 text-black-600"
                    }`}
                  onClick={() => Like(video._id)}
                  disabled={isLiked}
                >
                  ❤️ {isLiked ? "Liked" : ""}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
