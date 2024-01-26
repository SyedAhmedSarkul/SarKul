import {Stock} from "../models/stock.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const createFilter = (query) => {
    let filter = {};
    let sort = {};

    if (query.itemName) {
        filter.itemName = {$regex: query.itemName, $options: "i"};
    }

    if (query.itemPart) {
        filter.itemPart = {$regex: query.itemPart, $options: "i"};
    }

    if (query.serialNumber) {
        filter.serialNumber = {$regex: query.serialNumber, $options: "i"};
    }

    if (query.configuration) {
        filter.configuration = {$regex: query.configuration, $options: "i"};
    }

    if (query.modelNumber) {
        filter.modelNumber = {$regex: query.modelNumber, $options: "i"};
    }

    if (query.condition) {
        filter.condition = query.condition;
    }

    if (query.stockId) {
        filter.stockId = {$regex: query.stockId, $options: "i"};
    }
    if (query.amcStartDate) {
        filter.amcStartDate = {
            $eq: new Date(query.amcStartDate)
        };
    }

    if (query.amcEndDate) {
        filter.amcEndDate = {
            $eq: new Date(query.amcEndDate)
        };
    }

    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: parseInt(query.minPrice),
            $lte: parseInt(query.maxPrice)
        };
    }

    else if (query.minPrice) {
        filter.price = {
            $gte: parseInt(query.minPrice)
        };
    }

    else if (query.maxPrice) {
        filter.price = {
            $lte: parseInt(query.maxPrice)
        };
    }
    else if (query.price) {
        filter.price = {
            $eq: parseInt(query.price)
        };
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

    return {filter, sort};
};

export const createStock = async (req, res) => {
    try {
        const {itemName, quantity, itemPart, serialNumber, configuration, modelNumber, amcStartDate, amcEndDate, price, stockId, condition} = req.body;
        if (amcStartDate > amcEndDate) {
            throw new ApiError(400, "AMC start date cannot be greater than AMC end date");
        }
        const existingStock = await Stock.findOne({stockId});
        if (existingStock) {
            throw new ApiError(400, `Stock with id ${stockId} already exists`);
        }
        const stock = await Stock.create({
            itemName, quantity, itemPart, serialNumber, configuration, modelNumber, amcStartDate, amcEndDate, price, stockId, condition
        });
        if (!stock) {
            throw new ApiError(500, "Failed to create stock");
        }
        return res.status(201).json(new ApiResponse(201, stock, "Stock created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while creating stock"));
    }
};

export const updateStock = async (req, res) => {
    try {
        const {itemName, quantity, itemPart, serialNumber, configuration, modelNumber, amcStartDate, amcEndDate, price, condition} = req.body;
        const stock = await Stock.findOne({stockId: req.params.stockId});
        if (!stock) {
            throw new ApiError(404, "Stock not found");
        }
        if (itemName) {
            stock.itemName = itemName;
        }
        if (quantity) {
            stock.quantity = quantity;
        }
        if (itemPart) {
            stock.itemPart = itemPart;
        }
        if (serialNumber) {
            stock.serialNumber = serialNumber;
        }
        if (configuration) {
            stock.configuration = configuration;
        }
        if (modelNumber) {
            stock.modelNumber = modelNumber;
        }
        if (amcStartDate) {
            stock.amcStartDate = amcStartDate;
        }
        if (amcEndDate) {
            stock.amcEndDate = amcEndDate;
        }
        if (amcStartDate > amcEndDate) {
            throw new ApiError(400, "AMC start date cannot be greater than AMC end date");
        }
        if (price) {
            stock.price = price;
        }
        if (condition) {
            stock.condition = condition;
        }
        await stock.save();
        return res.status(200).json(new ApiResponse(200, stock, "Stock updated successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while updating stock"));
    }
};

export const getStock = async (req, res) => {
    try {
        const stock = await Stock.findOne({stockId: req.params.stockId});
        if (!stock) {
            throw new ApiError(404, "Stock not found");
        }
        return res.status(200).json(new ApiResponse(200, stock, "Stock retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving stock"));
    }
};

export const getAllStocks = async (req, res) => {
    try {
        const {filter, sort} = createFilter(req.query);
        if (Object.keys(sort).length === 0) {
            sort.itemName = 1;
        }
        const stocks = await Stock.aggregate([
            {
                $match: filter
            },
            {
                $sort: sort
            },
            {
                $project: {
                    _id: 0,
                    stockId: 1,
                    itemName: 1,
                    itemPart: 1,
                    serialNumber: 1,
                    configuration: 1,
                    modelNumber: 1,
                    amcStartDate: 1,
                    amcEndDate: 1,
                    price: 1,
                    condition: 1,
                }
            },
            {
                $group: {
                    _id: null,
                    totalStocks: {$sum: 1},
                    totalPrice: {$sum: '$price'},
                    data: {$push: '$$ROOT'}
                }
            }
        ]);
        if (!stocks) {
            throw new ApiError(404, "Something went wrong while retrieving stocks");
        }
        return res.status(200).json(new ApiResponse(200, stocks, "Stocks retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving stocks"));
    }
};

export const deleteStock = async (req, res) => {
    try {
        const stock = await Stock.findOneAndDelete({stockId: req.params.stockId});
        if (!stock) {
            throw new ApiError(404, "Stock not found");
        }
        return res.status(200).json(new ApiResponse(200, null, "Stock deleted successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while deleting stock"));
    }
};