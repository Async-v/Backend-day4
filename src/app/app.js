import express from 'express'
import authRoutes from '../routes/auth.routes.js'

const app = express()

/**
 * Middleware
 * Used to parse request body and form data.
 */
app.use(express.json())
app.use(express.urlencoded({extended: true}))


/**
 * Health Check API
 * Used to check whether the server is running.
 */
app.get("/api/healthy", (req, res)=>{
    return res.status(200).json({
        status: "ok",
        message: "Server is healthy"
    })
})

// Auth Api's
app.use('/api/auth', authRoutes)



export default app;