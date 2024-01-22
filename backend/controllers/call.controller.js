import {Call} from "../models/call.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {generateCallId} from "../utils/idGenerator.js";

const createFilter = (query) => {
    let filter = {};
    let sort = {};
    if (query.callId) {
        filter.callId = parseInt(query.callId);
    }
    if (query.serialNumber) {
        filter.serialNumber = query.serialNumber;
    }
    if (query.customerName) {
        filter.customerName = query.customerName;
    }
    if (query.category) {
        filter.category = query.category;
    }

    if (query.sort) {
        let sortBy = query.sort.split(",");
        sortBy.map((item) => {
            if (item[0] === '-') {
                sort[item.slice(1)] = -1;
            }
            else {
                sort[item] = 1;
            }
        });
        // console.log(sort);
    }

    if (query.startTime && query.endTime) {
        filter.createdAt = {
            $gte: new Date(query.startTime),
            $lte: new Date(query.endTime)
        };
    }
    else if (query.startTime) {
        filter.createdAt = {
            $gte: new Date(query.startTime)
        };
    }
    else if (query.endTime) {
        filter.createdAt = {
            $lte: new Date(query.endTime)
        };
    }


    return {filter, sort};
};

export const createCall = async (req, res) => {
    try {
        const {serialNumber, customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, status, category, itemName, itemModelNumber} = req.body;

        const call = await Call.create({serialNumber, customerName, customerCode, contactNumber, customerEmail, customerAddress, problemDescription, status, category, itemName, itemModelNumber});
        call.callId = generateCallId();
        await call.save();

        return res.status(201).json(new ApiResponse(201, call, "Call created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message));
    }
};

export const getAllCalls = async (req, res) => {
    try {
        const {filter, sort} = createFilter(req.query);
        if (Object.keys(sort).length === 0) {
            sort.callId = 1;
        }
        const calls = await Call.aggregate([
            {
                $match: filter
            },
            {
                $sort: sort
            }
        ]);
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const getCallById = async (req, res) => {
    try {
        const call = await Call.findOne({callId: req.params.callId});
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
        const {callId} = req.params;
        if (!callId) {
            throw new ApiError(400, "Call id is required");
        }
        const {status} = req.body;
        const call = await Call.findByIdAndUpdate(callId, req.body, {new: true});
        if (!call) {
            throw new ApiError(404, "Call not found");
        }
        if (status === 'completed') {
            call.closedAt = call.updatedAt;
            await call.save();
        }
        return res.status(200).json(new ApiResponse(200, call, "Call updated successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while updating call"));
    }
};

export const deleteCall = async (req, res) => {
    try {
        const response = await Call.findOneAndDelete({callId: req.params.callId});
        if (!response) {
            throw new ApiError(404, "Call not found");
        }
        return res.status(200).json(new ApiResponse(200, null, "Call deleted successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while deleting call"));
    }
};

export const getPendingCalls = async (req, res) => {
    try {
        const calls = await Call.find({status: "pending"});
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const getCompletedCalls = async (req, res) => {
    try {
        const calls = await Call.find({status: "completed"});
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};