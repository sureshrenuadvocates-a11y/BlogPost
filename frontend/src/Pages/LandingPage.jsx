import React, { useEffect, useState } from "react";
import UploadDialog from "../Components/UploadDialog";
import useAuthStore from "../Store/Store";
import VideoSkeleton from "../Components/VideoSkeleton";
import VideoButton from "../Components/VideoButton";
import ZoomedVideo from "../Components/ZoomedVideo";
import VideoGrid from "../Components/VideoGrid";

const LandingPage = () => {
  const { isLoadingVideos, AllVideos, searchVideo, videos } = useAuthStore();
  const [showDialog, setShowDialog] = useState(false);
  const [zoomedVideo, setZoomedVideo] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    AllVideos();
  }, []);

  // Search handler
  const handleSearch = async (query) => {
    setSearch(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchVideo(query);
      setSearchResults(results);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    }
  };

  if (isLoadingVideos) {
    return <VideoSkeleton count={12} />;
  }

  // ✅ Videos to show: if searchResults exist, show them; else show all
  const videosToShow = searchResults.length > 0 ? searchResults : videos;

  return (
    <div className="bg-base-100 min-h-screen w-full relative pb-20">
      {/* Search Box */}
      <div className="flex justify-center items-center mt-5">
        <input
          type="text"
          placeholder="Search Here..."
          onChange={(e) => handleSearch(e.target.value)}
          value={search}
          className="p-2 border border-base-300 focus:bg-base-300 w-1/2 outline-none rounded"
        />
      </div>

      <VideoButton setShowDialog={setShowDialog} />

      {showDialog && (
        <UploadDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      )}

      {zoomedVideo && (
        <ZoomedVideo
          zoomedVideo={zoomedVideo}
          setZoomedVideo={setZoomedVideo}
        />
      )}

      <div className="container mx-auto mt-10 px-4">
        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Search Results for "{search}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((video) => (
                <div
                  key={video._id}
                  className="rounded shadow cursor-pointer overflow-hidden hover:shadow-lg transition"
                  onClick={() => setZoomedVideo(video)}
                >
                  <video
                    src={video.video}
                    className="w-full h-48 object-cover"
                    controls={false}
                    muted
                  />
                  <div className="p-2">
                    <h3 className="text-base font-semibold">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <VideoGrid setZoomedVideo={setZoomedVideo} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
