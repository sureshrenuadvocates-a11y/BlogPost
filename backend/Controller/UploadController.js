import cloudinary from "../lib/Cloudinary.js"
import { Uploads } from "../Models/UploadModel.js"
import { Comments } from "../Models/CommentsModel.js"
import fs from "fs";
export const ShowVideos =async(req,res)=>{
    try {
        const videos = await Uploads.find()
        .populate({
          path: "Uploader",
          select: "-password",
        });
        return res.status(200).json(videos)
    } catch (error) {
        console.log(error)
    }
}
export const UploadVideo = async (req, res) => {
    const userId = req.user.userId;
    const { title, description } = req.body;

    if (!title || !description || !req.file) {
        return res.status(400).json({ message: "All Fields including video are required" });
    }
    try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "videos"
        });
        fs.unlinkSync(req.file.path);
        const newUploads = new Uploads({
            Uploader: userId,
            video: uploadResult.secure_url,
            title,
            description,
        });
        await newUploads.save();
        return res.status(200).json(newUploads);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong uploading video." });
    }
};
export const DeleteVideos = async (req, res) => {
    const { id: videoId } = req.params;
    try {
      const deletedVideo = await Uploads.findByIdAndDelete(videoId);
      if (!deletedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }
      await Comments.deleteMany({ videoId: videoId });
      return res.status(200).json({ message: "Video deleted", video: deletedVideo });
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

export const LikeVideo = async (req, res) => {
    const { id: videoId } = req.params;
    const userId = req.user.userId;
  
    try {
      const updatedVideo = await Uploads.findByIdAndUpdate(
        videoId,
        { $addToSet: { likes: userId } },
        { new: true } 
      );
      if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }
      return res.status(200).json(updatedVideo);
    } catch (error) {
      console.error('Error liking video:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
export const UpdateVideos=async(req,res)=>{
  const {id:VideoID} =req.params
  const {title,description} = req.body
 try {
  const UpdatedVideos = await Uploads.findByIdAndUpdate(
    VideoID,
    { title, description },
    { new: true }
  );
      if(!UpdateVideos) return res.status(400).json({message:"No Video Found"})
    return res.status(200).json(UpdatedVideos)
 } catch (error) {
  console.log(error)
 } 
}

export const SearchVideso = async (req, res) => {
  const query = req.query.q || "";

  try {
    const searchResults = await Uploads.find({
      title: { $regex: query, $options: "i" },
    });

    if (searchResults.length === 0) {
      return res.status(404).json({ message: "No videos found with this title" });
    }

    return res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
