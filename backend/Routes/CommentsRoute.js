import express from "express"
import { VerifyTokken } from '../Middlewares/CheckToken.js'

import { PostComment ,getComments,DeleteComments,UpdateComments,} from "../Controller/Comments.js"

const router  = express.Router()
router.post("/post-comment",VerifyTokken,PostComment)
router.get("/allComments",VerifyTokken,getComments)
router.post("/DeleteComments/:id",VerifyTokken,DeleteComments)
router.post("/UpdateComment/:id",VerifyTokken,UpdateComments)
export default router