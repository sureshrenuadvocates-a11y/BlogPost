import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    Commentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text:{
        type:String
    },
    videoId: {  // ✅ add video reference
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uploads",
      required: true,
    },
  },
  { timestamps: true }
);

export const Comments = mongoose.model("Comments", CommentSchema);


