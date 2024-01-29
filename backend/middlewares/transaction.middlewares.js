import {ApiResponse} from "../utils/ApiResponse.js";

export const createTransactionMiddleware = async (req, res, next) => {
    const {callId, engineerName, itemName, modelNumber, stockId} = req.body;
    if (!callId || !engineerName || !itemName || !modelNumber || !stockId) {
        return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }
    next();
};

export const getTransactionMiddleware = async (req, res, next) => {
    if (!req.params.callId) {
        return res.status(400).json(new ApiResponse(400, null, "Call id is required"));
    }
    next();
};