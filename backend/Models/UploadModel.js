
import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    Uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video:{
        type: String,
        // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description:{
        type:String,
        required:true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  { timestamps: true }
);

export const Uploads = mongoose.model("Uploads", UploadSchema);


