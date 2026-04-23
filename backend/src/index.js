// All Imports
import express from "express";
import AuthRoute from "../Routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import UploadRoutes from "../Routes/UploadRoutes.js";
import CommentsRoute from "../Routes/CommentsRoute.js";
import { ConnectDB } from "../lib/database.js";

// Init
dotenv.config();
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/uploads", UploadRoutes);
app.use("/api/comments", CommentsRoute);

// Port (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

// Start server AFTER DB connection
ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
