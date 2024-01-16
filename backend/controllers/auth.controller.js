import {User} from "../models/user.model.js";
import {mailer} from "../utils/mailer.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

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
        user.otp = otp;
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
        if (otp !== user.otp) {
            throw new ApiError(400, "Invalid OTP");
        }
        user.otp = null;
        await user.save();

        return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};