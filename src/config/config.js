import dotenv from "dotenv";

dotenv.config()

// Load environment variables from .env file
const configEnv = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

export default configEnv