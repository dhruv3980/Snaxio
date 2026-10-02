import { Router } from "express";
import {registerUser} from "../controllers/auth.js";


const router = Router();

router.post("/login", registerUser);


export default router;