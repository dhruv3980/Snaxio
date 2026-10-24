import { Request, Response, NextFunction } from "express";
import {IUser} from "./model/user.ts";
import jwt,{ JwtPayload } from "jsonwebtoken";
import tryCatch from "./trycatch.js";
import { HttpStatusCode } from "axios";

export interface AuthenticationRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authheader = req.headers["authorization"];

       if (!authheader || !authheader.startsWith("Bearer ")) {
            return res.status(401).json({
                statusCode: 401,
                message:"Please login no auth header "
            })
        }

        const token = authheader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message:"Please login no token present in the header "
            })
        }

        const decodedToken = jwt.verify(token, process.env.jwt_secret as string) as JwtPayload;

        if (!decodedToken || !decodedToken.user) {
            return res.status(401).json({
                statusCode: 401,
                message:"Invalid token"
            })
            
        }

        req.user = decodedToken.user;
       



        console.log(token);

        next();
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message:"Please login- Jwt Error"
        })
    }
};


