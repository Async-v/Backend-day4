import mongoose from "mongoose";

// Define the user schema with validation rules for name, email, and password
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [50, "Name must be less than 50 characters"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "This is an invalid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }

})

const userModel = mongoose.model('users', userSchema)

export default userModel;