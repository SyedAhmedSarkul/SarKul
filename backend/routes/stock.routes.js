import express from "express";
import {createStockValidation, deleteStockValidation, updateStockValidation, getStockValidation} from "../middlewares/stock.middlewares.js";
import {createStock, getAllStocks, deleteStock, updateStock, getStock} from "../controllers/stock.controller.js";

const router = express.Router();

router.route("/").post(createStockValidation, createStock).get(getAllStocks);
router.route("/:stockId").get(getStockValidation, getStock).patch(updateStockValidation, updateStock).delete(deleteStockValidation, deleteStock);

export default router;