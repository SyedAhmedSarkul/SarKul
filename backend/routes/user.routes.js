import express from "express";
import {
    createUser,
    signIn,
    sendOtp,
    verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/create-user", createUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signin", signIn);

export default router;
