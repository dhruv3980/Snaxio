import { Router } from "express";
import {addUserRole, registerUser} from "../controllers/auth.js";
import { isAuth } from "../middleware/isauth.js";


const router = Router();

router.post("/login", registerUser);
router.put("/add/role",  isAuth, addUserRole);


export default router;

