import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/Store";
import { Loader2 } from "lucide-react";
import { TimeSince } from "../_lib/Time";
import EditVideo from "@/Components/EditVideo";
import ZoomedVideo from "@/Components/ZoomedVideo";
const ProfilePage = () => {
  const { id } = useParams();
  const {
    userProfile,
    isSearchingUserProfile,
    SearchUserProfile,
    DeletePost,
    AuthUser,
  } = useAuthStore();

  const [zoomedVideo, setZoomedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  useEffect(() => {
    if (id) {
      SearchUserProfile(id);
    }
  }, [id]);

  const DeleteHandler = (videoId) => {
    DeletePost(videoId);
    location.reload();
  };

  if (isSearchingUserProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!userProfile?.user) {
    return <div className="text-center p-4">User not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-lg mt-10">
      {zoomedVideo && (
        <ZoomedVideo
          zoomedVideo={zoomedVideo}
          setZoomedVideo={setZoomedVideo}
        />
      )}

      {editingVideo && (
        <EditVideo video={editingVideo} onClose={() => setEditingVideo(null)} />
      )}

      <div className="flex items-center space-x-6">
        <img
          src={userProfile.user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">{userProfile.user.fullName}</h1>
          <p className="text-gray-600">{userProfile.user.email}</p>
          <p className="text-gray-600">
            Joined {TimeSince(userProfile.user.createdAt)}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mt-10 mb-4">All Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userProfile.videos?.map((video) => (
          <div
            key={video._id}
            className="bg-base-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow relative"
          >
            <div className="relative w-full aspect-video bg-base-100">
              <video
                src={video.video}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                muted
                onClick={() => setZoomedVideo(video)}
              />
            </div>

            <div className="p-4">
              <div className="text-sm font-semibold leading-snug flex flex-col justify-between items-center">
                <h3>{video.title}</h3>

                {userProfile.user._id === AuthUser.userId && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => DeleteHandler(video._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                      onClick={() => setEditingVideo(video)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-xs">
                {TimeSince(video.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
