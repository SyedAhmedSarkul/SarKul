import express from "express";
import {
    createUser,
    sendOtp,
    verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

// router.post("/create-user", createUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
