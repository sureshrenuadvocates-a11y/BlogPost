import React, { useEffect, useState } from "react";
import useAuthStore from "../Store/Store";
import { TimeSince } from "../_lib/Time";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ZoomedVideo = ({ zoomedVideo, setZoomedVideo }) => {
  const {
    AuthUser,
    isPostingComments,
    PostComment,
    Comments,
    loadingComments,
    AllComments,
    setProfile,
    DeleteComment,
    UpdateComments,
  } = useAuthStore();

  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AllComments();
  }, []);

  const onCommentHandler = (e) => {
    e.preventDefault();
    if (text.trim()) {
      PostComment(text, zoomedVideo._id);
      setText("");
    }
  };

  const onSubmitProfileHandler = (id) => {
    setProfile(id);
    navigate(`/${id}`);
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedText("");
  };

  const saveEditedComment = (commentId) => {
    if (editedText.trim()) {
      UpdateComments(commentId, editedText);
      cancelEditing();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-base-100 bg-opacity-90 flex flex-col lg:flex-row overflow-auto p-4">
      {/* Video Section */}
      <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:pr-4">
        <div className="relative aspect-video bg-base-300 rounded-lg overflow-hidden shadow-lg">
          <video
            src={zoomedVideo.video}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setZoomedVideo(null)}
            className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>
        <div className="mt-3">
          <h1 className="text-lg font-semibold">{zoomedVideo.title}</h1>
          <p className="text-sm ">{zoomedVideo.description}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <h2 className=" text-lg font-medium mb-3">Comments</h2>

        {/* Comment input */}
        <form onSubmit={onCommentHandler} className="flex gap-2 mb-3">
          <input
            type="text"
            className="flex-1 p-2 rounded border border-gray-600 bg-base-200  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={isPostingComments}
            className="bg-base-300 cursor-pointer px-4 py-2 rounded hover:transition disabled:opacity-50"
          >
            {isPostingComments ? "Posting..." : "Post"}
          </button>
        </form>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[50vh] lg:max-h-full">
          {loadingComments ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin h-8 w-8 text-white" />
            </div>
          ) : Comments && Comments.length > 0 ? (
            Comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-base-300 bg-opacity-50 rounded p-3 shadow text-sm"
              >
                <div
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                  onClick={() => onSubmitProfileHandler(comment.Commentor._id)}
                >
                  <img
                    src={comment.Commentor.profilePic}
                    className="h-8 w-8 rounded-full object-cover"
                    alt=""
                  />
                  <span className="font-semibold  truncate">
                    {comment.Commentor?.fullName || "Anonymous"}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {TimeSince(comment.createdAt)}
                  </span>
                </div>

                {editingCommentId === comment._id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="bg-base-100 p-2 rounded text-white resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEditedComment(comment._id)}
                        className="bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="">{comment.text}</p>
                )}

                {comment.Commentor._id === AuthUser.userId && (
                  <div className="flex gap-3 mt-2 text-xs">
                    <button
                      onClick={() => DeleteComment(comment._id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                    {editingCommentId !== comment._id && (
                      <button
                        onClick={() => startEditing(comment)}
                        className="text-gray-500 hover:text-blue-400"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-sm">
              No comments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoomedVideo;
