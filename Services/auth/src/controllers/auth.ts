import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import User  from "../model/user.js"
import jwt, { TokenExpiredError }   from "jsonwebtoken";
import tryCatch from "../middleware/trycatch.js";
import { AuthenticationRequest } from "../middleware/isauth.js";

export const registerUser = tryCatch(async (req, res, next) => {
    const { email, name, image } = req.body;
        
          // Validate input
        if (!email || !name || !image) {
            return res.status(400).json({
                message: "Email, name and image are required"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
           user= await User.create({
                name,
                email,
                image
            })
        }


       const token = jwt.sign(
           {
                user
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "15d"
            }
        );

       return res.status(200).json({ 
            message: "User LoggedIn Successfully",
            token: token,
            user:user,
            statusCode:200
         });
})






const allowedRole = ["customer", "rider", "seller"] as const;
type Role = (typeof allowedRole)[number]

export const addUserRole = tryCatch(async (req: AuthenticationRequest, res) => {
    if (!req.user._id) {
        return res.status(401).json({
            statusCode: 401,
            message:"Unauthorized"
        })
    }

    const { role } = req.body as { role: Role };
    
    if (!allowedRole.includes(role)) {
        return res.status(400).json({
            statusCode: 400,
            message:"Invalid Role"
        })
    }

    const user = User.findByIdAndUpdate(req.user._id, { role }, { new: true });

    if (!user) {
        return res.status(404).json({
            statusCode: 404,
            message:"User Not Found"
        })
    }

    const token = jwt.sign(user, process.env.jwt_secret as string, {
        expiresIn:"15d"
    })

    return res.status(200).json({
        statuscode: 200,
        user,
        token
    })

    
})