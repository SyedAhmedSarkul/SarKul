import {Call} from "../models/call.model.js";
import {Engineer} from "../models/engineer.model.js";
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
            $eq: new Date(query.startTime)
        };
    }
    else if (query.endTime) {
        filter.createdAt = {
            $eq: new Date(query.endTime)
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

        return res.status(201).json(new ApiResponse(201, null, "Call created successfully"));
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
            },
            {
                $lookup: {
                    from: 'engineers',
                    localField: 'engineersAssigned',
                    foreignField: '_id',
                    as: 'engineersAssignedData',
                },
            },
            {
                $addFields: {
                    engineersAssigned: {
                        $map: {
                            input: '$engineersAssignedData',
                            as: 'engineer',
                            in: {
                                engineerName: '$$engineer.employeeName',
                                engineerCode: '$$engineer.employeeCode',
                                engineerContact: '$$engineer.employeeContact',
                            }
                        }
                    }
                },
            },
            {
                $project: {
                    engineersAssignedData: 0,
                },
            },
        ]);
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const getCallById = async (req, res) => {
    try {
        const call = await Call.findOne({callId: req.params.callId}).populate({
            path: 'engineersAssigned',
            select: 'employeeName employeeCode employeeContact',
        });
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
            throw new ApiError(400, "Call ID is required");
        }
        const {customerRemark, engineerRemark, partStatus} = req.body;
        const call = await Call.findOneAndUpdate({callId}, {customerRemark, engineerRemark, partStatus}, {new: true});
        return res.status(200).json(new ApiResponse(200, null, "Call updated successfully"));
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
        const calls = await Call.find({status: "pending"}).populate({
            path: 'engineersAssigned',
            select: 'employeeName employeeCode employeeContact',
        });
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const getCompletedCalls = async (req, res) => {
    try {
        const calls = await Call.find({status: "completed"}).populate({
            path: 'engineersAssigned',
            select: 'employeeName employeeCode employeeContact',
        });
        return res.status(200).json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving calls"));
    }
};

export const assignCallToEngineer = async (req, res) => {
    try {
        const {callId, engineerName: employeeName} = req.body;

        const call = await Call.findOne({callId});
        if (!call) {
            throw new ApiError(404, `Call with id ${callId} not found`);
        }
        const engineer = await Engineer.findOne({employeeName});
        if (!engineer) {
            throw new ApiError(404, `Engineer with name ${employeeName} not found`);
        }
        if (call.engineersAssigned.includes(engineer._id)) {
            throw new ApiError(400, `Engineer with name ${employeeName} is already assigned to this call`);
        }
        call.engineersAssigned.push(engineer._id);
        await call.save();
        return res.status(200).json(new ApiResponse(200, null, "Call assigned successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while assigning call"));
    }
};

export const closeCall = async (req, res) => {
    try {
        const {callId} = req.params;
        const call = await Call.findOne({callId});
        if (!call) {
            throw new ApiError(404, `Call with id ${callId} not found`);
        }
        call.status = "completed";
        await call.save();
        return res.status(200).json(new ApiResponse(200, null, "Call closed successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while closing call"));
    }
};