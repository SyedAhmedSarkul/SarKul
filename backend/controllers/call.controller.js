import { Call } from "../models/call.model.js";
import { Engineer } from "../models/engineer.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateCallId } from "../utils/idGenerator.js";

const createFilter = (query) => {
    let filter = {};
    let sort = {};
    if (query.callId) {
        filter.callId = query.callId;
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
            if (item[0] === "-") {
                sort[item.slice(1)] = -1;
            } else {
                sort[item] = 1;
            }
        });
        // console.log(sort);
    }

    if (query.startDate && query.endDate) {
        filter.createdAt = {
            $gte: new Date(query.startDate),
            $lte: new Date(query.endDate),
        };
    } else if (query.createdAt) {
        filter.createdAt = {
            $gte: new Date(new Date(query.createdAt).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(
                new Date(query.createdAt).setUTCHours(23, 59, 59, 999)
            ),
        };
    } else if (query.updatedAt) {
        filter.updatedAt = {
            $gte: new Date(new Date(query.updatedAt).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(
                new Date(query.updatedAt).setUTCHours(23, 59, 59, 999)
            ),
        };
    }

    return { filter, sort };
};

export const createCall = async (req, res) => {
    try {
        const {
            serialNumber,
            customerName,
            customerCode,
            contactNumber,
            customerEmail,
            customerAddress,
            problemDescription,
            status,
            category,
            itemName,
            itemModelNumber,
            username,
        } = req.body;

        const call = await Call.create({
            serialNumber,
            customerName,
            customerCode,
            contactNumber,
            customerEmail,
            customerAddress,
            problemDescription,
            status,
            category,
            itemName,
            itemModelNumber,
            username,
        });
        call.callId = generateCallId();
        await call.save();

        return res
            .status(201)
            .json(
                new ApiResponse(201, call.callId, "Call created successfully")
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode, null, error.message));
    }
};

export const getAllCalls = async (req, res) => {
    try {
        const { filter, sort } = createFilter(req.query);
        if (Object.keys(sort).length === 0) {
            sort.createdAt = -1;
        }
        const calls = await Call.aggregate([
            {
                $match: filter,
            },
            {
                $sort: sort,
            },
            {
                $lookup: {
                    from: "engineers",
                    localField: "engineersAssigned",
                    foreignField: "_id",
                    as: "engineersAssignedData",
                },
            },
            {
                $addFields: {
                    engineersAssigned: {
                        $map: {
                            input: "$engineersAssignedData",
                            as: "engineer",
                            in: {
                                engineerName: "$$engineer.employeeName",
                                engineerCode: "$$engineer.employeeCode",
                                engineerContact: "$$engineer.employeeContact",
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    engineersAssignedData: 0,
                },
            },
        ]);
        return res
            .status(200)
            .json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                        "Something went wrong while retrieving calls"
                )
            );
    }
};

export const getCallById = async (req, res) => {
    try {
        const call = await Call.findOne({ callId: req.params.callId }).populate(
            {
                path: "engineersAssigned",
                select: "employeeName employeeCode employeeContact",
            }
        );
        if (!call) {
            throw new ApiError(404, "Call not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, call, "Call retrieved successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                        "Something went wrong while retrieving call"
                )
            );
    }
};

export const updateCall = async (req, res) => {
    try {
        const { callId } = req.params;
        if (!callId) {
            throw new ApiError(400, "Call ID is required");
        }
        const {
            customerRemark,
            engineerRemark,
            partStatus: itemStatus,
        } = req.body;
        const call = await Call.findOneAndUpdate(
            { callId },
            { customerRemark, engineerRemark, itemStatus },
            { new: true }
        );
        return res
            .status(200)
            .json(new ApiResponse(200, call, "Call updated successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message || "Something went wrong while updating call"
                )
            );
    }
};

export const deleteCall = async (req, res) => {
    try {
        const response = await Call.findOneAndDelete({
            callId: req.params.callId,
        });
        if (!response) {
            throw new ApiError(404, "Call not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Call deleted successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message || "Something went wrong while deleting call"
                )
            );
    }
};

export const getPendingCalls = async (req, res) => {
    try {
        const { createdAt } = req.query;
        const query = {};
        query.status = "pending";
        if (createdAt) {
            query.createdAt = {
                $gte: new Date(createdAt).setUTCHours(0, 0, 0, 0),
                $lt: new Date(createdAt).setUTCHours(23, 59, 59, 999),
            };
        }
        const calls = await Call.find(query)
            .populate({
                path: "engineersAssigned",
                select: "employeeName employeeCode employeeContact",
            })
            .sort({ callId: 1 });
        return res
            .status(200)
            .json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                        "Something went wrong while retrieving calls"
                )
            );
    }
};

export const getCompletedCalls = async (req, res) => {
    try {
        const calls = await Call.find({ status: "completed" }).populate({
            path: "engineersAssigned",
            select: "employeeName employeeCode employeeContact",
        });
        return res
            .status(200)
            .json(new ApiResponse(200, calls, "Calls retrieved successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                        "Something went wrong while retrieving calls"
                )
            );
    }
};

export const assignCallToEngineer = async (req, res) => {
    try {
        const { callId, engineerName: employeeName } = req.body;

        const call = await Call.findOne({ callId });
        if (!call) {
            throw new ApiError(404, `Call with id ${callId} not found`);
        }
        if (call.status !== "pending") {
            throw new ApiError(400, `Call with id ${callId} is already closed`);
        }
        const engineer = await Engineer.findOne({ employeeName });
        if (!engineer) {
            throw new ApiError(
                404,
                `Engineer with name ${employeeName} not found`
            );
        }
        if (call.engineersAssigned.includes(engineer._id)) {
            throw new ApiError(
                400,
                `Engineer with name ${employeeName} is already assigned to this call`
            );
        }
        // if (engineer.assignedTo) {
        //     throw new ApiError(400, `Engineer with name ${employeeName} is already assigned to another call`);
        // }
        call.engineersAssigned.push(engineer._id);
        await call.save();
        engineer.assignedTo.push(call.callId);
        await engineer.save();
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Call assigned successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message || "Something went wrong while assigning call"
                )
            );
    }
};

export const closeCall = async (req, res) => {
    try {
        const { callId } = req.params;
        const call = await Call.findOne({ callId });
        if (!call) {
            throw new ApiError(404, `Call with id ${callId} not found`);
        }
        if (call.engineersAssigned.length === 0) {
            throw new ApiError(
                400,
                `Call with id ${callId} is not assigned to any engineer`
            );
        }
        if (call.status !== "pending") {
            throw new ApiError(400, `Call with id ${callId} is already closed`);
        }
        call.status = "completed";
        call.engineersAssigned.forEach(async (engineerId) => {
            const engineer = await Engineer.findById(engineerId);
            engineer.assignedTo = [];
            await engineer.save();
        });
        await call.save();
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Call closed successfully"));
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message || "Something went wrong while closing call"
                )
            );
    }
};
