import express from 'express'
import { Register ,Login, Logout,Me,userProfiles,CommunityUsers} from '../Controller/AuthCont.js'
import { VerifyTokken } from '../Middlewares/CheckToken.js'
const router =  express.Router()

router.post("/login",Login)

router.post("/register",Register)

router.post("/logout",Logout)
// get requests

router.get("/me",VerifyTokken,Me)

// All Users to get Profile
router.get("/user-profile/:id",VerifyTokken,userProfiles)

// The users which are registered the app instead of our own userId
router.get("/community-users",VerifyTokken,CommunityUsers)

export default router
