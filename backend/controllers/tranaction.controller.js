import {Transaction} from "../models/transaction.model.js";
import {Stock} from "../models/stock.model.js";
import {Call} from "../models/call.model.js";
import {Engineer} from "../models/engineer.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {Transaction} from "../models/transaction.model.js";
import {Stock} from "../models/stock.model.js";
import {Call} from "../models/call.model.js";
import {Engineer} from "../models/engineer.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";

const createFilter = (query) => {
    const filter = {};
    const sort = {};
    if (query.callId) {
        filter.callId = query.callId;
    }
    if (query.engineerName) {
        filter.engineerName = query.engineerName;
    }
    if (query.itemName) {
        filter.itemName = query.itemName;
    }
    if (query.stockId) {
        filter.stockId = query.stockId;
    }
    if (query.partStatus) {
        filter.partStatus = query.partStatus;
    }

    if (query.createdAt) {
        filter.createdAt = {
            $gte: new Date(new Date(query.createdAt).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(
                new Date(query.createdAt).setUTCHours(23, 59, 59, 999)
            ),
        };
    }

    if (query.sort) {
        const sortBy = query.sort.split(",");
        sortBy.map((item) => {
            if (item[0] === "-") {
                sort[item.slice(1)] = -1;
            } else {
                sort[item] = 1;
            }
        });
    }
    return {filter, sort};
};

export const createTransaction = async (req, res) => {
    try {
        const {
            callId,
            engineerName,
            itemName,
            modelNumber,
            serialNumber,
            stockId,
            category,
            partStatus,
            partName,
        } = req.body;
        const call = await Call.findOne({callId});
        if (!call) {
            throw new ApiError(404, `Call with id ${callId} not found`);
        }
        const engineer = await Engineer.findOne({employeeName: engineerName});
        if (!engineer) {
            throw new ApiError(
                404,
                `Engineer with name ${engineerName} not found`
            );
        }
        if (category === "b2e") {
            const stock = await Stock.findOne({stockId});
            if (!stock) {
                throw new ApiError(404, `Stock with id ${stockId} not found`);
            }


            if (serialNumber) {
                if (stock.serialNumber !== serialNumber) {
                    throw new ApiError(
                        400,
                        "Serial number does not match with stock serial number"
                    );
                }
            }
        }
        const transaction = await Transaction.create({
            callId,
            engineerName,
            itemName,
            modelNumber,
            serialNumber,
            stockId,
            category,
            partStatus,
            partName,
        });

        if (!transaction) {
            throw new ApiError(
                500,
                "Something went wrong while creating transaction"
            );
        }

        if (transaction.category === "b2e") {
            const stock = await Stock.findOne({stockId});
            stock.status = "unavailable";
            await stock.save();
        }
        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    transaction,
                    "Transaction created successfully"
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                    "Something went wrong while creating transaction"
                )
            );
    }
};

export const getTransactions = async (req, res) => {
    try {
        const {filter, sort} = createFilter(req.query);
        if (Object.keys(sort).length === 0) {
            sort.createdAt = -1;
        }
        const transactions = await Transaction.aggregate([
            {
                $match: filter,
            },
            {
                $sort: sort,
            },
        ]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transactions,
                    "Transactions retrieved successfully"
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                    "Something went wrong while retrieving transactions"
                )
            );
    }
};

export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.find({
            callId: req.params.callId,
        });
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    transaction,
                    "Transaction retrieved successfully"
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json(
                new ApiResponse(
                    error.statusCode,
                    null,
                    error.message ||
                    "Something went wrong while retrieving transaction"
                )
            );
    }
};
