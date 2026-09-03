import { Router } from "express";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import configEnv from '../config/config.js'

const router = Router()

// Middleware added to avoid repeating token verification logic.
// Password hashing with bcrypt is still pending.

/**
 * Creates a new user.
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password with Hash
 * @returns {object} Created user in form of response
 */
router.post("/register", async (req, res) => {

    // get all the fields
    const { name, email, password } = req.body

    // validate all the fileds 
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // check in my database the user is exist or not (using email)
    const userExists = await userModel.findOne({ email: email })
    if (userExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    // Create a user in the database using userModel(Schema)
    const user = await userModel.create({
        name, email, password
    })

    // generate a token using user id 
    const token = await jwt.sign({ _id: user._id }, configEnv.JWT_SECRET)

    // send a response in form of json
    return res.status(201).json({
        message: "User Created Successfully",
        data: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token
    })
})

/**
 * Logs in a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {object} Response containing the logged-in user's id.
 */
router.post("/login", async (req, res) => {

    // token from headers and email, password from body
    const { token } = req.headers
    const { email, password } = req.body

    // validate email and password and send response accordingly
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // find the user in the database using email and check if the user exists or not
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // check if the email and password are correct or not
    if(user.email !== email || user.password !== password){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    // check if the token is present in the headers or not
    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        })
    }

    // verify the token using jwt and send response accordingly
    try {

        const tokenDecoded = await jwt.verify(token, configEnv.JWT_SECRET)

        return res.status(200).json({
            message: "User LoggedIn Successfully",
            data: {
                decoded: tokenDecoded
            }
        })


    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        })

    }

})


export default router;