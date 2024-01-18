import {Call} from "../models/call.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

export const createCall = async (req, res) => {
    try {
        const {serialNumber, customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, status, category, itemName, itemModelNumber} = req.body;

        if ([serialNumber, customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, category, itemName, itemModelNumber].includes(undefined)) {
            throw new ApiError(400, "All fields are required");
        }
        if (["desktop", "laptop", "printer", "plotter", "scanner", "server"].indexOf(category) === -1) {
            throw new ApiError(400, "Invalid category");
        }

        const call = await Call.create({serialNumber, customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, status, category, itemName, itemModelNumber});

        return res.status(201).json(new ApiResponse(201, call, "Call created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};

export const getAllCalls = async (req, res) => {
    try {
        const calls = await Call.find();
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const getCallById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            throw new ApiError(400, "Call id is required");
        }
        const call = await Call.findById(id);
        if (!call) {
            throw new ApiError(404, "Call not found");
        }
        return res.status(200).json(new ApiResponse(200, call, "Call retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving call"));
    }
};

export const updateCall = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            throw new ApiError(400, "Call id is required");
        }
        const {status} = req.body;
        const response = await Call.findByIdAndUpdate(id, req.body, {new: true});
        if (!response) {
            throw new ApiError(404, "Call not found");
        }
        let call = {...response._doc};
        if (status === 'completed') {
            call.closedAt = new Date();
        }
        return res.status(200).json(new ApiResponse(200, call, "Call updated successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while updating call"));
    }
};

export const deleteCall = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            throw new ApiError(400, "Call id is required");
        }
        const response = await Call.findByIdAndDelete(id);
        if (!response) {
            throw new ApiError(404, "Call not found");
        }
        return res.status(200).json(new ApiResponse(200, null, "Call deleted successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while deleting call"));
    }
};