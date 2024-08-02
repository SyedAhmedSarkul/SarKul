import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import {MyStocks} from "../models/myStocks.js";
import { Group } from "../models/group.model.js";


export const getGroup = async (req, res, next) => {
    try {
        const group = await Group.aggregate([
            {
                $project: {
                    _id: 0,
                    groupName: 1
                }
            },
            {
                $group: {
                    _id: null,
                    totalGroup: { $sum: 1 },
                    data: { $push: "$$ROOT" }
                }
            }
        ]);

        if (!group) {
            throw new ApiError(404, "Stocks not found");
        }

        return res.status(200).json(new ApiResponse(200, group, "success",));
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode, null, error.message)
        );
    }
};

export const addGroup = async (req, res, next) => {
    const { groupName } = req.body;

    if (!groupName) {
        return res.status(400).json(new ApiResponse(400, null, "Entry is required"));
    }
    // if (new Date(warrantyStart) > new Date(warrantyEnd)) {
    //     return res.status(400).json(new ApiResponse(400, null, "Warranty start date cannot be greater than warranty end date"));
    // }
    try {
        const group = await Group.create({
            groupName
        });

        if (!group) {
            throw new ApiError(404, "Error while adding Group");
        }
        return res.status(200).json({
            message: "Group added successfully",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode, null, error.message)
        );
    }
};
