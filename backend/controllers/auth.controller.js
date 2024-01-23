import {User} from "../models/user.model.js";
import {mailer} from "../utils/mailer.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    const email = "cheemstech01@gmail.com";
    try {
        const user = await User.create({email});
        return res.status(200).json(new ApiResponse(200, user, "User created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};

export const sendOtp = async (req, res) => {
    const {email} = req.body;

    try {
        if (!email) {
            throw new ApiError(400, "Email is required");
        }
        const user = await User.findOne({email});
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const otp = mailer(email);
        const otpToken = jwt.sign({otp}, process.env.OTP_SECRET, {expiresIn: "10m"});
        user.otp = otpToken;
        await user.save();

        return res.status(200).json(new ApiResponse(200, null, "OTP sent successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};

export const verifyOtp = async (req, res) => {
    const {email, otp} = req.body;

    try {
        if (!email) {
            throw new ApiError(400, "Email is required");
        }
        if (!otp) {
            throw new ApiError(400, "OTP is required");
        }
        const user = await User.findOne({email});
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const decodedOtp = jwt.verify(user.otp, process.env.OTP_SECRET);
        if (parseInt(decodedOtp.otp) !== otp) {
            throw new ApiError(400, "Invalid OTP");
        }

        user.otp = null;
        await user.save();

        return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
    } catch (error) {
        if (error.message === "jwt must be provided") {
            return res.status(400).json(new ApiResponse(400, null, "OTP already consumed"));
        }
        if (error.message === "jwt expired") {
            return res.status(400).json(new ApiResponse(400, null, "OTP expired. Please resend OTP"));
        }
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};