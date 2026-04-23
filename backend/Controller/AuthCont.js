import jwt from "jsonwebtoken";
import User from "../Models/AuthModel.js";
import { Uploads } from "../Models/UploadModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cloudinary from "../lib/Cloudinary.js";
export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "All fields are required" });
  try {
    const ExistedUser = await User.findOne({ email });
    if (!ExistedUser)
      return res.status(401).json({ message: "Invalid Credentials" });
    const decodedPassword = await bcrypt.compare(
      password,
      ExistedUser.password,
    );
    if (!decodedPassword)
      return res.status(401).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      {
        userId: ExistedUser._id,
        fullName: ExistedUser.fullName,
        email: ExistedUser.email,
        profilePic: ExistedUser.profilePic,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // MUST be true on HTTPS
      sameSite: "None", // 🔥 REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(ExistedUser);
  } catch (error) {
    console.log(error);
  }
};
export const Register = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  if (!fullName || !email || !password || !profilePic)
    return res.status(401).json({ message: "All fields are required" });
  try {
    const ExistedUser = await User.findOne({ email });
    if (ExistedUser)
      return res
        .status(401)
        .json({ message: "User with this account already exist" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const uploadres = await cloudinary.uploader.upload(profilePic, {
      folder: "user-profiles",
    });
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic: uploadres.secure_url,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        userId: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // MUST be true on HTTPS
      sameSite: "None", // 🔥 REQUIRED for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged Out Succesffully" });
  } catch (error) {
    console.log(error);
  }
};
export const Me = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};
// To show the users in profile Page
export const userProfiles = async (req, res) => {
  const { id: userProfileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userProfileId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const user = await User.findById(userProfileId).select("-password");
    const videos = await Uploads.find({ Uploader: userProfileId });
    if (!videos) {
      return res.status(404).json({ message: "No post Found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({
      user,
      videos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// All the registered Users
export const CommunityUsers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (users.length == 0)
      return res.status(400).json({ message: "No Communtity Users Found" });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
