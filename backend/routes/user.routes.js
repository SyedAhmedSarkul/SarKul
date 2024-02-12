import express from "express";
import {
    createUser,
    deleteUser,
    signIn,
    sendOtp,
    verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create", verifyOtp, createUser);
router.delete("/delete", verifyOtp, deleteUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signin", signIn);

export default router;
