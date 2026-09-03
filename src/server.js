import app from "./app/app.js";
import connectDB from "./config/db.js";
import dns from 'node:dns';

// Set DNS servers to avoid DNS resolution issues
dns.setServers(["1.1.1.1", "8.8.8.8"])

// Connect to the database
connectDB()

// Start the server
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})