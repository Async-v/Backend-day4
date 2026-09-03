import mongoose from "mongoose";
import configEnv from "./config.js";

// Connect to the Database
const connectDB = async() => {
    try {
        await mongoose.connect(configEnv.MONGO_URI)
        console.log("Connected to the Database")
    } catch (error) {
        console.warn("Error connecting to the Database ",error)    
    }
}

export default connectDB;