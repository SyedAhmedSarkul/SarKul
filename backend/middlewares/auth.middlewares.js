import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

export const verifyToken = async (req, res, next) => {
    try {
        // console.log(req.cookies?.accessToken);
        const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1] || req.headers["x-access-token"];
        // console.log(token);
        if (!token) {
            throw new ApiError(403, "Please login first to access this resource");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new ApiError(404, "You are not authorized to access this resource");
        }
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            error.message = "Your session has expired. Please login again";
        }
        if (error.name === "JsonWebTokenError") {
            error.message = "You are not authorized to access this resource";
        }
        return res.status(error.statusCode || 401).json(new ApiResponse(error.statusCode, null, error.message || "Invlaid token provided or the token is expired. Please login again"));
    }
};