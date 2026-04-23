import express from 'express'
import { VerifyTokken } from '../Middlewares/CheckToken.js'
import { UploadVideo ,ShowVideos,DeleteVideos,LikeVideo,UpdateVideos,SearchVideso} from '../Controller/UploadController.js'
import { upload } from '../Middlewares/multer.js';
const router =  express.Router()

// To Upload new videos
router.post("/upload-video", VerifyTokken, upload.single("video"), UploadVideo);

// to show the video homepage
router.get("/all-videos",VerifyTokken,ShowVideos)

//  To Delete Videos
router.post("/delete-video/:id",VerifyTokken,DeleteVideos)

//  for Like button
router.post("/like/:id",VerifyTokken,LikeVideo)


// Update Videos title and descriptions
router.post("/update-video/:id",VerifyTokken,UpdateVideos)


router.get("/search-video",VerifyTokken,SearchVideso)
export default router