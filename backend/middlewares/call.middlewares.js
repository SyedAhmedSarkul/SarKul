import {ApiResponse} from "../utils/ApiResponse.js";

export const createCallValidation = async (req, res, next) => {
    const {customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, status, category, itemName, itemModelNumber} = req.body;

    if ([customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, category, itemName, itemModelNumber].includes(undefined).includes(null)) {
        return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }

    next();
};

export const callIdValidation = async (req, res, next) => {
    const {callId} = req.params;
    if (!callId) {
        return res.status(400).json(new ApiResponse(400, null, "Call id is required"));
    }
    next();
};