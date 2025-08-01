import mongoose from "mongoose";

const connectDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")
    } catch (error) {
        console.log("database error: ", error)
    }
}

export default connectDB;  