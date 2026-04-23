import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model("User", UserSchema);

export default User;
