import { Router } from "express";
import {addUserRole, registerUser} from "../controllers/auth.js";


const router = Router();

router.post("/login", registerUser);
router.post("/add/role", addUserRole);


export default router;