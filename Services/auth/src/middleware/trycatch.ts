import { Request, Response, RequestHandler, NextFunction, response } from "express";


const tryCatch = (handler: RequestHandler) => {
    return async (req: Request, res: Response, next:NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                statusCode:500,
            })
        }
    }
}

export default tryCatch;