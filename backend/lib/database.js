import mongoose from "mongoose";

export const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then((e)=>{console.log("Database Connected:",e.connection.host)})
    } catch (error) {
        console.log(error)
    }
}