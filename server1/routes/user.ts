import express from "express";
import {signup,signin} from "../controllers/user";
import isAuth from "../middleware/auth";
const router = express.Router();

router.post("/login", signin);
router.post("/",signup);

export default router;
