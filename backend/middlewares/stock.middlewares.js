import { ApiResponse } from "../utils/ApiResponse.js";

export const createStockValidation = async (req, res, next) => {
    const { stockId, itemName, modelNumber, price } = req.body;

    if (!itemName || !modelNumber ) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "All fields are required"));
    }
    next();
};

export const updateStockValidation = async (req, res, next) => {
    if (!req.params.stockId) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Stock id is required"));
    }
    if (
        !(
            req.body.quantity ||
            req.body.itemPart ||
            req.body.serialNumber ||
            req.body.configuration ||
            req.body.modelNumber ||
            req.body.amcStartDate ||
            req.body.amcEndDate ||
            req.body.price ||
            req.body.status ||
            req.body.officeRepair ||
            req.body.scrap ||
            req.body.condition
        )
    ) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Atleast one field is required"));
    }
    next();
};

export const getStockValidation = async (req, res, next) => {
    if (!req.params.stockId) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Stock id is required"));
    }
    next();
};

export const deleteStockValidation = async (req, res, next) => {
    if (!req.params.stockId) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Stock id is required"));
    }
    next();
};
