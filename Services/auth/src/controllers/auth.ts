import { Request, Response } from "express";
export const registerUser = async (req: Request, res: Response) => {
    res.status(200).json({ response: req.body });

}