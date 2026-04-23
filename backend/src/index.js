// All Imports
import express from 'express'
import AuthRoute from "../Routes/AuthRoute.js"
import cookiParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import UploadRoutes from "../Routes/UploadRoutes.js"
import CommentsRoute from "../Routes/CommentsRoute.js"
import { ConnectDB } from '../lib/database.js'

// All the Middlewares
const app=express()

dotenv.config()

app.use(cookiParser())

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
  }));

// Authentication Routes
app.use("/api/auth",AuthRoute)

// Videos Upload Routes
app.use("/api/uploads",UploadRoutes)

// Videos Comments Routes
app.use("/api/comments",CommentsRoute)

// Listener
app.listen(5000,()=>{ConnectDB();console.log("Listening on port 5000")})