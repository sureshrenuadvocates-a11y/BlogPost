import {Comments} from "../Models/CommentsModel.js"
export const PostComment=async(req,res)=>{
    const {text,videoId} = req.body
    const userId = req.user.userId
    if(!text) return res.status(200).json({message:"Message is required"})
    try {
        const newComment  = new Comments({
            Commentor:userId,
            text,
            videoId
        })
        newComment.save();
        return res.status(200).json(newComment)
    } catch (error) {
        console.log(error)
    }
}
export const getComments=async(req,res)=>{
    try {
        const Cm  = await Comments.find().populate({
            path: "Commentor",
            select: "-password", 
          });
        // if(Cm.length === 0) return res.status(400).json("No Comments Found")
        return res.status(200).json(Cm)
    } catch (error) {
        console.log(error)
    }
}
export const DeleteComments= async(req,res)=>{
    const {id:WhichCommentsToDelete}  = req.params
    try {
        const Cm = await Comments.findByIdAndDelete(WhichCommentsToDelete)
        if(!Cm) return res.status(400).json("No Comments Found")
        return res.status(200).json(Cm)
    } catch (er) {
        console.log(er)
    }
}
export const UpdateComments = async(req,res)=>{
    const {id:CommentId} = req.params
    const {text} =req.body
    try {
        const cm =await Comments.findByIdAndUpdate(CommentId,{text:text})
        return res.status(200).json(cm)
    } catch (error) {
        console.log(error)
    }
}
