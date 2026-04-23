import jwt from "jsonwebtoken"

export const VerifyTokken = (req,res,next)=>{
    try {
        const token  =  req.cookies.jwt;
        if(!token) return res.status(501).json({message:"Unauthorized User No token Provided"})

        const decoded =  jwt.verify(token,process.env.SECRET_Key)
        if(!decoded) return res.status(501).jsson({message:"Unauthorized User "})
        req.user =decoded
    next()
    } catch (error) {
        console.log(error)
    }
}